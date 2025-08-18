import LandingPageBlogs from "@/components/Blogs/LandingPageBlogs";
import Faq from "@/components/Faq/Faq";
import AISection from "@/components/Hero/Grow";
import Hero from "@/components/Hero/Hero";
import How from "@/components/Howwe/How";
import OurProjects from "@/components/Projects/OurProjects";
import OurServices from "@/components/Services/OurServices";
import VideoServices from "@/components/Services/VideoServices";
import Vision from "@/components/Vision/Vision";
import Whyus from "@/components/Whyus/Whyus";
import { PrismaClient } from "@/lib/generated/prisma";
import React from "react";

export default async function Home(){

  const prisma = new PrismaClient()

  const blogs = await prisma.blogs.findMany({
    take:3,
    orderBy:{createdAt:"desc"}
  })

  return (
    <>
      <Hero />
      <div className="mx-4 sm:mx-8 md:mx-20 lg:mx-40 xl:mx-56">
        <AISection />
        <OurServices />
        <VideoServices />
        <Vision />
        <OurProjects />
        <Whyus />
        <How />
        <Faq />
        <LandingPageBlogs blogs={blogs}/>
      </div>
    </>
  );
};

