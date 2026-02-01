import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import cesium from 'vite-plugin-cesium'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  return {
    base: env.VITE_APP_PRE_URL,
    server: {
      host: true, // 或 '0.0.0.0'
      strictPort: false, // 若端口被占用，自动 +1 找下一个可用端口
      port: 5173 // 你想用的端口
    },
    plugins: [
      vue(),
      cesium({
        cesiumBase: '/',
        assetsDir: '' // 去掉多余的 Cesium 目录
      }),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/icons')],
        inject: 'body-first',
        symbolId: 'icon-[name]'
      }),
      // 处理Cesium资源加载
      {
        name: 'cesium-resource-plugin',
        configureServer(server) {
          server.middlewares.use('/Assets', (req, res) => {
            res.statusCode = 404
            res.end('Not Found')
          })
        }
      }
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/assets/styles/index.scss" as *;`
        }
      }
      // 其他样式预处理器也可以在这里添加配置
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        cesium: path.resolve(__dirname, 'node_modules/cesium')
      }
    },
    optimizeDeps: {
      include: ['mersenne-twister']
      // exclude: ['cesium']
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            cesium: ['cesium']
          }
        }
      }
    }
  }
})
