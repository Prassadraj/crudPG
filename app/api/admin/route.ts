import { NextResponse } from "next/server";
import { customers } from "@/db/schema/customer";
import { db } from "@/db";
import { eq } from "drizzle-orm";

export async function GET(req: Request) {
  const data = await db.select().from(customers);
  return NextResponse.json({ data });
}

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();
    await db.insert(customers).values({
      name,
      email,
      password,
    });
    return NextResponse.json({ message: "Customer created" });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }
    await db
      .update(customers)
      .set({ isDeleted: 1 })
      .where(eq(customers.id, id));

    return NextResponse.json({ message: "Customer Deleted" });
  } catch (error) {
    return NextResponse.json(
      {
        error: error,
      },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request, { params }: { params: string }) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const body = await req.json();
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }
    await db
      .update(customers)
      .set({
        name: body.name,
        password: body.password,
        email: body.email,
      })
      .where(eq(customers.id, id));

    return NextResponse.json({
      message: "Customer Updated",
    });
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}
