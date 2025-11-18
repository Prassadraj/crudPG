import {
  date,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { z } from "zod";

export const customers = pgTable("customers", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  password: text("password").notNull(),
  isDeleted: integer("is_deleted").default(0),
  iscreatedBy: timestamp("is_created_by").defaultNow(),
});
export const customerSchema = z.object({
  name: z.string().min(1, "Name is required..."),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
