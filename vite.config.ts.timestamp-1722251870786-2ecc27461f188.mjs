// vite.config.ts
import { loadEnv } from "file:///D:/%E6%A1%8C%E9%9D%A2/v3-admin-vite-main/project/node_modules/.pnpm/vite@5.3.3_@types+node@20.14.10_sass@1.77.8/node_modules/vite/dist/node/index.js";
import path, { resolve } from "path";
import vue from "file:///D:/%E6%A1%8C%E9%9D%A2/v3-admin-vite-main/project/node_modules/.pnpm/@vitejs+plugin-vue@5.0.5_vite@5.3.3_@types+node@20.14.10_sass@1.77.8__vue@3.4.31_typescript@5.5.3_/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///D:/%E6%A1%8C%E9%9D%A2/v3-admin-vite-main/project/node_modules/.pnpm/@vitejs+plugin-vue-jsx@4.0.0_vite@5.3.3_@types+node@20.14.10_sass@1.77.8__vue@3.4.31_typescript@5.5.3_/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import { createSvgIconsPlugin } from "file:///D:/%E6%A1%8C%E9%9D%A2/v3-admin-vite-main/project/node_modules/.pnpm/vite-plugin-svg-icons@2.0.1_vite@5.3.3_@types+node@20.14.10_sass@1.77.8_/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import svgLoader from "file:///D:/%E6%A1%8C%E9%9D%A2/v3-admin-vite-main/project/node_modules/.pnpm/vite-svg-loader@5.1.0_vue@3.4.31_typescript@5.5.3_/node_modules/vite-svg-loader/index.js";
import UnoCSS from "file:///D:/%E6%A1%8C%E9%9D%A2/v3-admin-vite-main/project/node_modules/.pnpm/unocss@0.61.3_postcss@5.2.18_rollup@4.18.1_vite@5.3.3_@types+node@20.14.10_sass@1.77.8_/node_modules/unocss/dist/vite.mjs";
var __vite_injected_original_dirname = "D:\\\u684C\u9762\\v3-admin-vite-main\\project";
var vite_config_default = ({ mode }) => {
  const viteEnv = loadEnv(mode, process.cwd());
  const { VITE_PUBLIC_PATH } = viteEnv;
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
          // target: "https://mock.mengxuegu.com/mock/63218b5fb4c53348ed2bc212",
          target: " https://mock.mengxuegu.com/mock/669cc52ff7321d15f1d530ff/cj",
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
    esbuild: mode === "development" ? void 0 : {
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
  };
};
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxcdTY4NENcdTk3NjJcXFxcdjMtYWRtaW4tdml0ZS1tYWluXFxcXHByb2plY3RcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXFx1Njg0Q1x1OTc2MlxcXFx2My1hZG1pbi12aXRlLW1haW5cXFxccHJvamVjdFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovJUU2JUExJThDJUU5JTlEJUEyL3YzLWFkbWluLXZpdGUtbWFpbi9wcm9qZWN0L3ZpdGUuY29uZmlnLnRzXCI7Ly8vIDxyZWZlcmVuY2UgdHlwZXM9XCJ2aXRlc3RcIiAvPlxuXG5pbXBvcnQgeyB0eXBlIENvbmZpZ0VudiwgdHlwZSBVc2VyQ29uZmlnRXhwb3J0LCBsb2FkRW52IH0gZnJvbSBcInZpdGVcIlxuaW1wb3J0IHBhdGgsIHsgcmVzb2x2ZSB9IGZyb20gXCJwYXRoXCJcbmltcG9ydCB2dWUgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXZ1ZVwiXG5pbXBvcnQgdnVlSnN4IGZyb20gXCJAdml0ZWpzL3BsdWdpbi12dWUtanN4XCJcbmltcG9ydCB7IGNyZWF0ZVN2Z0ljb25zUGx1Z2luIH0gZnJvbSBcInZpdGUtcGx1Z2luLXN2Zy1pY29uc1wiXG5pbXBvcnQgc3ZnTG9hZGVyIGZyb20gXCJ2aXRlLXN2Zy1sb2FkZXJcIlxuaW1wb3J0IFVub0NTUyBmcm9tIFwidW5vY3NzL3ZpdGVcIlxuXG4vKiogXHU5MTREXHU3RjZFXHU5ODc5XHU2NTg3XHU2ODYzXHVGRjFBaHR0cHM6Ly9jbi52aXRlanMuZGV2L2NvbmZpZyAqL1xuZXhwb3J0IGRlZmF1bHQgKHsgbW9kZSB9OiBDb25maWdFbnYpOiBVc2VyQ29uZmlnRXhwb3J0ID0+IHtcbiAgY29uc3Qgdml0ZUVudiA9IGxvYWRFbnYobW9kZSwgcHJvY2Vzcy5jd2QoKSkgYXMgSW1wb3J0TWV0YUVudlxuICBjb25zdCB7IFZJVEVfUFVCTElDX1BBVEggfSA9IHZpdGVFbnZcbiAgcmV0dXJuIHtcbiAgICAvKiogXHU2MjUzXHU1MzA1XHU2NUY2XHU2ODM5XHU2MzZFXHU1QjlFXHU5NjQ1XHU2MEM1XHU1MUI1XHU0RkVFXHU2NTM5IGJhc2UgKi9cbiAgICBiYXNlOiBWSVRFX1BVQkxJQ19QQVRILFxuICAgIHJlc29sdmU6IHtcbiAgICAgIGFsaWFzOiB7XG4gICAgICAgIC8qKiBAIFx1N0IyNlx1NTNGN1x1NjMwN1x1NTQxMSBzcmMgXHU3NkVFXHU1RjU1ICovXG4gICAgICAgIFwiQFwiOiByZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyY1wiKVxuICAgICAgfVxuICAgIH0sXG4gICAgc2VydmVyOiB7XG4gICAgICAvKiogXHU4QkJFXHU3RjZFIGhvc3Q6IHRydWUgXHU2MjREXHU1M0VGXHU0RUU1XHU0RjdGXHU3NTI4IE5ldHdvcmsgXHU3Njg0XHU1RjYyXHU1RjBGXHVGRjBDXHU0RUU1IElQIFx1OEJCRlx1OTVFRVx1OTg3OVx1NzZFRSAqL1xuICAgICAgaG9zdDogdHJ1ZSwgLy8gaG9zdDogXCIwLjAuMC4wXCJcbiAgICAgIC8qKiBcdTdBRUZcdTUzRTNcdTUzRjcgKi9cbiAgICAgIHBvcnQ6IDMzMzMsXG4gICAgICAvKiogXHU2NjJGXHU1NDI2XHU4MUVBXHU1MkE4XHU2MjUzXHU1RjAwXHU2RDRGXHU4OUM4XHU1NjY4ICovXG4gICAgICBvcGVuOiBmYWxzZSxcbiAgICAgIC8qKiBcdThERThcdTU3REZcdThCQkVcdTdGNkVcdTUxNDFcdThCQjggKi9cbiAgICAgIGNvcnM6IHRydWUsXG4gICAgICAvKiogXHU3QUVGXHU1M0UzXHU4OEFCXHU1MzYwXHU3NTI4XHU2NUY2XHVGRjBDXHU2NjJGXHU1NDI2XHU3NkY0XHU2M0E1XHU5MDAwXHU1MUZBICovXG4gICAgICBzdHJpY3RQb3J0OiBmYWxzZSxcbiAgICAgIC8qKiBcdTYzQTVcdTUzRTNcdTRFRTNcdTc0MDYgKi9cbiAgICAgIHByb3h5OiB7XG4gICAgICAgIFwiL2FwaS92MVwiOiB7XG4gICAgICAgICAgLy8gdGFyZ2V0OiBcImh0dHBzOi8vbW9jay5tZW5neHVlZ3UuY29tL21vY2svNjMyMThiNWZiNGM1MzM0OGVkMmJjMjEyXCIsXG4gICAgICAgICAgdGFyZ2V0OiBcIiBodHRwczovL21vY2subWVuZ3h1ZWd1LmNvbS9tb2NrLzY2OWNjNTJmZjczMjFkMTVmMWQ1MzBmZi9jalwiLFxuICAgICAgICAgIHdzOiB0cnVlLFxuICAgICAgICAgIC8qKiBcdTY2MkZcdTU0MjZcdTUxNDFcdThCQjhcdThERThcdTU3REYgKi9cbiAgICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWVcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIC8qKiBcdTk4ODRcdTcwRURcdTVFMzhcdTc1MjhcdTY1ODdcdTRFRjZcdUZGMENcdTYzRDBcdTlBRDhcdTUyMURcdTU5Q0JcdTk4NzVcdTk3NjJcdTUyQTBcdThGN0RcdTkwMUZcdTVFQTYgKi9cbiAgICAgIHdhcm11cDoge1xuICAgICAgICBjbGllbnRGaWxlczogW1wiLi9zcmMvbGF5b3V0cy8qKi8qLnZ1ZVwiXVxuICAgICAgfVxuICAgIH0sXG4gICAgYnVpbGQ6IHtcbiAgICAgIC8qKiBcdTUzNTVcdTRFMkEgY2h1bmsgXHU2NTg3XHU0RUY2XHU3Njg0XHU1OTI3XHU1QzBGXHU4RDg1XHU4RkM3IDIwNDhLQiBcdTY1RjZcdTUzRDFcdTUxRkFcdThCNjZcdTU0NEEgKi9cbiAgICAgIGNodW5rU2l6ZVdhcm5pbmdMaW1pdDogMjA0OCxcbiAgICAgIC8qKiBcdTc5ODFcdTc1MjggZ3ppcCBcdTUzOEJcdTdGMjlcdTU5MjdcdTVDMEZcdTYyQTVcdTU0NEEgKi9cbiAgICAgIHJlcG9ydENvbXByZXNzZWRTaXplOiBmYWxzZSxcbiAgICAgIC8qKiBcdTYyNTNcdTUzMDVcdTU0MEVcdTk3NTlcdTYwMDFcdThENDRcdTZFOTBcdTc2RUVcdTVGNTUgKi9cbiAgICAgIGFzc2V0c0RpcjogXCJzdGF0aWNcIixcbiAgICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgICAgb3V0cHV0OiB7XG4gICAgICAgICAgLyoqXG4gICAgICAgICAgICogXHU1MjA2XHU1NzU3XHU3QjU2XHU3NTY1XG4gICAgICAgICAgICogMS4gXHU2Q0U4XHU2MTBGXHU4RkQ5XHU0RTlCXHU1MzA1XHU1NDBEXHU1RkM1XHU5ODdCXHU1QjU4XHU1NzI4XHVGRjBDXHU1NDI2XHU1MjE5XHU2MjUzXHU1MzA1XHU0RjFBXHU2MkE1XHU5NTE5XG4gICAgICAgICAgICogMi4gXHU1OTgyXHU2NzlDXHU0RjYwXHU0RTBEXHU2MEYzXHU4MUVBXHU1QjlBXHU0RTQ5IGNodW5rIFx1NTIwNlx1NTI3Mlx1N0I1Nlx1NzU2NVx1RkYwQ1x1NTNFRlx1NEVFNVx1NzZGNFx1NjNBNVx1NzlGQlx1OTY2NFx1OEZEOVx1NkJCNVx1OTE0RFx1N0Y2RVxuICAgICAgICAgICAqL1xuICAgICAgICAgIG1hbnVhbENodW5rczoge1xuICAgICAgICAgICAgdnVlOiBbXCJ2dWVcIiwgXCJ2dWUtcm91dGVyXCIsIFwicGluaWFcIl0sXG4gICAgICAgICAgICBlbGVtZW50OiBbXCJlbGVtZW50LXBsdXNcIiwgXCJAZWxlbWVudC1wbHVzL2ljb25zLXZ1ZVwiXSxcbiAgICAgICAgICAgIHZ4ZTogW1widnhlLXRhYmxlXCIsIFwidnhlLXRhYmxlLXBsdWdpbi1lbGVtZW50XCIsIFwieGUtdXRpbHNcIl1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIC8qKiBcdTZERjdcdTZEQzZcdTU2NjggKi9cbiAgICBlc2J1aWxkOlxuICAgICAgbW9kZSA9PT0gXCJkZXZlbG9wbWVudFwiXG4gICAgICAgID8gdW5kZWZpbmVkXG4gICAgICAgIDoge1xuICAgICAgICAgICAgLyoqIFx1NjI1M1x1NTMwNVx1NjVGNlx1NzlGQlx1OTY2NCBjb25zb2xlLmxvZyAqL1xuICAgICAgICAgICAgcHVyZTogW1wiY29uc29sZS5sb2dcIl0sXG4gICAgICAgICAgICAvKiogXHU2MjUzXHU1MzA1XHU2NUY2XHU3OUZCXHU5NjY0IGRlYnVnZ2VyICovXG4gICAgICAgICAgICBkcm9wOiBbXCJkZWJ1Z2dlclwiXSxcbiAgICAgICAgICAgIC8qKiBcdTYyNTNcdTUzMDVcdTY1RjZcdTc5RkJcdTk2NjRcdTYyNDBcdTY3MDlcdTZDRThcdTkxQ0EgKi9cbiAgICAgICAgICAgIGxlZ2FsQ29tbWVudHM6IFwibm9uZVwiXG4gICAgICAgICAgfSxcbiAgICAvKiogVml0ZSBcdTYzRDJcdTRFRjYgKi9cbiAgICBwbHVnaW5zOiBbXG4gICAgICB2dWUoKSxcbiAgICAgIHZ1ZUpzeCgpLFxuICAgICAgLyoqIFx1NUMwNiBTVkcgXHU5NzU5XHU2MDAxXHU1NkZFXHU4RjZDXHU1MzE2XHU0RTNBIFZ1ZSBcdTdFQzRcdTRFRjYgKi9cbiAgICAgIHN2Z0xvYWRlcih7IGRlZmF1bHRJbXBvcnQ6IFwidXJsXCIgfSksXG4gICAgICAvKiogU1ZHICovXG4gICAgICBjcmVhdGVTdmdJY29uc1BsdWdpbih7XG4gICAgICAgIGljb25EaXJzOiBbcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksIFwic3JjL2ljb25zL3N2Z1wiKV0sXG4gICAgICAgIHN5bWJvbElkOiBcImljb24tW2Rpcl0tW25hbWVdXCJcbiAgICAgIH0pLFxuICAgICAgLyoqIFVub0NTUyAqL1xuICAgICAgVW5vQ1NTKClcbiAgICBdLFxuICAgIC8qKiBWaXRlc3QgXHU1MzU1XHU1MTQzXHU2RDRCXHU4QkQ1XHU5MTREXHU3RjZFXHVGRjFBaHR0cHM6Ly9jbi52aXRlc3QuZGV2L2NvbmZpZyAqL1xuICAgIHRlc3Q6IHtcbiAgICAgIGluY2x1ZGU6IFtcInRlc3RzLyoqLyoudGVzdC50c1wiXSxcbiAgICAgIGVudmlyb25tZW50OiBcImpzZG9tXCJcbiAgICB9XG4gIH1cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7QUFFQSxTQUFnRCxlQUFlO0FBQy9ELE9BQU8sUUFBUSxlQUFlO0FBQzlCLE9BQU8sU0FBUztBQUNoQixPQUFPLFlBQVk7QUFDbkIsU0FBUyw0QkFBNEI7QUFDckMsT0FBTyxlQUFlO0FBQ3RCLE9BQU8sWUFBWTtBQVJuQixJQUFNLG1DQUFtQztBQVd6QyxJQUFPLHNCQUFRLENBQUMsRUFBRSxLQUFLLE1BQW1DO0FBQ3hELFFBQU0sVUFBVSxRQUFRLE1BQU0sUUFBUSxJQUFJLENBQUM7QUFDM0MsUUFBTSxFQUFFLGlCQUFpQixJQUFJO0FBQzdCLFNBQU87QUFBQTtBQUFBLElBRUwsTUFBTTtBQUFBLElBQ04sU0FBUztBQUFBLE1BQ1AsT0FBTztBQUFBO0FBQUEsUUFFTCxLQUFLLFFBQVEsa0NBQVcsT0FBTztBQUFBLE1BQ2pDO0FBQUEsSUFDRjtBQUFBLElBQ0EsUUFBUTtBQUFBO0FBQUEsTUFFTixNQUFNO0FBQUE7QUFBQTtBQUFBLE1BRU4sTUFBTTtBQUFBO0FBQUEsTUFFTixNQUFNO0FBQUE7QUFBQSxNQUVOLE1BQU07QUFBQTtBQUFBLE1BRU4sWUFBWTtBQUFBO0FBQUEsTUFFWixPQUFPO0FBQUEsUUFDTCxXQUFXO0FBQUE7QUFBQSxVQUVULFFBQVE7QUFBQSxVQUNSLElBQUk7QUFBQTtBQUFBLFVBRUosY0FBYztBQUFBLFFBQ2hCO0FBQUEsTUFDRjtBQUFBO0FBQUEsTUFFQSxRQUFRO0FBQUEsUUFDTixhQUFhLENBQUMsd0JBQXdCO0FBQUEsTUFDeEM7QUFBQSxJQUNGO0FBQUEsSUFDQSxPQUFPO0FBQUE7QUFBQSxNQUVMLHVCQUF1QjtBQUFBO0FBQUEsTUFFdkIsc0JBQXNCO0FBQUE7QUFBQSxNQUV0QixXQUFXO0FBQUEsTUFDWCxlQUFlO0FBQUEsUUFDYixRQUFRO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFVBTU4sY0FBYztBQUFBLFlBQ1osS0FBSyxDQUFDLE9BQU8sY0FBYyxPQUFPO0FBQUEsWUFDbEMsU0FBUyxDQUFDLGdCQUFnQix5QkFBeUI7QUFBQSxZQUNuRCxLQUFLLENBQUMsYUFBYSw0QkFBNEIsVUFBVTtBQUFBLFVBQzNEO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUE7QUFBQSxJQUVBLFNBQ0UsU0FBUyxnQkFDTCxTQUNBO0FBQUE7QUFBQSxNQUVFLE1BQU0sQ0FBQyxhQUFhO0FBQUE7QUFBQSxNQUVwQixNQUFNLENBQUMsVUFBVTtBQUFBO0FBQUEsTUFFakIsZUFBZTtBQUFBLElBQ2pCO0FBQUE7QUFBQSxJQUVOLFNBQVM7QUFBQSxNQUNQLElBQUk7QUFBQSxNQUNKLE9BQU87QUFBQTtBQUFBLE1BRVAsVUFBVSxFQUFFLGVBQWUsTUFBTSxDQUFDO0FBQUE7QUFBQSxNQUVsQyxxQkFBcUI7QUFBQSxRQUNuQixVQUFVLENBQUMsS0FBSyxRQUFRLFFBQVEsSUFBSSxHQUFHLGVBQWUsQ0FBQztBQUFBLFFBQ3ZELFVBQVU7QUFBQSxNQUNaLENBQUM7QUFBQTtBQUFBLE1BRUQsT0FBTztBQUFBLElBQ1Q7QUFBQTtBQUFBLElBRUEsTUFBTTtBQUFBLE1BQ0osU0FBUyxDQUFDLG9CQUFvQjtBQUFBLE1BQzlCLGFBQWE7QUFBQSxJQUNmO0FBQUEsRUFDRjtBQUNGOyIsCiAgIm5hbWVzIjogW10KfQo=
