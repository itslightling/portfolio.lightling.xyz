import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import hljs from 'highlight.js'
import glsl from 'highlight.js/lib/languages/glsl'

import './style.sass'

hljs.registerLanguage('hlsl', glsl)

createApp(App)
  .use(router)
  .directive('hljs', {
    mounted (el: HTMLElement, binding) {
      const targets = el.querySelectorAll('code')
      targets.forEach((codeNode) => {
        if (typeof binding.value === 'string') {
          codeNode.textContent = binding.value
        }
        hljs.highlightElement(codeNode)
      })
    },
    updated (el: HTMLElement, binding) {
      const targets = el.querySelectorAll('code')
      targets.forEach((target) => {
        if (binding.value) {
          target.innerHTML = binding.value
          hljs.highlightElement(target)
        }
      })
    }
  })
  .directive('focus', {
    mounted (el) {
      el.focus()
    },
  })
  .mount('#app')


