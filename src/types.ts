/// <reference types="./../lib/index.d.ts" />

import type { RouterLink } from './router-link'
import type { RouterView } from './router-view'

interface RouterRecordSingleView {
  path: string
  component: Node
}

interface RouterRecordMultipleView {
  path: string
  components: Record<string, Node>
}

type RouterRecordRaw = RouterRecordSingleView | RouterRecordMultipleView

export interface RouterOptions {
  routes: RouterRecordRaw[]
}

export interface Router extends EventTarget {
  readonly $navigation: Navigation
  readonly $options: Readonly<RouterOptions>
  readonly $views: Set<RouterView>
  readonly $links: Set<RouterLink>
}
