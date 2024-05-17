import { get } from "@/utils/request";
import { Courses } from "@/types/api";
import fs from "fs";

const generateSitemapXML = (codes: string[]) => {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>https://unilectives.devsoc.app/</loc>
    </url>
    <url>
      <loc>https://unilectives.devsoc.app/terms-and-conditions</loc>
    </url> ${codes.map(code => `
    <url>
      <loc>${`https://unilectives.devsoc.app/course/${code}`}</loc>
    </url>`).join('')}
  </urlset>`;
  return xml;  
}

const SitemapGenerator = async () => {
  const { courses: allCourses } = (await get(
    "/courses/all",
  )) as Courses;

  const courseCodes: string[] = allCourses.map(course => course.courseCode);
  const sitemapXML = generateSitemapXML(courseCodes);
  fs.writeFileSync("sitemap.xml", sitemapXML);
}

export default SitemapGenerator;