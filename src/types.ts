/// <reference types="./../lib/index.d.ts" />

interface RouterRecord {
  path: string
  component: Node
}

export interface RouterOptions {
  routes: RouterRecord[]
}

export interface Router extends EventTarget {
  readonly $navigation: Navigation
  readonly $options: Readonly<RouterOptions>
}
