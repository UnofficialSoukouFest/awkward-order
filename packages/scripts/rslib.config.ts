import { defineConfig } from '@rslib/core'

export default defineConfig({
  source: {
    tsconfigPath: 'tsconfig.json',
    entry: {
      latimeria: 'bin/latimeria.ts',
    },
  },
  lib: [
    {
      format: 'esm',
      bundle: true,
      output: {
        distPath: {
          root: './dist/esm',
        },
        minify: true,
      },
    },
    {
      format: 'cjs',
      bundle: true,
      output: {
        distPath: {
          root: './dist/cjs',
        },
        minify: false,
      },
    },
  ],
})
