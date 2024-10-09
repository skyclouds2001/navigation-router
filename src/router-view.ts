/// <reference types="./../lib/index.d.ts" />'

import { global, RouterInstance } from './constant'
import { NotInitializedError } from './error'
import type { Router } from './types'

export class RouterView extends HTMLElement {
  static {
    global.customElements.define('router-view', RouterView)
  }

  constructor () {
    super()

    const router = global[RouterInstance]
    if (router == null) {
      throw new NotInitializedError()
    }
    this.$router = router
  }

  $router: Router

  connectedCallback () {
    const shadow = this.attachShadow({
      mode: 'open',
    })

    const path = global.location.pathname

    const node = this.$router.$options.routes.find(route => route.path === path)

    if (node != null) {
      this.append(node.component)
    }
  }
}
