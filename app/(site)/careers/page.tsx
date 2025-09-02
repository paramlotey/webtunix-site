import CarrerPage from "@/components/Carrers/CarrerPage";
import Title from "@/components/Extra/Title";
import HeroBackground from "@/components/Hero/HeroBackground";
import Navbar from "@/components/Navbar/Navbar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SlashIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const Careers = () => {
  return (
    <>
      <div className="relative w-full overflow-hidden min-h-[40vh] sm:min-h-[50vh] md:min-h-[55vh] lg:min-h-[60vh] xl:min-h-[65vh]">
        <Navbar />
        <HeroBackground />
        <div className="relative z-10 flex flex-col items-center justify-center mt-20 px-4 py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-5xl text-center">
            <Title
              heading="Be Part Of"
              gradheading="Our Mission"
              description="We're looking for passionate people to join us on our mission. We value flat hierarchies, clear communication, and full ownership and responsibility"
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
                    <Link href="/careers" className="text-base">
                      Careers
                    </Link>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-4 sm:mx-8 md:mx-20 lg:mx-36 xl:mx-48 mb-20">
        <CarrerPage/>
      </div>
    </>
  );
};

export default Careers;
