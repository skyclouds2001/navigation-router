/// <reference types="./../lib" />

const globalRouter = Symbol('router')

export function createRouter(options: RouterOptions): Router {
  const router = {
    options,
    back,
    forward,
    go,
  }

  if (window[globalRouter] != null) {
    throw new ReferenceError()
  }

  window[globalRouter] = router

  return router
}

export function getRouter(): Router | undefined {
  return window[globalRouter]
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

interface Router {
  readonly options: Readonly<RouterOptions>
  back: () => void
  forward: () => void
  go: (delta: number) => void
}

interface RouterOptions {
  routes: ReadonlyArray<RouteRecord>
}

interface RouteRecord {
  path: string
  component: Node
}
