import { PostModel } from "@/types";
import { NextRequest, NextResponse } from "next/server";
import * as fs from "node:fs/promises";
import path from "node:path";

const filePath = path.join(process.cwd(), "/public/data.json");

async function readData() {
  const data = await fs.readFile(filePath, { encoding: "utf8" });
  return data;
}

async function writeData(data: PostModel[]) {
  const promise = fs.writeFile(filePath, JSON.stringify(data));
  return promise;
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: Number } }
) {
  let id = Number(params.id);
  try {
    const data = await readData();
    const dataArray = JSON.parse(data);
    const index = dataArray.findIndex((item: PostModel) => item.id === id);
    if (index === -1) {
      return NextResponse.json("Data not Found", { status: 404 });
    } else {
      return NextResponse.json(dataArray[index], { status: 200 });
    }
  } catch (err) {
    console.error((err as Error).message);
    return NextResponse.json("Error reading data.json file", { status: 500 });
  }
}
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  const updatedData = await request.json();
  const id = Number(params.id);
  try {
    const data = await readData();
    const dataArray = JSON.parse(data);
    const index = dataArray.findIndex((item: PostModel) => item.id === id);
    if (index === -1) {
      return NextResponse.json("Data not Found", { status: 404 });
    } else {
      dataArray[index] = { ...dataArray[index], ...updatedData };
      try {
        await writeData(dataArray);
        return NextResponse.json(dataArray[index], { status: 201 });
      } catch (err) {
        console.error((err as Error).message);
        return NextResponse.json(
          "Error While writing data into data.json file.",
          { status: 500 }
        );
      }
    }
  } catch (err) {
    console.error((err as Error).message);
    return NextResponse.json("Error reading data.json file", { status: 500 });
  }
}
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  const id = Number(params.id);
  try {
    const data = await readData();
    const dataArray = JSON.parse(data);
    const index = dataArray.findIndex((item: PostModel) => item.id === id);
    if (index === -1) {
      return NextResponse.json("Data not Found", { status: 404 });
    } else {
      const deletedData = dataArray.splice(index, 1);
      try {
        await writeData(dataArray);
        return NextResponse.json(deletedData, { status: 201 });
      } catch (err) {
        console.error((err as Error).message);
        return NextResponse.json(
          "Error While writing data into data.json file.",
          { status: 500 }
        );
      }
    }
  } catch (err) {
    console.error((err as Error).message);
    return NextResponse.json("Error reading data.json file", { status: 500 });
  }
}
