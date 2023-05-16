-- CreateEnum
CREATE TYPE "report_status" AS ENUM ('SEEN', 'UNSEEN', 'REMOVED', 'SETTLED');

-- CreateTable
CREATE TABLE "courses" (
    "course_code" TEXT NOT NULL,
    "archived" BOOLEAN NOT NULL,
    "attributes" TEXT[],
    "calendar" TEXT NOT NULL,
    "campus" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "enrolment_rules" TEXT NOT NULL,
    "equivalents" TEXT[],
    "exclusions" TEXT[],
    "faculty" TEXT NOT NULL,
    "field_of_education" TEXT NOT NULL,
    "gen_ed" BOOLEAN NOT NULL,
    "level" INTEGER NOT NULL,
    "school" TEXT NOT NULL,
    "study_level" TEXT NOT NULL,
    "terms" INTEGER[],
    "title" TEXT NOT NULL,
    "uoc" INTEGER NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "pk_course_code" PRIMARY KEY ("course_code")
);

-- CreateTable
CREATE TABLE "reports" (
    "report_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "review_id" UUID NOT NULL,
    "zid" TEXT NOT NULL,
    "status" "report_status" NOT NULL,
    "reason" TEXT NOT NULL,
    "created_timestamp" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_timestamp" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pk_report_id" PRIMARY KEY ("report_id")
);

-- CreateTable
CREATE TABLE "reviews" (
    "review_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "zid" TEXT NOT NULL,
    "course_code" TEXT NOT NULL,
    "author_name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "grade" INTEGER,
    "term_taken" TEXT NOT NULL,
    "created_timestamp" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_timestamp" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "upvotes" TEXT[],
    "manageability" DOUBLE PRECISION NOT NULL,
    "usefulness" DOUBLE PRECISION NOT NULL,
    "enjoyability" DOUBLE PRECISION NOT NULL,
    "overall_rating" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "pk_review_id" PRIMARY KEY ("review_id")
);

-- CreateTable
CREATE TABLE "users" (
    "zid" TEXT NOT NULL,
    "bookmarked_reviews" TEXT[],
    "bookmarked_courses" TEXT[],
    "is_admin" BOOLEAN NOT NULL,

    CONSTRAINT "pk_zid" PRIMARY KEY ("zid")
);

INSERT INTO cselectives.users
VALUES
    (
        'z5000000',
        '{}',
        '{"COMP1531"}',
        FALSE
    );

-- AddForeignKey
ALTER TABLE "reports" ADD CONSTRAINT "fk_review_id" FOREIGN KEY ("review_id") REFERENCES "reviews"("review_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "reports" ADD CONSTRAINT "fk_zid" FOREIGN KEY ("zid") REFERENCES "users"("zid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "fk_course_code" FOREIGN KEY ("course_code") REFERENCES "courses"("course_code") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "fk_zid" FOREIGN KEY ("zid") REFERENCES "users"("zid") ON DELETE NO ACTION ON UPDATE NO ACTION;
