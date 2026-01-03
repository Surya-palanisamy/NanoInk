## SSH — Secure Shell 

> A secure protocol to remotely access and manage servers

###  What is SSH?

SSH (Secure Shell) allows secure remote login, command execution, and file transfer between systems over an encrypted channel.

>[!Default port]
> 22

---

###  Basic SSH Command

```bash
ssh username@hostname
```

Example:

`ssh root@192.168.1.10`

`ssh surya@myserver.com`

### Connect with Port

```bash
ssh -p 2222 username@server
```

### Generate SSH Key

```bash
ssh-keygen
```

Default path:

~/.ssh/id_rsa
#### Execute Command Without Login

```bash
ssh user@server "uptime" ssh user@server "ls -l /var/www"
```

---

### 🚀 Copy Public Key to Server (Passwordless Login)

```bash
ssh-copy-id username@server
```

If `ssh-copy-id` not available:

```bash

cat ~/.ssh/id_rsa.pub | ssh user@server "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"
```

| Option | Meaning                    |
| ------ | -------------------------- |
| `-p`   | specify port               |
| `-i`   | choose identity (key file) |
| `-v`   | verbose debugging          |
| `-X`   | enable GUI forwarding      |
| `-t`   | force terminal             |
Example:

```bash
ssh -i ~/.ssh/custom_key user@server
```
---
### SSH Config File (Time Saver!)

Location:
```bash
~/.ssh/config
```
---
Example:
```bash
Host myserver
   HostName 192.168.1.10   
   User surya   
   Port 22   
   IdentityFile ~/.ssh/id_rsa
```
---

Now simply run:
```bash 
ssh myserver
````

connected
### SSH Config File (Time Saver!)

Location:

```
~/.ssh/config
```
---
Example:

```
Host myserver   HostName 192.168.1.10   User surya   Port 22   IdentityFile ~/.ssh/id_rsa
```
Now simply run:

```bash
ssh myserver
```

---

### 📂 File Transfer Commands

#### Upload File → Server

```bash
scp file.txt user@server:/home/user/
```

#### Download File ← Server

```bash 
scp user@server:/home/user/file.txt .
```

#### Copy Folder

```bash 
scp -r folder user@server:/path/
```

---
### ⚡ Faster + Reliable Transfer (rsync)

```bash
rsync -avz file user@server:/path
```

Mirror directory:
```bash 
rsync -avz --delete folder/ user@server:/path/
```
---
### Execute Command Without Login

```
ssh user@server "uptime" ssh user@server "ls -l /var/www"
```
---
#### Reset SSH Service

Linux:

```bash
sudo systemctl restart ssh`
```

Or:

```bash
sudo service ssh restart
```

### Check Port Listening

```bash
sudo netstat -tulpn | grep ssh
```
---
 ## 🛡️ Security Best Practices

- Disable root login    
- Use SSH keys (avoid passwords)  
- Change default port 
- Enable fail2ban    
- Restrict IPs
---

Disable root login:  

Edit:

```bash
sudo nano /etc/ssh/sshd_config
```
Change:

```
PermitRootLogin no
```

Restart SSH.

---
### Quick Summary

- SSH connects securely
- Use ssh-keygen + ssh-copy-id
- Use config file for shortcuts
- SCP / rsync for file transfer
- Tunneling for advanced usage
---