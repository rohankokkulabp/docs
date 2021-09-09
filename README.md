## Development

To view documentation changes online, either create a branch named `dev` or merge your branch into it if it already exists. Once the build is completed (which takes around 4-6 mins), changes will be available at http://botpress-devdocs.s3-website-us-east-1.amazonaws.com

## Release

Every time a change is merged on master, the documentation is updated on s3. When we release a new version of Botpress on the main repository, it's important to update the version in `package.json` and to merge the branch once the release is done.
