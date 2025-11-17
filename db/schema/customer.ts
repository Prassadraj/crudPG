import { integer, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { number } from "zod";

export const customers = pgTable("customers", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  password: text("password").notNull(),
  isDeleted: integer("is_deleted").default(0),
});
