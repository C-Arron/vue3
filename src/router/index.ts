import { type RouteRecordRaw, createRouter } from "vue-router"
import { history, flatMultiLevelRoutes } from "./helper"
import routeSettings from "@/config/route"

const Layouts = () => import("@/layouts/index.vue")

/**
 * 常驻路由
 * 除了 redirect/403/404/login 等隐藏页面，其他页面建议设置 Name 属性
 */
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: "/redirect",
    component: Layouts,
    meta: {
      hidden: true
    },
    children: [
      {
        path: ":path(.*)",
        component: () => import("@/views/redirect/index.vue")
      }
    ]
  },
  {
    path: "/403",
    component: () => import("@/views/error-page/403.vue"),
    meta: {
      hidden: true
    }
  },
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      hidden: true
    }
  },
  {
    path: "/",
    component: Layouts,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/dashboard/index.vue"),
        name: "Dashboard",
        meta: {
          title: "首页",
          svgIcon: "dashboard",
          affix: true
        }
      }
    ]
  },
  {
    path: "/table",
    component: Layouts,
    redirect: "/table/element-plus",
    name: "Table",
    meta: {
      title: "原燃料数据库",
      svgIcon: "database"
    },
    children: [
      {
        path: "element-plus",
        component: () => import("@/views/table/element-plus/index.vue"),
        name: "ElementPlus",
        meta: {
          title: "原料数据库",
          keepAlive: true
        }
      },
      {
        path: "fuel",
        component: () => import("@/views/table/fuel/index.vue"),
        name: "Fuel",
        meta: {
          title: "燃料数据库",
          keepAlive: true
        }
      }
    ]
  },
  {
    path: "/ore-evaluate",
    component: Layouts,
    redirect: "/ore-evaluate/ratio",
    name: "ore-evaluate",
    meta: {
      title: "单种物料性价比",
      svgIcon: "calculate"
    },
    children: [
      {
        path: "ratio",
        component: () => import("@/views/ore-evaluate/ratio/index.vue"),
        name: "Ratio",
        meta: {
          title: "定配比评价",
          keepAlive: true
        }
      },
      {
        path: "ingredients",
        component: () => import("@/views/ore-evaluate/ingredients/index.vue"),
        name: "Ingredients",
        meta: {
          title: "定成分评价",
          keepAlive: true
        }
      }
    ]
  },
  {
    path: "/optimize",
    component: Layouts,
    redirect: "/optimize",
    name: "Optimize",
    meta: {
      title: "配料优化",
      svgIcon: "optimize"
    },
    children: [
      {
        path: "sinter",
        component: () => import("@/views/optimize/sinter/index.vue"),
        name: "Sinter1",
        meta: {
          title: "烧结配料优化",
          keepAlive: true
        }
      },
      {
        path: "furnace",
        component: () => import("@/views/optimize/furnace/index.vue"),
        name: "Furnace-op",
        meta: {
          title: "高炉炉料结构优化",
          keepAlive: true
        }
      }
    ]
  },
  {
    path: "/parameter",
    component: Layouts,
    redirect: "/parameter",
    meta: {
      title: "冶炼参数设定",
      elIcon: "setting"
    },
    children: [
      {
        path: "parameter",
        component: () => import("@/views/parameter/sinter/index.vue"),
        name: "Sinter",
        meta: {
          title: "烧结相关参数",
          keepAlive: true
        }
      },
      {
        path: "parameter",
        component: () => import("@/views/parameter/furnace/index.vue"),
        name: "Furnace",
        meta: {
          title: "高炉相关参数",
          keepAlive: true
        }
      }
    ]
  },
  {
    path: "/404",
    component: () => import("@/views/error-page/404.vue"),
    meta: {
      hidden: true
    },
    alias: "/:pathMatch(.*)*"
  }
]

/**
 * 动态路由
 * 用来放置有权限 (Roles 属性) 的路由
 * 必须带有 Name 属性
 */
export const dynamicRoutes: RouteRecordRaw[] = [
  // {
  //   path: "/permission",
  //   component: Layouts,
  //   redirect: "/permission/page",
  //   name: "Permission",
  //   meta: {
  //     title: "权限",
  //     svgIcon: "lock",
  //     roles: ["admin", "editor"], // 可以在根路由中设置角色
  //     alwaysShow: true // 将始终显示根菜单
  //   },
  //   children: [
  //     {
  //       path: "page",
  //       component: () => import("@/views/permission/page.vue"),
  //       name: "PagePermission",
  //       meta: {
  //         title: "页面级",
  //         roles: ["admin"] // 或者在子导航中设置角色
  //       }
  //     },
  //     {
  //       path: "directive",
  //       component: () => import("@/views/permission/directive.vue"),
  //       name: "DirectivePermission",
  //       meta: {
  //         title: "按钮级" // 如果未设置角色，则表示：该页面不需要权限，但会继承根路由的角色
  //       }
  //     }
  //   ]
  // }
]

const router = createRouter({
  history,
  routes: routeSettings.thirdLevelRouteCache ? flatMultiLevelRoutes(constantRoutes) : constantRoutes
})

/** 重置路由 */
export function resetRouter() {
  // 注意：所有动态路由路由必须带有 Name 属性，否则可能会不能完全重置干净
  try {
    router.getRoutes().forEach((route) => {
      const { name, meta } = route
      if (name && meta.roles?.length) {
        router.hasRoute(name) && router.removeRoute(name)
      }
    })
  } catch {
    // 强制刷新浏览器也行，只是交互体验不是很好
    window.location.reload()
  }
}

export default router
