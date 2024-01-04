/// <reference types="./../lib" />

const global: Global = {
  router: null
}

interface Global {
  router: Router | null
}

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

  window.customElements.define('router-link', RouterLink)

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

export class RouterLink extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    const shadow = this.attachShadow({
      mode: 'open',
    })

    const to = this.getAttribute('to')
    const mode = this.getAttribute('mode')

    if (to == null) {
      throw new Error()
    }

    const a = document.createElement('a')
    a.href = to
    a.target = '_blank'

    a.addEventListener('click', (e) => {
      e.preventDefault()

      window.navigation.navigate(a.href, {
        history: mode != null && ['push', 'replace'].includes(mode) ? (mode as 'push' | 'replace') : 'auto',
      })
    })

    shadow.appendChild(a)
  }
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
