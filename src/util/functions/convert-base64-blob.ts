
/**
 * This function takes a base64 string, decodes it, and creates a Blob object.
 * The Blob can be used to represent binary data, such as an image.
 * @param {string} base64String - The base64-encoded string, typically prefixed with a data URI scheme (e.g., 'data:image/jpeg;base64,...').
 * @returns {Blob} A Blob object representing the decoded binary data from the base64 string.
 */
export function convertB64ToBlob(base64String: string): Blob {
  const byteCharacters = atob(base64String.split(',')[1]);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], {type: 'image/jpeg'});
}