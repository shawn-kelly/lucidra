const fs = require('fs')

function validate(registryPath) {
  try {
    const data = fs.readFileSync(registryPath, 'utf-8')
    const json = JSON.parse(data)
    return typeof json === 'object'
  } catch {
    return false
  }
}

module.exports = { validate }
