<a name="module_niceware"></a>

## niceware
A module for converting cryptographic keys into human-readable phrases.


* [niceware](#module_niceware)
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

