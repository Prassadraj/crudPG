import { NextRequest, NextResponse } from "next/server";
import { customerSchema, customers } from "@/db/schema/customer";
import { db } from "@/db";
import { eq } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (id) {
      const customer = await db
        .select()
        .from(customers)
        .where(eq(customers.id, id));
      return NextResponse.json({ customer });
    }
    const data = await db.select().from(customers);
    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = customerSchema.parse(body);
    await db.insert(customers).values({
      name: parsed.name,
      email: parsed.email,
      password: parsed.password,
    });
    return NextResponse.json({ message: "Customer created" });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest) {
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

export async function PUT(req: NextRequest) {
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
        isDeleted: body.isDeleted,
      })
      .where(eq(customers.id, id));

    return NextResponse.json({
      message: "Customer Updated",
    });
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}
