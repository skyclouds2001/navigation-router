/// <reference types="./../lib" />

const globalRouter = Symbol('router')

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

  if (window[globalRouter] != null) {
    throw new Error()
  }

  window[globalRouter] = router

  window.customElements.define('router-link', RouterLink)

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

export class RouterLink extends HTMLElement {
  constructor() {
    super()
  }

  to: string
  mode: 'push' | 'replace' | null

  static get observedAttributes() {
    return ['to']
  }

  connectedCallback() {
    const shadow = this.attachShadow({
      mode: 'open',
    })

    const a = document.createElement('a')
    a.href = this.to
    a.target = '_blank'

    a.addEventListener('click', (e) => {
      e.preventDefault()

      window.navigation.navigate(a.href, {
        history: this.mode != null && ['push', 'replace'].includes(this.mode) ? this.mode : 'auto',
      })
    })

    shadow.appendChild(a)
  }

  attributeChangedCallback(name: string, _: string, value: string) {
    switch(name) {
      case 'to':
        this.to = value
        break
    }
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
