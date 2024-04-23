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


const SitemapGenerator = () => {
  // temp data
  const codes = ['COMP1511', 'COMP2521', 'COMP3900'];
  const sitemapXML = generateSitemapXML(codes);
  console.log(sitemapXML);
}

export default SitemapGenerator;