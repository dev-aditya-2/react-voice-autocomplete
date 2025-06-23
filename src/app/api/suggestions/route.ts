import { NextResponse } from "next/server";

const fruits = [
  { id: "1", label: "Apple" },
  { id: "2", label: "Banana" },
  { id: "3", label: "Orange" },
  { id: "4", label: "Mango" },
  { id: "5", label: "Grapes" },
  { id: "6", label: "Pineapple" },
  { id: "7", label: "Peach" },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.toLowerCase() || "";

  const filtered = fruits.filter((fruit) =>
    fruit.label.toLowerCase().includes(q)
  );

  return NextResponse.json(filtered);
}
