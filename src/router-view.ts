/// <reference types="./../lib/index.d.ts" />'

import { global, RouterInstance } from './constant'
import { NotInitializedError } from './error'

export class RouterView extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({
      mode: 'open',
    })
  }

  connectedCallback() {
    const router = global[RouterInstance]
    if (router == null) {
      throw new NotInitializedError()
    }

    const path = global.location.pathname

    const node = router.$options.routes.find((route) => route.path === path)

    if (node != null) {
      this.shadowRoot!.append(node.component)
    }

    router.$views.add(this)
  }

  disconnectedCallback() {
    const router = global[RouterInstance]
    if (router == null) {
      throw new NotInitializedError()
    }

    router.$views.delete(this)
  }
}
