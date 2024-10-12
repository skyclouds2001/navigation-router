/// <reference types="./../lib/index.d.ts" />

import type { RouterLink } from './router-link'
import type { RouterView } from './router-view'

interface RouterRecordBase {
  path: string
}

interface RouterRecordSingleView extends RouterRecordBase {
  component: Node
}

interface RouterRecordMultipleView extends RouterRecordBase {
  components: Record<string, Node>
}

type RouterRecordRaw = RouterRecordSingleView | RouterRecordMultipleView

export interface RouterOptions {
  routes: RouterRecordRaw[]
}

type RouterEventMap = Record<string, Event>

export interface Router extends EventTarget {
  readonly $navigation: Navigation
  readonly $options: Readonly<RouterOptions>
  readonly $views: Set<RouterView>
  readonly $links: Set<RouterLink>

  addEventListener<K extends keyof RouterEventMap>(type: K, listener: (this: Router, ev: RouterEventMap[K]) => unknown, options?: boolean | AddEventListenerOptions): void
  addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void
  removeEventListener<K extends keyof RouterEventMap>(type: K, listener: (this: Router, ev: RouterEventMap[K]) => unknown, options?: boolean | EventListenerOptions): void
  removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void
}
