var fs = require('fs')
var path = require('path')
var rimraf = require('rimraf')

var cache = {
  cachePath: path.join(__dirname, '../.cache'),
  save(filename, content) {
    var filePath = path.join(this.cachePath, filename + '.vue')

    try {
      fs.writeFileSync(filePath, content, 'utf8')
    } catch (err) {
      console.error(err)
    }

    return filePath
  },

  clean() {
    rimraf.sync(this.cachePath)
  }
}

cache.clean()
if (!fs.existsSync(cache.cachePath)) {
  fs.mkdirSync(cache.cachePath)
}

module.exports = cache
