import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const res = await prisma.documents.create({
    data: {
      userId: body.userId,
      type: body.type,
    },
  });

  return res;
});
