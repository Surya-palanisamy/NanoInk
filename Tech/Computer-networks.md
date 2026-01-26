---

## 1. IP Address?

An IP Address is a unique number assigned to every device in a network so it can be identified and communicate.

- Example: `192.168.1.10` (IPv4)  
- Types:
  - Private IP — used inside local networks
  - Public IP — used on the internet
- Versions:
  - IPv4 → 32-bit (like 192.168.1.1)
  - IPv6 → 128-bit (like fe80::1)

![](../images/Ipv4.png)

#### 🌐 Localhost (Loopback)
Used to refer to **your own computer**

- `127.0.0.1` → Localhost (correct)
- Range: `127.0.0.0 – 127.255.255.255`
- Used for:
  - testing
  - development
  - no internet needed
---

#### 🏠 Private IP Addresses

Used inside homes, offices, LAN networks  
Not accessible directly from internet.

##### 1. Class A Private Range

Used in big networks

```
10.0.0.0 – 10.255.255.255
```

Common examples:

- `10.0.0.1`
- `10.10.10.10`
- `10.1.1.1`

---

#### 2. Class B Private Range

Used in medium networks

```
172.16.0.0 – 172.31.255.255
```

Examples:

- `172.16.0.1`
- `172.20.5.10`
- `172.31.100.50`

❗ Only **172.16 → 172.31** are private  
Other 172.x are public

---

#### 3. Class C Private Range

Most common in home WiFi

```
192.168.0.0 – 192.168.255.255
```

Examples:

- `192.168.0.1`
- `192.168.1.1`
- `192.168.43.1` (Hotspot)

## ![](../images/private-and-public-IP.png)

#### 🌍 Public IP

Used on the **internet**  
Assigned by ISP

Examples:

- `8.8.8.8` (Google DNS)
- `142.250.183.14`
- `52.95.245.123`

Anyone on internet can reach (unless blocked).

---

#### Special IP Range

##### APIPA (Automatic Private IP)

Assigned when no DHCP / WiFi problem

```
169.254.x.x
```

Meaning:

- network problem
- failed to get IP

---

## 2. MAC Address?

A MAC Address is a **hardware identifier** burned into the network card by the manufacturer.

- Example: `A4:B3:22:1F:9C:10`
- Works at **Data Link Layer**
- Never changes (normally)

Think: **MAC = Physical identity**, **IP = Logical identity**

           - 48 bit address

---

#### 3. SSL/TLS?SSL

SSL (Secure Sockets Layer) its successor TLS (Transport Layer Security) are the technology behind the Lock Icon in your browser.It creates an encrypted tunnel between the client and server.Handshake: Before sending data, the client and server agree on a secret code (keys) so that even if someone intercepts the data, it looks like gibberish.

#### Public Key vs Private Key

| Feature        | Public Key                             | Private Key                          |
| -------------- | -------------------------------------- | ------------------------------------ |
| Who Owns It?   | Shared with everyone                   | Kept secret by the owner             |
| Security Level | Safe to share                          | Must never be shared                 |
| Used For       | Encrypting data, verifying signatures  | Decrypting data, creating signatures |
| Where It Lives | Servers, certificates, clients         | Secure storage / device              |
| Example Use    | Website SSL certificates, sharing keys | Logging into SSH, signing JWT        |
| Direction      | Lock / Encrypt                         | Unlock / Decrypt                     |
| If Leaked?     | Usually okay                           | Severe security risk                 |

---

##### Simple Understanding

- **Public Key = Lock**
  Anyone can lock (encrypt) data for you.

- **Private Key = Key**
  Only you can unlock (decrypt) and access it.

---

##### Encryption

- Sender: Encrypts with **Public Key**
- Receiver: Decrypts with **Private Key**

##### Digital Signature

- Sender: Signs with **Private Key**
- Receiver: Verifies with **Public Key**

## 4.Default Ports (Most Important)

| Service             | Port  |
| ------------------- | ----- |
| HTTP                | 80    |
| HTTPS               | 443   |
| FTP                 | 21    |
| SSH                 | 22    |
| DNS                 | 53    |
| SMTP (Mail Sending) | 25    |
| POP3 (Receive Mail) | 110   |
| IMAP                | 143   |
| MySQL               | 3306  |
| MongoDB             | 27017 |

Port = Doorway for communication.

---

## 5.TCP / IP Model

**Layers:**

1. Application
2. Transport
3. Internet
4. Network Access

**Protocols:**

- HTTP, HTTPS, FTP
- TCP, UDP
- IP
- Ethernet

![](../images/TCP.gif)

---

## 6. OSI Model (7 Layers)

1. Physical: Cables, fiber optics (The truck carrying the mail).
2. Data Link: MAC addresses, switches (The envelope).
3. Network: IP addresses, routing (The address on the envelope).
4. Transport: TCP/UDP (The guarantee of delivery).
5. Session: Establishing a connection.
6. Presentation: Encryption, data format (JPEG, MP4).
7. Application: What the user sees (HTTP, FTP).

![](../images/osi-layers.png)

---

## 7.Client-Server Architecture

**Client:** Requests data  
**Server:** Responds with data

Examples:

- Browser → Client
- Website → Server

![](../images/HTTP-1.gif)

---

## 8. HTTP?

HTTP = Hyper Text Transfer Protocol  
Used to transfer web pages.

- Stateless (no memory between requests)
- Uses port 80
- Text-based communication

HTTPS = Secure HTTP (encrypted)  
Uses port 443.

---

## 9. HTTP Methods

| Method  | Use                     |
| ------- | ----------------------- |
| GET     | Read data               |
| POST    | Send/Create data        |
| PUT     | Update data             |
| DELETE  | Delete data             |
| PATCH   | Partial update          |
| HEAD    | Header only             |
| OPTIONS | Check available methods |

### 10. Cookies vs Sessions vs Local Storage

| Feature                       | Cookies                            | Sessions                      | Local Storage                      |
| ----------------------------- | ---------------------------------- | ----------------------------- | ---------------------------------- |
| Stored Where?                 | Browser                            | Server                        | Browser                            |
| Data Lifetime                 | Set by expiry                      | Until user logs out / expires | Until manually cleared             |
| Size Limit                    | ~4KB                               | Depends on server             | ~5–10MB                            |
| Security                      | Can be stolen if not secured       | More secure                   | Less secure                        |
| Accessible By                 | Client + Server                    | Server only                   | Client (JavaScript)                |
| Best For                      | Auth tokens, tracking, remember me | Login session, user identity  | Preferences, theme, small app data |
| Automatically Sent to Server? | Yes (with every request)           | No                            | No                                 |
| Works Offline?                | Yes                                | No                            | Yes                                |

---

## 11. HTTP Status Codes

### Success

200 OK — Successful  
201 Created — Resource created

### Redirect

301 Moved Permanently  
302 Found

### Client Errors

400 Bad Request  
401 Unauthorized  
403 Forbidden  
404 Not Found

### Server Errors

500 Internal Server Error  
503 Service Unavailable

## ![](../images/http-status-codes.png)

## 12. APIs?

API = Application Programming Interface  
Allows communication between applications.

Example:

- Mobile app talking to server
- Weather app fetching weather data

Types:

- REST
- GraphQL
- SOAP

## ![](../images/API.png)

## 13. DNS

DNS = Domain Name System  
Converts domain names to IP addresses.

Example:
`google.com → 142.250.183.14`

Without DNS we would need to remember IPs.

![](../images/Basic-website.gif)

---

## 14. URL Breakdown

Example:

```url
https://www.example.com:443/home/index.html?user=1
```

- Protocol → https
- Domain → example.com
- Subdomain → www
- Port → 443
- Path → /home/index.html
- Query → ?user=1

---

## 15. CNAME

CNAME = Canonical Name

Maps one domain name to another domain.

Example:

```url
blog.example.com → example.medium.com
```

Used in hosting, CDNs, custom domains.

---

## 16. Proxy?

A proxy acts as a **middleman** between user and internet.

Uses:

- Security
- Filtering
- Hiding identity
- Caching

---

## 17. VPN

VPN = Virtual Private Network

What it does:

- Encrypts internet traffic
- Hides IP
- Provides privacy
- Allows secure remote access

Useful for:

- Secure browsing on public WiFi
- Accessing blocked content
- Corporate secure connections

---

## 18. TCP vs UDP

| TCP                | UDP                      |
| ------------------ | ------------------------ |
| Reliable           | Not reliable             |
| Slower             | Faster                   |
| Connection based   | Connectionless           |
| Used in Web, Email | Used in Games, Streaming |

---

## 19. Bandwidth?

Speed of data transfer capacity of network.

---

## 20. Latency?

Delay time in data transfer.

Lower latency = faster response.

---

## 21. Packet

Data in network travels in small chunks called packets.

Contains:

- Source IP
- Destination IP
- Data

---

---

# 🔥 ADVANCED COMPUTER NETWORKS — QUICK NOTES

---

## 22. Subnetting?

Subnetting divides a large network into smaller networks.

Why?

- Better performance
- Improved security
- Efficient IP usage

Example:
Network: `192.168.1.0/24`
Subnetted into:

- 192.168.1.0/26
- 192.168.1.64/26
- 192.168.1.128/26
- 192.168.1.192/26

---

## 23. CIDR Notation

CIDR = Classless Inter-Domain Routing  
Represents network mask.

Example:

- `/24` → 255.255.255.0
- `/16` → 255.255.0.0
- `/32` → single IP

---

## 24. NAT?

NAT = Network Address Translation

Converts:
Private IP ↔ Public IP

Uses:

- Security
- Limited IPv4 saving
- Home routers

Types:

- Static NAT
- Dynamic NAT
- PAT (Port Address Translation)

---

## 25. Firewall

Firewall controls incoming and outgoing traffic.

Can:

- Allow
- Block
- Filter

Types:

- Hardware firewall
- Software firewall
- Network firewall
- Application firewall (WAF)

---

## 26. Load Balancer

Distributes traffic across multiple servers.

Benefits:

- No server overload
- High availability
- Scalability

Types:

- L4 Load balancer
- L7 Load balancer

Examples:
NGINX, HAProxy, AWS ELB

---

## 27. CDN

CDN = Content Delivery Network

Stores website files in multiple locations worldwide.

Benefits:

- Faster loading
- Reduced server load
- Better user experience

Examples:
Cloudflare  
Akamai  
AWS CloudFront

---

## 28. WebSocket

Allows **real-time two-way communication**.

Used in:

- Chat apps
- Games
- Live tracking
- Stock trading

Unlike HTTP which is request-response only.

---

## 29 QoS (Quality of Service)

Controls and prioritizes network traffic.

Example:

- Give priority to video calls over downloads

Used in:

- Corporate networks
- VoIP
- Streaming

---

## 30. MPLS

Multi-Protocol Label Switching  
Fast packet forwarding using labels instead of IP routing.

Used in:

- ISP networks
- Enterprise WANs

### Simple q&a

---

#### Q1: Difference between HTTP and HTTPS?

HTTP → Data in plain text  
HTTPS → Data encrypted using SSL/TLS

---

#### Q2: TCP vs UDP?

TCP:

- Reliable
- Slow
- Connection-oriented
  Used in: Web, Emails

UDP:

- Fast
- Not reliable
- Connectionless
  Used in: Gaming, Streaming

---

#### Q3: What happens when you type google.com in browser?

1. DNS resolves domain to IP
2. Browser connects to server
3. HTTPS handshake
4. HTTP request sent
5. Server responds
6. Page loads

---

#### Q4: Difference between IP and MAC?

MAC → Physical identifier (hardware)  
IP → Logical identifier (network)

---

#### Q5: Latency vs Bandwidth?

Latency → Delay  
Bandwidth → Speed/Capacity

---

#### Q6: DNS Caching?

DNS stores resolved results so next time lookup is faster.

Exists at:

- Browser
- OS
- Router
- ISP

---

#### Q7: Difference between Router and Switch?

Router:

- Connects different networks
- Works at Network Layer

Switch:

- Connects devices in same network
- Works at Data Link Layer

---

#### Q8: DHCP?

Assigns IP addresses automatically.

---

#### Q9: ARP?

ARP = Address Resolution Protocol  
Maps IP → MAC

---

#### Q10. Packet Loss?

Packets lost during transfer due to:

- Congestion
- Hardware issues
- Weak network

---

#### Q11: Port Forwarding?

Expose internal service to internet via router.

---

#### Q12: VPN in simple words?

Creates secure encrypted tunnel between you and internet.

---

#### Q13: Proxy vs VPN?

Proxy → Hides identity only  
VPN → Hides identity + encrypts traffic

---
