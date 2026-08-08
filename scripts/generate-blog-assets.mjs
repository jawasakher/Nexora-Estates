import fs from 'node:fs/promises'
import path from 'node:path'

const rootDir = process.cwd()
const publicDir = path.join(rootDir, 'public')

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Nexora Estates Blog</title>
    <link>https://nexoraestates.com/blog</link>
    <description>Real estate insights, buying tips, and market updates.</description>
  </channel>
</rss>
`

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://nexoraestates.com/</loc></url>
  <url><loc>https://nexoraestates.com/blog</loc></url>
</urlset>
`

await fs.mkdir(publicDir, { recursive: true })
await fs.writeFile(path.join(publicDir, 'rss.xml'), rss, 'utf8')
await fs.writeFile(path.join(publicDir, 'sitemap.xml'), sitemap, 'utf8')

console.log('Generated public/rss.xml and public/sitemap.xml')