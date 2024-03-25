import { z } from 'zod';
import { procedure, router } from '@/server/trpc';

export const appRouter = router({
  hello: procedure
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
});

export const backendCaller = appRouter.createCaller({});

// export type definition of API
export type AppRouter = typeof appRouter;
