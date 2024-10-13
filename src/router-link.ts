/// <reference types="./../lib/index.d.ts" />

import { global, RouterInstance } from './constant'
import { NotInitializedError } from './error'
import type { Router } from './types'

export class RouterLink extends HTMLElement {
  static get observedAttributes() {
    return ['to']
  }

  constructor() {
    super()

    const router = global[RouterInstance]
    if (router == null) {
      throw new NotInitializedError()
    }
    this.router = router

    this.shadow = this.attachShadow({
      mode: 'open',
    })
  }

  readonly router: Router

  readonly shadow: ShadowRoot

  connectedCallback() {
    const a = document.createElement('a')
    a.href = this.getAttribute('to') ?? global.location.pathname
    a.addEventListener('click', (e) => {
      e.preventDefault()

      this.router.$navigation.navigate(this.to ?? global.location.pathname, {
        history: this.replace ? 'replace' : 'push',
      })
    })
    this.shadow.append(a)

    const slot = document.createElement('slot')
    a.append(slot)

    this.router.$links.add(this)
  }

  disconnectedCallback() {
    this.shadow.removeChild(this.shadow.firstChild!)

    this.router.$links.delete(this)
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    const a = this.shadow.firstChild! as HTMLAnchorElement

    switch (name) {
      case 'to': {
        a.href = newValue ?? global.location.pathname
        break
      }
    }
  }

  get to() {
    return this.getAttribute('to')
  }

  set to(value: string | null) {
    if (value != null) {
      this.setAttribute('to', value)
    } else {
      this.removeAttribute('to')
    }
  }

  get replace() {
    return this.hasAttribute('replace')
  }

  set replace(value: boolean) {
    if (value) {
      this.setAttribute('replace', '')
    } else {
      this.removeAttribute('replace')
    }
  }
}
