import { RGBColor } from '@reebok/backend-libs';
import { getConfig } from '@reebok/shared';
import { RgbColor, RgbaColor } from 'react-colorful';
import { ShoeDominantColorBrightness } from '@/app/store/ShoeLockerStore';

export const padWithLeadingZeroes = (placeValue: number, num: number) => {
  return String(num).padStart(placeValue, '0');
};

export const formatDate = (inputDate: string) => {
  // Parse the input date string
  const parsedDate = new Date(inputDate);

  // Define options for formatting the date
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  // Format the date using the options
  const formattedDate = parsedDate.toLocaleDateString('en-US', options);

  return formattedDate;
};

export const formatSignupLink = (signup_code: string) => {
  return `${getConfig().webapp.url}/?signup_code=${signup_code}`;
};

export const denormaliseRGBA = (color: RGBColor | RgbColor) => {
  const r = color.r * 255;
  const g = color.g * 255;
  const b = color.b * 255;

  return { r, g, b };
};

export const normaliseRGBA = (color: RGBColor | RgbColor) => {
  const r = color.r / 255;
  const g = color.g / 255;
  const b = color.b / 255;
  const a = 1;

  return { r, g, b, a };
};

export const isRGBDecimal = (color: RGBColor | RgbColor) => {
  if (color.r <= 1 && color.g <= 1 && color.b <= 1) {
    return true; // Values are in the 0-1 format
  } else if (color.r <= 255 && color.g <= 255 && color.b <= 255) {
    return false; // Values are in the 0-255 format
  }
};

export const formatRGBA = (color: RGBColor | RgbColor) => {
  // If color comes in a 0 to 1 RGBA format
  if (isRGBDecimal(color)) {
    const denormalisedColor = denormaliseRGBA(color);
    return `rgba(${denormalisedColor.r}, ${denormalisedColor.g}, ${denormalisedColor.b}, 1)`;
  } else {
    return `rgba(${color.r}, ${color.g}, ${color.b}, 1)`;
  }
};

export const convertRGBAToRGB = (rgba: RgbaColor) => {
  const r = rgba.r;
  const g = rgba.g;
  const b = rgba.b;

  return { r, g, b };
};

export const getRGBPercievedBrightness = (
  color: RGBColor | RgbColor | RgbaColor
): ShoeDominantColorBrightness => {
  let { r, g, b } = color;

  // Check if the color values are in the 0-1 range
  const isDecimalRGB = r <= 1 && g <= 1 && b <= 1;

  // Convert the color values to the 0-255 range if they are in the 0-1 range
  if (isDecimalRGB) {
    r *= 255;
    g *= 255;
    b *= 255;
  }

  // https://alienryderflex.com/hsp.html
  const hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));

  // Scale goes from 0-255
  // Default is HSP > 127.5 but can tweaked to our liking
  const lightDarkBoundary = 169;

  if (hsp > lightDarkBoundary) {
    return 'light';
  } else {
    return 'dark';
  }
};
