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

    this.shadowRoot!.childNodes.forEach((node) => {
      this.shadowRoot!.removeChild(node)
    })

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

    const route = router.$options.routes.find((route) => route.path === url.pathname)

    if (route != null) {
      if ('component' in route) {
        this.shadowRoot!.append(route.component)
      } else if ('components' in route) {
        Object.values(route.components).forEach((component) => {
          this.shadowRoot!.append(component)
        })
      } else {
        throw 'must specified component'
      }
    } else {
      throw 'can not find a route'
    }
  }
}
