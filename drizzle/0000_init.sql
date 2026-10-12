CREATE TYPE "public"."enquiry_status" AS ENUM('new', 'contacted', 'quoted', 'won', 'lost');--> statement-breakpoint
CREATE TABLE "enquiries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"business" text,
	"email" text NOT NULL,
	"phone" text,
	"need" text,
	"package_interest" text,
	"message" text NOT NULL,
	"consent" boolean DEFAULT false NOT NULL,
	"status" "enquiry_status" DEFAULT 'new' NOT NULL,
	"notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "enquiries_created_idx" ON "enquiries" USING btree ("created_at");