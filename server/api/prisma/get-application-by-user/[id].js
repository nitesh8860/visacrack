import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const res = await prisma.applications.findFirst({
    where: { userId: event.context.params.id },
  });
  return res;
});
