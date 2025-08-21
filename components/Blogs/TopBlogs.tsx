import { Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type topBlogs = {
    id: number;
    title: string;
    createdAt: Date;
    thumbnailImg: string;
    slug: string;
}[]

const TopBlogs = ({ topBlogs }:{ topBlogs:topBlogs }) => {
  return (
    <div className="bg-[#1B1B1B33] backdrop-blur-sm bg-[url('/Service/service-bg.png')] bg-center bg-cover rounded-xl shadow-lg border border-white/10 p-6">
      <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <Eye size={18} className="text-red-600" />
        Top Blogs
      </h4>

      <div className="space-y-4">
        {topBlogs.map((blog, index) => (
          <Link href={`/blogs/${blog.slug}`} key={blog.id}>
            <div className="flex gap-3 group cursor-pointer p-2 rounded-lg hover:bg-white/5 transition-all duration-300">
              <div className="flex-shrink-0">
                <div className="w-16 h-12 bg-gradient-to-br from-red-500/10 to-purple-500/10 border border-white/10 rounded-lg overflow-hidden">
                  {blog.thumbnailImg ? (
                    <Image
                      height={200}
                      width={200}
                      src={blog.thumbnailImg}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/40">
                      <span className="text-xs">#{index + 1}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white line-clamp-2 group-hover:text-red-400 transition-colors">
                  {blog.title}
                </p>
                <p className="text-xs text-white/60 mt-1">
                  {new Date(blog.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopBlogs;
