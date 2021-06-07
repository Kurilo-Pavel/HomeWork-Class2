'use strict'

class ThashStorage {
  constructor() {
    this.cocktail = {}
  }

  AddValue(key, value) {
    this.cocktail.key = value
    return value
  }

  GetValue(key) {
    if (key in this.cocktail) {
      return this.cocktail.key
    } else {
      return undefined
    }
  }

  DeleteValue(key) {
    if (key in this.cocktail) {
      delete this.cocktail.key
      return true
    } else {
      return false
    }
  }

  GetKey() {
    return Object.keys(this.cocktail)
  }
}