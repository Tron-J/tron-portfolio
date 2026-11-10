import sharp from "sharp";

const source = "public/brand/embedded-scene-generated.png";
const target = "public/brand/embedded-scene.webp";
const metadata = await sharp(source).metadata();
console.log({ width: metadata.width, height: metadata.height, hasAlpha: metadata.hasAlpha });
console.log(await sharp(source).stats().then((stats) => ({ isOpaque: stats.isOpaque, corners: stats.channels.map((channel) => ({ min: channel.min, max: channel.max })) })));
await sharp(source).webp({ quality: 88, effort: 6 }).toFile(target);
console.log(`Exported ${target}`);
