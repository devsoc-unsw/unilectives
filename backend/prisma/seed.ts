import { PrismaClient } from "@prisma/client";
import dataJson from "../src/data/studentVIP_reviews.json";
const prisma = new PrismaClient();

async function main() {
  // Read JSON file
  const data = dataJson;

  for (const course of data) {
    const courseCode = course.course;
    for (const review of course.reviews) {
      await prisma.reviewsStudentVIP.create({
        data: {
          courseCode,
          authorName: review.authorName,
          title: review.description,
          termTaken: review.termTaken,
          upvotes: [],
          overallRating: review.rating,
        },
      });
    }
  }
}

main()
  .then(() => {
    console.log("Data seeded successfully");
    prisma.$disconnect();
  })
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
  });
