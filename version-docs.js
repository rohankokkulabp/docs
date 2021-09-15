const { exec } = require('child_process')
const fs = require('fs')
const rimraf = require('rimraf')

const versions = require('./website/versions.json')
const version = require('./package.json').version

const execute = () => {
  if (versions.find((x) => x === version)) {
    console.log(`Version ${version} already exists, clearing existing content...`)

    const withoutCurrentVersion = versions.filter((x) => x !== version)
    fs.writeFileSync('./website/versions.json', JSON.stringify(withoutCurrentVersion, undefined, 2), 'utf-8')

    rimraf.sync(`./website/*/version-${version}*`, {})
    console.log('Cleared version content')
  } else {
    console.log(`Version ${version} doesn't exist, publishing new version...`)
  }

  exec(`yarn run version ${version}`, { cwd: './website' }, (err, res) => {
    if (err) {
      return console.error(`Error running version:`, err)
    }

    console.log(`Version update result: ${res}`)
  })
}

execute()
