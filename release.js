const fs = require('fs')
const { exec } = require('child_process')
const rimraf = require('rimraf')

const version = require('./package.json').version
const versions = require('./website/versions.json')

const clearVersion = (version) => {
  const withoutCurrent = versions.filter((x) => x !== version)
  fs.writeFileSync('./website/versions.json', JSON.stringify(withoutCurrent, undefined, 2), 'utf-8')

  rimraf.sync(`./website/*/version-${version}*`, {})
}

const execute = () => {
  clearVersion(version)

  exec(`yarn run version ${version}`, { cwd: './website' }, (err, res) => {
    console.log(res)
  })
}

execute()

// if (versions.find((x) => x === version)) {
//   rimraf(`./website/versioned_docs/version-${version}`)
// }
// const withoutCurrent = versions.filter((x) => x !== version)

// fs.writeFileSync('./website/versions.json', JSON.stringify(withoutCurrent, undefined, 2), 'utf-8')
