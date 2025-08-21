import Title from "@/components/Common/Title";
import ContactusPage from "@/components/Contactus/Contactus";
import HeroBackground from "@/components/Hero/HeroBackground";
import Navbar from "@/components/Navbar/Navbar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { prisma } from "@/lib/prisma";
import { SlashIcon } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";


export async function generateMetadata(): Promise<Metadata> {

  const seoInfo = await prisma.sEO.findUnique({
    where:{route:"/contact-us"}
  })
  
  return {
    title: seoInfo?.title,
    description: seoInfo?.description,
    keywords: seoInfo?.keywords
  };
}

const ContactUs = () => {
  return (
    <>
      <div className="relative w-full overflow-hidden min-h-[50vh] sm:min-h-[60vh] md:min-h-[65vh] lg:min-h-[70vh] xl:min-h-[75vh]">
        <Navbar />
        <HeroBackground />
        <div className="relative z-10 flex flex-col items-center justify-center mt-20 px-4 py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-5xl text-center">
            <Title
              heading="Contact"
              gradheading="us"
              description="Discover insights, tutorials, and the latest trends in our comprehensive blog collection."
            />

            <div className="mt-6 mx-auto flex items-center-safe justify-center-safe">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <Link href="/" className="text-base">
                      Home
                    </Link>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator>
                    <SlashIcon className="-rotate-[20deg]" />
                  </BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <Link href="/contact-us" className="text-base">
                      Contact Us
                    </Link>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-4 sm:mx-8 md:mx-20 lg:mx-36 xl:mx-48 mb-20">
        <ContactusPage/>
      </div>
    </>
  );
};

export default ContactUs;
