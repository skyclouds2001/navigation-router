/// <reference types="./../lib/index.d.ts" />

export class InvalidExecutionEnvironmentError extends Error {
  constructor() {
    super()
    this.name = 'InvalidExecutionEnvironmentError'
    this.message = 'invalid execution environment, the library should only be used in window scope'
  }
}

export class NotSupportedAPIError extends Error {
  constructor() {
    super()
    this.name = 'NotSupportedAPIError'
    this.message = 'the Navigation API is not supported, so the library is also not supported'
  }
}

export class NotInitializedError extends Error {
  constructor() {
    super()
    this.name = 'NotInitializedError'
    this.message = 'the router has not initialized yet'
  }
}

export class DuplicateInitializedError extends Error {
  constructor() {
    super()
    this.name = 'DuplicateInitializedError'
    this.message = 'the router has initialized yet'
  }
}

export class MissingRouteError extends Error {
  constructor() {
    super()
    this.name = 'MissingRouteError'
    this.message = 'can not find a matched route'
  }
}
