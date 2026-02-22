# Network Services
## 1. Load Balancer
Distributes traffic across multiple servers.
### Benefits
- No server overload
- High availability
- Scalability
### Types
| Type | Description |
| :--- | :---------- |
| L4 Load Balancer | Operates at Transport Layer (TCP/UDP) |
| L7 Load Balancer | Operates at Application Layer (HTTP/HTTPS) |
### Examples
- NGINX
- HAProxy
- AWS ELB
---
## 2. CDN (Content Delivery Network)
CDN = Content Delivery Network
Stores website files in multiple locations worldwide.
### Benefits
- Faster loading
- Reduced server load
- Better user experience
### Popular CDN Providers
- Cloudflare
- Akamai
- AWS CloudFront
---
## 3. WebSocket
Allows **real-time two-way communication**.
### Used In
- Chat apps
- Games
- Live tracking
- Stock trading
Unlike HTTP which is request-response only, WebSocket maintains a persistent connection.
---
## 4. QoS (Quality of Service)
Controls and prioritizes network traffic.
### Example
- Give priority to video calls over downloads
### Used In
- Corporate networks
- VoIP
- Streaming
---
## 5. MPLS (Multi-Protocol Label Switching)
Fast packet forwarding using labels instead of IP routing.
### Used In
- ISP networks
- Enterprise WANs
### How It Works
Instead of inspecting IP headers at each hop, MPLS uses short labels to make forwarding decisions, which is much faster.
---
## 6. DHCP (Dynamic Host Configuration Protocol)
Assigns IP addresses automatically to devices on a network.
### How It Works
1. Device connects to network
2. Device broadcasts DHCP discover message
3. DHCP server responds with IP offer
4. Device requests the offered IP
5. Server acknowledges and assigns IP
### Benefits
- No manual IP configuration needed
- Prevents IP conflicts
- Centralized IP management
---
## 7. Bandwidth vs Latency
| Concept | Definition |
| :------ | :--------- |
| Bandwidth | Speed of data transfer capacity of network |
| Latency | Delay time in data transfer |
Lower latency = faster response.
---
## 8. Packet
Data in network travels in small chunks called packets.
### Contains
- Source IP
- Destination IP
- Data payload
- Header information
---
## Quick Reference
| Service | Purpose |
| :------ | :------ |
| Load Balancer | Distribute traffic |
| CDN | Cache content globally |
| WebSocket | Real-time communication |
| QoS | Prioritize traffic |
| MPLS | Fast label-based routing |
| DHCP | Auto IP assignment |
