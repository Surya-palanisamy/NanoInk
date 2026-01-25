# Systemd, systemctl & journalctl – Deep Practical Guide

## What is systemd?

systemd is the modern init system and service manager used in Linux systems such as Fedora, Ubuntu, RHEL, Arch, Debian, etc.

### Problems before systemd (SysVinit)

- Slow sequential boot
- No proper dependency management
- No unified logging
- Hard to supervise daemons
- Poor service recovery

### Why systemd?

- Faster parallel boot
- Dependency control
- Integrated logging
- Easy service supervision
- Resource control with cgroups
- Socket & timer activation

---

## What systemd does

- Acts as PID 1
- Starts services
- Manages dependencies
- Controls startup targets
- Handles system logging
- Manages resources
- Starts services on-demand
- Replaces cron for many tasks

---

## Boot flow

1. Kernel boots
2. Kernel executes /sbin/init → systemd
3. systemd loads default target
4. Resolves dependencies
5. Starts services in parallel
6. System becomes usable

---

# Systemd Units

Everything in systemd is a “unit”.

Types of units:

- .service → services
- .socket → socket activation
- .target → runlevel groups
- .timer → scheduled jobs
- .mount → mount points
- .swap → swap devices
- .device → hardware devices
- .path → filesystem event watches

---

# Targets (Runlevel equivalents)

Runlevel mapping:

0 → poweroff.target  
1 → rescue.target  
3 → multi-user.target  
5 → graphical.target  
6 → reboot.target

Check default target:

```bash
systemctl get-default
```

Set default target:

```bash
sudo systemctl set-default graphical.target
```

---

# systemctl (service control command)

## Start / stop / restart services

```bash
sudo systemctl start SERVICE
sudo systemctl stop SERVICE
sudo systemctl restart SERVICE
sudo systemctl reload SERVICE
```

Start and enable at boot:

```bash
sudo systemctl enable --now SERVICE
```

Disable autostart:

```bash
sudo systemctl disable SERVICE
```

Completely block service:

```bash
sudo systemctl mask SERVICE
```

Unmask:

```bash
sudo systemctl unmask SERVICE
```

---

## Service status and listing

Show status:

```bash
systemctl status SERVICE
```

List running services:

```bash
systemctl list-units --type=service
```

List installed service files:

```bash
systemctl list-unit-files --type=service
```

List failed units:

```bash
systemctl --failed
```

Kill service processes:

```bash
sudo systemctl kill SERVICE
```

Force kill:

```bash
sudo systemctl kill -s SIGKILL SERVICE
```

---

# Service files locations

/usr/lib/systemd/system/ → package installed  
/etc/systemd/system/ → admin installed  
~/.config/systemd/user/ → per-user services

---

## Example custom service

File:

/etc/systemd/system/myapp.service

Content:

```ini
[Unit]
Description=My App
After=network.target

[Service]
ExecStart=/usr/bin/python3 /opt/app/app.py
Restart=always
User=myuser

[Install]
WantedBy=multi-user.target
```

Reload and enable:

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now myapp
```

---

# Cgroups with systemd

Used for:

- resource limits
- isolation
- CPU control
- memory control

Commands:

```bash
systemd-cgls
systemd-cgtop
```

---

# Systemd timers (cron alternative)

List timers:

```bash
systemctl list-timers
```

Create timer unit:

/etc/systemd/system/backup.timer

Content:

```ini
[Unit]
Description=Run backup daily

[Timer]
OnCalendar=daily
Persistent=true

[Install]
WantedBy=timers.target
```

Create related service:

/etc/systemd/system/backup.service

Enable:

```bash
sudo systemctl enable --now backup.timer
```

---

# journald and journalctl

journald = system logging system used by systemd

Log storage:

/var/log/journal/

---

# journalctl usage

Show all logs:

```bash
journalctl
```

Follow logs live:

```bash
journalctl -f
```

Logs for current boot:

```bash
journalctl -b
```

Previous boot:

```bash
journalctl -b -1
```

Logs for specific service:

```bash
journalctl -u nginx
```

Follow service logs:

```bash
journalctl -u nginx -f
```

Logs since specific time:

```bash
journalctl --since "2 hours ago"
journalctl --since yesterday
journalctl --since "2026-01-03" --until "2026-01-04"
```

Logs by PID:

```bash
journalctl _PID=1234
```

Logs by priority:

```bash
journalctl -p err
```

Priority level meanings:

0 emerg  
1 alert  
2 crit  
3 err  
4 warning  
5 notice  
6 info  
7 debug

---

# Enable persistent logging

```bash
sudo mkdir -p /var/log/journal
sudo systemctl restart systemd-journald
```

---

# Debugging with systemd

```bash
systemctl status SERVICE
journalctl -xe
journalctl -u SERVICE
```

---

# Summary table

systemd → init and service manager  
systemctl → command to control systemd  
journald → logging service  
journalctl → tool to read logs

---

# Practical real-world uses

- debugging boot failures
- monitoring services
- log investigation
- running background applications
- replacing cron jobs
- server administration