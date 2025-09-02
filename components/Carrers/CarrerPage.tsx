
import { prisma } from "@/lib/prisma";
import CareerClient from "./CarrierClient";

const CarrerPage = async () => {
  // fetch skills and jobs (server-side, then hydrate client)
  const [skills, jobs] = await Promise.all([
    prisma.skills.findMany({
      orderBy: { name: "asc" },
    }),
    prisma.vacancies.findMany({
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return <CareerClient jobs={jobs} skills={skills} />;
};


export default CarrerPage;
