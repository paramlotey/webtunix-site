import React from "react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import Link from "next/link";
import { Calendar, User } from "lucide-react";
import Image from "next/image";

type relatedArticles = {
    id: number;
    title: string;
    thumbnailImg: string;
    createdAt: Date;
    slug: string;
    authorName: string;
}[]

const RelatedArticles = ({ finalRelatedArticles }:{finalRelatedArticles:relatedArticles}) => {
  return (
    <div className="mt-12">
      <div className="backdrop-blur-sm rounded-xl shadow-lg border border-blue-500/20 p-8">
        <h3 className="text-2xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text">
          Related Articles
        </h3>

        <Carousel className="w-full">
          <CarouselContent className="-ml-4">
            {finalRelatedArticles.map((article) => (
              <CarouselItem
                key={article.id}
                className="pl-4 md:basis-1/2 lg:basis-1/3"
              >
                <Link href={`/blogs/${article.slug}`}>
                  <div className="border border-white/10 rounded-lg overflow-hidden hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 cursor-pointer group bg-gradient-to-br from-gray-800/50 to-black/50">
                    <div className="aspect-video bg-gradient-to-br from-red-500/10 to-purple-500/10 relative overflow-hidden">
                      {article.thumbnailImg ? (
                        <Image
                          height={500}
                          width={500}
                          src={article.thumbnailImg}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-white/40">
                          <span className="text-lg">📄</span>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-white mb-2 group-hover:text-red-400 transition-colors line-clamp-2">
                        {article.title}
                      </h4>
                      <div className="flex items-center justify-between text-xs text-white/60">
                        <div className="flex items-center gap-1">
                          <User size={12} />
                          <span>{article.authorName}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar size={12} />
                          <span>
                            {new Date(article.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                              }
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
};

export default RelatedArticles;
