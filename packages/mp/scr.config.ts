import { Config } from '@xdoer/script-runner/lib/types'
import { RouterArgs } from '@xdoer/taro-router'
import { ChokidarArgs } from '@xdoer/chokidar'
import { MockArgs } from './script/mock'
const debounce = require('lodash/debounce')
import runScript from '@xdoer/script-runner/lib/runScript'

const debounceExec = debounce((script = '@xdoer/taro-router') => {
  console.log(`监听到变化, 脚本${script}执行中...`, script)
  runScript(config.scripts.find((v) => v.module === script)!)
}, 1000)

const basePath = process.cwd()

const config: Config = {
  scripts: [
    {
      module: '@xdoer/taro-router',
      group: 1,
      args: <RouterArgs>[
        {
          // 源码目录
          pageDir: basePath + '/src',

          // app.config 路径
          appConfigPath: basePath + '/src/app.config.ts',

          // 输出文件名
          outPutPath: basePath + '/src/service/routerService.ts',

          navigateFnName: 'navigateTo', // 导入方法名
          navigateSpecifier: '@/common/router', // 方法导入标识符
        },
      ],
    },
    {
      module: '@xdoer/chokidar',
      args: <ChokidarArgs>[
        {
          options: { persistent: true, ignoreInitial: true },
          list: [
            {
              target: basePath + '/src/**/pages/**/index.tsx',
              watch: {
                add: () => debounceExec(),
              },
            },
            {
              target: basePath + '/src/**/pages/**',
              watch: {
                unlinkDir: () => debounceExec(),
              },
            },
            {
              target: basePath + '/mock/routes/**.ts',
              watch: {
                change: () => {
                  debounceExec(basePath + '/script/mock.ts')
                },
              },
            },
          ],
        },
      ],
    },
    {
      module: basePath + '/script/mock.ts',
      args: <MockArgs>[
        {
          port: 3000,
          mockDir: './mock/routes',
        },
      ],
      subProcess: true,
    },
  ],
}

export default config
