const path = require('path')
const fs = require('fs')

const alterGuide = async () => {
  const prioritiesMap = {
    'docs/12': '0.8',
    'docs/11.9': '0.6',
    'docs/11': '0.4'
  }

  const fixPriority = (line) => {
    const found = Object.keys(prioritiesMap).find((search) => line.includes(search))
    return found ? line.replace('<priority>1.0</priority>', `<priority>${prioritiesMap[found]}</priority>`) : line
  }

  const sitemap = path.join(__dirname, 'website/build/botpress-docs/sitemap.xml')
  const fileContent = fs.readFileSync(sitemap, 'utf8')

  const newContent = fileContent
    .replace(/\/docs\/docs\//g, '/docs/')
    .replace('/docs/versions', '/versions')
    .replace('/docs/index', '/docs')
    .split('\n')
    .map(fixPriority)
    .join('\n')

  fs.writeFileSync(sitemap, newContent)
}

alterGuide()
