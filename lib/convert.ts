// eslint-disable-next-line import/default
import sharp from "sharp";

export default function convert(file: Buffer) {
  return sharp(file)
    .webp({
      lossless: true,
      reductionEffort: 6,
    })
    .toBuffer();
}
