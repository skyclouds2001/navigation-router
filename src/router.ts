/// <reference types="./../lib/index.d.ts" />

import { global, RouterInstance } from './constant'
import { DuplicateInitializedError, InvalidExecutionEnvironmentError, NotSupportedAPIError } from './error'
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

  const router = Object.assign<EventTarget, Omit<Router, keyof EventTarget>>(Object.create(EventTarget.prototype), {
    $navigation: navigation,
    $options: options,
    $views: views,
  })

  Object.defineProperty(global, RouterInstance, {
    value: router,
    writable: false,
    configurable: false,
    enumerable: false,
  })

  global.customElements.define('router-view', RouterView)

  return router
}
