import { Card, Badge } from '@reebok/frontend-components';

export default function CollabCardSkeleton() {
  return (
    <Card className="h-[490px] md:h-[440px] xlg:h-[640px] bg-transparent border-primary-bone border-opacity-10 border-2 rounded-none">
      <div className="w-full h-full relative">
        <div className="absolute left-0 top-0 h-11 w-11 rounded-full border-primary-bone border-opacity-10 border-2 bg-transparent m-4" />

        <div className="absolute bottom-0 w-full h-28 p-4 gap-2 flex flex-col-reverse bg-primary-bone bg-opacity-5 border-primary-bone border-opacity-10 border-t-2">
          <div className="flex justify-between items-center gap-6 xlg:gap-16">
            <Badge
              variant="shoe"
              className="h-7 w-full bg-primary-bone bg-opacity-20"
            ></Badge>
            <div className="flex gap-1">
              <div className="bg-primary-bone bg-opacity-20 h-mobiles w-mobiles rounded-full" />
              <div className="bg-primary-bone bg-opacity-20 h-mobiles w-mobiles rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
