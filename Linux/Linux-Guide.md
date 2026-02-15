# Linux Guide: Basics to Advanced

## 1. What is Linux?

**Linux** is the engine that powers millions of servers, phones (Android), and computers worldwide.

### Core Parts

- **Kernel**: The brain that talks to your hardware (CPU, RAM, disk)
- **Distributions (Distros)**: Complete packages like Ubuntu, Fedora, or Arch that bundle the kernel with tools
- **Shell**: The command-line interface (Bash/Zsh) where you type commands
- **Package Manager**: App store for installing software (`apt`, `dnf`, `pacman`)

### Why Learn Linux?

- Powers 90%+ of web servers and cloud infrastructure
- Required for DevOps, system administration, and backend development
- Complete control over your system
- Free and open source

## 2. Getting Started

### Choose a Distribution

| Distro            | Best For                      | Package Manager |
| ----------------- | ----------------------------- | --------------- |
| **Ubuntu/Debian** | Beginners, stability          | `apt`           |
| **Fedora/RHEL**   | Enterprise, latest features   | `dnf`           |
| **Arch Linux**    | Advanced users, customization | `pacman`        |
| **Alpine**        | Containers, minimal systems   | `apk`           |

### Essential Commands

### Navigation

```bash
pwd                    # Show current directory
ls -la                 # List files (including hidden)
cd /path/to/folder     # Change directory
cd -                   # Go back to previous directory
cd ~                   # Go to home directory
```

# Understanding the Filesystem

### Important Directories

```

/  (Root directory — everything starts here)
├── /home         # User home directories (e.g., /home/john)
├── /etc          # System-wide configuration files
├── /var          # Variable data (logs, cache, databases, mail)
│   └── /var/log  # System and application log files
├── /usr          # User programs and read-only utilities
├── /opt          # Optional / third-party software packages
├── /tmp          # Temporary files (usually cleared on reboot)
├── /dev          # Device files (hard drives, USB, etc.)
├── /proc         # Virtual filesystem for process & system info
└── /sys          # Kernel and hardware information (sysfs)

```

### Disk Usage

```bash
# Check disk space
df -h                  # Show disk usage for all partitions
du -sh *               # Size of each item in current directory
du -sh /var/log        # Total size of a directory

# List all disks and partitions
lsblk                  # Tree view of disks
lsblk -f               # Include filesystem types

# Show mounted filesystems
mount                  # List all mounts
```

### Symbolic Links (Shortcuts)

```bash
# Create a shortcut to a file or folder
ln -s /path/to/original /path/to/shortcut

# Example: create shortcut to nginx config
ln -s /etc/nginx/sites-available/mysite /etc/nginx/sites-enabled/mysite

# Vi. Users and Permissions

### User Management

```bash
# Who am I?
whoami                 # Current username
```

# Installing Software

### Ubuntu/Debian (apt)

```bash
# Update package list
sudo apt update

# Install software
sudo apt install nginx
sudo apt install nginx mysql-server  # Multiple packages

# Remove software
sudo apt remove nginx                # Keep config files
sudo apt purge nginx                 # Delete everything

# Upgrade all packages
sudo apt upgrade                     # Safe upgrades
sudo apt full-upgrade                # Handle dependencies

# Search for packages
apt search nginx
apt show nginx                       # Package details

# Clean up
sudo apt autoremove                  # Remove unused packages
sudo apt clean                       # Clear download cache
```

### Fedora/RHEL/CentOS (dnf)

```bash
sudo dnf install nginx
sudo dnf remove nginx
sudo dnf upgrade                     # Update all packages
sudo dnf search nginx
sudo dnf info nginx
```

### Arch Linux (pacman)

```bash
sudo pacman -S nginx                 # Install
sudo pacman -R nginx                 # Remove
sudo pacman -Rns nginx               # Remove with dependencies
sudo pacman -Syu                     # Update system
sudo pacman -Ss nginx                # Search
```

### Snap Packages (Universal)

```bash
sudo snap install code --classic     # VS Code
sudo snap remove code
snap find discord
```

# View all users

```bash
# List all users

cat /etc/passwd

```

### Groups

```bash
# See your groups
groups                 # Your groups
groups alice           # Alice's groups

# Create group
sudo groupadd developers

# Add user to group
sudo usermod -aG developers alice     # -a appends, don't remove existing
sudo usermod -aG sudo alice           # Give sudo access

# Remove user from group
sudo gpasswd -d alice developers
```

### The `sudo` Command

`sudo` = "superuser do" - run commands as admin/root

```bash
# Run command as admin
sudo apt update
sudo systemctl restart nginx

# Edit system files
sudo nano /etc/hosts

# Become root user (not recommended)
sudo -i                # Login shell as root
sudo su                # Switch to root

# See what you can sudo
sudo -l
```

**Important:** Only users in the `sudo` group (Debian/Ubuntu) or `wheel` group (RHEL/Fedora) can use sudo

```bash
head -n 20 file.txt # First 20 lines
tail -f /var/log/syslog # Follow log file in real-time
```

# Creating and editing

```bash
mkdir myfolder # Create directory
mkdir -p path/to/deep/folder # Create nested directories
touch newfile.txt # Create empty file
nano file.txt # Simple text editor
vim file.txt # Advanced text editor

```

# Managing Processes

### View Running Processes

```bash
# List all processes
ps aux                           # All processes, detailed
ps aux | grep nginx              # Find specific process

```

Managing Services (systemd)
Systemd controls background services like web servers, databases, SSH, etc.

### Basic Service Control

# Check service status
```bash
syst. Networking Basics
```

### Check Network Status

```bash
# Show network interfaces and IP addresses
ip a                             # Modern way
ifconfig                         # Older way (may need net-tools package)

# Show routing table
ip route
route -n                         # Older way
```

# Storage Management

### View Disks and Partitions

```bash
# List all disks and partitions
lsblk                            # Tree view
lsblk -f                         # Show filesystems
sudo fdisk -l                    # Detailed partition info
sudo parted -l                   # Alternative tool

# Show UUIDs (unique disk identifiers)
sudo blkid
```

### Create and Format a Partition

```bash
# ⚠️ WARNING: These commands can erase data!

# 1. Create partition (interactive)
sudo fdisk /dev/sdb              # Replace sdb with your disk
# Commands: n (new), p (primary), w (write)

# 2. Format partition
sudo mkfs.ext4 /dev/sdb1         # ext4 filesystem
sudo mkfs.xfs /dev/sdb1          # XFS filesystem

# 3. Create mount point and mount
sudo mkdir /mnt/mydisk
sudo mount /dev/sdb1 /mnt/mydisk

# 4. Auto-mount on boot (add to /etc/fstab)
# /dev/sdb1  /mnt/mydisk  ext4  defaults  0  2
```

### Check and Repair Filesystem

```bash
# ⚠️ IMPORTANT: Unmount first!
sudo umount /dev/sdb1

# Check and repair
sudo fsck /dev/sdb1              # Check filesystem
sudo fsck -y /dev/sdb1           # Auto-fix errors
```

### Add Swap Space

- Monitoring and Logs

### System Resource Usage

```bash
# Memory usage
free -h                          # RAM and swap
free . Security Best Practices
```
### Essential Security Steps

```bash
# 1. Keep system updated
sudo apt update && sudo apt upgrade -y
sudo apt install unattended-upgrades    # Auto security updates

# 2. Disable root SSH login
sudo nano /etc/ssh/sshd_config
# Change: PermitRootLogin no
# Change: PasswordAuthentication no
sudo systemctl restart sshd

# 3. Use SSH keys instead of passwords
ssh-keygen -t ed25519
ssh-copy-id user@server

# 4. Enable firewall
sudo ufw enable
sudo ufw allow 22              # Only allow what you need
sudo ufw allow 80
sudo ufw allow 443

# 5. Remove unused services
systemctl list-units --type=service
sudo systemctl disable apache2  # If not using
```

### File Permission Security

```bash
# Bad - anyone can read/write/execute
chmod 777 file.txt              # ❌ NEVER DO THIS

# Good - only owner can write
chmod 644 file.txt              # ✅ rw-r--r--
chmod 600 ~/.ssh/id_ed25519     # ✅ SSH keys should be private

# Scripts
chmod 755 script.sh             # ✅ Owner can run, others can read

# Sensitive files
chmod 600 /etc/app/secrets.conf # ✅ Only owner can read
```

### Monitor Failed Login Attempts

```bash
# See who tried to log in
sudo journalctl -u ssh --since today | grep -i failed
sudo tail -f /var/log/auth.log | grep -i failed

# Install fail2ban (blocks brute force)
sudo apt install fail2ban
sudo systemctl enable --now fail2ban
sudo fail2ban-client status sshd
```

### Security Checklist

 Automation with Scripts and Cron

### Basic Shell Script

Create a file `backup.sh`:

```bash
#!/bin/bash
# Simple backup script
. Web Server Setup (Nginx)
```

### Install Nginx

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install nginx

# Sta. Docker Basics

### Install Docker

```bash
# Ubuntu/Debian
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Add your user to docker group (no sudo needed)
sudo usermod -aG docker $USER
# Log out and back in for this to take effect

# Verify installation
docker --version
docker run hello-world
```

### Working with Images

```bash
# Search for images
docker search nginx

# Download image
docker pull nginx
docker pull ubuntu:22.04         # Specific version

# List images
docker images

# Remove image
docker rmi nginx
docker rmi ubuntu:22.04
```

### Running Containers

```bash
# Run container (interactive)
docker run -it ubuntu bash       # Run Ubuntu and get a shell
# Inside container, type 'exit' to leave

# Run container (background)
docker run -d --name web nginx   # -d = detached mode
docker run -d --name web -p 8080:80 nginx  # Map port 8080 -> 80

# List running containers
docker ps
docker ps -a                     # Include stopped containers

# Stop/Start containers
docker stop web
docker start web
docker restart web

# Remove container
docker Troubleshooting Common Issues
```
### System is Slow

```bash
# 1. Check CPU usage
top                              # Press '1' to see per-core
htop                             # Better UI

# 2. Check memory
free -h                          # Is swap being used heavily?
```
# 3. . Backups

### Simple Backup with rsync

```bash
# Backup directory to external drive
rsync -av --delete /home/john/ /mnt/backup/john/
# -a = archive mode (preserves permissions, times, etc.)
# -v = verbose
# --delete = remove files in destination that don't exist in source

# Backup over network
rsync -avz /home/john/ user@server:/backup/john/
# -z = compress during transfer

# Dry run (see what would change)
rsync -avn --delete /home/john/ /mnt/backup/john/
```

### Compress and Archive

```bash
# Create compressed backup
tar -czf backup-$(date +%Y%m%d).tar.gz /home/john

# Extract backup
tar -xzf backup-20240115.tar.gz

# List contents without extracting
tar -tzf backup.tar.gz
```

# Find large files

### System Information

```bash
uname -a                         # Kernel version
lsb_release -a                   # OS version (Ubuntu/Debian)
hostnamectl                      # System details
uptime                           # Uptime and load
```

### File Operations

```bash
ls -la                           # List all files
cp file.txt backup.txt           # Copy
mv old.txt new.txt               # Move/rename
rm file.txt                      # Delete
find . -name "*.log"             # Find files
```

### Processes

```bash
ps aux                           # List all processes
top                              # Monitor processes
kill <pid>                       # Stop process
pkill nginx                      # Kill by name
```

### Networking

```bash
ip a                             # IP addresses
ping google.com                  # Test connectivity
ss -tulpen                       # Open ports
curl https://example.com         # HTTP request
```

### Services

```bash
systemctl status nginx           # Check service
systemctl start nginx            # Start service
systemctl enable nginx           # Enable on boot
journalctl -u nginx              # View logs
```

### Storage

```bash
df -h                            # Disk space
du -sh *                         # Directory sizes
lsblk                            # List disks
```

---


## 19. Additional Resources

### Getting Help

```bash
man ls                           # Manual for 'ls' command
ls --help                        # Quick help
info ls                          # Detailed info
tldr ls                          # Simple examples (install tldr first)
```

### Online Resources

- **Ubuntu Documentation**: https://help.ubuntu.com
- **Arch Wiki**: https://wiki.archlinux.org (works for all distros)
- **DigitalOcean Tutorials**: https://digitalocean.com/community/tutorials
- **Linux Journey**: https://linuxjourney.com (beginner-friendly)

---

# 1. Check firewall
```bash
sudo ufw status
sudo ufw allow 22
```
# 2. Check if port is listening
```bash
sudo ss -tulpen | grep :22
```
# 3. Test from server itself
```bash
ssh localhost
```
# 4. Check logs
```bash
journalctl -u sshd -f
tail -f /var/log/auth.log
```


### Permission Denied Errors

```bash
# Check file ownership and permissions
ls -la file.txt

# Fix ownership
sudo chown user:user file.txt

# Fix permissions
chmod 644 file.txt               # For regular files
chmod 755 directory/             # For directories
chmod +x script.sh               # For scripts

# Add user to group
sudo usermod -aG groupname username
# Log out and back in
```

### Trace System Calls (Advanced)

```bash
# See what a process is doing
strace -p <pid>                  # Attach to running process
strace command                   # Trace command from start

# Example: why is ls slow?
strace ls /var/log 2>&1 | grep open
```

# Execute command in running container
```bash
docker exec -it web bash # Get shell inside 
```

container
```bash
docker exec web ls /etc/nginx # Run single command
```
# View container details
```bash
docker inspect web
```
```bash
docker stats # Live resource usage

```

### Docker Compose (Multi-container apps)

Create `docker-compose.yml`:

```yaml
version: '3'
services:
  web:
    image: nginx
    ports:
      - "8080:80"
  db:
    image: postgres:14
    environment:
      POSTGRES_PASSWORD: secret
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
```

Commands:

```bash
# Start all services
docker compose up -d

# View logs
docker compose logs -f

# Stop all services
docker compose down

# Rebuild and start
docker compose up -d --build
```

### Cleanup

```bash
# Remove stopped containers
docker container prune

# Remove unused images
docker image prune

# Remove everything unused
docker system prune -a

# Remove specific container + image
docker rm web
docker rmi nginx
```



### Basic Configuration

```bash
# Config files location
/etc/nginx/nginx.conf            # Main config
/etc/nginx/sites-available/      # Site configs
/etc/nginx/sites-enabled/        # Active sites (symlinks)

# Create new site
sudo nano /etc/nginx/sites-available/mysite

# Add this:
server {
    listen 80;
    server_name example.com www.example.com;
    root /var/www/mysite;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}

# Enable site
sudo ln -s /etc/nginx/sites-available/mysite /etc/nginx/sites-enabled/

# Test config
sudo nginx -t

# Reload nginx
sudo systemctl reload nginx
```

### SSL/HTTPS with Let's Encrypt

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get free SSL certificate
sudo certbot --nginx -d example.com -d www.example.com

# Auto-renewal (runs automatically)
sudo certbot renew --dry-run
```

### Reverse Proxy (for Node.js/Python apps)

```nginx
# /etc/nginx/sites-available/api
server {
    listen 80;
    server_name api.example.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Useful Nginx Commands

```bash
# Test config for errors
sudo nginx -t

# Reload config (no downtime)
sudo systemctl reload nginx

# Restart nginx
sudo systemctl restart nginx

# View logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# Check which sites are enabled
ls -l /etc/nginx/sites-enabled/
```

# Create backup directory
```bash
mkdir -p "$BACKUP"
```

# Copy files
```bash
echo "Starting backup..."
cp -r "$SOURCE" "$BACKUP"
echo "Backup complete: $BACKUP"

```

Make it executable and run:

```bash
chmod +x backup.sh
./backup.sh
```

### Script with Arguments

```bash
#!/bin/bash
# greet.sh - Say hello

if [ $# -eq 0 ]; then
    echo "Usage: $0 <name>"
    exit 1
fi

NAME=$1
echo "Hello, $NAME!"
```

Usage:

```bash
./greet.sh John
# Output: Hello, John!
```

### Scheduled Tasks with Cron

Cron runs commands automatically at scheduled times.

```bash
# Edit your crontab
crontab -e

# Crontab format:
# ┌─ minute (0-59)
# │ ┌─ hour (0-23)
# │ │ ┌─ day of month (1-31)
# │ │ │ ┌─ month (1-12)
# │ │ │ │ ┌─ day of week (0-6, 0=Sunday)
# │ │ │ │ │
# * * * * * command to execute
```

Common examples:

```bash
# Run every day at 2 AM
0 2 * * * /home/john/backup.sh

# Run every hour
0 * * * * /usr/local/bin/cleanup.sh

# Run every Monday at 9 AM
0 9 * * 1 /home/john/weekly-report.sh

# Run every 15 minutes
*/15 * * * * /home/john/check-status.sh

# Run on reboot
@reboot /home/john/start-services.sh

# View your scheduled tasks
crontab -l
```

### Useful Script Examples

**Check if service is running:**

```bash
#!/bin/bash
if systemctl is-active --quiet nginx; then
    echo "nginx is running"
else
    echo "nginx is NOT running"
    sudo systemctl start nginx
fi
```

**Loop through files:**

```bash
#!/bin/bash
for file in /var/log/*.log; do
    echo "Processing: $file"
    # Do something with $file
done
```

**Check if command exists:**

```bash
#!/bin/bash
if command -v docker &> /dev/null; then
    echo "Docker is installed"
else
    echo "Docker is NOT installed"
fi
```

-  Use the principle of least privilege
  top # Basic monitor (press q to quit)
  htop # Better UI (install with apt/dnf)
  uptime # System uptime and load average

# Real-time resource monitor
```bash
vmstat 1 # Update every second
iostat -x 1 # Disk I/O stats (install sysstat)

```

### System Logs

```bash
# Modern (systemd) logs
journalctl -xe                   # Recent errors
journalctl -f                    # Follow live logs
journalctl --since today         # Today's logs
journalctl --since "1 hour ago"  # Last hour
journalctl -u nginx              # Specific service
journalctl -k                    # Kernel messages
journalctl -p err                # Only errors

# Traditional log files (in /var/log)
sudo tail -f /var/log/syslog     # System log
sudo tail -f /var/log/auth.log   # Authentication attempts
sudo tail -f /var/log/kern.log   # Kernel messages
sudo less /var/log/apache2/error.log  # Apache errors

# Follow any log file
tail -f /var/log/myapp.log       # Live updates
less +F /var/log/myapp.log       # Less with follow mode
```

### Kernel Messages

```bash
dmesg                            # Boot and hardware messages
dmesg | grep -i error            # Find errors
dmesg -w                         # Follow mode
dmesg --level=err,warn           # Only errors and warnings
```

### Quick Health Check

```bash
# Check if anything is wrong
systemctl --failed               # Failed services
journalctl -p err --since today  # Today's errors
df -h | grep -v tmpfs           # Disk space issues
free -h                          # Memory issues
uptime                           # Load average (if > CPU count, system is busy)

sudo chmod 600 /swapfile # Security
sudo mkswap /swapfile
sudo swapon /swapfile

```
# Make permanent (add to /etc/fstab)

#### /swapfile none swap sw 0 0

#### Check swap
```bash
free -h
swapon --show
```

# DNS lookup
```bash
dig google.com                   # Detailed DNS info
nslookup google.com             # Simple DNS lookup
host google.com                 # Quick DNS check
```
# Check open ports
```bash
sudo ss -tulpen                  # List listening ports (modern)
sudo netstat -tulpen            # Older way
```

### Firewall (UFW - Ubuntu/Debian)

```bash
# Enable firewall
sudo ufw enable
sudo ufw status                  # Check status

# Allow ports
sudo ufw allow 22/tcp            # SSH
sudo ufw allow 80/tcp            # HTTP
sudo ufw allow 443/tcp           # HTTPS
sudo ufw allow 22,80,443/tcp     # Multiple ports

# Allow from specific IP
sudo ufw allow from 192.168.1.100

# Delete rules
sudo ufw status numbered         # Show rule numbers
sudo ufw delete 3                # Delete rule #3

# Disable firewall
sudo ufw disable
```

### SSH (Remote Access)

```bash
# Connect to remote server
ssh user@192.168.1.100
ssh user@example.com

# Generate SSH key (do this on your local machine)
ssh-keygen -t ed25519 -C "your_email@example.com"
# Keys saved to: ~/.ssh/id_ed25519 (private) and ~/.ssh/id_ed25519.pub (public)

# Copy key to server (enables passwordless login)
ssh-copy-id user@server-ip

# SSH config file (~/.ssh/config)
Host myserver
    HostName 192.168.1.100
    User john
    Port 22
    IdentityFile ~/.ssh/id_ed25519

# Now you can connect with:
ssh myserver
```

### Test Web Services

```bash
# Download file
curl -O https://example.com/file.zip

# Test HTTP endpoint
curl http://localhost:8080               # GET request
curl -I https://example.com              # Show headers only
curl -v https://api.example.com          # Verbose output

# POST request with JSON
curl -X POST http://localhost:3000/api \
  -H "Content-Type: application/json" \
  -d '{"name":"John"}'

# Test if port is open
nc -zv localhost 80                      # netcat port check
telnet localhost 80                      # telnet (old school)
```

### Download Files

```bash
# Using curl
curl -O https://example.com/file.zip     # Save with original name
curl -o myfile.zip https://example.com/file.zip  # Custom name

# Using wget
wget https://example.com/file.zip
wget -c https://example.com/bigfile.zip  # Resume download

sudo systemctl enable nginx # Start on boot
sudo systemctl disable nginx # Don't start on boot
sudo systemctl enable --now nginx # Enable AND start immediately

```

### View All Services

```bash
systemctl list-units --type=service          # Running services
systemctl list-unit-files --type=service     # All services
systemctl list-units --failed                # Failed services
```

### Service Logs

```bash
# View service logs
journalctl -u nginx                          # All nginx logs
journalctl -u nginx --since "1 hour ago"     # Last hour
journalctl -u nginx --since today            # Today's logs
journalctl -fu nginx                         # Follow live (-f)
journalctl -u nginx -n 50                    # Last 50 lines

# System-wide logs
journalctl -xe                               # Recent errors
journalctl -k                                # Kernel messages
journalctl --since "2024-01-15"              # Specific date
```

### Example: Set up a Web Server

```bash
# Install nginx
sudo apt install nginx

# Start and enable on boot
sudo systemctl enable --now nginx

# Check status
systemctl status nginx

# View logs
journalctl -fu nginx

# Restart after config change
sudo systemctl restart nginx


pidof nginx # Same as pgrep
pstree # Tree view of processes

```

### Stop/Kill Processes

```bash
# Gentle stop (gives process time to cleanup)
kill 1234                        # Send SIGTERM to PID 1234
killall nginx                    # Kill all nginx processes
pkill -f python                  # Kill by name pattern

# Force kill (last resort - data may be lost!)
kill -9 1234                     # Send SIGKILL
killall -9 nginx
```

**Kill Signal Cheat Sheet:**

- `SIGTERM` (15): Polite "please exit" - default
- `SIGKILL` (9): Force kill - use when SIGTERM fails
- `SIGHUP` (1): Reload config without restart

### Background Jobs

```bash
# Run in background
command &                        # Start in background
./long-script.sh &

# Manage jobs
jobs                             # List background jobs
fg                               # Bring to foreground
bg                               # Resume in background
Ctrl+Z                           # Pause current process
bg                               # Continue paused process in background

# Example workflow
./server.sh                      # Start server
Ctrl+Z                           # Pause it
bg                               # Run in background
jobs                             # See it running
fg                               # Bring back to foreground
```

### Resource Control

```bash
# Start process with lower priority (nice = less CPU)
nice -n 10 ./cpu-heavy-script.sh      # Lower priority
nice -n -5 ./important-task.sh        # Higher priority (requires sudo)

# Change priority of running process
renice 10 -p 1234                     # Make PID 1234 lower priority
```


### File Permissions

```bash
# Read permissions
ls -l file.txt         # Shows: -rw-r--r-- (owner, group, others)

# Change permissions
chmod 644 file.txt     # rw-r--r-- (owner: read+write, others: read)
chmod +x script.sh     # Make executable
chmod 755 script.sh    # rwxr-xr-x (common for scripts)

# Change owner
sudo chown user:group file.txt
```

**Permission Numbers:**

- `7` = read + write + execute (rwx)
- `6` = read + write (rw-)
- `5` = read + execute (r-x)
- `4` = read only (r--)

### Searching Files

```bash
# Find files by name
find . -name "*.log"              # Find all .log files
find /var -type d -name "nginx"   # Find directories named nginx

# Search inside files
grep "error" logfile.txt          # Find "error" in file
grep -r "TODO" .                  # Search all files recursively
grep -i "warning" file.txt        # Case-insensitive search
```

### Text Processing

```bash
# Count lines/words
wc -l file.txt                    # Count lines
wc -w file.txt                    # Count words

# Sort and unique
sort names.txt                    # Sort alphabetically
sort -n numbers.txt               # Sort numerically
sort file.txt | uniq              # Remove duplicates

# Pipes - chain commands together
cat file.txt | grep "error" | wc -l    # Count error lines
ls -l | grep "\.txt$"                  # List only .txt files
```

### Command History

```bash
history                # View command history
!123                   # Run command #123 from history
!!                     # Repeat last command
!$                     # Use last argument from previous command
Ctrl+R                 # Search command history (interactive)
```

### Environment Variables

```bash
# View environment
echo $HOME             # Your home directory
echo $PATH             # Where Linux looks for commands
env                    # Show all environment variables

# Set variables
export MY_VAR="value"  # Set for current session

# Add to PATH (in ~/.bashrc or ~/.zshrc)
export PATH="$HOME/bin:$PATH"

sudo usermod -aG sudo john # Give admin privileges
```

# 3. Set your timezone

timedatectl set-timezone America/New_York

# 4. Enable firewall
```bash
sudo ufw enable # Ubuntu/Debian
sudo systemctl enable firewalld # Fedora/RHEL

```

### For Remote Servers (SSH Setup)

```bash
# Install SSH server
sudo apt install openssh-server

# Generate SSH key on your local machine
ssh-keygen -t ed25519

# Copy key to server
ssh-copy-id user@server-ip

# Secure SSH: edit /etc/ssh/sshd_config
PermitRootLogin no
PasswordAuthentication no
```

## Shell Essentials (Bash/Zsh)

- Navigation: `pwd`, `ls -la`, `cd -` (previous dir), `pushd`/`popd`.
- File ops: `cat`, `less`, `head`, `tail -f`, `cp -r`, `mv`, `rm -rf`, `mkdir -p`.
- Permissions: `chmod 644 file`, `chmod +x script.sh`, `chown user:group file`, `umask`.
- Searching: `grep -R "pattern" .`, `rg` (ripgrep), `find . -type f -name "*.log"`.
- Text processing: `cut`, `awk`, `sed`, `sort`, `uniq`, `wc -l`, `xargs`, pipes `|`.
- History & reuse: `history`, `!n`, `!!`, `!$`, `Ctrl+R` reverse search.
- Shell config: `.bashrc`, `.bash_profile`, `.zshrc`; PATH edits: `export PATH="$HOME/bin:$PATH"`.
