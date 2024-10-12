/// <reference types="./../lib/index.d.ts" />'

import { global, RouterInstance } from './constant'
import { MissingRouteError, NotInitializedError } from './error'

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

  loadComponent(url: URL) {
    const router = global[RouterInstance]
    if (router == null) {
      throw new NotInitializedError()
    }

    this.shadowRoot!.childNodes.forEach((node) => {
      this.shadowRoot!.removeChild(node)
    })

    const route = router.$options.routes.find((route) => route.path === url.pathname)

    if (route == null) {
      throw new MissingRouteError()
    }

    if ('component' in route) {
      if (this.name == null) {
        this.shadowRoot!.append(route.component)
      }
    } else if ('components' in route) {
      if ((this.name ?? 'default') in route.components) {
        this.shadowRoot!.append(route.components[this.name ?? 'default'])
      }
    }
  }
}
