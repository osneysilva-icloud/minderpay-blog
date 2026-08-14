const fs = require('fs');
const path = require('path');

// 1. Create crisp SVG logo for MinderPay
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#059669" />
      <stop offset="50%" stop-color="#10b981" />
      <stop offset="100%" stop-color="#047857" />
    </linearGradient>
    <linearGradient id="payBadgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#34d399" />
      <stop offset="100%" stop-color="#059669" />
    </linearGradient>
  </defs>

  <!-- Background rounded card -->
  <rect x="32" y="32" width="448" height="448" rx="112" fill="url(#bgGrad)" />

  <!-- Outer subtle border -->
  <rect x="40" y="40" width="432" height="432" rx="104" fill="none" stroke="#ffffff" stroke-opacity="0.25" stroke-width="4" />

  <!-- Stylized M logo -->
  <path d="M 136 352 V 160 L 224 280 L 304 160 V 352" fill="none" stroke="#FFFFFF" stroke-width="44" stroke-linecap="round" stroke-linejoin="round" />

  <!-- Green Pay badge pill on bottom right -->
  <rect x="290" y="300" width="130" height="70" rx="22" fill="url(#payBadgeGrad)" stroke="#FFFFFF" stroke-width="6" />
  <text x="355" y="347" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="34" fill="#FFFFFF" text-anchor="middle" letter-spacing="1">PAY</text>
</svg>`;

// 2. Generate valid 32x32 ICO file in pure Node.js (32x32 32-bit ARGB uncompressed BMP ICO format)
function create32x32Ico() {
  const width = 32;
  const height = 32;
  const numPixels = width * height;
  const bmpHeaderSize = 40;
  const pixelDataSize = numPixels * 4;
  const andMaskSize = (width * height) / 8; // 128 bytes
  const totalImageSize = bmpHeaderSize + pixelDataSize + andMaskSize;
  const fileHeaderSize = 6 + 16; // 22 bytes
  const totalFileSize = fileHeaderSize + totalImageSize;

  const buf = Buffer.alloc(totalFileSize);

  // --- ICONDIR (6 bytes) ---
  buf.writeUInt16LE(0, 0); // Reserved
  buf.writeUInt16LE(1, 2); // Type 1 = ICO
  buf.writeUInt16LE(1, 4); // 1 Image

  // --- ICONDIRENTRY (16 bytes) ---
  buf.writeUInt8(width, 6);        // Width 32
  buf.writeUInt8(height, 7);       // Height 32
  buf.writeUInt8(0, 8);            // Color count (0 = >=256 colors)
  buf.writeUInt8(0, 9);            // Reserved
  buf.writeUInt16LE(1, 10);        // Color planes
  buf.writeUInt16LE(32, 12);       // Bits per pixel (32-bit ARGB)
  buf.writeUInt32LE(totalImageSize, 14); // Size of image data
  buf.writeUInt32LE(fileHeaderSize, 18);  // Offset of image data (22)

  // --- BITMAPINFOHEADER (40 bytes at offset 22) ---
  let offset = 22;
  buf.writeUInt32LE(bmpHeaderSize, offset); offset += 4;      // Header size 40
  buf.writeInt32LE(width, offset); offset += 4;              // Width 32
  buf.writeInt32LE(height * 2, offset); offset += 4;          // Height 64 (double height for XOR+AND mask)
  buf.writeUInt16LE(1, offset); offset += 2;                 // Planes 1
  buf.writeUInt16LE(32, offset); offset += 2;                // BitCount 32
  buf.writeUInt32LE(0, offset); offset += 4;                 // Compression BI_RGB (0)
  buf.writeUInt32LE(pixelDataSize, offset); offset += 4;     // Size of image
  buf.writeInt32LE(0, offset); offset += 4;                  // XPelsPerMeter
  buf.writeInt32LE(0, offset); offset += 4;                  // YPelsPerMeter
  buf.writeUInt32LE(0, offset); offset += 4;                 // ClrUsed
  buf.writeUInt32LE(0, offset); offset += 4;                 // ClrImportant

  // --- XOR PIXEL DATA (Bottom to Top) ---
  for (let y = 0; y < height; y++) {
    const row = height - 1 - y;
    for (let x = 0; x < width; x++) {
      const pixelOffset = offset + (row * width + x) * 4;

      const cx = x - 15.5;
      const cy = y - 15.5;
      const isInside = Math.max(Math.abs(cx), Math.abs(cy)) <= 14;

      let isM = false;
      if (y >= 8 && y <= 23) {
        if (x === 7 || x === 8 || x === 23 || x === 24) isM = true;
        if (y <= 16 && (x === y || x === y + 1)) isM = true;
        if (y <= 16 && (x === 31 - y || x === 30 - y)) isM = true;
      }

      if (isInside) {
        if (isM) {
          // White letter M (BGRA format)
          buf.writeUInt8(255, pixelOffset);     // Blue
          buf.writeUInt8(255, pixelOffset + 1); // Green
          buf.writeUInt8(255, pixelOffset + 2); // Red
          buf.writeUInt8(255, pixelOffset + 3); // Alpha (Opaque)
        } else {
          // Emerald Green background #059669 (B: 105, G: 150, R: 5)
          buf.writeUInt8(105, pixelOffset);     // Blue (0x69)
          buf.writeUInt8(150, pixelOffset + 1); // Green (0x96)
          buf.writeUInt8(5, pixelOffset + 2);   // Red (0x05)
          buf.writeUInt8(255, pixelOffset + 3); // Alpha (Opaque)
        }
      } else {
        // Transparent outside
        buf.writeUInt8(0, pixelOffset);
        buf.writeUInt8(0, pixelOffset + 1);
        buf.writeUInt8(0, pixelOffset + 2);
        buf.writeUInt8(0, pixelOffset + 3);
      }
    }
  }

  return buf;
}

const publicDir = path.join(__dirname, '..', 'public');
fs.writeFileSync(path.join(publicDir, 'favicon.svg'), svgContent, 'utf8');
console.log('✅ Generated public/favicon.svg');

const icoBuffer = create32x32Ico();
fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);
console.log('✅ Generated public/favicon.ico');
