/**
 * Get absolute path, project root path where NPM script runs
 * @param  {String?} name
 * @return {String}
 */
function getAbsPath(name) {
  return [process.cwd(), name].filter(p => !!p).join('/');
}

module.exports = {
  rootPath: getAbsPath(),
  srcPath: getAbsPath('src'),
  publicPath: getAbsPath('public'),
  distPath: getAbsPath('dist'),
  getAbsPath
};