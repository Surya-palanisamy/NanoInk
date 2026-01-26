## SSH — Secure Shell

> A secure protocol to remotely access and manage servers

### What is SSH?

SSH (Secure Shell) allows secure remote login, command execution, and file transfer between systems over an encrypted channel.

> [!Default port]
> 22

---

### Basic SSH Command

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

```bash
ssh-keygen -t rsa -b 4096
```

---

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
```

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

## rsync — File Synchronization & Backup Tool

---

### What is rsync?

`rsync` (Remote Sync) is used to **copy and synchronize files/folders** locally or between remote systems.  
It is faster than `scp` because:

- Transfers only differences
- Supports resume
- Preserves permissions & timestamps

---

### 🧾 Basic Syntax

```bash
rsync [options] source destination
```

Examples:

```bash
rsync file.txt /home/user/Desktop/
rsync myfolder/ backup/
```

---

### Upload to Remote Server

```bash
rsync file.txt user@server:/path/
```

Directory:

```bash
rsync -av myfolder/ user@server:/path/
```

---

### Download from Remote Server

```bash
rsync -av user@server:/path/file.txt .
```

Directory:

```bash
rsync -av user@server:/path/folder/ .
```

---

## 🧭 Important Options

| Option     | Meaning                                                 |
| ---------- | ------------------------------------------------------- |
| `-a`       | archive (preserves permissions, owner, time, recursive) |
| `-v`       | verbose                                                 |
| `-z`       | compress                                                |
| `-P`       | progress + resume                                       |
| `--delete` | remove files not in source                              |
| `-r`       | recursive (included in `-a`)                            |

**Most used combo**

```bash
rsync -avzP source/ destination/
```

---

## ⚠️ Slash Rule (Very Important)

- `folder/` → only contents
- `folder` → folder + contents

Example:

```bash
rsync -av Photos/ Backup/
```

Copies inside Photos → Backup/

```bash
rsync -av Photos Backup/
```

Creates:

```
Backup/Photos/
```

---

## 🔁 Mirror Exact Copy

Deletes extra files in destination:

```bash
rsync -av --delete source/ destination/
```

Use carefully!

---

## 🚀 Resume Large Transfers

```bash
rsync -avzP file.iso user@server:/path/
```

---

## 🎯 Exclude Files

Skip unwanted files:

```bash
rsync -av --exclude="*.log" folder/ backup/
```

Multiple:

```bash
rsync -av \
--exclude="node_modules" \
--exclude="*.tmp" \
project/ backup/
```

---

## 🔐 rsync Over SSH (Secure)

```bash
rsync -avz -e ssh folder/ user@server:/path/
```

Custom SSH Port:

```bash
rsync -avz -e "ssh -p 2222" folder/ user@server:/path/
```

---

## 🧪 Real Use Cases

### 1️⃣ Backup Home Directory

```bash
rsync -av ~/ Documents/Backup/
```

### 2️⃣ Deploy Website

```bash
rsync -avz site/ user@server:/var/www/html/
```

### 3️⃣ Sync External Drive

```bash
rsync -av /mnt/drive/ /backup/drive/
```

---

## 🧠 Safety Tip

Preview without making changes:

```bash
rsync -av --dry-run source/ destination/
```

---

## 🏆 Practice

1️⃣ Sync two folders  
2️⃣ Test with `/` and without `/`  
3️⃣ Try `--delete` carefully  
4️⃣ Try remote sync

---

> [!Summary]
> rsync is powerful because it is:

- Fast
- Secure
- Efficient
- Backup-friendly
- Ideal for DevOps & servers
