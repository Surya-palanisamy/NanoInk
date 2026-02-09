# OSI Model & TCP/IP Model

A comprehensive guide to understanding network layer models.

---

## TCP/IP Model (4 Layers)

The TCP/IP model is the practical model used on the internet.

**Layers:**

| Layer | Name           | Protocols              |
| ----- | -------------- | ---------------------- |
| 4     | Application    | HTTP, HTTPS, FTP, SMTP |
| 3     | Transport      | TCP, UDP               |
| 2     | Internet       | IP, ICMP, ARP          |
| 1     | Network Access | Ethernet, WiFi         |

---

## OSI Model (7 Layers)

The OSI (Open Systems Interconnection) model is a conceptual framework for understanding network communications.

| Layer | Name         | Function                        | Examples            |
| ----- | ------------ | ------------------------------- | ------------------- |
| 7     | Application  | What the user sees              | HTTP, FTP, SMTP     |
| 6     | Presentation | Encryption, data format         | JPEG, MP4, SSL      |
| 5     | Session      | Establishing/managing sessions  | NetBIOS, RPC        |
| 4     | Transport    | Reliable delivery, flow control | TCP, UDP            |
| 3     | Network      | IP addressing, routing          | IP, ICMP, Routers   |
| 2     | Data Link    | MAC addresses, frame handling   | Ethernet, Switches  |
| 1     | Physical     | Physical transmission           | Cables, Fiber, Hubs |

![OSI Model Layers](images/osi-layers.png)

---

## Layer Details

### 1. Physical Layer

The physical transmission of raw bits over a medium.

**Components:**

- Cables (Ethernet, Fiber optic)
- Hubs
- Repeaters
- Network adapters

**Think of it as:** The truck carrying the mail.

---

### 2. Data Link Layer

Handles node-to-node data transfer and error detection.

**Key Concepts:**

- MAC addresses
- Frames
- Switches

**Think of it as:** The envelope containing the letter.

---

### 3. Network Layer

Handles routing and logical addressing.

**Key Concepts:**

- IP addresses
- Routers
- Routing tables

**Think of it as:** The address on the envelope.

---

### 4. Transport Layer

Ensures reliable data delivery between hosts.

**Key Concepts:**

- TCP (reliable, connection-oriented)
- UDP (fast, connectionless)
- Port numbers
- Segmentation

**Think of it as:** The guarantee of delivery.

![TCP Communication](images/TCP.gif)

---

### 5. Session Layer

Manages sessions between applications.

**Functions:**

- Session establishment
- Session maintenance
- Session termination

---

### 6. Presentation Layer

Translates data between application and network formats.

**Functions:**

- Data encryption/decryption
- Data compression
- Format conversion (JPEG, MP4, ASCII)

---

### 7. Application Layer

The interface between the user and the network.

**Common Protocols:**

- HTTP/HTTPS (Web)
- FTP (File Transfer)
- SMTP (Email)
- DNS (Domain Resolution)

---

## OSI vs TCP/IP Comparison

| Feature          | OSI Model       | TCP/IP Model      |
| ---------------- | --------------- | ----------------- |
| Layers           | 7               | 4                 |
| Development      | ISO             | DoD               |
| Approach         | Theoretical     | Practical         |
| Layer Separation | Strict          | Flexible          |
| Usage            | Reference model | Internet standard |

### Layer Mapping

| OSI Layers   | TCP/IP Layer   |
| ------------ | -------------- |
| Application  | Application    |
| Presentation |                |
| Session      |                |
| Transport    | Transport      |
| Network      | Internet       |
| Data Link    | Network Access |
| Physical     |                |

---

## Data Flow Through Layers

When data travels from sender to receiver:

**Sender Side (Encapsulation):**

1. Application → Creates data
2. Transport → Adds port numbers (Segment)
3. Network → Adds IP addresses (Packet)
4. Data Link → Adds MAC addresses (Frame)
5. Physical → Converts to bits

**Receiver Side (Decapsulation):**

1. Physical → Receives bits
2. Data Link → Reads MAC, removes header
3. Network → Reads IP, removes header
4. Transport → Reads port, reassembles
5. Application → Processes data

---

## Key Takeaways

- **OSI Model** is theoretical (7 layers)
- **TCP/IP Model** is practical (4 layers)
- Data gets encapsulated going down layers
- Data gets decapsulated going up layers
- Each layer has specific protocols and functions
- Understanding these models is fundamental for networking
