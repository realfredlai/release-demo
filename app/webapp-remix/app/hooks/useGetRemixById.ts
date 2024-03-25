import { trpc } from '@/trpc';
import { getLogger } from '@reebok/shared';

const logger = getLogger('webapp-remix.hooks');

export const useGetRemixById = (
  remixId: string,
  options: { enabled?: boolean; refetchInterval?: number }
) => {
  logger.info('useGetRemixById', 'call - remixId', remixId);

  const updatedRemix = trpc.getRemix.useQuery(remixId, {
    // enabled: true,
    refetchInterval: 10000,
    ...options,
  });
  logger.info(
    'useGetRemixById',
    'updatedRemix.data?.state',
    updatedRemix.data?.state
  );

  return updatedRemix;
};
