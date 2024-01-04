/// <reference types="./../lib/index.d.ts" />

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
