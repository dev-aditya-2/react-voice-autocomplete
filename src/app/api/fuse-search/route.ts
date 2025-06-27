// src/app/api/fuse-search/route.ts

import { NextResponse } from "next/server";
import Fuse from "fuse.js";

const staticData = [
  { id: "1", label: "Apple" },
  { id: "2", label: "Banana" },
  { id: "3", label: "Orange" },
  { id: "4", label: "Mango" },
  { id: "5", label: "Grapes" },
];

const fuse = new Fuse(staticData, {
  keys: ["label"],
  threshold: 0.3,
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") || "";

  const results = fuse.search(q).map((r) => r.item);

  return NextResponse.json(results);
}
