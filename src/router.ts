/// <reference types="./../lib/index.d.ts" />

import { global, RouterInstance } from './constant'
import { DuplicateInitializedError, InvalidExecutionEnvironmentError, NotSupportedAPIError } from './error'
import { RouterLink } from './router-link'
import { RouterView } from './router-view'
import type { Router, RouterOptions } from './types'

export const createRouter = (options: RouterOptions): Router => {
  if (global == null) {
    throw new InvalidExecutionEnvironmentError()
  }
  if (global.navigation == null) {
    throw new NotSupportedAPIError()
  }
  if (RouterInstance in window) {
    throw new DuplicateInitializedError()
  }

  const navigation = global.navigation

  const views = new Set<RouterView>()

  const links = new Set<RouterLink>()

  const router = Object.assign<EventTarget, Omit<Router, keyof EventTarget>>(Object.create(EventTarget.prototype), {
    $navigation: navigation,
    $options: options,
    $views: views,
    $links: links,
  })

  Object.defineProperty(global, RouterInstance, {
    value: router,
    writable: false,
    configurable: false,
    enumerable: false,
  })

  global.customElements.define('router-view', RouterView)
  global.customElements.define('router-link', RouterLink)

  navigation.addEventListener('navigate', () => {
    const url = new URL(global.location.href)

    router.$views.forEach((view) => {
      view.loadComponent(url)
    })
  })

  return router
}
