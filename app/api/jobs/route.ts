import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  try {
    const jobs = await prisma.vacancies.findMany({
      orderBy: { id: "asc" },
    });

    if (!jobs || jobs.length === 0) {
      return NextResponse.json(
        { success: false, message: "No jobs found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, jobs }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          success: false,
          error: error.message,
          message: "Failed To Fetch Jobs",
        },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { success: false, message: "An unknown error occurred" },
      { status: 500 }
    );
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const {
      JobTitle,
      Job_Description,
      Min_exp,
      Max_exp,
      Job_type,
      Salary,
      Primary_Skills,
      Secondary_Skills,
      Show,
    } = await req.json();

    if (!JobTitle || !Job_Description || !Job_type || !Min_exp || !Max_exp) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!Array.isArray(Primary_Skills) || !Array.isArray(Secondary_Skills)) {
      return NextResponse.json(
        { success: false, message: "Skills should be an array" },
        { status: 400 }
      );
    }

    await prisma.skills.createMany({
      data: [
        ...Primary_Skills.map((skill: string) => ({
          name: skill,
          updatedAt: new Date(),
        })),
        ...Secondary_Skills.map((skill: string) => ({
          name: skill,
          updatedAt: new Date(),
        })),
      ],
      skipDuplicates: true,
    });

    const newJob = await prisma.vacancies.create({
      data: {
        JobTitle,
        Job_Description,
        Min_exp,
        Max_exp,
        Job_type,
        Salary,
        Primary_Skills,
        Secondary_Skills,
        Show,
      },
    });

    return NextResponse.json(
      { success: true, message: "Job added successfully", job: newJob },
      { status: 201 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { success: false, error: error.message, message: "Failed to Add Job" },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { success: false, message: "An unknown error occurred" },
      { status: 500 }
    );
  }
};

export async function PATCH(req: NextRequest) {
  const { id } = await req.json();
  try {
    const job = await prisma.vacancies.findUnique({ where: { id } });
    if (!job) {
      return NextResponse.json(
        { success: false, message: "Job not found" },
        { status: 404 }
      );
    }

    const updatedJob = await prisma.vacancies.update({
      where: { id },
      data: { Show: !job.Show },
    });

    return NextResponse.json({
      success: true,
      message: "Job updated",
      updatedJob,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  try {
    const job = await prisma.vacancies.findUnique({ where: { id } });
    if (!job) {
      return NextResponse.json(
        { success: false, message: "Job not found" },
        { status: 404 }
      );
    }

    await prisma.vacancies.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Job Deleted" });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
export async function PUT(req: NextRequest) {
  try {
    const {
      id,
      JobTitle,
      Job_Description,
      Min_exp,
      Max_exp,
      Job_type,
      Salary,
      Primary_Skills,
      Secondary_Skills,
    } = await req.json();

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Job ID is required" },
        { status: 400 }
      );
    }

    const existingJob = await prisma.vacancies.findUnique({
      where: { id },
    });

    if (!existingJob) {
      return NextResponse.json(
        { success: false, message: "Job not found" },
        { status: 404 }
      );
    }
    const updatedJob = await prisma.vacancies.update({
      where: { id },
      data: {
        JobTitle,
        Job_Description,
        Min_exp,
        Max_exp,
        Job_type,
        Salary,
        Primary_Skills,
        Secondary_Skills,
      },
    });

    return NextResponse.json(
      { success: true, message: "Job updated successfully", job: updatedJob },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
