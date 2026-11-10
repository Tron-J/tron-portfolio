import sharp from "sharp";
import { mkdir } from "node:fs/promises";

// Original figure pixels extracted from the supplied report, not generated media.
const source = ".sites-runtime/source-documents/images";
const destination = "public/projects/smart-collar";
await mkdir(destination, { recursive: true });
const figures = [
  { name: "wiring", xref: 238 },
  { name: "assembly", xref: 243 },
  { name: "enclosure", xref: 247 },
  { name: "app-dashboard", xref: 256 },
  { name: "app-sign-in", xref: 255, crop: { left: 0, top: 300, width: 540, height: 530 } },
  // Crop out the unique alert identifier; retain the actual card and resolve action.
  { name: "app-alerts", xref: 261, crop: { left: 0, top: 88, width: 358, height: 243 } },
  { name: "field-test", xref: 272 },
];
for (const figure of figures) {
  let pipeline = sharp(`${source}/figure-${figure.xref}.png`);
  if (figure.crop) pipeline = pipeline.extract(figure.crop);
  const result = await pipeline.resize({ width: 1200, withoutEnlargement: true }).webp({ quality: 90, effort: 5 }).toFile(`${destination}/${figure.name}.webp`);
  console.log({ name: figure.name, width: result.width, height: result.height, bytes: result.size });
}
