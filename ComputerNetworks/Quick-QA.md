# Quick Q&A - Computer Networks
A collection of commonly asked networking questions and concise answers.
---
## General Concepts
### Q1: Difference between HTTP and HTTPS?
| Protocol | Security |
| :------- | :------- |
| HTTP | Data in plain text |
| HTTPS | Data encrypted using SSL/TLS |
---
### Q2: TCP vs UDP?
**TCP:**
- Reliable
- Slower
- Connection-oriented
- Used in: Web, Emails
**UDP:**
- Fast
- Not reliable
- Connectionless
- Used in: Gaming, Streaming
---
### Q3: What happens when you type google.com in browser?
1. DNS resolves domain to IP
2. Browser connects to server (TCP handshake)
3. HTTPS handshake (TLS)
4. HTTP request sent
5. Server responds
6. Page loads and renders
---
### Q4: Difference between IP and MAC?
| Type | Description |
| :--- | :---------- |
| MAC | Physical identifier (hardware) |
| IP | Logical identifier (network) |
---
### Q5: Latency vs Bandwidth?
| Concept | Meaning |
| :------ | :------ |
| Latency | Delay in data transfer |
| Bandwidth | Speed/Capacity of connection |
---
### Q6: DNS Caching?
DNS stores resolved results so next time lookup is faster.
**Exists at:**
- Browser
- OS
- Router
- ISP
---
### Q7: Difference between Router and Switch?
**Router:**
- Connects different networks
- Works at Network Layer (Layer 3)
- Uses IP addresses
**Switch:**
- Connects devices in same network
- Works at Data Link Layer (Layer 2)
- Uses MAC addresses
---
### Q8: What is DHCP?
DHCP = Dynamic Host Configuration Protocol
Assigns IP addresses automatically to devices on a network.
---
### Q9: What is ARP?
ARP = Address Resolution Protocol
Maps IP address → MAC address
---
### Q10: What is Packet Loss?
Packets lost during transfer due to:
- Congestion
- Hardware issues
- Weak network signal
---
### Q11: What is Port Forwarding?
Expose internal service to internet via router configuration.
Example: Making a home server accessible from outside.
---
### Q12: VPN in simple words?
Creates secure encrypted tunnel between you and internet.
---
### Q13: Proxy vs VPN?
| Feature | Proxy | VPN |
| :------ | :---- | :-- |
| Hides Identity | Yes | Yes |
| Encrypts Traffic | No | Yes |
---
## Protocol Questions
### Q14: What protocol is used for sending emails?
SMTP (Simple Mail Transfer Protocol)
---
### Q15: What protocol is used for receiving emails?
- POP3 (downloads to device)
- IMAP (keeps on server)
---
### Q16: Default port for SSH?
**Port 22**
---
### Q17: Which protocol keeps mail on server?
IMAP
---
### Q18: FTP vs SFTP?
| Feature | FTP | SFTP |
| :------ | :-- | :--- |
| Encryption | No | Yes |
| Port | 21 | 22 |
| Security | Low | High |
| Protocol Base | FTP | SSH |
---
## Routing Questions
### Q19: OSPF vs BGP?
| Feature | OSPF | BGP |
| :------ | :--- | :-- |
| Type | Interior (IGP) | Exterior (EGP) |
| Used In | Inside a network | Between networks |
| Algorithm | Dijkstra | Path Vector |
---
### Q20: What runs the internet?
**BGP (Border Gateway Protocol)**
---
## Quick Port Reference
| Service | Port |
| :------ | :--- |
| HTTP | 80 |
| HTTPS | 443 |
| FTP | 21 |
| SSH | 22 |
| DNS | 53 |
| SMTP | 25 |
| POP3 | 110 |
| IMAP | 143 |
| MySQL | 3306 |
| MongoDB | 27017 |
