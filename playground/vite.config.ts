import path from 'path'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const srcPath = path.resolve(__dirname, '../src')

export default defineConfig({
    plugins: [react()],
    root: __dirname,
    resolve: {
        alias: [
            // Alias interne de la lib pour résoudre @/ (doit être avant les autres)
            { find: /^@\/(.*)/, replacement: `${srcPath}/$1` },
            // Permet d'importer directement depuis les sources de la lib
            { find: '@aurora-ds/theme', replacement: srcPath },
        ],
    },
    server: {
        port: 3000,
        open: true,
    },
})
