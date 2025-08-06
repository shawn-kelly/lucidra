const fs = require('fs')
const path = require('path')
const tasks = require('./tasks')
const registry = require('./registry')

const logPath = path.resolve(__dirname, '../lucidra.log')
const registryPath = '/mnt/d/Projects/claude.registry.json'

const logStream = fs.createWriteStream(logPath, { flags: 'a' })
const log = msg => {
  const timestamp = new Date().toISOString()
  const entry = `[${timestamp}] ${msg}`
  console.log(entry)
  logStream.write(entry + '\n')
}

function runAgent() {
  log('✅ Lucidra agent started')

  if (!registry.validate(registryPath)) {
    log('❌ Registry validation failed')
    process.exit(1)
  }

  tasks.execute(() => {
    log('📦 Agent completed task successfully.')
    log('🔚 Lucidra agent stopped')
    process.exit(0)
  })
}

module.exports = { runAgent }
