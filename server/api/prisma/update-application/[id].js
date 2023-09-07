import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const res = await prisma.applications.update({
    where: { id: Number(event.context.params.id) },
    data: {
      travelDate: body.travelDate,
    },
  });

  return res;
});
