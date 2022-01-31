import * as express from 'express'
import * as path from 'path'
import * as fs from 'fs-extra'

export interface MockConfig {
  port?: number
  method?: 'get' | 'post' | ({} & string)
  mockDir?: string
}

const basePath = process.cwd()

export default function main(config: MockConfig) {
  const app = express()
  const { port = 3000, mockDir = 'mock', method = 'get' } = config

  fs.readdirSync(path.resolve(basePath, mockDir)).forEach(file => {
    const modulePath = path.resolve(basePath, mockDir, file)
    const module = require(modulePath)

    let config = module
    if (module.default) config = module.default()
    if (typeof module === 'function') config = module()

    const mockList = Array.isArray(config) ? config : [config]

    mockList.forEach(meta => {
      app[meta.method || method](meta.path, (req, res) => {
        const queryScene = req.query
        const data = meta.data.find(({ scene }) => scene === queryScene) || meta.data[0]
        const resp = typeof data.response === 'function' ? data.response(req, res) : data.response
        res.json(resp)
      })
    })
  })

  app.listen(port, () => {
    console.log(`Mock server listening on port ${port}`)
  })
}

export type MockArgs = Parameters<typeof main>;
