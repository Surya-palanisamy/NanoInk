# Linux Guide: Basics to Advanced

## 1) Orientation

- What Linux is: a kernel plus userland; distributions package kernel + tooling.
- Why it matters: servers, containers, embedded, desktops.
- Anatomy: kernel, init (systemd/sysv/openrc), userspace tools (GNU, BusyBox), package manager, shell.

## 2) Installing & First Steps

- Distros: Ubuntu/Debian (apt), Fedora/RHEL/CentOS (dnf/yum), Arch (pacman), Alpine (apk).
- Install choices: desktop vs server image, LTS vs latest, partitions (EFI, root `/`, swap).
- Post-install checklist:
  - Update packages: `sudo apt update && sudo apt upgrade` (adapt to your distro).
  - Create user (if needed): `adduser <name>`; add to sudoers group.
  - Configure SSH (if remote): install `openssh-server`, set `PermitRootLogin no`, use keys.
  - Set timezone/locale: `timedatectl set-timezone <Region/City>`.
  - Enable firewall: `ufw enable` (Debian/Ubuntu) or `firewalld` zones on RHEL-like.

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
