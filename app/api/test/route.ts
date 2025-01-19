import { exportTraceState } from "next/dist/trace";
import { NextResponse } from "next/server";


const data:any = [];
export function GET(){
  return NextResponse.json({data});
}

export async function POST(req: NextResponse){
  const body = await req.json();
  const headers = req.headers.get("auth");
  console.log(headers);
  data.push(body);
  return NextResponse.json({body});
}

export function PUT(){
  return new NextResponse("PUT API");
}

export function DELETE(){
  return new NextResponse("DELETE API");
}