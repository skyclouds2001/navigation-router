/// <reference types="./../lib/index.d.ts" />

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
  linkActiveClass?: string
  linkExactActiveClass?: string
}
