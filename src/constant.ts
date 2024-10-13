import type { Router } from './router'

export const global = window

export const RouterInstance = Symbol()

declare global {
  interface Window {
    [RouterInstance]?: Router
  }
}
