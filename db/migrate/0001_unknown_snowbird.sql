ALTER TABLE "customers" ADD COLUMN "password" text NOT NULL;--> statement-breakpoint
ALTER TABLE "customers" ADD CONSTRAINT "customers_password_unique" UNIQUE("password");