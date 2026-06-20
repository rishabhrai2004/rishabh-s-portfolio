/* One-off: convert the scroll sequence PNGs to WebP to slash transfer size. */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const dir = path.join(__dirname, '..', 'public', 'sequence');
const QUALITY = 80;
// Source frames are 1280x720 with a baked-in "Veo" watermark in the bottom
// strip. Crop it off (and re-encode from the lossless PNGs) for a clean bg.
const CROP_BOTTOM = 64;

async function run() {
  const files = fs.readdirSync(dir).filter((f) => /^frame_\d+.*\.png$/.test(f));
  files.sort();

  let pngTotal = 0;
  let webpTotal = 0;

  for (const file of files) {
    const src = path.join(dir, file);
    const out = path.join(dir, file.replace(/\.png$/, '.webp'));
    const pngSize = fs.statSync(src).size;
    pngTotal += pngSize;

    const meta = await sharp(src).metadata();
    const cropHeight = Math.max(1, (meta.height || 720) - CROP_BOTTOM);

    await sharp(src)
      .extract({ left: 0, top: 0, width: meta.width || 1280, height: cropHeight })
      .webp({ quality: QUALITY, effort: 5 })
      .toFile(out);
    webpTotal += fs.statSync(out).size;
  }

  const mb = (n) => (n / 1024 / 1024).toFixed(1) + ' MB';
  console.log(`Converted ${files.length} frames`);
  console.log(`PNG total:  ${mb(pngTotal)}`);
  console.log(`WebP total: ${mb(webpTotal)} (${Math.round((1 - webpTotal / pngTotal) * 100)}% smaller)`);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
