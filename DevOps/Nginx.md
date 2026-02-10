# NGINX

---

![NGINX](images/Nginx.png)

## 1️⃣ Install & Basic Commands

### Install

```bash
sudo apt update
sudo apt install nginx
```

### Service Control

```bash
sudo systemctl start nginx
sudo systemctl stop nginx
sudo systemctl restart nginx
sudo systemctl reload nginx     # reload config without downtime
sudo systemctl enable nginx
```

### Check Configuration

```bash
nginx -t
```

---

## 2️⃣ Important Paths

| Path                        | Meaning          |
| --------------------------- | ---------------- |
| /etc/nginx/nginx.conf       | Main config      |
| /etc/nginx/sites-available/ | Virtual hosts    |
| /etc/nginx/sites-enabled/   | Enabled sites    |
| /var/www/html               | Default web root |
| /var/log/nginx/access.log   | Access logs      |
| /var/log/nginx/error.log    | Error logs       |

---

## 3️⃣ Basic Server Block

```nginx
server {
  listen 80;
  server_name example.com www.example.com;

  root /var/www/example;
  index index.html index.htm;

  location / {
    try_files $uri $uri/ =404;
  }
}
```

Enable site

```bash
sudo ln -s /etc/nginx/sites-available/example /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

## 4️⃣ Reverse Proxy

```nginx
server {
  listen 80;
  server_name api.example.com;

  location / {
    proxy_pass http://localhost:5000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }
}
```

**Use when:** React / Node / Python backend deployed

---

## 5️⃣ Load Balancing

### Round Robin (default)

```nginx
upstream backend_servers {
  server 127.0.0.1:3000;
  server 127.0.0.1:3001;
}
server {
  listen 80;
  location / {
    proxy_pass http://backend_servers;
  }
}
```

### Least Connections

```nginx
upstream backend_servers {
  least_conn;
  server 127.0.0.1:3000;
  server 127.0.0.1:3001;
}
```

### IP Hash (Sticky Sessions)

```nginx
upstream backend_servers {
  ip_hash;
  server 127.0.0.1:3000;
  server 127.0.0.1:3001;
}
```

---

## 6️⃣ HTTPS & SSL (Let’s Encrypt)

Install certbot

```bash
sudo apt install certbot python3-certbot-nginx
```

Generate SSL

```bash
sudo certbot --nginx -d example.com -d www.example.com
```

Auto renewal

```bash
sudo certbot renew --dry-run
```

---

## 7️⃣ Security Hardening

### Hide Nginx Version

```nginx
server_tokens off;
```

### Prevent Clickjacking

```nginx
add_header X-Frame-Options "SAMEORIGIN";
```

### Prevent MIME sniffing

```nginx
add_header X-Content-Type-Options nosniff;
```

### Enable HSTS (HTTPS Required)

```nginx
add_header Strict-Transport-Security "max-age=31536000" always;
```

---

## 8️⃣ Gzip Compression

```nginx
gzip on;
gzip_comp_level 5;
gzip_types text/plain text/css application/json application/javascript application/xml;
gzip_vary on;
```

**Use when:** Speed optimization

---

## 9️⃣ Caching (Static Files)

```nginx
location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
  expires 30d;
  add_header Cache-Control "public, no-transform";
}
```

---

## 🔟 Rate Limiting

```nginx
limit_req_zone $binary_remote_addr zone=api_limit:10m rate=10r/s;

server {
  location /api/ {
    limit_req zone=api_limit burst=20 nodelay;
  }
}
```

**Use when:** Prevent DDOS or abuse

---

## 1️⃣1️⃣ Redirects

### HTTP → HTTPS

```nginx
server {
  listen 80;
  server_name example.com;
  return 301 https://$host$request_uri;
}
```

### Domain Redirect

```nginx
server {
  listen 80;
  server_name oldsite.com;
  return 301 https://newsite.com;
}
```

---

## 1️⃣2️⃣ Static File Hosting

```nginx
server {
  listen 80;
  server_name static.example.com;

  root /var/www/static;
  location / {
    autoindex on;
  }
}
```

---

## 1️⃣3️⃣ NGINX for React / Angular SPA

```nginx
server {
  listen 80;
  server_name example.com;

  root /var/www/app/build;

  location / {
    try_files $uri /index.html;
  }
}
```

---

## 1️⃣4️⃣ Websocket Support

```nginx
location /ws/ {
  proxy_pass http://localhost:4000;
  proxy_set_header Upgrade $http_upgrade;
  proxy_set_header Connection "Upgrade";
}
```

---

## 1️⃣5️⃣ Logging

Pretty log format

```nginx
log_format main '$remote_addr - $remote_user [$time_local] '
'"$request" $status $body_bytes_sent '
'"$http_referer" "$http_user_agent"';
access_log /var/log/nginx/access.log mai
---
```
