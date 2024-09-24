-- CreateTable
CREATE TABLE "reviews_scraped" (
    "review_scraped_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "source" TEXT NOT NULL,
    "course_code" TEXT NOT NULL,
    "author_name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "term_taken" TEXT NOT NULL,
    "created_timestamp" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "upvotes" TEXT[],
    "overall_rating" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "pk_review_scraped_id" PRIMARY KEY ("review_scraped_id")
);

-- AddForeignKey
ALTER TABLE "reviews_scraped" ADD CONSTRAINT "fk_course_code" FOREIGN KEY ("course_code") REFERENCES "courses"("course_code") ON DELETE NO ACTION ON UPDATE NO ACTION;
