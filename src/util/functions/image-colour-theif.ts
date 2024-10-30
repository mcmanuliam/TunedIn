/**
 * Extracts the dominant colour from an image using Canvas API.
 * @param {HTMLImageElement} imageElement - The image to analyze
 * @returns {Promise<string>} RGB colour string (e.g., 'rgb(255, 0, 0)')
 */
export async function extractDominantColour(imageElement: HTMLImageElement): Promise<string> {
  return new Promise((resolve) => {
    const getColour = () => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      if (!context) {
        throw new Error('Could not get canvas context');
      }

      const sampleSize = 50;
      canvas.width = sampleSize;
      canvas.height = sampleSize;

      context.drawImage(imageElement, 0, 0, sampleSize, sampleSize);
      const imageData = context.getImageData(0, 0, sampleSize, sampleSize).data;

      let r = 0, g = 0, b = 0, count = 0;
      for (let i = 0; i < imageData.length; i += 4) {
        if (imageData[i + 3] < 128) continue;

        r += imageData[i];
        g += imageData[i + 1];
        b += imageData[i + 2];
        count++;
      }

      if (count === 0) return 'rgb(0, 0, 0)';

      r = Math.round(r / count);
      g = Math.round(g / count);
      b = Math.round(b / count);

      return `rgb(${r}, ${g}, ${b})`;
    };

    if (imageElement.complete) {
      resolve(getColour());
    } else {
      imageElement.onload = () => resolve(getColour());
    }
  });
}

/**
 * Calculates Euclidean distance between two points.
 * @param {number[]} a - First point as [r, g, b] array
 * @param {number[]} b - Second point as [r, g, b] array
 * @returns {number} Euclidean distance between points
 */
function distance(a: number[], b: number[]): number {
  return Math.sqrt(a.reduce((sum, v, i) => sum + Math.pow(v - b[i], 2), 0));
}

/**
 * Checks if two sets of centroids are approximately equal.
 * @param {number[][]} a - First set of centroids
 * @param {number[][]} b - Second set of centroids
 * @returns {boolean} True if centroids are approximately equal
 */
function centroidsEqual(a: number[][], b: number[][]): boolean {
  if (a.length !== b.length) return false;
  return a.every((centroid, i) =>
    centroid.every((v, j) => Math.abs(v - b[i][j]) < 0.1));
}

/**
 * Performs k-means clustering on an array of points.
 * @param {number[][]} points - Array of RGB values as [r, g, b] arrays
 * @param {number} k - Number of clusters to create
 * @returns {number[][]} Array of centroids as [r, g, b] arrays
 */
function kMeans(points: number[][], k: number): number[][] {
  if (points.length === 0) return Array(k).fill([0, 0, 0]);
  if (points.length <= k) return points;

  let centroids = points.slice(0, k);
  let oldCentroids: number[][] = [];
  let iterations = 0;
  const maxIterations = 20;

  while (!centroidsEqual(centroids, oldCentroids) && iterations < maxIterations) {
    oldCentroids = centroids.map(c => [...c]);

    const clusters: number[][][] = Array(k).fill(0).map(() => []);
    points.forEach(point => {
      let minDist = Infinity;
      let closestCentroid = 0;
      centroids.forEach((centroid, i) => {
        const dist = distance(point, centroid);
        if (dist < minDist) {
          minDist = dist;
          closestCentroid = i;
        }
      });
      clusters[closestCentroid].push(point);
    });

    centroids = clusters.map(cluster => {
      if (cluster.length === 0) return centroids[0];
      return cluster.reduce((acc, point) =>
        acc.map((v, i) => v + point[i] / cluster.length), [0, 0, 0]);
    });

    iterations++;
  }

  return centroids;
}

/**
 * Extracts multiple dominant colours from an image using k-means clustering.
 * @param {HTMLImageElement} imageElement - The image to analyze
 * @param {number} colourCount - Number of colours to extract (default: 1)
 * @returns {Promise<string[]>} Array of RGB colour strings
 */
export async function extractDominantColours(
  imageElement: HTMLImageElement,
  colourCount: number = 1
): Promise<string[]> {
  return new Promise((resolve) => {
    const getColours = () => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      if (!context) {
        throw new Error('Could not get canvas context');
      }

      const sampleSize = 100;
      canvas.width = sampleSize;
      canvas.height = sampleSize;
      context.drawImage(imageElement, 0, 0, sampleSize, sampleSize);
      const imageData = context.getImageData(0, 0, sampleSize, sampleSize).data;

      const pixels: number[][] = [];
      for (let i = 0; i < imageData.length; i += 4) {
        if (imageData[i + 3] < 128) continue;
        pixels.push([imageData[i], imageData[i + 1], imageData[i + 2]]);
      }

      const centroids = kMeans(pixels, colourCount);
      return centroids.map(([r, g, b]) => `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`);
    };

    if (imageElement.complete) {
      resolve(getColours());
    } else {
      imageElement.onload = () => resolve(getColours());
    }
  });
}