'use strict'
// @flow
/**
 * A module for converting cryptographic keys into human-readable phrases.
 * @module niceware
 */

const bs = require('binary-search')
const wordlist = require('./wordlist')
const randomBytes = require('randombytes')

const MAX_PASSPHRASE_SIZE = 1024 // Max size of passphrase in bytes

/**
 * @alias module:niceware
 */
const niceware = {}

/**
 * Converts a byte array into a passphrase.
 * @param {Buffer} bytes The bytes to convert
 * @returns {Array.<string>}
 */
niceware.bytesToPassphrase = function (bytes) {
  // XXX: Uint8Array should only be used when this is called in the browser
  // context.
  if (!Buffer.isBuffer(bytes) &&
    !(typeof window === 'object' && bytes instanceof window.Uint8Array)) {
    throw new Error('Input must be a Buffer or Uint8Array.')
  }
  if (bytes.length % 2 === 1) {
    throw new Error('Only even-sized byte arrays are supported.')
  }
  const words = []
  for (var entry of bytes.entries()) {
    let index = entry[0]
    let byte = entry[1]
    let next = bytes[index + 1]
    if (index % 2 === 0) {
      let wordIndex = byte * 256 + next
      let word = wordlist[wordIndex]
      if (!word) {
        throw new Error('Invalid byte encountered')
      } else {
        words.push(word)
      }
    }
  }
  return words
}

/**
 * Converts a phrase back into the original byte array.
 * @param {Array.<string>} words The words to convert
 * @returns {Buffer}
 */
niceware.passphraseToBytes = function (words/* : Array<string> */) {
  if (!Array.isArray(words)) {
    throw new Error('Input must be an array.')
  }

  const bytes = Buffer.alloc(words.length * 2)

  words.forEach((word, index) => {
    if (typeof word !== 'string') {
      throw new Error('Word must be a string.')
    }
    const wordIndex = bs(wordlist, word.toLowerCase(), (a, b) => {
      if (a === b) {
        return 0
      }
      return a > b ? 1 : -1
    })
    if (wordIndex < 0) {
      throw new Error(`Invalid word: ${word}`)
    }
    bytes[2 * index] = Math.floor(wordIndex / 256)
    bytes[2 * index + 1] = wordIndex % 256
  })

  return bytes
}

/**
 * Generates a random passphrase with the specified number of bytes.
 * NOTE: `size` must be an even number.
 * @param {number} size The number of random bytes to use
 * @returns {Array.<string>}
 */
niceware.generatePassphrase = function (size/* : number */) {
  if (typeof size !== 'number' || size < 0 || size > MAX_PASSPHRASE_SIZE) {
    throw new Error(`Size must be between 0 and ${MAX_PASSPHRASE_SIZE} bytes.`)
  }
  const bytes = randomBytes(size)
  return niceware.bytesToPassphrase(bytes)
}

// For browserify
if (typeof window === 'object') {
  window.niceware = niceware
}

module.exports = niceware
