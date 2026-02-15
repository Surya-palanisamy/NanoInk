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

### . Essential Commands

### Navigation

````bash
pwd                    # Show current directory
ls -la                 # List files (including hidden)
cd /path/to/folder     # Change directory
cd -                   # Go back to previous directory
cd ~                   # Go to home directory
```. Understanding the Filesystem

### Important Directories

````

/ Root - everything starts here
├── /home User home directories (/home/john)
├── /etc Configuration files
├── /var Variable data (logs, databases)
│ └── /var/log System and application logs
├── /usr User programs and utilities
├── /opt Optional/third-party software
├── /tmp Temporary files (deleted on reboot)
├── /dev Device files (hard drives, USB)
├── /proc Running process information
└── /sys Kernel and hardware information

````

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
````

### Symbolic Links (Shortcuts)

````bash
# Create a shortcut to a file or folder
ln -s /path/to/original /path/to/shortcut

# Example: create shortcut to nginx config
ln -s /etc/nginx/sites-available/mysite /etc/nginx/sites-enabled/mysite

# Vi. Users and Permissions

### User Management

```bash
# Who am I?
whoami                 # Current username
id  . Installing Software

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
````

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

sudo userdel -r alice # -r deletes home directory

# View all users

cat /etc/passwd # List all users

````

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
````

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
head -n 20 file.txt # First 20 lines
tail -f /var/log/syslog # Follow log file in real-time

# Creating and editing

mkdir myfolder # Create directory
mkdir -p path/to/deep/folder # Create nested directories
touch newfile.txt # Create empty file
nano file.txt # Simple text editor
vim file.txt # Advanced text editor
. Managing Processes

### View Running Processes

````bash
# List all processes
ps aux                           # All processes, detailed
ps aux | grep nginx              # Find specific process
. Managing Services (systemd)

Systemd controls background services like web servers, databases, SSH, etc.

### Basic Service Control

```bash
# Check service status
syst. Networking Basics

### Check Network Status

```bash
# Show network interfaces and IP addresses
ip a                             # Modern way
ifconfig                         # Older way (may need net-tools package)

# Show routing table
ip route
route -n                         # Older way
. Storage Management

### View Disks and Partitions

```bash
# List all disks and partitions
lsblk                            # Tree view
lsblk -f                         # Show filesystems
sudo fdisk -l                    # Detailed partition info
sudo parted -l                   # Alternative tool

# Show UUIDs (unique disk identifiers)
sudo blkid
````

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

. Monitoring and Logs

### System Resource Usage

````bash
# Memory usage
free -h                          # RAM and swap
free . Security Best Practices

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
````

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

. Automation with Scripts and Cron

### Basic Shell Script

Create a file `backup.sh`:

````bash
#!/bin/bash
# Simple backup script
. Web Server Setup (Nginx)

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
````

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

````bash
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
docke. Troubleshooting Common Issues

### System is Slow

```bash
# 1. Check CPU usage
top                              # Press '1' to see per-core
htop                             # Better UI

# 2. Check memory
free -h                          # Is swap being used heavily?

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
````

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

fin18. Quick Reference Cheat Sheet

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

## 19. Learning Path

Recommended order to learn Linux:

1. **Week 1-2: Basics**
   - Navigation (cd, ls, pwd)
   - File operations (cp, mv, rm, mkdir)
   - Text viewing (cat, less, nano)
   - Permissions (chmod, chown)

2. **Week 3-4: System Management**
   - Package management (apt/dnf)
   - Users and groups
   - Process management
   - Service control (systemd)

3. **Week 5-6: Networking**
   - SSH setup and usage
   - Firewall basics
   - Network troubleshooting
   - Web server setup (Nginx)

4. **Week 7-8: Advanced**
   - Shell scripting
   - Cron jobs
   - Docker basics
   - Security hardening

---

## 20. Additional Resources

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

### Practice

- Set up a local VM with VirtualBox or VMware
- Use DigitalOcean/Linode for a $5/month server
- Try Docker containers for isolated practice
- Break things and fix them - best way to learn!

---

## Tips for Success

✅ **Use `--help` or `man` when stuck** - Every command has documentation

✅ **Practice daily** - Even 15 minutes helps

✅ **Start with Ubuntu/Debian** - Most beginner-friendly

✅ **Keep notes** - Document what works for you

✅ **Join communities** - Reddit (/r/linux4noobs), Discord, forums

✅ **Don't be afraid to break things** - That's why VMs exist!

❌ **Don't run random commands as root** - Understand what they do first

❌ **Don't use `chmod 777`** - It's almost never the right solution

❌ **Don't ignore security** - Even on test systems, practice good habits

# 2. Check firewall

sudo ufw status
sudo ufw allow 22

# 3. Check if port is listening

sudo ss -tulpen | grep :22

# 4. Test from server itself

ssh localhost

# 5. Check logs

journalctl -u sshd -f
tail -f /var/log/auth.log

````

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
````

### Trace System Calls (Advanced)

```bash
# See what a process is doing
strace -p <pid>                  # Attach to running process
strace command                   # Trace command from start

# Example: why is ls slow?
strace ls /var/log 2>&1 | grep open
```

# Execute command in running container

docker exec -it web bash # Get shell inside container
docker exec web ls /etc/nginx # Run single command

# View container details

docker inspect web
docker stats # Live resource usage

````

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
````

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

````

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
````

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

mkdir -p "$BACKUP"

# Copy files

echo "Starting backup..."
cp -r "$SOURCE" "$BACKUP"
echo "Backup complete: $BACKUP"

````

Make it executable and run:

```bash
chmod +x backup.sh
./backup.sh
````

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

- ✅ Use the principle of least privilege
  top # Basic monitor (press q to quit)
  htop # Better UI (install with apt/dnf)
  uptime # System uptime and load average

# Real-time resource monitor

vmstat 1 # Update every second
iostat -x 1 # Disk I/O stats (install sysstat)

````

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
````

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
```

sudo chmod 600 /swapfile # Security
sudo mkswap /swapfile
sudo swapon /swapfile

# Make permanent (add to /etc/fstab)

# /swapfile none swap sw 0 0

# Check swap

free -h
swapon --show

```
# DNS lookup
dig google.com                   # Detailed DNS info
nslookup google.com             # Simple DNS lookup
host google.com                 # Quick DNS check

# Check open ports
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
```

sudo systemctl enable nginx # Start on boot
sudo systemctl disable nginx # Don't start on boot
sudo systemctl enable --now nginx # Enable AND start immediately

````

### View All Services

```bash
systemctl list-units --type=service          # Running services
systemctl list-unit-files --type=service     # All services
systemctl list-units --failed                # Failed services
````

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
```

pidof nginx # Same as pgrep
pstree # Tree view of processes

````

### Stop/Kill Processes

```bash
# Gentle stop (gives process time to cleanup)
kill 1234                        # Send SIGTERM to PID 1234
killall nginx                    # Kill all nginx processes
pkill -f python                  # Kill by name pattern

# Force kill (last resort - data may be lost!)
kill -9 1234                     # Send SIGKILL
killall -9 nginx
````

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

````

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
````

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
```

sudo usermod -aG sudo john # Give admin privileges

# 3. Set your timezone

timedatectl set-timezone America/New_York

# 4. Enable firewall

sudo ufw enable # Ubuntu/Debian
sudo systemctl enable firewalld # Fedora/RHEL

````

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
````

## 3) Shell Essentials (Bash/Zsh)

- Navigation: `pwd`, `ls -la`, `cd -` (previous dir), `pushd`/`popd`.
- File ops: `cat`, `less`, `head`, `tail -f`, `cp -r`, `mv`, `rm -rf`, `mkdir -p`.
- Permissions: `chmod 644 file`, `chmod +x script.sh`, `chown user:group file`, `umask`.
- Searching: `grep -R "pattern" .`, `rg` (ripgrep), `find . -type f -name "*.log"`.
- Text processing: `cut`, `awk`, `sed`, `sort`, `uniq`, `wc -l`, `xargs`, pipes `|`.
- History & reuse: `history`, `!n`, `!!`, `!$`, `Ctrl+R` reverse search.
- Shell config: `.bashrc`, `.bash_profile`, `.zshrc`; PATH edits: `export PATH="$HOME/bin:$PATH"`.

## 4) Filesystem & Paths

- Hierarchy highlights: `/` root, `/home`, `/etc` configs, `/var` logs/state, `/usr` userland, `/opt` add-ons, `/tmp` temporary.
- Mounts: `mount`, `lsblk`, `df -h`, `du -sh *`, fstab entries `/etc/fstab`.
- Links: hard links (`ln file link`), symlinks (`ln -s target link`).
- Devices: block/char under `/dev`, pseudo FS: `/proc`, `/sys`, `/run`.

## 5) Users, Groups, Permissions, sudo

- Users: `id`, `whoami`, `getent passwd`, add: `useradd -m -s /bin/bash name`, passwd: `passwd name`.
- Groups: `groups user`, add: `groupadd devs`, `usermod -aG devs user`.
- Permissions: rwx for user/group/other; numeric (e.g., 755) vs symbolic (`u+rwx,g+rx,o+rx`).
- Sudo: membership in `sudo`/`wheel`; edit `/etc/sudoers` via `visudo`; use `sudo -l` to see allowed commands.

## 6) Package Management (per distro family)

- Debian/Ubuntu: `apt update`, `apt install pkg`, `apt remove pkg`, `apt purge`, `apt autoremove`, `apt-cache policy`.
- RHEL/Fedora: `dnf install pkg`, `dnf remove pkg`, `dnf info pkg`, `dnf history`.
- Arch: `pacman -S pkg`, `pacman -Rns pkg`, `pacman -Ss search`, `pacman -Qi pkg`, `pacman -Syu`.
- Alpine: `apk add pkg`, `apk del pkg`, `apk search`.
- Language managers: `pip`, `npm`, `nvm`, `pyenv`, `rbenv`—keep system packages separate from project deps (use venvs/lockfiles).

## 7) Processes & Jobs

- Inspect: `ps aux`, `ps -ef`, `pgrep`, `pidof`, `pstree`.
- Control: `kill -SIGTERM <pid>`, `kill -9 <pid>` (last resort), `pkill -f pattern`.
- Live view: `top`, `htop`, `atop`, `glances`.
- Backgrounding: `cmd &`, `jobs`, `fg`, `bg`, `Ctrl+Z` to suspend, then `bg`.
- Nice levels: start `nice -n 10 cmd`; adjust `renice 10 -p pid`.

## 8) Systemd Basics (if using systemd)

- Units: service, timer, socket.
- Manage services: `systemctl status nginx`, `systemctl start|stop|restart nginx`, `systemctl enable|disable nginx`.
- Logs: `journalctl -u nginx --since "10 min ago"`, follow: `journalctl -fu nginx`.
- Timers: list `systemctl list-timers`; pair timer with service.
- Override config: `systemctl edit nginx` -> creates drop-in under `/etc/systemd/system/nginx.service.d/override.conf`.

## 9) Networking

- Interfaces: `ip a`, `ip link`, `ip route`, `ss -tulpen` (sockets), `ping`, `traceroute`, `dig`.
- Firewall:
  - UFW: `ufw status`, `ufw allow 22/tcp`, `ufw allow 80,443/tcp`.
  - Firewalld: `firewall-cmd --get-active-zones`, `firewall-cmd --zone=public --add-service=http --permanent`, `firewall-cmd --reload`.
- SSH:
  - Generate key: `ssh-keygen -t ed25519 -C "you@example.com"`.
  - Copy key: `ssh-copy-id user@host`.
  - Config: `~/.ssh/config` host blocks, `IdentityFile`, `ProxyJump`.
- Curl & testing: `curl -v http://host`, `curl -I https://host`, `nc -zv host port`.

## 10) Storage, LVM, Filesystems (intermediate)

- Disks: `lsblk -f`, `blkid`, `fdisk -l`, `parted -l`.
- Filesystems: mkfs (`mkfs.ext4 /dev/sdX1`), check/repair (`fsck` when unmounted).
- LVM: PV (`pvcreate`), VG (`vgcreate`), LV (`lvcreate -n data -L 20G vg0`), extend (`lvextend -L +5G /dev/vg0/data` + `resize2fs`).
- Swap: file (`fallocate -l 2G /swapfile && chmod 600 /swapfile && mkswap /swapfile && swapon /swapfile`, fstab entry).

## 11) Logs & Monitoring

- System logs: `journalctl -xe`, `journalctl -k` (kernel).
- App logs: `/var/log/*`, e.g., `syslog`, `messages`, `auth.log`, service-specific.
- Tail/follow: `tail -f /var/log/syslog`, `less +F file`.
- Resource monitoring: `vmstat 1`, `iostat -xz 1`, `free -h`, `df -h`, `dmesg --color=always | less`.

## 12) Security Hygiene

- Users/keys: disable root SSH login; key-based auth; `Fail2ban` for brute force.
- Updates: regular security updates (`unattended-upgrades` on Debian/Ubuntu).
- Minimal services: remove/disable unused services, close ports.
- Permissions: principle of least privilege; use `sudo -E` carefully; avoid 777.
- Secrets: do not store secrets in world-readable files; prefer env files with restricted perms or dedicated secret managers.

## 13) Automation & Shell Scripting

- Shebang: `#!/usr/bin/env bash`.
- Safe defaults: `set -euo pipefail` and `IFS=$'\n\t'` when appropriate.
- Functions & traps: `trap 'echo "error on line $LINENO"' ERR`.
- CLI parsing: `getopts` for simple flags; `case` statements.
- Idempotency: check before change (e.g., `[ -f file ] || touch file`).
- Cron: edit via `crontab -e`; format `min hour dom month dow cmd`; system crons in `/etc/cron.*`.

## 14) Networking Services (web stack example)

- Nginx basics:
  - Sites in `/etc/nginx/sites-available`, symlink to `sites-enabled`.
  - Test config: `nginx -t`; reload: `systemctl reload nginx`.
  - Simple server block: listen 80, root, index, access/error logs.
- Certbot (Let's Encrypt): `certbot --nginx -d example.com -d www.example.com`.
- Reverse proxy: `proxy_pass http://127.0.0.1:3000;` plus headers `Host`, `X-Real-IP`, `X-Forwarded-*`.

## 15) Containers (Docker)

- Install Docker Engine; add user to `docker` group (`usermod -aG docker $USER`).
- Images: `docker pull`, `docker images`, `docker rmi`.
- Containers: `docker run -d --name web -p 8080:80 nginx`, logs: `docker logs -f web`, exec: `docker exec -it web bash`.
- Volumes & networks: `docker volume ls`, `docker network ls`; compose with `docker compose up -d`.
- Cleanup: `docker system prune`, `docker volume rm`, `docker rmi`.

## 16) Performance & Troubleshooting (advanced)

- CPU: `top`/`htop`/`pidstat -u 1`.
- Memory: `free -h`, `vmstat 1`, `smem`, `/proc/<pid>/smaps`.
- I/O: `iostat -xz 1`, `iotop`, `dstat`.
- Network: `ss -tulpen`, `nstat`, `ifstat`, `bmon`.
- Tracing:
  - strace: `strace -f -p <pid>`.
  - ltrace: trace library calls.
  - perf: `perf top`, `perf record`, `perf report`.
  - bpftrace/eBPF (modern kernels) for on-the-fly probes.

## 17) Filesystem ACLs & Attributes (advanced)

- ACLs: `setfacl -m u:alice:r-- file`, view `getfacl file`.
- Extended attributes: `getfattr -d file`, `setfattr -n user.comment -v "note" file`.
- Immutable bit: `chattr +i file` (protect from edits/removal), `lsattr`.

## 18) Backups & Snapshots

- Rsync: `rsync -a --delete src/ dest/`, add `-HAX` for metadata, `-z` over WAN.
- Snapshots: LVM snapshots, Btrfs/ZFS snapshots for fast backups/rollbacks.
- Verify: checksums `sha256sum`, test restores regularly.

## 19) Boot & Rescue

- Boot loaders: GRUB config at `/boot/grub`, `update-grub` on Debian/Ubuntu.
- Initramfs: regenerate after kernel/module changes (`update-initramfs -u`).
- Rescue mode: live USB, `chroot` into system, mount `/`, `/boot`, `/sys`, `/proc`, `/dev` before repairs.

## 20) Useful Command Cheat-Sheet

- System info: `uname -a`, `lsb_release -a`, `hostnamectl`.
- Disk: `df -h`, `du -sh *`, `lsblk`, `mount`.
- Net: `ip a`, `ip r`, `ss -tulpen`, `dig A example.com`, `nc -zv host port`.
- Proc: `ps aux`, `top`, `htop`, `pgrep`, `pkill`.
- Text: `grep -R`, `awk '{print $1}'`, `sed 's/old/new/g'`, `sort | uniq -c`.
- Archive: `tar -czf out.tgz dir/`, `tar -xzf file.tgz`.

## 21) Study Path (suggested)

1. Daily driver basics: navigation, editing, permissions, package manager.
2. Services & systemd: start/stop, logs, enable, overrides.
3. Networking: SSH, firewall, sockets, curl, diagnostics.
4. Storage: partitions, filesystems, LVM basics, fstab.
5. Automation: shell scripting, cron, idempotent tasks.
6. Observability: journald, top/htop, vmstat/iostat, log parsing.
7. Security: SSH hardening, firewall defaults, updates, least privilege.
8. Containers & proxies: Docker + Nginx reverse proxy + TLS.
9. Advanced: perf/strace, bpftrace, ACLs/attrs, snapshots.

## 22) Quick Hardening Checklist

- Update OS; enable unattended security updates (if supported).
- Disable password SSH; use keys; set `PermitRootLogin no`; change default shell for service users to `/usr/sbin/nologin`.
- Minimal open ports; allow-list via firewall.
- Strong sudo policy; log sudo; avoid `NOPASSWD` except where justified.
- Separate users/groups per service; least privilege on files/dirs.
- Monitor auth logs; enable rate-limiting (Fail2ban/sshd settings).

## 23) References (pick per distro)

- Debian/Ubuntu: `man 7 hier`, `man systemd`, `man apt`, Ubuntu Server Guide.
- RHEL/Fedora: Red Hat documentation, `man dnf`, `man firewalld.richlanguage`.
- Arch: Arch Wiki (gold standard for concepts).
- General: `man <command>`, `tldr <command>` (if installed), bpftrace reference guides, Brendan Gregg's perf docs.
