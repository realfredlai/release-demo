import { Badge } from '@reebok/frontend-components';
import { RemixItem } from '@reebok/backend-libs';
import { Text } from '@/app/components/Text/Text';
import SneakerCardTypeIcon from '@/app/components/Cards/SneakerCardTypeIcon';
import ColorPalette from '@/app/components/ColorPalette/ColorPalette';

import { getLogger } from '@reebok/shared';

const logger = getLogger('components.locker');

const ShoeDetailType = ({ remix }: { remix: RemixItem }) => {
  logger.info('ShoeDetailType', 'remix.custom_colors:',remix.custom_colors)
  return (
    <div className="relative col-span-full lg:col-start-4 lg:col-end-10 flex gap-2.5 h-16 md:h-20">
      <SneakerCardTypeIcon type={remix.shoe_model!} className="h-full w-auto" />
      <div className="flex flex-col justify-between md:justify-center h-full gap-2">
        <Badge variant="shoe">
          <Text variant="body">{remix.custom_prompt_name}</Text>
        </Badge>
        <ColorPalette colors={remix.custom_colors!.slice(0, 2)} />
      </div>
    </div>
  );
};

export default ShoeDetailType;
