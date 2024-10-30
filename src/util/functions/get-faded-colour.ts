/**
 * Converts an RGB color string to an RGBA color string with the specified opacity.
 * @param {string} colour - The `rgb` color string (e.g., `rgb(255, 0, 0)`).
 * @param {number} opacity - The desired opacity (alpha) level as a decimal (e.g., `0.5` for 50%).
 * @returns {string} An `rgba` color string with the specified opacity.
 */
export function getFadedColour(colour: string, opacity: number): string {
  const rgb = colour.match(/\d+/g);
  if (!rgb) {
    return colour;
  }

  return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${opacity})`;
}
