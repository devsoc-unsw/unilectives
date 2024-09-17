-- CreateTable
CREATE TABLE "reviews_studentvip" (
    "review_studentvip_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "course_code" TEXT NOT NULL,
    "author_name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "term_taken" TEXT NOT NULL,
    "created_timestamp" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "upvotes" TEXT[],
    "overall_rating" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "pk_review_studentvip_id" PRIMARY KEY ("review_studentvip_id")
);

-- CreateTable
CREATE TABLE "reviews_uninotes" (
    "review_uninotes_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "course_code" TEXT NOT NULL,
    "author_name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "grade" TEXT NOT NULL,
    "term_taken" TEXT NOT NULL,
    "created_timestamp" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pk_review_uninotes_id" PRIMARY KEY ("review_uninotes_id")
);

-- AddForeignKey
ALTER TABLE "reviews_studentvip" ADD CONSTRAINT "fk_course_code" FOREIGN KEY ("course_code") REFERENCES "courses"("course_code") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "reviews_uninotes" ADD CONSTRAINT "fk_course_code" FOREIGN KEY ("course_code") REFERENCES "courses"("course_code") ON DELETE NO ACTION ON UPDATE NO ACTION;
