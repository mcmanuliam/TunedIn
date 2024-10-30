/**
 * Constants used for color perception and luminance calculations based on WCAG 2.1
 * https://www.w3.org/TR/WCAG21/
 */
const enum MagicNumbers {
  /* Maximum value for RGB color components (8-bit color) */
  MAX_RGB_VALUE = 255,

  /* Midpoint threshold for determining if a color is considered dark or light (halfway between 255) */
  BRIGHTNESS_THRESHOLD = 128,

  /**
   * coefficient for Red channel luminance
   * Represents ~21% of perceived luminance
   */
  RED_COEFFICIENT = 0.2126,

   /**
    * Coefficient for Green channel luminance
    * Represents ~72% of perceived luminance
    */
  GREEN_COEFFICIENT = 0.7152,

  /**
   * Coefficient for Blue channel luminance
   * Represents ~7% of perceived luminance
   */
  BLUE_COEFFICIENT = 0.0722,

  /**
   * Threshold for luminance calculation
   * Values below this are considered dark, above are considered light
   */
  LUMINANCE_THRESHOLD = 0.5
}

/**
 * Determines if a color is dark using WCAG 2.1 relative luminance formula
 * @param {string} color Hex color string (e.g., '#FFFFFF')
 * @returns {boolean} True if color is dark, false if light
 */
export function isDarkColour(color: string): boolean {
  const hex = color.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16) / MagicNumbers.MAX_RGB_VALUE;
  const g = parseInt(hex.substr(2, 2), 16) / MagicNumbers.MAX_RGB_VALUE;
  const b = parseInt(hex.substr(4, 2), 16) / MagicNumbers.MAX_RGB_VALUE;

  const luminance =
    MagicNumbers.RED_COEFFICIENT * r +
    MagicNumbers.GREEN_COEFFICIENT * g +
    MagicNumbers.BLUE_COEFFICIENT * b;

  return luminance < MagicNumbers.LUMINANCE_THRESHOLD;
}