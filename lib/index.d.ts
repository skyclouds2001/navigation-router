// builtin type definition for Navigation API
// https://html.spec.whatwg.org/multipage/nav-history-apis.html#navigation-api
// ----------------------------------------------------------------

interface Window {
  readonly navigation: Navigation
}

interface NavigationEventMap {
  navigate: NavigateEvent
  navigatesuccess: Event
  navigateerror: Event
  currententrychange: NavigationCurrentEntryChangeEvent
}

interface Navigation extends EventTarget {
  constructor: Navigation
  readonly [Symbol.toStringTag]: 'Navigation'

  entries(): NavigationHistoryEntry[]
  readonly currentEntry: NavigationHistoryEntry | null
  updateCurrentEntry(options: NavigationUpdateCurrentEntryOptions): void
  readonly transition: NavigationTransition | null
  readonly activation: NavigationActivation | null

  readonly canGoBack: boolean
  readonly canGoForward: boolean

  navigate(url: string, options?: NavigationNavigateOptions): NavigationResult
  reload(options?: NavigationReloadOptions): NavigationResult

  traverseTo(key: string, options?: NavigationOptions): NavigationResult
  back(options?: NavigationOptions): NavigationResult
  forward(options?: NavigationOptions): NavigationResult

  onnavigate: ((this: Navigation, ev: NavigateEvent) => any) | null
  onnavigatesuccess: ((this: Navigation, ev: Event) => any) | null
  onnavigateerror: ((this: Navigation, ev: Event) => any) | null
  oncurrententrychange: ((this: Navigation, ev: NavigationCurrentEntryChangeEvent) => any) | null

  addEventListener<K extends keyof NavigationEventMap>(type: K, listener: (this: Navigation, ev: NavigationEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void
  addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void
  removeEventListener<K extends keyof NavigationEventMap>(type: K, listener: (this: Navigation, ev: NavigationEventMap[K]) => any, options?: boolean | EventListenerOptions): void
  removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void
}

declare var Navigation: {
  new(): Navigation
  readonly prototype: Navigation
  readonly name: 'Navigation'
}

interface NavigationUpdateCurrentEntryOptions {
  state: any
}

interface NavigationOptions {
  info?: any
}

interface NavigationNavigateOptions extends NavigationOptions {
  state?: any
  history?: NavigationHistoryBehavior
}

interface NavigationReloadOptions extends NavigationOptions {
  state?: any
}

interface NavigationResult {
  committed: Promise<NavigationHistoryEntry>
  finished: Promise<NavigationHistoryEntry>
}

type NavigationHistoryBehavior = "auto" | "push" | "replace"

type NavigationType = "push" | "replace" | "reload" | "traverse"

interface NavigationHistoryEntryEventMap {
  dispose: Event
}

interface NavigationHistoryEntry extends EventTarget {
  constructor: NavigationHistoryEntry
  readonly [Symbol.toStringTag]: 'NavigationHistoryEntry'

  readonly url: string | null
  readonly key: string
  readonly id: string
  readonly index: number
  readonly sameDocument: boolean

  getState(): any

  ondispose: ((this: NavigationHistoryEntry, ev: Event) => any) | null

  addEventListener<K extends keyof NavigationHistoryEntryEventMap>(type: K, listener: (this: NavigationHistoryEntry, ev: NavigationHistoryEntryEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void
  addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void
  removeEventListener<K extends keyof NavigationHistoryEntryEventMap>(type: K, listener: (this: NavigationHistoryEntry, ev: NavigationHistoryEntryEventMap[K]) => any, options?: boolean | EventListenerOptions): void
  removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void
}

declare var NavigationHistoryEntry: {
  new(): NavigationHistoryEntry
  readonly prototype: NavigationHistoryEntry
  readonly name: 'NavigationHistoryEntry'
}

interface NavigationTransition {
  constructor: NavigationTransition
  readonly [Symbol.toStringTag]: 'NavigationTransition'

  readonly navigationType: NavigationType
  readonly from: NavigationHistoryEntry
  readonly finished: Promise<void>
}

declare var NavigationTransition: {
  new (): NavigationTransition
  readonly prototype: NavigationTransition
  readonly name: 'NavigationTransition'
}

interface NavigationActivation {
  constructor: NavigationActivation
  readonly [Symbol.toStringTag]: 'NavigationActivation'

  readonly from: NavigationHistoryEntry | null
  readonly entry: NavigationHistoryEntry
  readonly navigationType: NavigationType
}

declare var NavigationActivation: {
  new (): NavigationActivation
  readonly prototype: NavigationActivation
  readonly name: 'NavigationActivation'
}

interface NavigateEvent extends Event {
  constructor: NavigateEvent
  readonly [Symbol.toStringTag]: 'NavigateEvent'

  readonly navigationType: NavigationType
  readonly destination: NavigationDestination
  readonly canIntercept: boolean
  readonly userInitiated: boolean
  readonly hashChange: boolean
  readonly signal: AbortSignal
  readonly formData: FormData | null
  readonly downloadRequest: string | null
  readonly info: any
  readonly hasUAVisualTransition: boolean

  intercept(options?: NavigationInterceptOptions): void
  scroll(): void
}

declare var NavigateEvent: {
  new(type: string, eventInitDict: NavigateEventInit): NavigateEvent
  readonly prototype: NavigateEvent
  readonly name: 'NavigateEvent'
}

interface NavigateEventInit extends EventInit {
  navigationType?: NavigationType
  destination: NavigationDestination
  canIntercept?: boolean
  userInitiated?: boolean
  hashChange?: boolean
  signal: AbortSignal
  formData?: FormData
  downloadRequest?: string
  info: any
  hasUAVisualTransition?: boolean
}

interface NavigationInterceptOptions {
  handler: NavigationInterceptHandler
  focusReset: NavigationFocusReset
  scroll: NavigationScrollBehavior
}

type NavigationFocusReset = "after-transition" | "manual"

type NavigationScrollBehavior = "after-transition" | "manual"

type NavigationInterceptHandler = () => Promise<void>

interface NavigationDestination {
  constructor: NavigationDestination
  readonly [Symbol.toStringTag]: 'NavigationDestination'

  readonly url: string
  readonly key: string
  readonly id: string
  readonly index: number
  readonly sameDocument: boolean

  getState(): any
}

declare var NavigationDestination: {
  new(): NavigationDestination
  readonly prototype: NavigationDestination
  readonly name: 'NavigationDestination'
}

interface NavigationCurrentEntryChangeEvent extends Event {
  constructor: NavigationCurrentEntryChangeEvent
  readonly [Symbol.toStringTag]: 'NavigationCurrentEntryChangeEvent'

  readonly navigationType: NavigationType | null
  readonly from: NavigationHistoryEntry
}

declare var NavigationCurrentEntryChangeEvent: {
  new(type: string, eventInitDict: NavigationCurrentEntryChangeEventInit): NavigationCurrentEntryChangeEvent
  readonly prototype: NavigationCurrentEntryChangeEvent
  readonly name: 'NavigationCurrentEntryChangeEvent'
}

interface NavigationCurrentEntryChangeEventInit extends EventInit {
  navigationType?: NavigationType
  from: NavigationHistoryEntry
}
