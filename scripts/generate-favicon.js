const fs = require('fs');
const path = require('path');

const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="minderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#059669" />
      <stop offset="50%" stop-color="#10b981" />
      <stop offset="100%" stop-color="#047857" />
    </linearGradient>
    <linearGradient id="payBadgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#34d399" />
      <stop offset="100%" stop-color="#059669" />
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000000" flood-opacity="0.25" />
    </filter>
  </defs>

  <!-- Background rounded card -->
  <rect x="32" y="32" width="448" height="448" rx="120" fill="url(#minderGrad)" filter="url(#shadow)" />

  <!-- Outer subtle ring -->
  <rect x="40" y="40" width="432" height="432" rx="112" fill="none" stroke="#ffffff" stroke-opacity="0.2" stroke-width="4" />

  <!-- Stylized M logo -->
  <path d="M 136 360 V 168 L 224 288 L 304 168 V 360" fill="none" stroke="#FFFFFF" stroke-width="48" stroke-linecap="round" stroke-linejoin="round" />

  <!-- Green Pay badge pill on bottom right -->
  <rect x="300" y="310" width="120" height="64" rx="20" fill="url(#payBadgeGrad)" stroke="#FFFFFF" stroke-width="6" />
  <text x="360" y="353" font-family="system-ui, -apple-system, sans-serif" font-weight="800" font-size="32" fill="#FFFFFF" text-anchor="middle">PAY</text>
</svg>`;

async function generate() {
  const publicDir = path.join(__dirname, '..', 'public');
  const svgPath = path.join(publicDir, 'favicon.svg');
  
  // Write SVG file
  fs.writeFileSync(svgPath, svgContent, 'utf8');
  console.log('Created favicon.svg');

  try {
    const sharp = require('sharp');
    const toIco = require('to-ico');

    const png32 = await sharp(Buffer.from(svgContent)).resize(32, 32).toBuffer();
    const png180 = await sharp(Buffer.from(svgContent)).resize(180, 180).toBuffer();
    const png512 = await sharp(Buffer.from(svgContent)).resize(512, 512).toBuffer();

    fs.writeFileSync(path.join(publicDir, 'favicon-32x32.png'), png32);
    fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), png180);
    fs.writeFileSync(path.join(publicDir, 'android-chrome-512x512.png'), png512);

    const icoBuffer = await toIco([png32, await sharp(Buffer.from(svgContent)).resize(16, 16).toBuffer()]);
    fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);
    console.log('Successfully generated favicon.ico, apple-touch-icon.png, and PNG icons!');
  } catch (err) {
    console.error('Error generating raster icons:', err);
  }
}

generate();
