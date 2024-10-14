/// <reference types="./../lib/index.d.ts" />

import { global, RouterInstance } from './constant'
import { MissingNecessaryPropertyError, NotInitializedError } from './error'
import type { Router } from './router'

export class RouterLink extends HTMLElement {
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
    if (this.to == null) {
      throw new MissingNecessaryPropertyError()
    }

    if (this.custom) {
      const slot = document.createElement('slot')
      this.shadow.append(slot)
    } else {
      const a = document.createElement('a')
      a.href = 'javascript:void(0)'
      a.target = '_self'
      a.addEventListener('click', (e) => {
        e.preventDefault()
      })
      this.shadow.append(a)

      const slot = document.createElement('slot')
      a.append(slot)
    }

    this.shadow.addEventListener('click', () => {
      this.router.$navigation.navigate(this.to, {
        history: this.replace ? 'replace' : 'push',
      })
    })

    this.router.$links.add(this)
  }

  disconnectedCallback() {
    this.shadow.removeChild(this.shadow.firstChild!)

    this.router.$links.delete(this)
  }

  get to() {
    return this.getAttribute('to') as string
  }

  set to(value: string) {
    this.setAttribute('to', value)
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
    const activeClass = this.activeClass ?? this.router.$options.linkActiveClass ?? 'router-link-active'
    const exactActiveClass = this.exactActiveClass ?? this.router.$options.linkExactActiveClass ?? 'router-link-exact-active'

    if (url.pathname === this.to) {
      this.classList.add(activeClass)
      this.classList.add(exactActiveClass)
    } else if (url.pathname.includes(this.to)) {
      this.classList.add(activeClass)
      this.classList.remove(exactActiveClass)
    } else {
      this.classList.remove(activeClass)
      this.classList.remove(exactActiveClass)
    }
  }
}
