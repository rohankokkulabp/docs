const fs = require('fs')
const path = require('path')
const _ = require('lodash')
const { exec } = require('child_process')
require('bluebird-global')

const versionDocs = (files) => {
  const version = require('./package.json').version

  for (const file of files.filter((x) => x.startsWith('docs/'))) {
    const versionedPath = `website/versioned_docs/version-${version}/${file.replace('docs/', '')}`

    fs.mkdirSync(path.dirname(versionedPath), { recursive: true, mode: 0o700 })

    const content = fs.readFileSync(file, 'utf-8')
    const id = content.match(/id: (.*)/)
    const title = content.match(/title: (.*)/)

    const fixed = content
      .replace(id[0], `id: version-${version}-${id[1]}`)
      .replace(title[0], `title: ${title[1]}\noriginal_id: ${id[1]}`)

    fs.writeFileSync(versionedPath, fixed)
  }
}

/**
 * Returns committed & staged files different from the specified branch
 */
const getChangedFiles = async (targetBranch) => {
  const branch = await Promise.fromCallback((cb) => exec('git rev-parse --abbrev-ref HEAD', cb))

  const committedDiff = await Promise.fromCallback((cb) =>
    exec(`git diff --name-only ${branch.replace('\n', '')}..${targetBranch}`, cb)
  )

  const stagedDiff = await Promise.fromCallback((cb) => exec('git diff --name-only --cached', cb))

  const addedModified = [...committedDiff.split('\n'), ...stagedDiff.split('\n')]
    .map((x) => x.trim())
    .filter((x) => x.length)

  return _.uniq(addedModified)
}

const execute = async () => {
  const targetBranch = process.argv.length > 2 ? process.argv[2] : undefined
  if (targetBranch !== 'dev' && targetBranch !== 'master') {
    console.error('Must be dev or master')
    return
  }

  const files = await getChangedFiles(targetBranch)
  await versionDocs(files)
}

execute()
