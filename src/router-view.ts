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

    this.loadComponent(new URL(global.location.href))

    router.$views.add(this)
  }

  disconnectedCallback() {
    const router = global[RouterInstance]
    if (router == null) {
      throw new NotInitializedError()
    }

    router.$views.delete(this)
  }

  loadComponent(url: URL) {
    const router = global[RouterInstance]
    if (router == null) {
      throw new NotInitializedError()
    }

    this.shadowRoot!.childNodes.forEach((node) => {
      this.shadowRoot!.removeChild(node)
    })

    const node = router.$options.routes.find((route) => route.path === url.pathname)

    if (node != null) {
      this.shadowRoot!.append(node.component)
    }
  }
}
