/// <reference types="./../lib/index.d.ts" />

export interface Router {
  readonly options: Readonly<RouterOptions>
  back: () => void
  forward: () => void
  go: (delta: number) => void
}

export interface RouterOptions {
  routes: ReadonlyArray<RouteRecord>
}

export interface RouteRecord {
  path: string
  component: Node
}
