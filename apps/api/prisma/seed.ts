import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const categories = [
  "electronics",
  "furniture",
  "clothing",
  "food",
  "books",
  "toys",
  "sports",
  "beauty",
  "automotive",
  "health",
];

const productNames: Record<string, string[]> = {
  electronics: [
    "Laptop ASUS",
    "iPhone 15",
    "Samsung Galaxy S24",
    "Sony WH-1000XM5",
    "iPad Pro",
    "MacBook Air",
    "Dell XPS 15",
    "Logitech Mouse",
    "Mechanical Keyboard",
    "Webcam HD",
    "Monitor LG 27",
    "Power Bank 20000mAh",
    "USB-C Hub",
    "AirPods Pro",
    "JBL Speaker",
  ],
  furniture: [
    "Meja Kerja",
    "Kursi Ergonomis",
    "Rak Buku",
    "Sofa 3 Seat",
    "Lemari Pakaian",
    "Tempat Tidur Queen",
    "Meja Makan",
    "Nightstand",
    "Credenza",
    "Filing Cabinet",
  ],
  clothing: [
    "Kaos Polo",
    "Jaket Denim",
    "Celana Chino",
    "Kemeja Flanel",
    "Hoodie Oversize",
    "Dress Casual",
    "Sepatu Sneakers",
    "Topi Baseball",
    "Sabuk Kulit",
    "Jas Formal",
  ],
  food: [
    "Kopi Arabica",
    "Teh Hijau",
    "Cokelat Premium",
    "Sereal Organik",
    "Madu Asli",
    "Keripik Singkong",
    "Saus Sambal",
    "Minyak Zaitun",
    "Mie Instan",
    "Biskuit Cokelat",
  ],
  books: [
    "Clean Code",
    "Atomic Habits",
    "The Pragmatic Programmer",
    "Design Patterns",
    "Refactoring",
    "Sapiens",
    "Laskar Pelangi",
    "Bumi Manusia",
    "Filosofi Teras",
    "Negeri 5 Menara",
  ],
  toys: [
    "LEGO Technic",
    "Hot Wheels Set",
    "Puzzle 1000pc",
    "Remote Control Car",
    "Board Game",
    "Action Figure",
    "Doll House",
    "Nerf Gun",
    "Rubik Cube",
    "Drone Mini",
  ],
  sports: [
    "Yoga Mat",
    "Dumbbell Set",
    "Running Shoes",
    "Basketball",
    "Skipping Rope",
    "Resistance Band",
    "Water Bottle",
    "Gym Bag",
    "Tennis Racket",
    "Swimming Goggles",
  ],
  beauty: [
    "Moisturizer",
    "Sunscreen SPF50",
    "Vitamin C Serum",
    "Shampoo Organic",
    "Lip Balm",
    "Face Wash",
    "Body Lotion",
    "Perfume Unisex",
    "Hair Oil",
    "Sheet Mask",
  ],
  automotive: [
    "Car Vacuum",
    "Dash Cam",
    "Seat Cover",
    "Car Air Freshener",
    "Tire Pressure Gauge",
    "Jump Starter",
    "LED Headlight",
    "Phone Holder",
    "Trunk Organizer",
    "Wax Polish",
  ],
  health: [
    "Vitamin D3",
    "Omega-3 Fish Oil",
    "Probiotic",
    "Thermometer Digital",
    "Blood Pressure Monitor",
    "First Aid Kit",
    "Pill Organizer",
    "Hand Sanitizer",
    "Face Mask KN95",
    "Bandage Roll",
  ],
};

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomPrice(min: number, max: number) {
  return Math.round((Math.random() * (max - min) + min) * 100) / 100;
}

async function main() {
  console.log("Seeding 1000 products...");

  const existing = await prisma.product.count();
  if (existing > 0) {
    console.log(`Database already has ${existing} products. Skipping.`);
    return;
  }

  const products = [];
  for (let i = 0; i < 1000; i++) {
    const category = categories[i % categories.length];
    const names = productNames[category];
    const baseName = names[i % names.length];
    const suffix = Math.floor(i / categories.length) > 0 ? ` v${Math.floor(i / categories.length) + 1}` : "";

    products.push({
      name: `${baseName}${suffix}`,
      description: `${baseName} - produk berkualitas kategori ${category}`,
      price: randomPrice(15000, 25000000),
      stock: randomInt(0, 500),
      category,
    });
  }

  const batchSize = 100;
  for (let i = 0; i < products.length; i += batchSize) {
    const batch = products.slice(i, i + batchSize);
    await prisma.product.createMany({ data: batch });
    console.log(`Inserted ${Math.min(i + batchSize, 1000)} / 1000`);
  }

  const total = await prisma.product.count();
  console.log(`Seeding complete! Total products: ${total}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
