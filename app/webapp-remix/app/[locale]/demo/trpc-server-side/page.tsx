import { backendCaller } from '@/trpc-server';

import { getLogger } from '@reebok/shared';

const logger = getLogger('locale.demo.trpc');

/** This is a React Server Component */
export default async function rscPage() {
  // call the tRPC endpoint
  const result = await backendCaller.userById(2);
  logger.info("rscPage", 'cmpnt - result.name is', result?.name)

  const promptsResult = await backendCaller.getPrompts();
  logger.info("rscPage", 'promptsResult', promptsResult.length)

  // testing below: need to create a user and remix with same user_id in local DB instance
  const testUserId = '2WyW9YqTZzK01QPEBb7y2xoveYO';
  const testRemixId = '2XbDzIF295KdyPzl0HulcK8neng';
  const testRemixHistoryResult = await backendCaller.getClaimedRemixesForUser(
    testUserId
  );
  const testRemixResult = await backendCaller.getRemix(testRemixId);

  // we render this output on the server
  return (
    <div>
      <div className="wrapper">
        <div className="container">
          <div className="p-20">
            Hi, {result?.name}, greetings from RSC land!
            <br />
            Mock data below:
            <br />
            Prompts #{promptsResult.length}, {JSON.stringify(promptsResult)}
            <br />
            <div>
              <br />
              <p>
                Local DB data below: (requires running and populating a local DB
                for testing)
              </p>
              <p>
                Remix ID History for user {testUserId}:
                {JSON.stringify(
                  testRemixHistoryResult?.map((remix) => remix.remix_id)
                )}
              </p>
              <p>
                Remix {testRemixId} prompts:
                {JSON.stringify(testRemixResult?.custom_prompt_id)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
