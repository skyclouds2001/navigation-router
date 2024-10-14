/// <reference types="./../lib/index.d.ts" />

import { global, RouterInstance } from './constant'
import { NotInitializedError } from './error'
import type { Router } from './router'

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
    if (this.custom) {
      const slot = document.createElement('slot')
      this.shadow.addEventListener('click', (e) => {
        e.preventDefault()

        this.router.$navigation.navigate(this.to ?? global.location.pathname, {
          history: this.replace ? 'replace' : 'push',
        })
      })
      this.shadow.append(slot)
    } else {
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
    }

    this.router.$links.add(this)
  }

  disconnectedCallback() {
    this.shadow.removeChild(this.shadow.firstChild!)

    this.router.$links.delete(this)
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    switch (name) {
      case 'to': {
        if (this.shadow.firstChild instanceof HTMLAnchorElement) {
          this.shadow.firstChild.href = newValue ?? global.location.pathname
        }
        break
      }
    }
  }

  get to() {
    return this.getAttribute('to') ?? ''
  }

  set to(value: string) {
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

  get custom() {
    return this.hasAttribute('custom')
  }

  set custom(value: boolean) {
    if (value) {
      this.setAttribute('custom', '')
    } else {
      this.removeAttribute('custom')
    }
  }

  get activeClass() {
    return this.getAttribute('active-class')
  }

  set activeClass(value: string | null) {
    if (value != null) {
      this.setAttribute('active-class', value)
    } else {
      this.removeAttribute('active-class')
    }
  }

  get exactActiveClass() {
    return this.getAttribute('exact-active-class')
  }

  set exactActiveClass(value: string | null) {
    if (value != null) {
      this.setAttribute('exact-active-class', value)
    } else {
      this.removeAttribute('exact-active-class')
    }
  }

  updateLinkStatus(url: URL) {
    if (url.pathname === this.to) {
      this.classList.add(this.activeClass ?? 'router-link-active')
      this.classList.add(this.exactActiveClass ?? 'router-link-exact-active')
    } else if (url.pathname.includes(this.to)) {
      this.classList.add(this.activeClass ?? 'router-link-active')
      this.classList.remove(this.exactActiveClass ?? 'router-link-exact-active')
    } else {
      this.classList.remove(this.activeClass ?? 'router-link-active')
      this.classList.remove(this.exactActiveClass ?? 'router-link-exact-active')
    }
  }
}
