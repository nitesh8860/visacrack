const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function seedProducts() {
  try {
    await prisma.products.create({
      data: {
        title: "Dubai",
        description:
          "Dubai is a mesmerizing blend of cutting-edge architecture, luxury shopping, and rich Islamic culture. From the iconic Burj Khalifa and expansive desert landscapes to bustling souks and diverse culinary delights, the city offers thrilling experiences for every traveler. It's a vibrant destination that promises a unique, unforgettable journey.",
        url: "https://ljygflbnmuxgqemetarj.supabase.co/storage/v1/object/public/images/dubai.jpg",
        days: 15,
        price: 7650,
      },
    });

    await prisma.products.create({
      data: {
        title: "Egypt",
        description:
          "Egypt captivates with its rich heritage, monumental pyramids, enigmatic Sphinx, and stunning Nile River cruises. From exploring ancient tombs in the Valley of the Kings to diving in the Red Sea's vibrant coral reefs, Egypt offers a unique blend of history, adventure, and cultural richness for all travelers.",
        url: "https://ljygflbnmuxgqemetarj.supabase.co/storage/v1/object/public/images/egypt.jpg",
        days: 15,
        price: 2949,
      },
    });

    await prisma.products.create({
      data: {
        title: "HongKong",
        description:
          "Hong Kong is a vibrant metropolis offering an enticing blend of Eastern and Western cultures. Its skyline, dominated by towering skyscrapers, is iconic. Visitors can explore bustling street markets, relish diverse cuisines, enjoy world-class shopping, or hike beautiful trails. The city's rich history and dynamic nightlife make it an unforgettable destination.",
        url: "https://ljygflbnmuxgqemetarj.supabase.co/storage/v1/object/public/images/hongkong.jpg",
        days: 15,
        price: 1200,
      },
    });

    await prisma.products.create({
      data: {
        title: "Vietnam",
        description:
          "Vietnam is a country of breathtaking natural beauty and vibrant culture. From the terraced rice fields of Sapa, to the historical landmarks of Hanoi, to the charm of Hoi An, and the bustling energy of Ho Chi Minh City, Vietnam offers a unique blend of adventure, history, and culinary exploration.",
        url: "https://ljygflbnmuxgqemetarj.supabase.co/storage/v1/object/public/images/vietnam.jpg",
        days: 15,
        price: 2950,
      },
    });

    await prisma.products.create({
      data: {
        title: "Thailand",
        description:
          "Thailand offers a rich cultural experience, mesmerizing landscapes, and renowned hospitality. Visitors can explore ancient temples in Bangkok, enjoy the tranquil beaches of Phuket and Krabi, trek in the verdant mountains of Chiang Mai, and savor delectable Thai cuisine. The country's lively festivals and vibrant nightlife enhance its appeal as a must-visit destination.",
        url: "https://ljygflbnmuxgqemetarj.supabase.co/storage/v1/object/public/images/thailand.jpg",
        days: 15,
        price: 7500,
      },
    });

    await prisma.products.create({
      data: {
        title: "Indonesia",
        description:
          "Indonesia is a diverse archipelago offering stunning landscapes, rich culture, and warm hospitality. Visitors can explore vibrant cities, ancient temples, and traditional arts in Yogyakarta, dive into the vibrant underwater world in Bali, trek through lush rainforests in Borneo, or witness Komodo dragons in their natural habitat. It's a tropical paradise for every traveler.",
        url: "https://ljygflbnmuxgqemetarj.supabase.co/storage/v1/object/public/images/indonesia.jpg",
        days: 15,
        price: 7200,
      },
    });

    await prisma.products.create({
      data: {
        title: "SriLanka",
        description:
          "Sri Lanka enchants with its diverse landscapes, ranging from golden beaches to verdant tea plantations and wildlife-rich national parks. It's steeped in history with ancient temples, fortresses, and UNESCO World Heritage sites. The flavorful local cuisine, vibrant culture, traditional crafts, and the warm hospitality of its people make Sri Lanka a compelling destination.",
        url: "https://ljygflbnmuxgqemetarj.supabase.co/storage/v1/object/public/images/srilanka.jpg",
        days: 15,
        price: 2330,
      },
    });

    await prisma.products.create({
      data: {
        title: "Turkey",
        description:
          "Turkey offers a fascinating fusion of Eastern and Western cultures. It is home to historic sites like the Hagia Sophia and the ancient city of Troy, bustling markets such as the Grand Bazaar, and stunning landscapes including Cappadocia's fairy chimneys. Combined with delicious cuisine and warm hospitality, Turkey is a captivating destination.",
        url: "https://ljygflbnmuxgqemetarj.supabase.co/storage/v1/object/public/images/turkey.jpg",
        days: 15,
        price: 4250,
      },
    });
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

seedProducts();
