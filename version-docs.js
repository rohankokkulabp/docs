const { exec } = require('child_process')
const fs = require('fs')
const rimraf = require('rimraf')
const versions = require('./website/versions.json')
const currentVersion = require('./package.json').version

const clearVersion = (version) => {
  const withoutCurrent = versions.filter((x) => x !== version)
  fs.writeFileSync('./website/versions.json', JSON.stringify(withoutCurrent, undefined, 2), 'utf-8')

  rimraf.sync(`./website/*/version-${version}*`, {})
}

const execute = () => {
  clearVersion(currentVersion)

  exec(`yarn run version ${currentVersion}`, { cwd: './website' }, (err, res) => {
    console.log(res)
  })
}

execute()
