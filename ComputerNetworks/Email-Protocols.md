# Email Protocols
## Overview
Email communication works using three main protocols:
| Protocol | Purpose                                 |
| :------- | :-------------------------------------- |
| SMTP     | Sending emails                          |
| POP3     | Receiving and downloading emails        |
| IMAP     | Receiving and managing emails on server |
---
## SMTP – Simple Mail Transfer Protocol
### Definition
SMTP is a protocol used to SEND emails from a client to a mail server and between mail servers.
### Layer
- Application Layer Protocol
- Works over TCP
### Port Numbers
| Type             | Port |
| :--------------- | :--- |
| Traditional SMTP | 25   |
| SMTPS (SSL)      | 465  |
| SMTP with TLS    | 587  |
> Port 587 is recommended for modern email sending.
---
### Features of SMTP
- Used only for sending emails
- Text-based protocol
- Uses TCP for reliable delivery
- Works in push model (client pushes mail to server)
---
### SMTP Communication Model
```
User → SMTP Client → SMTP Server → Destination SMTP Server → Receiver
```
---
### SMTP Commands
| Command   | Meaning                   |
| :-------- | :------------------------ |
| HELO      | Identify client to server |
| MAIL FROM | Sender address            |
| RCPT TO   | Receiver address          |
| DATA      | Start message body        |
| QUIT      | End session               |
---
### Limitations of SMTP
- Cannot retrieve emails
- No authentication by default
- Works only for sending
---
## POP3 – Post Office Protocol Version 3
### Definition
POP3 is a protocol used to DOWNLOAD emails from mail server to client device.
### Port Numbers
| Type        | Port |
| :---------- | :--- |
| POP3        | 110  |
| POP3S (SSL) | 995  |
---
### Characteristics
- Downloads emails to local device
- Usually deletes mail from server after download
- Works in pull model
- Simple and lightweight
---
### POP3 Modes
1. **Download and Delete** – Email removed from server after download
2. **Download and Keep Copy** – Email remains on server
---
### Disadvantages of POP3
- Not suitable for multiple devices
- Limited synchronization
- Emails stored locally only
---
## IMAP – Internet Message Access Protocol
### Definition
IMAP is used to ACCESS and MANAGE emails directly on the mail server.
### Port Numbers
| Type        | Port |
| :---------- | :--- |
| IMAP        | 143  |
| IMAPS (SSL) | 993  |
---
### Advantages of IMAP
- Emails remain on server
- Supports multiple devices
- Folder synchronization
- Better for modern email usage
---
## IMAP vs POP3
| Feature      | POP3          | IMAP             |
| :----------- | :------------ | :--------------- |
| Storage      | Local device  | Server           |
| Sync         | No            | Yes              |
| Multi-device | Poor          | Excellent        |
| Speed        | Faster        | Slightly slower  |
| Use Case     | Single device | Multiple devices |
---
## Protocol Comparison
| Protocol | Function                    | Default Port |
| :------- | :-------------------------- | :----------- |
| SMTP     | Send emails                 | 25 / 587     |
| POP3     | Receive and download emails | 110          |
| IMAP     | Access and manage emails    | 143          |
---
## Quick Revision
- **SMTP** is used ONLY for sending
- **POP3** downloads emails to local device
- **IMAP** keeps emails on server (best for multiple devices)
- All three work at the Application Layer over TCP
