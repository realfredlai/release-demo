import { RgbColor, RgbColorPicker } from 'react-colorful';

type ColorPickerProps = {
  color: RgbColor;
  setColor: (newColor: RgbColor) => void;
};

const ColorPicker = ({ color, setColor }: ColorPickerProps) => {
  return (
    <div className="custom-layout custom-pointers gap-6">
      <RgbColorPicker color={color} onChange={setColor} />
    </div>
  );
};

export default ColorPicker;
