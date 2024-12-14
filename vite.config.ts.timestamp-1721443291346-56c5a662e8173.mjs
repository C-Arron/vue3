// vite.config.ts
import { loadEnv } from "file:///D:/%E6%A1%8C%E9%9D%A2/v3-admin-vite-main/project/node_modules/.pnpm/vite@5.3.3_@types+node@20.14.10_sass@1.77.8/node_modules/vite/dist/node/index.js"
import path, { resolve } from "path"
import vue from "file:///D:/%E6%A1%8C%E9%9D%A2/v3-admin-vite-main/project/node_modules/.pnpm/@vitejs+plugin-vue@5.0.5_vite@5.3.3_@types+node@20.14.10_sass@1.77.8__vue@3.4.31_typescript@5.5.3_/node_modules/@vitejs/plugin-vue/dist/index.mjs"
import vueJsx from "file:///D:/%E6%A1%8C%E9%9D%A2/v3-admin-vite-main/project/node_modules/.pnpm/@vitejs+plugin-vue-jsx@4.0.0_vite@5.3.3_@types+node@20.14.10_sass@1.77.8__vue@3.4.31_typescript@5.5.3_/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs"
import { createSvgIconsPlugin } from "file:///D:/%E6%A1%8C%E9%9D%A2/v3-admin-vite-main/project/node_modules/.pnpm/vite-plugin-svg-icons@2.0.1_vite@5.3.3_@types+node@20.14.10_sass@1.77.8_/node_modules/vite-plugin-svg-icons/dist/index.mjs"
import svgLoader from "file:///D:/%E6%A1%8C%E9%9D%A2/v3-admin-vite-main/project/node_modules/.pnpm/vite-svg-loader@5.1.0_vue@3.4.31_typescript@5.5.3_/node_modules/vite-svg-loader/index.js"
import UnoCSS from "file:///D:/%E6%A1%8C%E9%9D%A2/v3-admin-vite-main/project/node_modules/.pnpm/unocss@0.61.3_postcss@5.2.18_rollup@4.18.1_vite@5.3.3_@types+node@20.14.10_sass@1.77.8_/node_modules/unocss/dist/vite.mjs"
const __vite_injected_original_dirname = "D:\\\u684C\u9762\\v3-admin-vite-main\\project"
const vite_config_default = ({ mode }) => {
  const viteEnv = loadEnv(mode, process.cwd())
  const { VITE_PUBLIC_PATH } = viteEnv
  return {
    /** 打包时根据实际情况修改 base */
    base: VITE_PUBLIC_PATH,
    resolve: {
      alias: {
        /** @ 符号指向 src 目录 */
        "@": resolve(__vite_injected_original_dirname, "./src")
      }
    },
    server: {
      /** 设置 host: true 才可以使用 Network 的形式，以 IP 访问项目 */
      host: true,
      // host: "0.0.0.0"
      /** 端口号 */
      port: 3333,
      /** 是否自动打开浏览器 */
      open: false,
      /** 跨域设置允许 */
      cors: true,
      /** 端口被占用时，是否直接退出 */
      strictPort: false,
      /** 接口代理 */
      proxy: {
        "/api/v1": {
          // target: "https://mock.mengxuegu.com/mock/669cc52ff7321d15f1d530ff/cj",
          target: "https://mock.mengxuegu.com/mock/63218b5fb4c53348ed2bc212",
          ws: true,
          /** 是否允许跨域 */
          changeOrigin: true
        }
      },
      /** 预热常用文件，提高初始页面加载速度 */
      warmup: {
        clientFiles: ["./src/layouts/**/*.vue"]
      }
    },
    build: {
      /** 单个 chunk 文件的大小超过 2048KB 时发出警告 */
      chunkSizeWarningLimit: 2048,
      /** 禁用 gzip 压缩大小报告 */
      reportCompressedSize: false,
      /** 打包后静态资源目录 */
      assetsDir: "static",
      rollupOptions: {
        output: {
          /**
           * 分块策略
           * 1. 注意这些包名必须存在，否则打包会报错
           * 2. 如果你不想自定义 chunk 分割策略，可以直接移除这段配置
           */
          manualChunks: {
            vue: ["vue", "vue-router", "pinia"],
            element: ["element-plus", "@element-plus/icons-vue"],
            vxe: ["vxe-table", "vxe-table-plugin-element", "xe-utils"]
          }
        }
      }
    },
    /** 混淆器 */
    esbuild:
      mode === "development"
        ? void 0
        : {
            /** 打包时移除 console.log */
            pure: ["console.log"],
            /** 打包时移除 debugger */
            drop: ["debugger"],
            /** 打包时移除所有注释 */
            legalComments: "none"
          },
    /** Vite 插件 */
    plugins: [
      vue(),
      vueJsx(),
      /** 将 SVG 静态图转化为 Vue 组件 */
      svgLoader({ defaultImport: "url" }),
      /** SVG */
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), "src/icons/svg")],
        symbolId: "icon-[dir]-[name]"
      }),
      /** UnoCSS */
      UnoCSS()
    ],
    /** Vitest 单元测试配置：https://cn.vitest.dev/config */
    test: {
      include: ["tests/**/*.test.ts"],
      environment: "jsdom"
    }
  }
}
export { vite_config_default as default }
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxcdTY4NENcdTk3NjJcXFxcdjMtYWRtaW4tdml0ZS1tYWluXFxcXHByb2plY3RcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXFx1Njg0Q1x1OTc2MlxcXFx2My1hZG1pbi12aXRlLW1haW5cXFxccHJvamVjdFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovJUU2JUExJThDJUU5JTlEJUEyL3YzLWFkbWluLXZpdGUtbWFpbi9wcm9qZWN0L3ZpdGUuY29uZmlnLnRzXCI7Ly8vIDxyZWZlcmVuY2UgdHlwZXM9XCJ2aXRlc3RcIiAvPlxuXG5pbXBvcnQgeyB0eXBlIENvbmZpZ0VudiwgdHlwZSBVc2VyQ29uZmlnRXhwb3J0LCBsb2FkRW52IH0gZnJvbSBcInZpdGVcIlxuaW1wb3J0IHBhdGgsIHsgcmVzb2x2ZSB9IGZyb20gXCJwYXRoXCJcbmltcG9ydCB2dWUgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXZ1ZVwiXG5pbXBvcnQgdnVlSnN4IGZyb20gXCJAdml0ZWpzL3BsdWdpbi12dWUtanN4XCJcbmltcG9ydCB7IGNyZWF0ZVN2Z0ljb25zUGx1Z2luIH0gZnJvbSBcInZpdGUtcGx1Z2luLXN2Zy1pY29uc1wiXG5pbXBvcnQgc3ZnTG9hZGVyIGZyb20gXCJ2aXRlLXN2Zy1sb2FkZXJcIlxuaW1wb3J0IFVub0NTUyBmcm9tIFwidW5vY3NzL3ZpdGVcIlxuXG4vKiogXHU5MTREXHU3RjZFXHU5ODc5XHU2NTg3XHU2ODYzXHVGRjFBaHR0cHM6Ly9jbi52aXRlanMuZGV2L2NvbmZpZyAqL1xuZXhwb3J0IGRlZmF1bHQgKHsgbW9kZSB9OiBDb25maWdFbnYpOiBVc2VyQ29uZmlnRXhwb3J0ID0+IHtcbiAgY29uc3Qgdml0ZUVudiA9IGxvYWRFbnYobW9kZSwgcHJvY2Vzcy5jd2QoKSkgYXMgSW1wb3J0TWV0YUVudlxuICBjb25zdCB7IFZJVEVfUFVCTElDX1BBVEggfSA9IHZpdGVFbnZcbiAgcmV0dXJuIHtcbiAgICAvKiogXHU2MjUzXHU1MzA1XHU2NUY2XHU2ODM5XHU2MzZFXHU1QjlFXHU5NjQ1XHU2MEM1XHU1MUI1XHU0RkVFXHU2NTM5IGJhc2UgKi9cbiAgICBiYXNlOiBWSVRFX1BVQkxJQ19QQVRILFxuICAgIHJlc29sdmU6IHtcbiAgICAgIGFsaWFzOiB7XG4gICAgICAgIC8qKiBAIFx1N0IyNlx1NTNGN1x1NjMwN1x1NTQxMSBzcmMgXHU3NkVFXHU1RjU1ICovXG4gICAgICAgIFwiQFwiOiByZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyY1wiKVxuICAgICAgfVxuICAgIH0sXG4gICAgc2VydmVyOiB7XG4gICAgICAvKiogXHU4QkJFXHU3RjZFIGhvc3Q6IHRydWUgXHU2MjREXHU1M0VGXHU0RUU1XHU0RjdGXHU3NTI4IE5ldHdvcmsgXHU3Njg0XHU1RjYyXHU1RjBGXHVGRjBDXHU0RUU1IElQIFx1OEJCRlx1OTVFRVx1OTg3OVx1NzZFRSAqL1xuICAgICAgaG9zdDogdHJ1ZSwgLy8gaG9zdDogXCIwLjAuMC4wXCJcbiAgICAgIC8qKiBcdTdBRUZcdTUzRTNcdTUzRjcgKi9cbiAgICAgIHBvcnQ6IDMzMzMsXG4gICAgICAvKiogXHU2NjJGXHU1NDI2XHU4MUVBXHU1MkE4XHU2MjUzXHU1RjAwXHU2RDRGXHU4OUM4XHU1NjY4ICovXG4gICAgICBvcGVuOiBmYWxzZSxcbiAgICAgIC8qKiBcdThERThcdTU3REZcdThCQkVcdTdGNkVcdTUxNDFcdThCQjggKi9cbiAgICAgIGNvcnM6IHRydWUsXG4gICAgICAvKiogXHU3QUVGXHU1M0UzXHU4OEFCXHU1MzYwXHU3NTI4XHU2NUY2XHVGRjBDXHU2NjJGXHU1NDI2XHU3NkY0XHU2M0E1XHU5MDAwXHU1MUZBICovXG4gICAgICBzdHJpY3RQb3J0OiBmYWxzZSxcbiAgICAgIC8qKiBcdTYzQTVcdTUzRTNcdTRFRTNcdTc0MDYgKi9cbiAgICAgIHByb3h5OiB7XG4gICAgICAgIFwiL2FwaS92MVwiOiB7XG4gICAgICAgICAgdGFyZ2V0OiBcImh0dHBzOi8vbW9jay5tZW5neHVlZ3UuY29tL21vY2svNjMyMThiNWZiNGM1MzM0OGVkMmJjMjEyXCIsXG4gICAgICAgICAgd3M6IHRydWUsXG4gICAgICAgICAgLyoqIFx1NjYyRlx1NTQyNlx1NTE0MVx1OEJCOFx1OERFOFx1NTdERiAqL1xuICAgICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgLyoqIFx1OTg4NFx1NzBFRFx1NUUzOFx1NzUyOFx1NjU4N1x1NEVGNlx1RkYwQ1x1NjNEMFx1OUFEOFx1NTIxRFx1NTlDQlx1OTg3NVx1OTc2Mlx1NTJBMFx1OEY3RFx1OTAxRlx1NUVBNiAqL1xuICAgICAgd2FybXVwOiB7XG4gICAgICAgIGNsaWVudEZpbGVzOiBbXCIuL3NyYy9sYXlvdXRzLyoqLyoudnVlXCJdXG4gICAgICB9XG4gICAgfSxcbiAgICBidWlsZDoge1xuICAgICAgLyoqIFx1NTM1NVx1NEUyQSBjaHVuayBcdTY1ODdcdTRFRjZcdTc2ODRcdTU5MjdcdTVDMEZcdThEODVcdThGQzcgMjA0OEtCIFx1NjVGNlx1NTNEMVx1NTFGQVx1OEI2Nlx1NTQ0QSAqL1xuICAgICAgY2h1bmtTaXplV2FybmluZ0xpbWl0OiAyMDQ4LFxuICAgICAgLyoqIFx1Nzk4MVx1NzUyOCBnemlwIFx1NTM4Qlx1N0YyOVx1NTkyN1x1NUMwRlx1NjJBNVx1NTQ0QSAqL1xuICAgICAgcmVwb3J0Q29tcHJlc3NlZFNpemU6IGZhbHNlLFxuICAgICAgLyoqIFx1NjI1M1x1NTMwNVx1NTQwRVx1OTc1OVx1NjAwMVx1OEQ0NFx1NkU5MFx1NzZFRVx1NUY1NSAqL1xuICAgICAgYXNzZXRzRGlyOiBcInN0YXRpY1wiLFxuICAgICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgICBvdXRwdXQ6IHtcbiAgICAgICAgICAvKipcbiAgICAgICAgICAgKiBcdTUyMDZcdTU3NTdcdTdCNTZcdTc1NjVcbiAgICAgICAgICAgKiAxLiBcdTZDRThcdTYxMEZcdThGRDlcdTRFOUJcdTUzMDVcdTU0MERcdTVGQzVcdTk4N0JcdTVCNThcdTU3MjhcdUZGMENcdTU0MjZcdTUyMTlcdTYyNTNcdTUzMDVcdTRGMUFcdTYyQTVcdTk1MTlcbiAgICAgICAgICAgKiAyLiBcdTU5ODJcdTY3OUNcdTRGNjBcdTRFMERcdTYwRjNcdTgxRUFcdTVCOUFcdTRFNDkgY2h1bmsgXHU1MjA2XHU1MjcyXHU3QjU2XHU3NTY1XHVGRjBDXHU1M0VGXHU0RUU1XHU3NkY0XHU2M0E1XHU3OUZCXHU5NjY0XHU4RkQ5XHU2QkI1XHU5MTREXHU3RjZFXG4gICAgICAgICAgICovXG4gICAgICAgICAgbWFudWFsQ2h1bmtzOiB7XG4gICAgICAgICAgICB2dWU6IFtcInZ1ZVwiLCBcInZ1ZS1yb3V0ZXJcIiwgXCJwaW5pYVwiXSxcbiAgICAgICAgICAgIGVsZW1lbnQ6IFtcImVsZW1lbnQtcGx1c1wiLCBcIkBlbGVtZW50LXBsdXMvaWNvbnMtdnVlXCJdLFxuICAgICAgICAgICAgdnhlOiBbXCJ2eGUtdGFibGVcIiwgXCJ2eGUtdGFibGUtcGx1Z2luLWVsZW1lbnRcIiwgXCJ4ZS11dGlsc1wiXVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgLyoqIFx1NkRGN1x1NkRDNlx1NTY2OCAqL1xuICAgIGVzYnVpbGQ6XG4gICAgICBtb2RlID09PSBcImRldmVsb3BtZW50XCJcbiAgICAgICAgPyB1bmRlZmluZWRcbiAgICAgICAgOiB7XG4gICAgICAgICAgICAvKiogXHU2MjUzXHU1MzA1XHU2NUY2XHU3OUZCXHU5NjY0IGNvbnNvbGUubG9nICovXG4gICAgICAgICAgICBwdXJlOiBbXCJjb25zb2xlLmxvZ1wiXSxcbiAgICAgICAgICAgIC8qKiBcdTYyNTNcdTUzMDVcdTY1RjZcdTc5RkJcdTk2NjQgZGVidWdnZXIgKi9cbiAgICAgICAgICAgIGRyb3A6IFtcImRlYnVnZ2VyXCJdLFxuICAgICAgICAgICAgLyoqIFx1NjI1M1x1NTMwNVx1NjVGNlx1NzlGQlx1OTY2NFx1NjI0MFx1NjcwOVx1NkNFOFx1OTFDQSAqL1xuICAgICAgICAgICAgbGVnYWxDb21tZW50czogXCJub25lXCJcbiAgICAgICAgICB9LFxuICAgIC8qKiBWaXRlIFx1NjNEMlx1NEVGNiAqL1xuICAgIHBsdWdpbnM6IFtcbiAgICAgIHZ1ZSgpLFxuICAgICAgdnVlSnN4KCksXG4gICAgICAvKiogXHU1QzA2IFNWRyBcdTk3NTlcdTYwMDFcdTU2RkVcdThGNkNcdTUzMTZcdTRFM0EgVnVlIFx1N0VDNFx1NEVGNiAqL1xuICAgICAgc3ZnTG9hZGVyKHsgZGVmYXVsdEltcG9ydDogXCJ1cmxcIiB9KSxcbiAgICAgIC8qKiBTVkcgKi9cbiAgICAgIGNyZWF0ZVN2Z0ljb25zUGx1Z2luKHtcbiAgICAgICAgaWNvbkRpcnM6IFtwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgXCJzcmMvaWNvbnMvc3ZnXCIpXSxcbiAgICAgICAgc3ltYm9sSWQ6IFwiaWNvbi1bZGlyXS1bbmFtZV1cIlxuICAgICAgfSksXG4gICAgICAvKiogVW5vQ1NTICovXG4gICAgICBVbm9DU1MoKVxuICAgIF0sXG4gICAgLyoqIFZpdGVzdCBcdTUzNTVcdTUxNDNcdTZENEJcdThCRDVcdTkxNERcdTdGNkVcdUZGMUFodHRwczovL2NuLnZpdGVzdC5kZXYvY29uZmlnICovXG4gICAgdGVzdDoge1xuICAgICAgaW5jbHVkZTogW1widGVzdHMvKiovKi50ZXN0LnRzXCJdLFxuICAgICAgZW52aXJvbm1lbnQ6IFwianNkb21cIlxuICAgIH1cbiAgfVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUVBLFNBQWdELGVBQWU7QUFDL0QsT0FBTyxRQUFRLGVBQWU7QUFDOUIsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sWUFBWTtBQUNuQixTQUFTLDRCQUE0QjtBQUNyQyxPQUFPLGVBQWU7QUFDdEIsT0FBTyxZQUFZO0FBUm5CLElBQU0sbUNBQW1DO0FBV3pDLElBQU8sc0JBQVEsQ0FBQyxFQUFFLEtBQUssTUFBbUM7QUFDeEQsUUFBTSxVQUFVLFFBQVEsTUFBTSxRQUFRLElBQUksQ0FBQztBQUMzQyxRQUFNLEVBQUUsaUJBQWlCLElBQUk7QUFDN0IsU0FBTztBQUFBO0FBQUEsSUFFTCxNQUFNO0FBQUEsSUFDTixTQUFTO0FBQUEsTUFDUCxPQUFPO0FBQUE7QUFBQSxRQUVMLEtBQUssUUFBUSxrQ0FBVyxPQUFPO0FBQUEsTUFDakM7QUFBQSxJQUNGO0FBQUEsSUFDQSxRQUFRO0FBQUE7QUFBQSxNQUVOLE1BQU07QUFBQTtBQUFBO0FBQUEsTUFFTixNQUFNO0FBQUE7QUFBQSxNQUVOLE1BQU07QUFBQTtBQUFBLE1BRU4sTUFBTTtBQUFBO0FBQUEsTUFFTixZQUFZO0FBQUE7QUFBQSxNQUVaLE9BQU87QUFBQSxRQUNMLFdBQVc7QUFBQSxVQUNULFFBQVE7QUFBQSxVQUNSLElBQUk7QUFBQTtBQUFBLFVBRUosY0FBYztBQUFBLFFBQ2hCO0FBQUEsTUFDRjtBQUFBO0FBQUEsTUFFQSxRQUFRO0FBQUEsUUFDTixhQUFhLENBQUMsd0JBQXdCO0FBQUEsTUFDeEM7QUFBQSxJQUNGO0FBQUEsSUFDQSxPQUFPO0FBQUE7QUFBQSxNQUVMLHVCQUF1QjtBQUFBO0FBQUEsTUFFdkIsc0JBQXNCO0FBQUE7QUFBQSxNQUV0QixXQUFXO0FBQUEsTUFDWCxlQUFlO0FBQUEsUUFDYixRQUFRO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFVBTU4sY0FBYztBQUFBLFlBQ1osS0FBSyxDQUFDLE9BQU8sY0FBYyxPQUFPO0FBQUEsWUFDbEMsU0FBUyxDQUFDLGdCQUFnQix5QkFBeUI7QUFBQSxZQUNuRCxLQUFLLENBQUMsYUFBYSw0QkFBNEIsVUFBVTtBQUFBLFVBQzNEO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUE7QUFBQSxJQUVBLFNBQ0UsU0FBUyxnQkFDTCxTQUNBO0FBQUE7QUFBQSxNQUVFLE1BQU0sQ0FBQyxhQUFhO0FBQUE7QUFBQSxNQUVwQixNQUFNLENBQUMsVUFBVTtBQUFBO0FBQUEsTUFFakIsZUFBZTtBQUFBLElBQ2pCO0FBQUE7QUFBQSxJQUVOLFNBQVM7QUFBQSxNQUNQLElBQUk7QUFBQSxNQUNKLE9BQU87QUFBQTtBQUFBLE1BRVAsVUFBVSxFQUFFLGVBQWUsTUFBTSxDQUFDO0FBQUE7QUFBQSxNQUVsQyxxQkFBcUI7QUFBQSxRQUNuQixVQUFVLENBQUMsS0FBSyxRQUFRLFFBQVEsSUFBSSxHQUFHLGVBQWUsQ0FBQztBQUFBLFFBQ3ZELFVBQVU7QUFBQSxNQUNaLENBQUM7QUFBQTtBQUFBLE1BRUQsT0FBTztBQUFBLElBQ1Q7QUFBQTtBQUFBLElBRUEsTUFBTTtBQUFBLE1BQ0osU0FBUyxDQUFDLG9CQUFvQjtBQUFBLE1BQzlCLGFBQWE7QUFBQSxJQUNmO0FBQUEsRUFDRjtBQUNGOyIsCiAgIm5hbWVzIjogW10KfQo=
