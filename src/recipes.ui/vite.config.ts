import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa';


const pwaManifest: Partial<VitePWAOptions> = {
    base: '/',
    registerType: 'prompt',
    manifest: {
        background_color: "#0f172a",
        description: "my recipe app",
        dir: "ltr",
        display: "standalone",
        name: "recipe-app",
        orientation: "any",
        scope: "/",
        short_name: "recipes",
        start_url: "/",
        theme_color: "#008f00",
        icons: [
            {
                src: "bowl.svg",
                sizes: "64x64 32x32 24x24 16x16",
                type: "image/x-icon"
            },
            {
                src: "bowl.svg",
                type: "image/png",
                sizes: "512x512",
                purpose: "maskable any"
            }
        ]
    }
}
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        VitePWA(pwaManifest)
    ]
})
