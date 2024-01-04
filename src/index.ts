/// <reference types="./../lib/index.d.ts" />

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
    a.target = '_self'

    a.addEventListener('click', (e) => {
      e.preventDefault()

      window.navigation.navigate(a.href, {
        history: mode != null && ['push', 'replace'].includes(mode) ? (mode as 'push' | 'replace') : 'auto',
      })
    })

    const slot = document.createElement('slot')
    a.appendChild(slot)

    shadow.appendChild(a)
  }
}

window.customElements.define('router-link', RouterLink)

export class RouterView extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    const shadow = this.attachShadow({
      mode: 'open',
    })

    if (global.router == null) {
      return
    }

    const { routes } = global.router.options

    const slot = document.createElement('slot')

    loadComponent(new URL(location.href))

    window.navigation.addEventListener('navigate', (e) => {
      loadComponent(new URL(e.destination.url))
    })

    function loadComponent(url: URL) {
      const match = routes.find((route) => route.path === url.pathname)

      shadow.childNodes.forEach((node) => {
        shadow.removeChild(node)
      })
      if (match != null) {
        shadow.appendChild(match.component)
      } else {
        shadow.appendChild(slot)
      }
    }
  }
}

window.customElements.define('router-view', RouterView)

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
