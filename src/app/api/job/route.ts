import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    await prisma.job.create({
      data,
    });

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error occurred:", error.message); 
    console.error("Error details:", error);
    
    return NextResponse.json(
      { error: "An error occurred", details: error.message },
      { status: 500 }
    );
  }
}
