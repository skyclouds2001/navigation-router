/// <reference types="./../lib/index.d.ts" />

import { createRouter, getRouter } from './router'
import { RouterLink } from './router-link'
import { RouterView } from './router-view'

if (window == null) {
  throw new Error()
}

window.customElements.define('router-link', RouterLink)

window.customElements.define('router-view', RouterView)

export {
  createRouter,
  getRouter,
  RouterLink,
  RouterView,
}
