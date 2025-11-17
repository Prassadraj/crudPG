import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./db/schema/customer.ts",
  out: "./db/migrate",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
