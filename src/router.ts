/// <reference types="./../lib/index.d.ts" />

import { global } from './global'
import type { Router, RouterOptions } from './types'

export function createRouter(options: RouterOptions): Router {
  if (window == null) {
    throw new Error()
  }

  const router = {
    options,
    back,
    forward,
    go,
  }

  if (global.router != null) {
    throw new Error()
  }

  global.router = router

  return router
}

export function getRouter(): Router | null {
  return global.router
}

function back(): void {
  window.navigation.back()
}

function forward(): void {
  window.navigation.forward()
}

function go(delta: number): void {
  const records = window.navigation.entries()
  const current = window.navigation.currentEntry!.index

  window.navigation.traverseTo(records[current + delta].key)
}
