import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


type BlogsWhereInput = NonNullable<
  Parameters<typeof prisma.blogs.findMany>[0]
>["where"];

type BlogsCreateInput = Parameters<typeof prisma.blogs.create>[0]['data'];

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);

    const pageParam = searchParams.get("page");
    const limitParam = searchParams.get("limit");
    const tag = searchParams.get("tag");
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const showParam = searchParams.get("show");

    const page =
      pageParam && Number.isFinite(Number(pageParam))
        ? Math.max(1, parseInt(pageParam, 10))
        : 1;

    const limitRaw =
      limitParam && Number.isFinite(Number(limitParam))
        ? parseInt(limitParam, 10)
        : 9;
    const limit = Math.min(100, Math.max(1, limitRaw));

    const show =
      showParam === "true" ? true : showParam === "false" ? false : undefined;

    const whereClause: BlogsWhereInput = {};

    if (typeof show === "boolean") {
      whereClause.show = show;
    }

    if (tag) {
      const tags = tag
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
      whereClause.tags =
        tags.length === 1 ? { has: tags[0] } : { hasSome: tags };
    }

    if (category) {
      const categories = category
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean);
      whereClause.category =
        categories.length === 1
          ? { has: categories[0] }
          : { hasSome: categories };
    }

    if (search) {
      const contains = { contains: search, mode: "insensitive" as const };
      whereClause.OR = [
        { title: contains },
        { description: contains },
        { content: contains },
      ];
    }

    const [data, total] = await Promise.all([
      prisma.blogs.findMany({
        where: whereClause,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { id: "desc" },
      }),
      prisma.blogs.count({ where: whereClause }),
    ]);

    return NextResponse.json({
      data,
      total,
      page,
      limit,
      totalPages: Math.max(1, Math.ceil(total / limit)),
      success: true,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
        success: false,
        message: "Server Error",
      },
      { status: 500 }
    );
  }
};


export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    // ✅ Basic validation
    if (!body.title || typeof body.title !== "string") {
      return NextResponse.json(
        {
          error: "Title is required and must be a string",
          success: false,
          message: "Validation Error",
        },
        { status: 400 }
      );
    }

    if (!body.content || typeof body.content !== "string") {
      return NextResponse.json(
        {
          error: "Content is required and must be a string",
          success: false,
          message: "Validation Error",
        },
        { status: 400 }
      );
    }

    if (!body.thumbnailImg || typeof body.thumbnailImg !== "string") {
      return NextResponse.json(
        {
          error: "Thumbnail image is required and must be a string",
          success: false,
          message: "Validation Error",
        },
        { status: 400 }
      );
    }

    const blogData = {
      title: body.title.trim(),
      content: body.content.trim(),
      thumbnailImg: body.thumbnailImg.trim(),
    } as BlogsCreateInput;

    // ✅ Optional fields
    if (body.description) {
      if (typeof body.description !== "string") {
        return NextResponse.json(
          {
            error: "Description must be a string",
            success: false,
            message: "Validation Error",
          },
          { status: 400 }
        );
      }
      blogData.description = body.description.trim();
    }

    if (body.tags) {
      if (!Array.isArray(body.tags)) {
        return NextResponse.json(
          {
            error: "Tags must be an array",
            success: false,
            message: "Validation Error",
          },
          { status: 400 }
        );
      }

      const validTags = body.tags
        .filter((tag: string) => typeof tag === "string" && tag.trim())
        .map((tag: string) => tag.trim().toLowerCase());

      if (validTags.length > 0) {
        blogData.tags = validTags;
      }
    }

    if (body.category) {
      if (!Array.isArray(body.category)) {
        return NextResponse.json(
          {
            error: "Category must be an array",
            success: false,
            message: "Validation Error",
          },
          { status: 400 }
        );
      }

      const validCategories = body.category
        .filter((cat: string) => typeof cat === "string" && cat.trim())
        .map((cat: string) => cat.trim().toLowerCase());

      if (validCategories.length > 0) {
        blogData.category = validCategories;
      }
    }

    if (body.images) {
      if (!Array.isArray(body.images)) {
        return NextResponse.json(
          {
            error: "Images must be an array",
            success: false,
            message: "Validation Error",
          },
          { status: 400 }
        );
      }

      const images = body.images
        .filter((img: string) => typeof img === "string" && img.trim())
        .map((img: string) => img.trim());

      if (images.length > 0) {
        blogData.images = images;
      }
    }

    if (typeof body.show === "boolean") {
      blogData.show = body.show;
    } else {
      blogData.show = false;
    }

    if (body.authorName && typeof body.authorName === "string") {
      blogData.authorName = body.authorName.trim();
    }

    // ✅ Slug = title in kebab-case (always)
    blogData.slug = blogData.title
      .toLowerCase()
      .replace(/[^a-z0-9\s]+/g, "") // remove special chars
      .replace(/\s+/g, "-") // replace spaces with -
      .replace(/^-+|-+$/g, ""); // trim dashes

    // ✅ Save blog
    const newBlog = await prisma.blogs.create({
      data: blogData,
    });

    return NextResponse.json(
      {
        data: newBlog,
        success: true,
        message: "Blog post created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating blog post:", error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
        success: false,
        message: "Server Error",
      },
      { status: 500 }
    );
  }
};