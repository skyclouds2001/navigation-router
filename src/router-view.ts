/// <reference types="./../lib/index.d.ts" />'

import { global, RouterInstance } from './constant'
import { MissingRouteError, NotInitializedError } from './error'
import type { Router } from './router'

export class RouterView extends HTMLElement {
  constructor() {
    super()

    const router = global[RouterInstance]
    if (router == null) {
      throw new NotInitializedError()
    }
    this.router = router

    this.shadow = this.attachShadow({
      mode: 'open',
    })
  }

  readonly router: Router

  readonly shadow: ShadowRoot

  connectedCallback() {
    this.updateComponent(new URL(this.router.$navigation.currentEntry!.url!))

    this.router.$views.add(this)
  }

  disconnectedCallback() {
    this.shadow.childNodes.forEach((node) => {
      this.shadow.removeChild(node)
    })

    this.router.$views.delete(this)
  }

  get name() {
    return this.getAttribute('name')
  }

  set name(value: string | null) {
    if (value != null) {
      this.setAttribute('name', value)
    } else {
      this.removeAttribute('name')
    }
  }

  updateComponent(url: URL) {
    this.shadow.childNodes.forEach((node) => {
      this.shadow.removeChild(node)
    })

    const route = this.router.$options.routes.find((route) => route.path === url.pathname)

    if (route == null) {
      throw new MissingRouteError()
    }

    if ('component' in route) {
      if (this.name == null) {
        this.shadow.append(route.component)
      }
    } else if ('components' in route) {
      if ((this.name ?? 'default') in route.components) {
        this.shadow.append(route.components[this.name ?? 'default'])
      }
    }
  }
}
