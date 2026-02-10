# Network Security

## 1. Firewall

Firewall controls incoming and outgoing traffic.

**Actions:**

- Allow
- Block
- Filter

**Types:**

- Hardware firewall
- Software firewall
- Network firewall
- Application firewall (WAF)

---

## 2. VPN (Virtual Private Network)

VPN = Virtual Private Network

**What it does:**

- Encrypts internet traffic
- Hides IP
- Provides privacy
- Allows secure remote access

**Useful for:**

- Secure browsing on public WiFi
- Accessing blocked content
- Corporate secure connections

---

## 3. Proxy

A proxy acts as a **middleman** between user and internet.

**Uses:**

- Security
- Filtering
- Hiding identity
- Caching

---

## 4. Proxy vs VPN

| Feature          | Proxy           | VPN                     |
| :--------------- | :-------------- | :---------------------- |
| Hides Identity   | Yes             | Yes                     |
| Encrypts Traffic | No              | Yes                     |
| Security Level   | Low             | High                    |
| Speed            | Faster          | Slightly slower         |
| Use Case         | Basic anonymity | Full privacy & security |

---

## 5. SSL/TLS

SSL (Secure Sockets Layer) and its successor TLS (Transport Layer Security) are the technology behind the Lock Icon in your browser.

**How it works:**

- Creates an encrypted tunnel between the client and server
- **Handshake:** Before sending data, the client and server agree on a secret code (keys) so that even if someone intercepts the data, it looks like gibberish

---

## 6. Public Key vs Private Key

| Feature        | Public Key                             | Private Key                          |
| :------------- | :------------------------------------- | :----------------------------------- |
| Who Owns It?   | Shared with everyone                   | Kept secret by the owner             |
| Security Level | Safe to share                          | Must never be shared                 |
| Used For       | Encrypting data, verifying signatures  | Decrypting data, creating signatures |
| Where It Lives | Servers, certificates, clients         | Secure storage / device              |
| Example Use    | Website SSL certificates, sharing keys | Logging into SSH, signing JWT        |
| Direction      | Lock / Encrypt                         | Unlock / Decrypt                     |
| If Leaked?     | Usually okay                           | Severe security risk                 |

### Simple Understanding

- **Public Key = Lock** — Anyone can lock (encrypt) data for you
- **Private Key = Key** — Only you can unlock (decrypt) and access it

### Encryption Flow

- Sender: Encrypts with **Public Key**
- Receiver: Decrypts with **Private Key**

### Digital Signature Flow

- Sender: Signs with **Private Key**
- Receiver: Verifies with **Public Key**

---

## 7. SSH (Secure Shell)

SSH is a secure protocol used to remotely access and manage systems over a network.

- Default Port: **22**
- Encrypted communication
- Key-based authentication supported
- Replaces insecure protocols like Telnet

> For detailed SSH guide, see [SSH](../Ssh.md)

---

## 8. GATE Exam Important Points

- SSH provides encrypted remote login
- SSH port is **22**
- VPN encrypts all traffic
- Proxy only hides identity
- SSL/TLS creates encrypted tunnel

---

## Quick Reference

| Security Tool | Purpose               | Port    |
| :------------ | :-------------------- | :------ |
| Firewall      | Traffic control       | Various |
| VPN           | Encrypted tunnel      | Various |
| SSH           | Secure remote access  | 22      |
| SSL/TLS       | Encrypted web traffic | 443     |
