import { Card } from '@reebok/frontend-components';
import { Text } from '@/app/components/Text/Text';

export default function CollectibleCardSkeleton() {
  return (
    <Card className="h-[490px] md:h-[440px] lg:h-[590px] xlg:h-[640px] bg-transparent border-primary-bone border-opacity-25 border-2 rounded-none select-none">
      <div className="w-full h-full relative">
        <div className="absolute right-0 top-0 m-4">
          <Text className="font-parabole text-4xl text-primary-bone text-opacity-25 w-16">
            XX/
            <wbr />
            XX
          </Text>
        </div>

        <div className="absolute bottom-0 w-full h-[125px] p-4 gap-2 flex flex-col-reverse bg-primary-bone bg-opacity-10 border-primary-bone border-opacity-25 border-t-2" />
      </div>
    </Card>
  );
}
