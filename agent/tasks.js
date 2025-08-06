function execute(callback) {
  setTimeout(() => {
    callback()
  }, 2000)
}

module.exports = { execute }
