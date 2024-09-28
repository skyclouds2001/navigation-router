/// <reference types="./../lib/index.d.ts" />

import type { Router } from './types'

export const global: Global = {
  router: null
}

export interface Global {
  router: Router | null
}
