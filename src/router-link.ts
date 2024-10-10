/// <reference types="./../lib/index.d.ts" />

import { global, RouterInstance } from './constant'
import { NotInitializedError } from './error'

export class RouterLink extends HTMLElement {
  static get observedAttributes() {
    return ['to']
  }

  constructor() {
    super()
    this.attachShadow({
      mode: 'open',
    })
  }

  connectedCallback() {
    const router = global[RouterInstance]
    if (router == null) {
      throw new NotInitializedError()
    }

    const a = document.createElement('a')
    a.href = this.getAttribute('to') ?? global.location.pathname
    a.addEventListener('click', (e) => {
      e.preventDefault()

      router.$navigation.navigate(this.getAttribute('to') ?? global.location.pathname)
    })
    this.shadowRoot!.append(a)

    const slot = document.createElement('slot')
    a.append(slot)

    router.$links.add(this)
  }

  disconnectedCallback() {
    const router = global[RouterInstance]
    if (router == null) {
      throw new NotInitializedError()
    }

    this.shadowRoot!.removeChild(this.shadowRoot!.firstChild!)

    router.$links.delete(this)
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    const a = this.shadowRoot!.firstChild! as HTMLAnchorElement

    switch (name) {
      case 'to': {
        a.href = newValue ?? global.location.pathname
        break
      }
    }
  }
}
