# Tron brand assets

The Tron monogram was generated using the built-in image-generation tool in `logo-brand` mode, with `transparent_background: true`. No reference images were used. The generated symbol combines a capital T with an integrated lowercase r shoulder.

The mark is intended for an espresso, caramel, and cream palette: espresso `#33221b`, caramel/chestnut `#a66e43`, and a cream surround `#f5eee4`. The header uses the WebP export; favicon and Apple touch metadata use the corresponding PNG exports. The source image is retained for future exports.

| File | Dimensions | Alpha | Size |
| --- | --- | --- | --- |
| [tron-mark-source.png](../public/brand/tron-mark-source.png) | 1254 × 1254 | Yes, transparent | 318,475 bytes |
| [tron-mark.webp](../public/brand/tron-mark.webp) | 128 × 128 | Yes, transparent | 2,926 bytes |
| [favicon.png](../public/brand/favicon.png) | 64 × 64 | Yes, transparent | 2,377 bytes |
| [apple-touch-icon.png](../public/brand/apple-touch-icon.png) | 180 × 180 | Yes, transparent | 11,732 bytes |

The existing Sharp dependency trimmed the transparent source margins and produced the web exports with transparent padding. No additional dependency was installed. The source and exported header mark were visually inspected, and image metadata confirmed alpha channels in all four files.

## Exact generation prompt

```text
Use case: logo-brand.
Asset type: square website logo mark and favicon for a personal engineering portfolio named Tron.
Primary request: create one simple, memorable custom geometric monogram mark: a confident capital T with a subtle integrated lowercase r suggested by a curved connected shoulder. The silhouette should be bold and intentional, with thick smooth strokes and a clean balance of straight edges and one curved transition. Make it feel personal and precise, recognizable at 24 pixels.
Scene/backdrop: fully transparent background with real alpha.
Style/medium: flat crisp vector-friendly logo, professional brand identity, no textures.
Composition/framing: one centered standalone mark in a square canvas, generous transparent margin, no wordmark or surrounding label.
Color palette: primary espresso brown #33221b, with one restrained chestnut/caramel accent #a66e43. Designed for a cream #f5eee4 website background.
Constraints: one original symbol only, no text, no numbers, no watermarks, no mockups, no shadows, no gradients, no 3D, no coffee cup, no coffee bean, no circuit-board clichés. Output a clean transparent logo asset.
```

## Dark-background version

A second built-in image-generation edit used the original source as its reference, retaining the T/r silhouette and changing the main shape to warm cream `#f5eee4` and the accent to caramel `#c3946e` for a deep espresso surround. The original assets remain unchanged. The dark WebP is intended for the header, with matching PNG favicon and Apple touch exports. The existing Sharp dependency trimmed the transparent margins and resized the selected output; WebP export used quality 95 and alpha quality 100. No dependency was installed.

| File | Dimensions | Alpha | Size |
| --- | --- | --- | --- |
| [tron-mark-dark-source.png](../public/brand/tron-mark-dark-source.png) | 1254 x 1254 | Yes, transparent | 328,896 bytes |
| [tron-mark-dark.webp](../public/brand/tron-mark-dark.webp) | 128 x 128 | Yes, transparent | 2,860 bytes |
| [favicon-dark.png](../public/brand/favicon-dark.png) | 64 x 64 | Yes, transparent | 2,428 bytes |
| [apple-touch-icon-dark.png](../public/brand/apple-touch-icon-dark.png) | 180 x 180 | Yes, transparent | 12,484 bytes |

The selected source and its 128-pixel export were visually inspected. Image metadata confirmed genuine alpha in all four files. A subsequent model cleanup variation was inspected but not selected because it did not improve edge quality. The selected model output retains slight surface variation and very small edge fringes at source resolution; the small web export was checked for legibility.

### Exact selected edit prompt

```text
Use case: logo-brand.
Asset type: a transparent dark-background version of the existing Tron personal portfolio logo.
Edit target: the attached existing Tron T/r monogram.
Primary request: preserve exactly the recognizable silhouette, proportions, alignment, and interlocking capital T / lowercase r shoulder of this mark. Change only its colors and surface rendering for use on a deep espresso website background: recolor the current espresso T shape to solid warm cream #f5eee4 and the current caramel r shape to solid restrained caramel #c3946e.
Style/medium: flat, crisp, clean logo, solid fills, no gradients, no texture, no shadows, no lighting, no 3D.
Composition/framing: preserve the centered single monogram and transparent margins.
Background: genuine fully transparent alpha, including the negative space between shapes. Do not add a colored rectangle or background.
Constraints: no new symbol, no redesign, no wordmark, no text, no numbers, no watermark. Preserve the original T/r identity and geometry.
```

### Browser and device icon tiles

The selected generated light mark was also packaged on a solid espresso `#211713` square so it remains visible in light browser tabs. Existing Sharp resized and composited the selected source with approximately 15% internal margin; the mark was not redrawn or regenerated. These opaque PNGs are intended for favicon and Apple touch metadata. The transparent header export and generated source remain unchanged.

| File | Dimensions | Alpha | Size |
| --- | --- | --- | --- |
| [favicon-tile.png](../public/brand/favicon-tile.png) | 64 x 64 | No, opaque espresso tile | 1,997 bytes |
| [apple-touch-icon-tile.png](../public/brand/apple-touch-icon-tile.png) | 180 x 180 | No, opaque espresso tile | 8,678 bytes |

The 64-pixel tile was visually inspected after export. No additional image-generation prompt or dependency installation was needed for this packaging step.
