# niceware

[![Build Status](https://travis-ci.org/diracdeltas/niceware.svg?branch=master)](https://travis-ci.org/diracdeltas/niceware)

A JS library for generating random-yet-memorable passwords, either server-side in Node or in the browser. Each word provides 16 bits of entropy, so a useful password requires at least 3 words.

Because the wordlist is of exactly size 2^16, Niceware is also userful for convert cryptographic keys and other sequences of random bytes into human-readable phrases. With Niceware, a 128-bit key is equivalent to an 8-word phrase.

Demo: https://diracdeltas.github.io/niceware/

## Sample use cases

* Niceware can be used to generate secure, semi-memorable, easy-to-type
  passphrases. A random 3-5 word phrase in Niceware is equivalent to a strong
  password for authentication to most online services. For instance,
  `+8svofk0Y1o=` and `bacca cavort west volley` are equally strong (64 bits of
  randomness).
* Niceware can be used to display cryptographic key material in a way that
  users can easily backup or copy between devices. For instance, the 128-bit
  random seed used to generate a 256-bit ECC key (~equivalent to
  a 3072-bit RSA key) is only 8 Niceware words. With this 8-word phrase, you
  can reconstruct the entire public/private keypair.

## Usage in Node

To install:

```
npm install niceware
```

To generate an 8-byte passphrase:

```
const niceware = require('niceware')

// The number of bytes must be even
const passphrase = niceware.generatePassphrase(8)

// Result: [ 'deathtrap', 'stegosaur', 'nilled', 'nonscheduled' ]
```

## Usage in browser

To use Niceware in modern browsers, include
[browser/niceware.js](browser/niceware.js) in a script
tag. Niceware is then available in the `window.niceware` object.

```
<script src='niceware.js'></script>
<script>
  const passphrase = window.niceware.generatePassphrase(8)
</script>
```

Niceware uses `window.{crypto, msCrypto}.getRandomValues` for entropy in the browser.

## Other

Niceware is also available as a third-party Chrome extension, thanks to Noah
Feder. https://chrome.google.com/webstore/detail/niceware-password/dhnichgmciickpnnnhfcljljnfomadag

## Docs

NOTE: When used in the browser, `Buffer` is replaced with `window.Uint8Array`.

* [niceware](#exp_module_niceware--niceware) ⏏
    * [.bytesToPassphrase(bytes)](#module_niceware--niceware.bytesToPassphrase) ⇒ <code>Array.&lt;string&gt;</code>
    * [.passphraseToBytes(words)](#module_niceware--niceware.passphraseToBytes) ⇒ <code>Buffer</code>
    * [.generatePassphrase(size)](#module_niceware--niceware.generatePassphrase) ⇒ <code>Array.&lt;string&gt;</code>

<a name="exp_module_niceware--niceware"></a>

### niceware ⏏
**Kind**: Exported constant  
<a name="module_niceware--niceware.bytesToPassphrase"></a>

#### niceware.bytesToPassphrase(bytes) ⇒ <code>Array.&lt;string&gt;</code>
Converts a byte array into a passphrase.

**Kind**: static method of <code>[niceware](#exp_module_niceware--niceware)</code>  

| Param | Type | Description |
| --- | --- | --- |
| bytes | <code>Buffer</code> | The bytes to convert |

<a name="module_niceware--niceware.passphraseToBytes"></a>

#### niceware.passphraseToBytes(words) ⇒ <code>Buffer</code>
Converts a phrase back into the original byte array.

**Kind**: static method of <code>[niceware](#exp_module_niceware--niceware)</code>  

| Param | Type | Description |
| --- | --- | --- |
| words | <code>Array.&lt;string&gt;</code> | The words to convert |

<a name="module_niceware--niceware.generatePassphrase"></a>

#### niceware.generatePassphrase(size) ⇒ <code>Array.&lt;string&gt;</code>
Generates a random passphrase with the specified number of bytes.
NOTE: `size` must be an even number.

**Kind**: static method of <code>[niceware](#exp_module_niceware--niceware)</code>  

| Param | Type | Description |
| --- | --- | --- |
| size | <code>number</code> | The number of random bytes to use |


## Credits

Niceware was inspired by
[Diceware](http://world.std.com/~reinhold/diceware.html). Its wordlist is
derived from http://www-01.sil.org/linguistics/wordlists/english/. This project
is based on my work on OpenPGP key backup for the Yahoo
[End-to-End](https://github.com/yahoo/end-to-end) project.
