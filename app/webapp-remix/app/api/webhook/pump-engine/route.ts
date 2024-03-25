import { NextRequest, NextResponse } from 'next/server';
import {
  remixQuery,
  validateApiKey,
  globaluserQuery,
  promptSampleQuery,
  ShoeModel,
  Locale,
} from '@reebok/backend-libs';
import { messageProcessor, responseManager } from '@reebok/conversation-bot';
import { getConfig, getLogger } from '@reebok/shared';

const WEBAPP_BASE_URL = getConfig().webapp.url;
const logger = getLogger('api.webhook.pump-engine');

export async function POST(req: NextRequest, _: NextResponse) {
  try {
    logger.info('POST', 'start');

    // TODO: add auth back when ready

    // validate API key
    const PUMP_ENGINE_WEBHOOK_KEY = getConfig().pumpEngineWebhook.apiKey;
    const validApiKey = validateApiKey(req, PUMP_ENGINE_WEBHOOK_KEY as string);
    if (!validApiKey) {
      return new Response('Unauthorized', { status: 401 });
      // throw new Error('status: 401, message: Unauthorized. Invalid API Key');
    }

    // call pump engine service to handle incoming webhook
    await pumpEngineWebhook(req);

    // temporary response for Assets Pipeline testing
    return new Response('ok');

    // don't send response to webhook event
    // TODO?: handle errors with some kind of retry?
  } catch (error) {
    logger.error('POST', 'error', error, error);
    throw new Error(`There was an error processing the request: ${error}`);
  } finally {
    logger.info('POST', 'end');
  }
}

function payloadSanityChecks(body: any) {
  const { collection, renderId, renderJobType, renderJobState } = body;
  const assets: { url: string; tags: string[] }[] = body.assets;

  // sanity check state
  if (!renderJobState || renderJobState !== 'COMPLETED') {
    throw new Error('renderJobState is not COMPLETED');
  }
  // sanity check type
  if (
    !renderJobType ||
    !['STABLE_DIFFUSION', 'UNITY'].includes(renderJobType)
  ) {
    throw new Error('renderJobType is invalid');
  }
  // sanity check collection name
  if (collection !== 'Reebok') {
    logger.warn('GET', 'webhook received for a different collection');
  }
  // sanity check remixId
  if (!renderId) {
    throw new Error(
      '[pumpEngineWebhook] renderId(==remixId) missing from webhook payload'
    );
  }
  // sanity check assets
  if (!assets?.length && !assets[0].url) {
    throw new Error('[pumpEngineWebhook] assets payload missing url');
  }
}

async function pumpEngineWebhook(req: NextRequest) {
  logger.info('pumpEngineWebhook', 'start');

  try {
    const body = await req.json();
    logger.info('pumpEngineWebhook', 'body', body);

    // will throw relevant error if a check fails
    payloadSanityChecks(body);

    const { renderId, renderJobType } = body;
    const assets: { url: string; tags: string[] }[] = body.assets;
    const remix_id = renderId;

    logger.info('pumpEngineWebhook', 'remix_id:', remix_id);

    // get owner user_id
    const remix = await remixQuery.getRemix(remix_id);

    if (!remix || !remix.user_id) {
      throw new Error('[WEBHOOK] error retrieving remix');
    }

    const {
      image_original_url,
      image_texture_url,
      image_shoe_only_url,
      image_combined_url,
    } = extractAssetUrls(assets);

    let newState;

    // determine where the request came from:
    if (
      // user customized shoe including ai art: texture was generated
      remix.state === 'CUSTOMIZATION_ASSETS_REQUESTED' &&
      renderJobType === 'STABLE_DIFFUSION'
    ) {
      newState = 'CUSTOMIZATION_ASSETS_GENERATED';
    } else if (
      // user customized shoe only with unity parameters
      remix.state === 'CUSTOMIZATION_ASSETS_REQUESTED' &&
      renderJobType === 'UNITY'
    ) {
      newState = 'CLAIMED'; // 'save' aka claim shoe right away
    } else {
      // user created new shoe from instagram
      newState = 'ORIGINAL_ASSETS_GENERATED';
    }

    // update remix in database
    const remixUpdate = {
      image_original_url,
      image_texture_url,
      image_shoe_only_url,
      image_combined_url,
      state: newState,
    };
    await remixQuery.updateRemix(remix_id, {
      ...remixUpdate,
    });

    const user = await globaluserQuery.getUserByUserId(remix.user_id);

    if (!user) {
      throw new Error('WEBHOOK] Error: user could not be retrieved');
    }
    const locale = user.ig_language as Locale;

    let promptSample;

    // logic below for instagram original project only:
    if (
      // check if user is eligible for the random prompt sample flow
      globaluserQuery.userCanRandomizeInstaPrompt({
        ...user,
        project_state: 'SHOE_GENERATED', // we are about to update user regardless
      }) &&
      newState === 'ORIGINAL_ASSETS_GENERATED'
    ) {
      // get prompt sample for user
      promptSample = await promptSampleQuery.getRandomPromptSampleByPool(
        user.project_trials_remaining as 1 | 2 | 3
      );
      // update user.prompt_sample_id to keep track and project state
      await globaluserQuery.updateUser(user.user_id, {
        prompt_sample_id: promptSample.prompt_sample_id,
        project_state: 'SHOE_GENERATED',
      });
    } else if (newState === 'ORIGINAL_ASSETS_GENERATED') {
      // otherwise just update user project state - only if it came from instagram
      await globaluserQuery.updateUser(user.user_id, {
        project_state: 'SHOE_GENERATED',
      });
    }

    if (!remix.custom_prompt_name) {
      logger.error('pumpEngineWebhook', 'remix.custom_prompt_name not found');
      throw new Error('remix.custom_prompt_name not found');
    }

    // only send message if it was an instagram project (state == ORIGINAL_ASSETS_GENERATED)
    if (newState === 'ORIGINAL_ASSETS_GENERATED') {
      if (!remix.ig_id) {
        throw new Error(
          `instagram assets were generated but no ig_id was found on remix_id: ${remix_id}`
        );
      }
      const redirectUrl = `${WEBAPP_BASE_URL}/login/${user.signup_code}`;
      // handle array of responses after shoe generation received:
      const shoeGenMessageData = responseManager.shoeGenerationMessage(
        image_combined_url,
        redirectUrl,
        !!user.futurepass_address,
        user.project_trials_remaining as number,
        remix.custom_prompt_name,
        remix.shoe_model as ShoeModel,
        locale
        // promptSample ? promptSample.prompt_image_url : ''
      );

      await messageProcessor.handleOutgoingMessage(
        remix.ig_id,
        shoeGenMessageData,
        1000
      );

      // make sure user can reroll before sending reroll message
      if (
        globaluserQuery.userCanRandomizeInstaPrompt({
          ...user,
          project_state: 'SHOE_GENERATED', // user state has already updated
        })
      ) {
        // give user time to see shoe generation
        await sleep(4000);
        const promptMessageData = responseManager.promptRerollMessage(
          user.project_trials_remaining as number,
          locale,
          promptSample ? promptSample.prompt_image_url : ''
        );
        // send message
        await messageProcessor.handleOutgoingMessage(
          remix.ig_id,
          promptMessageData
        );
      }
    }
    // send ok response
    return NextResponse.json({ status: 'OK' });
  } catch (error) {
    logger.error('pumpEngineWebhook', 'error', error);
    throw new Error(`There was an error in the pumpEngineWebhook, ${error}`);
  }
}

function extractAssetUrls(assets: { url: string; tags: string[] }[]) {
  //
  const image_original_url = assets.filter((asset) =>
    asset.tags.includes('original')
  )[0]?.url;
  const image_texture_url = assets.filter((asset) =>
    asset.url.includes('_result_512.png')
  )[0]?.url;
  const image_shoe_only_url = assets.filter((asset) =>
    asset.url.includes('_ShoeOnly_1080.png')
  )[0]?.url;
  const image_combined_url = assets.filter((asset) =>
    asset.url.includes('_Combined_1080.png')
  )[0]?.url;
  return {
    image_original_url,
    image_texture_url,
    image_shoe_only_url,
    image_combined_url,
  };
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
