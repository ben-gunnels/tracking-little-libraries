// scripts/generateTokens.js

import { PrismaClient } from '../src/generated/prisma/index.js';
import { nanoid } from 'nanoid';
import QRCode from 'qrcode';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let prisma = new PrismaClient();

async function generateTokens(count = 10) {
  const outputDir = path.resolve(__dirname, '../qrcodes');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  for (let i = 0; i < count; i++) {
    const token = nanoid(16);

    await prisma.qrToken.create({
      data: {
        token,
        type: 'location',
        used: false,
        createdAt: new Date(),
      }
    });

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const url = `${baseUrl}/locate?token=${token}`;
    const qrPath = path.join(outputDir, `token-${i + 1}.png`);

    await QRCode.toFile(qrPath, url);
    console.log(`✅ QR code saved: ${qrPath}`);
  }

  console.log(`🎉 Generated ${count} tokens`);
}

generateTokens(10)
  .catch(console.error)
  .finally(() => prisma.$disconnect());