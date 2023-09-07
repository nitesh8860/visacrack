import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const res = await prisma.applications.create({
    data: {
      userId: body.userId,
      travelDate: body.travelDate,
    },
  });

  return res;
});
