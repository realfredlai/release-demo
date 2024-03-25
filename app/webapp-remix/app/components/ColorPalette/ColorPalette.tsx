import { formatRGBA } from '@/app/utils/helpers';
import { RGBColor } from '@reebok/backend-libs';
import { cn } from '@reebok/frontend-components';

type ColorPaletteProps = {
  colors: RGBColor[];
  className?: string;
};

const ColorPalette = (props: ColorPaletteProps) => {
  return (
    <div className="flex gap-1">
      {props.colors.map((color, index) => (
        <div
          className={cn(
            'h-mobiles w-mobiles border-2 rounded-full border-white',
            props.className
          )}
          style={{ backgroundColor: formatRGBA(color) }}
          key={index}
        />
      ))}
    </div>
  );
};

export default ColorPalette;
