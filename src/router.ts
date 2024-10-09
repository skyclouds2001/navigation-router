/// <reference types="./../lib/index.d.ts" />

import { global, RouterInstance } from './constant'
import { InvalidExecutionEnvironmentError, NotSupportedAPIError } from './error'
import type { Router, RouterOptions } from './types'

export function createRouter(options: RouterOptions): Router {
  if (global == null) {
    throw new InvalidExecutionEnvironmentError()
  }
  if (global.navigation == null) {
    throw new NotSupportedAPIError()
  }

  const navigation = global.navigation

  const router = Object.assign<EventTarget, Omit<Router, keyof EventTarget>>(Object.create(EventTarget.prototype), {
    $navigation: navigation,
    $options: options,
  })

  Object.defineProperty(global, RouterInstance, {
    value: router,
    writable: false,
    configurable: false,
    enumerable: false,
  })

  return router
}
