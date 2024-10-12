/// <reference types="./../lib/index.d.ts" />

export class InvalidExecutionEnvironmentError extends Error {
  constructor() {
    super()
    this.name = 'InvalidExecutionEnvironmentError'
    this.message = 'invalid execution environment, the library should only be used in window scope'
  }

  readonly [Symbol.toStringTag] = 'InvalidExecutionEnvironmentError'
}

export class NotSupportedAPIError extends Error {
  constructor() {
    super()
    this.name = 'NotSupportedAPIError'
    this.message = 'the Navigation API is not supported, so the library is also not supported'
  }

  readonly [Symbol.toStringTag] = 'NotSupportedAPIError'
}

export class NotInitializedError extends Error {
  constructor() {
    super()
    this.name = 'NotInitializedError'
    this.message = 'the router has not initialized yet'
  }

  readonly [Symbol.toStringTag] = 'NotInitializedError'
}

export class DuplicateInitializedError extends Error {
  constructor() {
    super()
    this.name = 'DuplicateInitializedError'
    this.message = 'the router has initialized yet'
  }

  readonly [Symbol.toStringTag] = 'DuplicateInitializedError'
}

export class MissingRouteError extends Error {
  constructor() {
    super()
    this.name = 'MissingRouteError'
    this.message = 'can not find a matched route'
  }

  readonly [Symbol.toStringTag] = 'MissingRouteError'
}
