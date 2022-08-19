const test = require('tape')
const wordlist = require('../lib/wordlist')

function stringify (array) {
  return array.join(' ')
}

test('wordlist', function (t) {
  t.test('wordlist is correct size', function (q) {
    q.plan(1)
    q.equal(2 ** 16, wordlist.length)
  })
  t.test('wordlist is unique', function (q) {
    q.plan(1)
    const set = new Set(wordlist)
    q.equal(2 ** 16, set.size)
  })
  t.test('wordlist is sorted', function (q) {
    q.plan(1)
    const original = stringify(wordlist)
    wordlist.sort()
    q.equal(original, stringify(wordlist))
  })
})
