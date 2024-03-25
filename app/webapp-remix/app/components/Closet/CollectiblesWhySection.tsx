import WhyPurchaseSection from './CollectiblesWhy/WhyPurchaseSection';
import BeInToWinSection from './CollectiblesWhy/BeInToWinSection';
import SelfExpressionSection from './CollectiblesWhy/SelfExpressionSection';
import UniqueToYouSection from './CollectiblesWhy/UniqueToYouSection';

const CollectiblesWhySection = () => {
  return (
    <div className="bg-primary-bone text-primary-navy grid h-fit py-mobilel px-6 lg:py-l gap-mobilem lg:gap-l">
      {/* WHY PURCHASE A REEBOK IMPACT SNEAKER */}
      <WhyPurchaseSection />

      {/* BE IN TO WIN */}
      <BeInToWinSection />

      {/* A NEW KIND OF DIGITAL SELF-EXPRESSION */}
      <SelfExpressionSection />

      {/* UNIQUE TO YOU */}
      <UniqueToYouSection />
    </div>
  );
};

export default CollectiblesWhySection;
