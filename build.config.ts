import { promises as fsp } from 'node:fs'

import { defineBuildConfig } from 'unbuild'
import { transform } from 'esbuild'

export default defineBuildConfig({
  rollup: { emitCJS: true },
  externals: ['node:url'],
  hooks: {
    async 'build:done'() {
      const script = await fsp.readFile('./src/script.mjs', 'utf-8')
      const { code } = await transform(script, {
        loader: 'js',
        format: 'esm',
        minify: true,
      })
      await fsp.writeFile('./dist/script.mjs', code, 'utf-8')
    },
  },
})
