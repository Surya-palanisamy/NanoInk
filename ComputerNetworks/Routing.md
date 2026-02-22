# Routing
Routing is the process of selecting the best path for data packets to travel from a source device to a destination device across a network.
---
## Key Components
- **Routers** - Devices that forward packets between networks
- **Routing Tables** - Store information about network paths
- **Routing Protocols** - Rules for determining best paths
---
## Types of Routing
| Type            | Description                    |
| :-------------- | :----------------------------- |
| Static Routing  | Manually configured paths      |
| Dynamic Routing | Automatic path selection       |
---
## Routing Protocols Overview
Routing protocols decide HOW routers choose paths.
### Two Main Categories
| Type                            | Example | Used For              |
| :------------------------------ | :------ | :-------------------- |
| Interior Gateway Protocol (IGP) | OSPF    | Inside one network    |
| Exterior Gateway Protocol (EGP) | BGP     | Between networks      |
---
## OSPF – Open Shortest Path First
- Used **INSIDE** one organization or ISP
- Calculates shortest path using **Dijkstra algorithm**
- Based on cost, bandwidth, and speed
- Fast and dynamic
### Used In
- Company networks
- University networks
- Internal ISP routing
### Goal
Find the best path inside a single network.
---
## BGP – Border Gateway Protocol
- Used **BETWEEN** different networks and ISPs
- Runs the entire internet
- Policy-based routing
- Does NOT care about speed or distance
### What BGP Cares About
- Business agreements
- Policies
- Stability
- AS-PATH
---
## Difference Between OSPF and BGP
| Feature        | OSPF             | BGP              |
| :------------- | :--------------- | :--------------- |
| Type           | Interior (IGP)   | Exterior (EGP)   |
| Used In        | Inside a network | Between networks |
| Goal           | Shortest path    | Best policy path |
| Algorithm      | Dijkstra         | Path Vector      |
| Internet Usage | No               | Yes              |
### Protocol Comparison
| Protocol | Cares About                  |
| :------- | :--------------------------- |
| OSPF     | Speed / cost / shortest path |
| RIP      | Hop count (distance)         |
| BGP      | Policies and preferences     |
---
## Autonomous System (AS)
### Definition
An Autonomous System is a large network under single administrative control.
### AS Number (ASN)
- Unique identifier for each network on the internet
- Examples:
  - Google: AS15169
  - Facebook: AS32934
---
## AS-PATH in BGP
- AS-PATH is a list of AS numbers a packet passes through
- Used for:
  - Loop prevention
  - Path selection
### Example AS-PATH
```
AS100 → AS200 → AS32934
```
---
## What Happens When You Ping a Website
### Example: `ping facebook.com`
**Steps:**
1. **DNS Resolution**
   - Domain name is converted to IP address
   - Example: facebook.com → 57.144.56.1
2. **ICMP Packet Creation**
   - System creates an ICMP Echo Request packet
3. **Routing Table Lookup**
   - OS checks where to send packet next
4. **ARP Resolution**
   - Finds MAC address of the gateway
5. **Packet Sent to Router**
6. **Routers Forward Packet Across Internet**
7. **Facebook Server Responds**
8. **Reply Returns to Your Device**
---
## Traceroute
Traceroute shows the path packets take across the internet.
### Command
```bash
traceroute facebook.com
```
### What Traceroute Shows
- Each router hop
- Latency between hops
- Network path structure
### Important Notes
- Some hops show `* * *` due to ICMP blocking
- Final hops may be hidden for security
---
## Packets
Data in network travels in small chunks called **packets**.
A packet contains:
- Source IP
- Destination IP
- Data payload
---
## Important Commands
### View Routing Table
```bash
ip route
```
### Trace Route
```bash
traceroute facebook.com
```
### View ARP Table
```bash
ip neigh
```
---
## Quick Reference
| Concept           | Description                                |
| :---------------- | :----------------------------------------- |
| Routing           | Selecting best path for packets            |
| Router            | Device that forwards packets               |
| OSPF              | Interior routing protocol (shortest path)  |
| BGP               | Exterior routing protocol (policy-based)   |
| AS                | Network under single admin control         |
| Traceroute        | Shows path packets take                    |
| Static Routing    | Manually configured                        |
| Dynamic Routing   | Automatically determined                   |
---
## Summary
- **OSPF** is used inside networks
- **BGP** is used between networks
- **Traceroute** shows path, not protocol
- Internet routing is mostly **BGP**
- Your PC only knows next hop, not full path
