/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://ink.suryapalanisamy.tech",
  generateRobotsTxt: true,

  // Optional but good for SEO
  changefreq: "daily",
  priority: 1.0,
  sitemapSize: 5000,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: "Googlebot",
        allow: "/",
      },
      {
        userAgent: "DuckDuckBot",
        allow: "/",
      },
      {
        // Brave generally uses common bots but explicit allow
        userAgent: "Brave",
        allow: "/",
      },
    ],
  },
};
