/* global describe, it */

const assert = require('assert')
const niceware = require('../lib/main')

function stringify (array) {
  return array.join(' ')
}

function arrayify (string) {
  return string.split(' ')
}

describe('generatePassphrase', function () {
  it('generates passphrases of the correct length', function () {
    assert.equal(1, niceware.generatePassphrase(2).length)
    assert.equal(0, niceware.generatePassphrase(0).length)
    assert.equal(10, niceware.generatePassphrase(20).length)
    assert.equal(256, niceware.generatePassphrase(512).length)
  })
  it('throws when generating passphrase with an odd number of bytes', function () {
    assert.throws(niceware.generatePassphrase.bind(null, 1), /even/)
    assert.throws(niceware.generatePassphrase.bind(null, 23), /even/)
  })
  it('throws when generating passphrase with >1024 or <0 bytes', function () {
    assert.throws(niceware.generatePassphrase.bind(null, 1026), /1024/)
    assert.throws(niceware.generatePassphrase.bind(null, -4), /1024/)
  })
})

describe('bytesToPassphrase', function () {
  it('throws when byte array has odd length', function () {
    assert.throws(niceware.bytesToPassphrase.bind(null, Buffer.alloc(1)), /even/)
  })
  it('throws when input is not a byte array', function () {
    assert.throws(niceware.bytesToPassphrase.bind(null, [1, 1]), /Buffer/)
  })
  it('returns expected passphrases', function () {
    assert.equal(0, niceware.bytesToPassphrase(Buffer.alloc(0)).length)
    assert.equal('a',
      stringify(niceware.bytesToPassphrase(Buffer.from([0x00, 0x00]))))
    assert.equal('zyzzyva',
      stringify(niceware.bytesToPassphrase(Buffer.from([0xff, 0xff]))))
    assert.equal(
      'a bioengineering balloted gobbledegook creneled written depriving zyzzyva',
      stringify(niceware.bytesToPassphrase(Buffer.from(
        [0, 0, 17, 212, 12, 140, 90, 247, 46, 83, 254, 60, 54, 169, 255, 255])))
    )
  })
})

describe('passphraseToBytes', function () {
  it('throws when input is invalid', function () {
    assert.throws(niceware.passphraseToBytes.bind(null, Buffer.alloc(1)), /array/)
    assert.throws(niceware.passphraseToBytes.bind(null, [1, 2]), /string/)
  })
  it('throws when input is not in the wordlist', function () {
    assert.throws(niceware.passphraseToBytes.bind(null, ['i', 'love', 'ninetales']),
      /passphrase/)
  })
  it('returns expected bytes', function () {
    assert(Buffer.from([0x00, 0x00]).equals(
      niceware.passphraseToBytes(arrayify('A'))
    ))
    assert(Buffer.from([0xff, 0xff]).equals(
      niceware.passphraseToBytes(arrayify('zyzzyva'))
    ))
    assert(Buffer.from([0, 0, 17, 212, 12, 140, 90, 247, 46, 83, 254, 60, 54, 169, 255, 255]).equals(
      niceware.passphraseToBytes(arrayify('A bioengineering Balloted gobbledegooK cReneled Written depriving zyzzyva'))
    ))
  })
})

