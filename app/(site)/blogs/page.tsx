import React from "react";
import PaginatedBlogs from "@/components/Blogs/PaginatedBlogs";
import Navbar from "@/components/Navbar/Navbar";
import HeroBackground from "@/components/Hero/HeroBackground";
import Title from "@/components/Common/Title";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SlashIcon } from "lucide-react";
import Link from "next/link";
const Blogs = () => {
  return (
    <>
      <div className="relative w-full overflow-hidden min-h-[50vh] sm:min-h-[60vh] md:min-h-[65vh] lg:min-h-[70vh] xl:min-h-[75vh]">
        <Navbar />
        <HeroBackground />
        <div className="relative z-10 flex flex-col items-center justify-center mt-20 px-4 py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-5xl text-center">
            <Title
              heading="Our"
              gradheading="Blogs"
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
                    <Link href="/blogs" className="text-base">
                      Blogs
                    </Link>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-4 sm:mx-8 md:mx-20 lg:mx-40 xl:mx-56 mb-20">
        <PaginatedBlogs />
      </div>
    </>
  );
};

export default Blogs;
