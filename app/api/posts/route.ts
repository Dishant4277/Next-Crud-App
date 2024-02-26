import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "./[id]/route";

export async function GET() {
  try {
    const res = await readData();
    const result = JSON.parse(res);
    return NextResponse.json({ result }, { status: 200 });
  } catch (err) {
    console.error((err as Error).message);
    return NextResponse.json("Error reading data.json file", { status: 500 });
  }
}
export async function POST(request: NextRequest) {
  const newData = await request.json();
  try {
    const contents = await readData();
    const dataArray = JSON.parse(contents);
    const newId = dataArray[dataArray.length - 1].id;
    newData.id = newId + 1;
    newData.created_at = new Date().toLocaleString();
    dataArray.push(newData);
    try {
      await writeData(dataArray);
      return NextResponse.json(newData, { status: 201 });
    } catch (err) {
      console.error((err as Error).message);
      return NextResponse.json(
        "Error While writing data into data.json file.",
        { status: 500 }
      );
    }
  } catch (err) {
    console.error((err as Error).message);
    return NextResponse.json("Error reading data.json file", { status: 500 });
  }
}
