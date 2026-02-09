# Encryption & SSL/TLS

## SSL/TLS Overview

**SSL** (Secure Sockets Layer) and its successor **TLS** (Transport Layer Security) are the technology behind the Lock Icon in your browser.

- Creates an encrypted tunnel between client and server
- **Handshake**: Before sending data, client and server agree on a secret code (keys) so that even if someone intercepts the data, it looks like gibberish

---

## Public Key vs Private Key

| Feature        | Public Key                             | Private Key                          |
| :------------- | :------------------------------------- | :----------------------------------- |
| Who Owns It?   | Shared with everyone                   | Kept secret by the owner             |
| Security Level | Safe to share                          | Must never be shared                 |
| Used For       | Encrypting data, verifying signatures  | Decrypting data, creating signatures |
| Where It Lives | Servers, certificates, clients         | Secure storage / device              |
| Example Use    | Website SSL certificates, sharing keys | Logging into SSH, signing JWT        |
| Direction      | Lock / Encrypt                         | Unlock / Decrypt                     |
| If Leaked?     | Usually okay                           | Severe security risk                 |

---

## Simple Understanding

- **Public Key = Lock**  
  Anyone can lock (encrypt) data for you.

- **Private Key = Key**  
  Only you can unlock (decrypt) and access it.

---

## Encryption Flow

**Sender:** Encrypts with **Public Key**  
**Receiver:** Decrypts with **Private Key**

---

## Digital Signature Flow

**Sender:** Signs with **Private Key**  
**Receiver:** Verifies with **Public Key**

---

## HTTP vs HTTPS

| Protocol | Security              |
| :------- | :-------------------- |
| HTTP     | Data in plain text    |
| HTTPS    | Data encrypted (SSL/TLS) |

---

## TLS Handshake Steps

1. **Client Hello** - Client sends supported cipher suites
2. **Server Hello** - Server chooses cipher suite, sends certificate
3. **Key Exchange** - Both parties generate session keys
4. **Encrypted Communication** - All data is now encrypted

---

## Common Use Cases

- Website security (HTTPS)
- Email encryption
- VPN connections
- API security
- SSH connections

---

## Related Topics

- [SSH](../Ssh.md)
- [HTTP and Web](./HTTP-and-Web.md)
