# niceware

A module for converting cryptographic keys into human-readable phrases, similar
to [Diceware](http://world.std.com/~reinhold/diceware.html) but with a larger
wordlist. With Niceware, a 128-bit key is equivalent to an 8-word phrase.

## Usage in node

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

To use Niceware in modern browsers, include `browser/niceware.js` in a script
tag. Niceware is then available in the `window.niceware` object.

```
<script src='niceware.js'></script>
<script>
  const passphrase = window.niceware.generatePassphrase(8)
</script>
```

Niceware uses `window.{crypto, msCrypto}.getRandomValues` for entropy in the browser.

## Docs

Note: When used in the browser, `Buffer` is replaced with `window.Uint8Array`.

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

