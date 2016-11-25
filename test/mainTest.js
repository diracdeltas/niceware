const test = require('tape')
const niceware = require('../lib/main')

function stringify (array) {
  return array.join(' ')
}

function arrayify (string) {
  return string.split(' ')
}

test('generatePassphrase', function (t) {
  t.test('generates passphrases of the correct length', function (q) {
    q.plan(4)
    q.equal(1, niceware.generatePassphrase(2).length)
    q.equal(0, niceware.generatePassphrase(0).length)
    q.equal(10, niceware.generatePassphrase(20).length)
    q.equal(256, niceware.generatePassphrase(512).length)
  })
  t.test('throws when generating passphrase wt.testh an odd number of bytes', function (q) {
    q.plan(2)
    q.throws(niceware.generatePassphrase.bind(null, 1), /even/)
    q.throws(niceware.generatePassphrase.bind(null, 23), /even/)
  })
  t.test('throws when generating passphrase wt.testh >1024 or <0 bytes', function (q) {
    q.plan(2)
    q.throws(niceware.generatePassphrase.bind(null, 1026), /1024/)
    q.throws(niceware.generatePassphrase.bind(null, -4), /1024/)
  })
})

test('bytesToPassphrase', function (t) {
  t.test('throws when byte array has odd length', function (q) {
    q.plan(1)
    q.throws(niceware.bytesToPassphrase.bind(null, Buffer.alloc(1)), /even/)
  })
  t.test('throws when input is not a byte array', function (q) {
    q.plan(1)
    q.throws(niceware.bytesToPassphrase.bind(null, [1, 1]), /Buffer/)
  })
  t.test('returns expected passphrases', function (q) {
    q.plan(4)
    q.equal(0, niceware.bytesToPassphrase(Buffer.alloc(0)).length)
    q.equal('a',
      stringify(niceware.bytesToPassphrase(Buffer.from([0x00, 0x00]))))
    q.equal('zyzzyva',
      stringify(niceware.bytesToPassphrase(Buffer.from([0xff, 0xff]))))
    q.equal(
      'a bioengineering balloted gobbledegook creneled written depriving zyzzyva',
      stringify(niceware.bytesToPassphrase(Buffer.from(
        [0, 0, 17, 212, 12, 140, 90, 247, 46, 83, 254, 60, 54, 169, 255, 255])))
    )
  })
})

test('passphraseToBytes', function (t) {
  t.test('throws when input is invalid', function (q) {
    q.plan(2)
    q.throws(niceware.passphraseToBytes.bind(null, Buffer.alloc(1)), /array/)
    q.throws(niceware.passphraseToBytes.bind(null, [1, 2]), /string/)
  })
  t.test('throws when input is not in the wordlist', function (q) {
    q.plan(1)
    q.throws(niceware.passphraseToBytes.bind(null, ['You', 'love', 'ninetales']),
      /ninetales/)
  })
  t.test('returns expected bytes', function (q) {
    q.plan(3)
    q.ok(Buffer.from([0x00, 0x00]).equals(
      niceware.passphraseToBytes(arrayify('A'))
    ))
    q.ok(Buffer.from([0xff, 0xff]).equals(
      niceware.passphraseToBytes(arrayify('zyzzyva'))
    ))
    q.ok(Buffer.from([0, 0, 17, 212, 12, 140, 90, 247, 46, 83, 254, 60, 54, 169, 255, 255]).equals(
      niceware.passphraseToBytes(arrayify('A bioengineering Balloted gobbledegooK cReneled Written depriving zyzzyva'))
    ))
  })
})

