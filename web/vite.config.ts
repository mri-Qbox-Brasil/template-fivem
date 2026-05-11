import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// Build outputa pra ../html/ (raiz do resource), padronizado com mri_Qmultichar
// e mri_Qspawn. fxmanifest.lua aponta `ui_page 'html/index.html'`.
export default defineConfig({
    plugins: [react()],
    base: './', // Vital pra NUI do FiveM (paths relativos no index.html)
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
        },
    },
    build: {
        outDir: resolve(__dirname, '../html'),
        emptyOutDir: true,
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
            },
            output: {
                entryFileNames: 'assets/[name].js',
                chunkFileNames: 'assets/[name].js',
                assetFileNames: 'assets/[name].[ext]',
            },
        },
    },
})
