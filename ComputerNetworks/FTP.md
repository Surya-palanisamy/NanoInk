# FTP - File Transfer Protocol

## 1. Definition

FTP (File Transfer Protocol) is used to transfer files between a client and server over a network.

## 2. Port Numbers

| Mode        | Port |
| :---------- | :--- |
| FTP Control | 21   |
| FTP Data    | 20   |

---

## 3. Modes of FTP

### Active Mode vs Passive Mode

| Feature                   | Active Mode | Passive Mode |
| :------------------------ | :---------- | :----------- |
| Who opens data connection | Server      | Client       |
| Firewall friendly         | No          | Yes          |
| Used today                | Rarely      | Mostly       |
| Ports used                | 20 and 21   | 21 + random  |
| NAT compatibility         | Poor        | Good         |

---

## 4. Characteristics

- Client-server model
- Supports upload and download
- Unencrypted protocol
- Works over TCP

---

## 5. FTP Commands

| Command | Purpose                 |
| :------ | :---------------------- |
| USER    | Username                |
| PASS    | Password                |
| LIST    | List files              |
| RETR    | Download file           |
| STOR    | Upload file             |
| QUIT    | End session             |
| PWD     | Print working directory |
| CWD     | Change directory        |
| DELE    | Delete file             |

---

## 6. Limitations of FTP

- No encryption
- Credentials sent in plain text
- Not secure for sensitive data

---

## 7. Secure Alternatives to FTP

Because FTP is insecure, modern replacements are:
| Protocol | Meaning |
| :------- | :------------------------- |
| FTPS | FTP over SSL/TLS |
| SFTP | SSH File Transfer Protocol |

---

## 8. FTP vs SFTP Comparison

| Feature        | FTP               | SFTP                 |
| :------------- | :---------------- | :------------------- |
| Encryption     | No                | Yes                  |
| Port           | 21                | 22                   |
| Security       | Low               | High                 |
| Protocol Base  | FTP               | SSH                  |
| Firewall       | Complex           | Simple               |
| Authentication | Username/Password | Password or SSH Keys |

---

## 9. Common FTP Clients

- FileZilla
- WinSCP
- Cyberduck
- Command line `ftp` tool

---

## 10. Command Line Usage

### Connect to FTP Server

```bash
ftp hostname
```

### Using SFTP

```bash
sftp user@hostname
```

### Copy file with SCP

```bash
scp file.txt user@host:/path/
```

---

## 11. Quick Reference

| Protocol | Port | Encryption | Use Case       |
| :------- | :--- | :--------- | :------------- |
| FTP      | 21   | No         | Legacy systems |
| FTPS     | 990  | Yes (SSL)  | Secure FTP     |
| SFTP     | 22   | Yes (SSH)  | Recommended    |

---

## 12. GATE Exam Points

- FTP is insecure by default
- SFTP is NOT FTP – it is part of SSH
- FTP uses two ports: 21 (control) and 20 (data)
- Passive mode is preferred for NAT/firewall compatibility
