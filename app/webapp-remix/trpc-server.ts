import { initTRPC } from '@trpc/server';
import { z } from 'zod';

import {
  remixQuery,
  promptQuery,
  remixApiService,
  stripeService,
  paymentQuery,
  globaluserQuery,
  RemixItem,
  GlobalUserItem,
  CustomizationParams,
  validateUsernameService,
  assetsPipelineService,
  mintQuery,
} from '@reebok/backend-libs';

import { getLogger, getConfig } from '@reebok/shared';

const logger = getLogger('api.trpc');

const t = initTRPC.create();

// this is our data store, used to respond to incoming RPCs from the client

interface User {
  id: string;
  name: string;
}
const userList: User[] = [
  {
    id: '1',
    name: 'Phil',
  },
  {
    id: '2',
    name: 'Richard',
  },
];

// this is our RPC API
export const appRouter = t.router({
  userById: t.procedure.input(z.number()).query((req) => {
    const { input } = req;
    return userList.find((u) => parseInt(u.id) === input);
  }),
  hello: t.procedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query((opts) => {
      return {
        greeting: `Hello ${opts.input.text}`,
      };
    }),
  getClaimedRemixesForUser: t.procedure.input(z.string()).query(async (req) => {
    const { input } = req;
    const data = await remixQuery.getClaimedRemixesForUser(input);
    return data;
  }),
  getOriginalsForUser: t.procedure.input(z.string()).query(async (req) => {
    // user_id as string input
    const { input } = req;
    const data = await remixQuery.getOriginalsForUser(input);
    return data;
  }),
  getLatestUserCreations: t.procedure.input(z.string()).query(async (req) => {
    // user_id as string input
    const { input } = req;
    const data = await remixQuery.getLatestUserCreations(input);
    return data;
  }),
  getLatestUserCollabs: t.procedure.input(z.string()).query(async (req) => {
    // user_id as string input
    const { input } = req;
    const data = await remixQuery.getLatestUserCollabs(input);
    return data;
  }),
  getCollabsForUser: t.procedure.input(z.string()).query(async (req) => {
    // user_id as string input
    const { input } = req;
    const data = await remixQuery.getCollabsForUser(input);
    return data;
  }),
  getRemix: t.procedure.input(z.string()).query(async (req) => {
    const { input } = req;
    const data = await remixQuery.getRemix(input);
    return data;
  }),
  getRemixAndUser: t.procedure.input(z.string()).query(async (req) => {
    // input is just remix_id
    const { input } = req;
    const data = await remixQuery.getRemixAndUser(input);
    return data;
  }),
  getShoeHistory: t.procedure.input(z.string()).query(async (req) => {
    const { input } = req;
    logger.info('getShoeHistory', '', input);
    return await remixQuery.getShoeHistory(input);
  }),
  getPrompts: t.procedure.query((req) => {
    return promptQuery.getPrompts();
  }),
  customizeShoe: t.procedure
    .input(
      z.object({
        user: z.custom<GlobalUserItem>(),
        parentRemix: z.custom<RemixItem>(),
        customParams: z.custom<CustomizationParams>(),
      })
    )
    .mutation(async (req) => {
      const { input } = req;
      // returns new shoe object
      return await remixApiService.customizeShoe(
        input.user,
        input.parentRemix,
        input.customParams
      );
    }),
  saveCustomization: t.procedure
    .input(
      z.object({
        userId: z.custom<string>(),
        parentRemix: z.custom<RemixItem>(), // phantom remix
      })
    )
    .mutation(async (req) => {
      const { input } = req;
      // returns new shoe object
      return await remixApiService.saveCustomization(
        input.userId,
        input.parentRemix
      );
    }),
  softDeleteSingleShoe: t.procedure.input(z.string()).mutation(async (req) => {
    // expects remix_id of shoe to delete
    const { input } = req;
    // returns parent remixId
    return await remixQuery.softDeleteSingleShoe(input);
  }),
  softDeleteShoeAndChildren: t.procedure
    .input(z.string())
    .mutation(async (req) => {
      // expects remix_id of shoe to delete. If parent, will delete all children too
      const { input } = req;
      // returns new shoe object
      return await remixQuery.softDeleteShoeAndChildren(input);
    }),
  leaveCollab: t.procedure
    // takes the user input, and the parent of the collab they want to leave
    .input(z.object({ user_id: z.string(), remix_parent_id: z.string() }))
    .mutation(async (req) => {
      const { input } = req;
      // returns true on success
      return await remixQuery.leaveCollab(input.user_id, input.remix_parent_id);
    }),
  signInUser: t.procedure
    .input(
      z.object({
        futurepass_address: z.string(),
        signup_code: z.string().optional(),
      })
    )
    .mutation(async (req) => {
      const { input } = req;
      return await remixApiService.signInUser(
        input.futurepass_address,
        input.signup_code
      );
    }),
  // TODO: signInUserWallet
  claimRecentInstagramShoe: t.procedure
    .input(z.string())
    .mutation(async (req) => {
      // input is user.signup_code
      const { input } = req;
      return await remixApiService.claimRecentInstagramShoe(input);
    }),
  getStripeCheckoutSession: t.procedure
    .input(
      z.object({
        userId: z.string(),
        remixId: z.string(),
        futurepassAddress: z.string(),
      })
    )
    .query(async (req) => {
      try {
        const { userId, remixId, futurepassAddress } = req.input;

        logger.debug('getStripeCheckoutSession', 'start', { input: req.input });

        // 1. create a temporary Mint record
        const newMintRecord = await mintQuery.createCopyOfOriginalRemix(
          userId,
          remixId
        );
        if (!newMintRecord) {
          // @todo work with Johan to handle this error
          throw new Error(
            'There was an error while preparing your order. Please try again.'
          );
        }

        // 2. create a Stripe Payment Order
        const paymentOrderResult = await paymentQuery.createStripePaymentOrder(
          userId,
          newMintRecord ? newMintRecord.remix_id : ''
        );

        // 3. create a Stripe Checkout Session
        const stripeSessionResult =
          await stripeService.createStripeCheckoutSession(
            userId,
            newMintRecord.remix_id,
            paymentOrderResult.payment_id,
            futurepassAddress.length
              ? futurepassAddress
              : (getConfig().trn.testNFTOwnerAddress as string)
          );

        logger.debug('getStripeCheckoutSession', 'debug', paymentOrderResult);

        return stripeSessionResult;
      } catch (error: any) {
        logger.error('getStripeCheckoutSession', '', { error: error.message });
        throw error;
      }
    }),
  getUserById: t.procedure.input(z.string()).query(async (req) => {
    const { input } = req;
    logger.info('getUserByUserId', '', { input });
    return await globaluserQuery.getUserByUserId(input);
  }),
  getMostRecentUnclaimedShoeBySignupCode: t.procedure
    .input(z.string())
    .query(async (req) => {
      const { input } = req;
      logger.info('getMostRecentUnclaimedShoeBySignupCode', '', { input });
      return await remixApiService.getMostRecentUnclaimedShoeBySignupCode(
        input
      );
    }),
  getMintedRemixesForUser: t.procedure.input(z.string()).query(async (req) => {
    const { input } = req;
    const data = await mintQuery.getAllMintedItemsByUserId(input);
    logger.debug('getMintedRemixesForUser', '', { input, data });
    return data;
  }),
  reportRemix: t.procedure
    .input(
      z.object({
        remixId: z.string(),
        remixReportReason: z.string(),
      })
    )
    .mutation(async (req) => {
      const { input } = req;
      const moderationStatus = await assetsPipelineService.reportRemix(
        input.remixId,
        input.remixReportReason
      );
      return {
        moderationStatus: moderationStatus.moderationStatusUpdate,
        moderationReportReason: moderationStatus.moderationReportReason,
      };
    }),
  isValidUsername: t.procedure.input(z.string()).query(async (req) => {
    const { input } = req;
    return await validateUsernameService.isValidUsername(input);
  }),
  updateUserName: t.procedure
    .input(
      z.object({
        userId: z.string(),
        name: z.string(),
      })
    )
    .mutation(async (req) => {
      const { input } = req;
      const updateResult = await globaluserQuery.updateUser(input.userId, {
        name: input.name,
      });
      return updateResult;
    }),
  getMintedRemixById: t.procedure.input(z.string()).query(async (req) => {
    const { input } = req;
    const data = await mintQuery.getItemById(input);
    return data;
  }),
});
export const backendCaller = appRouter.createCaller({});
export type AppRouter = typeof appRouter;
