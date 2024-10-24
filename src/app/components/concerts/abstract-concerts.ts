import type {IEvent} from "../../../models/providers/ticketmaster";

const MIN_RESOLUTION = 200 * 120;

const MAX_RESOLUTION = 800 * 450;

export class AbstractConcertsSwiper {
  public concerts: IEvent[] = [];

  public isLoading: boolean = false;

  /* Find the images in a certain range of quality and return the most balanced one */
  public fetchImage(event: IEvent): string {
    const ratioImages = event.images.filter(image => image.ratio === "16_9");

    const optimalImage = ratioImages.reduce((bestImage, currentImage) => {
      const currentResolution = currentImage.width * currentImage.height;

      if (currentResolution >= MIN_RESOLUTION && currentResolution <= MAX_RESOLUTION) {
        const bestResolution = bestImage.width * bestImage.height;
        const bestDiff = Math.abs((MAX_RESOLUTION + MIN_RESOLUTION) / 2 - bestResolution);
        const currentDiff = Math.abs((MAX_RESOLUTION + MIN_RESOLUTION) / 2 - currentResolution);

        return currentDiff < bestDiff ? currentImage : bestImage;
      }

      return bestImage;
    }, ratioImages[0]);

    return optimalImage.url;
  }
}