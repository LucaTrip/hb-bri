import { connect } from "@/app/utils/helper";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const mongoStuff = await connect();

    const res = await mongoStuff?.Choice.create(body);

    return NextResponse.json(res);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.response.statusText },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const mongoStuff = await connect();
    const res = await mongoStuff?.Choice.find({});

    return NextResponse.json(res);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.response.statusText },
      { status: 500 }
    );
  }
}
