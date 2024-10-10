/// <reference types="./../lib/index.d.ts" />

import type { RouterLink } from './router-link'
import type { RouterView } from './router-view'

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
  readonly $views: Set<RouterView>
  readonly $links: Set<RouterLink>
}
