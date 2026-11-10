# Hero artwork and motion

The hero uses an original image generated with the built-in image-generation model. It is a concept illustration, not a photograph of Julius Joseph's physical prototype. No labels are baked into the image.

- Source: [generated PNG](../public/brand/embedded-scene-generated.png), 1536 × 1024 with alpha.
- Web asset: [WebP](../public/brand/embedded-scene.webp), same dimensions and alpha. Export with [the asset script](../scripts/prepare-hero-asset.mjs).
- Implementation: [component](../components/engineering-scene.tsx) and [styles](../components/engineering-scene.css).

## Composition and sequence

The board occupies the hero's right column. The headline and work CTA remain stationary in the left column. The image and SVG overlays share the exact 1536 × 1024 coordinate system, one settling wrapper, and a shared floating wrapper. No raster perspective transforms, stretching, or moving camera are used. The scene starts automatically once the image is ready, with descriptive image alt text and no visible caption or separate replay control.

1. 0–1.5 seconds: the assembly settles vertically by 18 pixels and reaches full opacity.
2. From 1.5, 2.2, and 2.9 seconds: three sensor connections illuminate in sequence. Packets move along copper traces mapped from the generated image.
3. Packets arrive around 3.9–5.3 seconds. The processor response starts at 5 seconds and peaks after the last arrival.
4. Sensor/trace/core sequences repeat every 7.2 seconds. Packets fade outside the route before the hidden wrap.
5. The shared floating wrapper moves the image and overlays together from 0 to −8px and back over a smooth 3.6-second loop. The camera, artwork shape, and overlay alignment remain stable.

The existing motion system pauses CSS clocks through the global Pause/Resume control, offscreen, and in hidden tabs. Reduced motion removes settle and float transforms, renders the complete static image, and hides decorative overlays. The base image and its descriptive alt text remain available before enhancement. The artwork stage and SVG overlays ignore pointer events. The About orb retains its slower, secondary motion.

## Integration availability

No callable Claude integration, installed CLI, or usable local configuration was found. No Claude collaboration is claimed. A separate code review informed geometry/timing/performance decisions.

The approved Figma plugin was found but is not installed or connected; its earlier setup suggestion remains pending. Local composition, source review, and actual browser QA are used until installation and account authorization are completed.

## Generation prompt

```text
Use case: stylized-concept
Asset type: transparent portfolio hero artwork, landscape 3:2 composition
Create an original premium product-render scene of a compact embedded-systems circuit board. A dimensional square processor in the centre, several tiny precise ceramic components, and three understated sensor connection ports arranged along the left and upper edges. The camera is fixed in a clean elevated three-quarter orthographic perspective, consistent geometry, straight precision edges, realistic layered depth. One refined ivory circuit board with chamfered corners and espresso brown substrate edges, pale metallic processor lid, warm bronze pins and fine copper traces. Use a small number of clearly visible continuous traces from the sensor connection ports toward the processor, with intentional clean angular routes that can be followed by animated overlays. Control all lighting: soft warm studio key light from upper left, restrained caramel reflections, soft contact shadows. Material detail should feel professional and tactile, beautifully crafted engineered hardware, not a toy, not a schematic. Keep the full board comfortably inside the frame, generously padded; visually balanced for the right column of a light warm-cream portfolio. No huge surrounding surface, no halo, no pedestal. Genuine transparent background with alpha, including between projecting connectors. Warm ivory #F7F3ED, espresso #33251D, bronze #76523B, restrained caramel #B88155. Avoid heavy dark areas, neon, blue, purple, excessive LEDs, tangled wiring, spherical objects, distorted board geometry, decorative numbers. Absolutely no text, letters, logos or watermarks. Image is an artistic embedded-systems concept, not a representation of a specific physical project.
```
