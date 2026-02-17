import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const inventory = [
  { slug: 'arri-alexa-mini-lf', name: 'ARRI ALEXA Mini LF Body', category: 'Camera', dayRate: 45000, weekendRate: 70000, deposit: 200000, replacementValue: 1200000, quantityTotal: 2 },
  { slug: 'sony-fx6-body', name: 'Sony FX6 Body', category: 'Camera', dayRate: 18000, weekendRate: 28000, deposit: 90000, replacementValue: 250000, quantityTotal: 3 },
  { slug: 'cooke-s4i-set', name: 'Cooke S4/i Prime Set', category: 'Lenses', dayRate: 32000, weekendRate: 50000, deposit: 160000, replacementValue: 750000, quantityTotal: 1 },
  { slug: 'aputure-600d-pro', name: 'Aputure 600d Pro Kit', category: 'Lighting', dayRate: 7000, weekendRate: 11000, deposit: 35000, replacementValue: 90000, quantityTotal: 6 },
  { slug: 'sounddevices-833', name: 'Sound Devices 833 Mixer/Recorder', category: 'Audio', dayRate: 8000, weekendRate: 12000, deposit: 30000, replacementValue: 110000, quantityTotal: 2 }
];

async function main() {
  for (const item of inventory) {
    await prisma.equipment.upsert({
      where: { slug: item.slug },
      create: {
        ...item,
        description: `${item.name} supplied in production-ready condition with essential accessories.`,
        insuranceRequired: true,
        specsJson: { mount: 'PL', weight: 'See datasheet', power: 'Industry standard' },
        includedJson: ['Case', 'Cables', 'Core accessories'],
        accessoriesJson: ['Batteries', 'Media', 'Support']
      },
      update: {}
    });
  }

  const adminEmail = process.env.ADMIN_EMAIL ?? 'admin@example.com';
  const password = process.env.ADMIN_PASSWORD ?? 'ChangeMeStrong!';
  const hash = await bcrypt.hash(password, 12);
  await prisma.adminUser.upsert({ where: { email: adminEmail }, create: { email: adminEmail, passwordHash: hash }, update: { passwordHash: hash } });
}

main().finally(async () => prisma.$disconnect());
