<script lang="ts" setup>
import { useLayoutMode } from "@/hooks/useLayoutMode"
// import guitar from "@/assets/layouts/guitar.png?url"
import benLogo from "@/assets/layouts/ben.png?url"
import benLogo1 from "@/assets/layouts/ben1.png?url"
import benLogo2 from "@/assets/layouts/benLogo.png?url"

interface Props {
  collapse?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  collapse: true
})

const { isLeft, isTop } = useLayoutMode()
</script>

<template>
  <div class="layout-logo-container" :class="{ collapse: props.collapse, 'layout-mode-top': isTop }">
    <transition name="layout-logo-fade">
      <router-link v-if="props.collapse" key="collapse" to="/">
        <img :src="benLogo2" class="layout-logo" />
      </router-link>
      <router-link v-else key="expand" to="/">
        <img :src="!isLeft ? benLogo1 : benLogo" class="layout-logo-text" />
      </router-link>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.layout-logo-container {
  position: relative;
  width: 100%;
  height: var(--v3-header-height);
  line-height: var(--v3-header-height);
  text-align: center;
  overflow: hidden;
  .layout-logo {
    display: none;
  }
  .layout-logo-text {
    height: 100%;
    width: 100%;
    vertical-align: middle;
  }
}

.layout-mode-top {
  height: var(--v3-navigationbar-height);
  line-height: var(--v3-navigationbar-height);
}

.collapse {
  .layout-logo {
    width: 32px;
    height: 32px;
    vertical-align: middle;
    display: inline-block;
  }
  .layout-logo-text {
    display: none;
  }
}
</style>
