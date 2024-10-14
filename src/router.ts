/// <reference types="./../lib/index.d.ts" />

import { global, RouterInstance } from './constant'
import { DuplicateInitializedError, InvalidExecutionEnvironmentError, NotSupportedAPIError } from './error'
import { RouterLink } from './router-link'
import { RouterView } from './router-view'
import type { RouterOptions } from './types'

export const createRouter = (options: RouterOptions): Router => {
  const router = new Router(options)

  Object.defineProperty(global, RouterInstance, {
    value: router,
    writable: false,
    configurable: false,
    enumerable: false,
  })

  global.customElements.define('router-view', RouterView)
  global.customElements.define('router-link', RouterLink)

  return router
}

type RouterEventMap = Record<string, Event>

export class Router extends EventTarget {
  constructor(options: RouterOptions) {
    super()

    if (global == null) {
      throw new InvalidExecutionEnvironmentError()
    }
    if (global.navigation == null) {
      throw new NotSupportedAPIError()
    }
    if (RouterInstance in window) {
      throw new DuplicateInitializedError()
    }

    const views = new Set<RouterView>()
    const links = new Set<RouterLink>()

    this.$navigation = global.navigation
    this.$options = options
    this.$views = views
    this.$links = links

    this.$navigation.addEventListener('navigate', () => {
      const url = new URL(global.location.href)

      this.$views.forEach((view) => {
        view.updateComponent(url)
      })
      this.$links.forEach((link) => {
        link.updateLinkStatus(url)
      })
    })
  }

  readonly $navigation: Navigation

  readonly $options: Readonly<RouterOptions>

  readonly $views: Set<RouterView>

  readonly $links: Set<RouterLink>

  addEventListener<K extends keyof RouterEventMap>(type: K, listener: (this: Router, ev: RouterEventMap[K]) => unknown, options?: boolean | AddEventListenerOptions): void
  addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void {
    super.addEventListener(type, listener, options)
  }
  removeEventListener<K extends keyof RouterEventMap>(type: K, listener: (this: Router, ev: RouterEventMap[K]) => unknown, options?: boolean | EventListenerOptions): void
  removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void {
    super.removeEventListener(type, listener, options)
  }
}
