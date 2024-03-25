import { useEditStateStore } from '@/app/store/ShoeRemixStore';
import { RemixItem } from '@reebok/backend-libs';
import { getLogger } from '@reebok/shared';

const logger = getLogger('webapp-remix.hooks');

const useGetLastGeneratedRemix = () => {
  const { originalRemix, lastGeneratedPhantomRemix } = useEditStateStore();

  /**
   * Check if there's a lastGeneratedRemix
   * If AI Art has been performed before, lastGeneratedRemix will not be null and use last phantom remix
   * If not performed before, lastGeneratedRemix is null, and use the originalRemix
   */
  const getLastGeneratedRemix = lastGeneratedPhantomRemix
    ? lastGeneratedPhantomRemix
    : originalRemix;

  logger.info(
    'useGetLastGeneratedRemix',
    'last generated remix is:',
    getLastGeneratedRemix
  );
  return getLastGeneratedRemix as RemixItem;
};

export default useGetLastGeneratedRemix;
