CREATE TYPE "public"."experience-level" AS ENUM('junior', 'mid-junior', 'expert');--> statement-breakpoint
CREATE TYPE "public"."question-difficulty" AS ENUM('easy', 'medium', 'hard');--> statement-breakpoint
CREATE TABLE "jobInfo" (
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar(250) NOT NULL,
	"title" varchar(250),
	"description" text NOT NULL,
	"experienceLevel" "experience-level" NOT NULL,
	"userId" text,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "interview" (
	"id" varchar PRIMARY KEY NOT NULL,
	"jobInfoId" varchar NOT NULL,
	"duration" varchar NOT NULL,
	"humeChatId" varchar,
	"feedback" varchar,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "question" (
	"id" varchar PRIMARY KEY NOT NULL,
	"jobInfoId" varchar NOT NULL,
	"difficulty" "question-difficulty" NOT NULL,
	"text" text NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "jobInfo" ADD CONSTRAINT "jobInfo_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "interview" ADD CONSTRAINT "interview_jobInfoId_jobInfo_id_fk" FOREIGN KEY ("jobInfoId") REFERENCES "public"."jobInfo"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "question" ADD CONSTRAINT "question_jobInfoId_jobInfo_id_fk" FOREIGN KEY ("jobInfoId") REFERENCES "public"."jobInfo"("id") ON DELETE no action ON UPDATE no action;