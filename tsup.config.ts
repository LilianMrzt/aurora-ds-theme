import { defineConfig } from 'tsup'

export default defineConfig({
    entry: ['src/index.ts'],
    format: ['cjs', 'esm'],
    dts: true,
    clean: true,
    sourcemap: true,
    minify: true,
    splitting: false,
    treeshake: true,
    external: ['react', 'react-dom'],
    tsconfig: 'tsconfig.build.json',
    esbuildOptions(options) {
        options.banner = {
            js: '"use client";',
        }
        // Supprime les commentaires de licence pour réduire la taille
        options.legalComments = 'none'
    },
})

