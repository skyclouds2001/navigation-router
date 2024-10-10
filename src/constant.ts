import type { Router } from './types'

export const global = window

export const RouterInstance = Symbol()

declare global {
  interface Window {
    [RouterInstance]?: Router
  }
}
