/// <reference types="./../lib/index.d.ts" />

import { global } from './global'

export class RouterView extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    const shadow = this.attachShadow({
      mode: 'open',
    })

    if (global.router == null) {
      return
    }

    const { routes } = global.router.options

    const slot = document.createElement('slot')

    loadComponent(new URL(location.href))

    window.navigation.addEventListener('navigate', (e) => {
      loadComponent(new URL(e.destination.url))
    })

    function loadComponent(url: URL) {
      const match = routes.find((route) => route.path === url.pathname)

      shadow.childNodes.forEach((node) => {
        shadow.removeChild(node)
      })
      if (match != null) {
        shadow.appendChild(match.component)
      } else {
        shadow.appendChild(slot)
      }
    }
  }
}
