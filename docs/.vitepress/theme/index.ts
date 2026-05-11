import { onMounted, watch, nextTick } from 'vue'
import { useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import mediumZoom, { Zoom } from 'medium-zoom'
import Layout from './Layout.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app, router, siteData }) {
    // Type-only side effect; configuration runs per-page in setup hook below
  },
  setup() {
    const route = useRoute()
    let zoom: Zoom | null = null

    const initZoom = () => {
      if (zoom) {
        zoom.detach()
      }
      // Attach to every image inside doc content. Skip SVG/logo and tiny icons.
      zoom = mediumZoom('.vp-doc img:not([data-no-zoom])', {
        margin: 24,
        background: 'rgba(13, 17, 23, 0.92)',
        scrollOffset: 80
      })
    }

    onMounted(() => {
      nextTick(initZoom)
    })

    watch(
      () => route.path,
      () => nextTick(initZoom)
    )
  }
}
