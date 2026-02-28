## Ansible

---

## What is Ansible?

> Ansible is an **agentless automation tool** used for:

- Server configuration
- Application deployment
- Orchestration
- Infrastructure automation
  > Uses **YAML Playbooks** + works over **SSH**.

---

## 🧾 Check Installation

```bash
ansible --version
```

---

## 🌍 Inventory (Hosts File)

Default inventory file:

```
/etc/ansible/hosts
```

Example:

```ini
[webservers]
192.168.1.10
192.168.1.11
[db]
192.168.1.20
```

Custom inventory usage:

```bash
ansible -i inventory.ini all -m ping
```

---

## 🔐 SSH Setup (Passwordless Recommended)

Generate key:

```bash
ssh-keygen
```

Copy key:

```bash
ssh-copy-id user@server
```

---

## 🧪 Test Connection

```bash
ansible all -m ping
```

Specific group:

```bash
ansible webservers -m ping
```

---

## 🧭 Ad-hoc Commands

Run command on remote:

```bash
ansible all -m command -a "uptime"
```

Install package:

```bash
ansible all -m apt -a "name=nginx state=present" --become
```

Copy file:

```bash
ansible all -m copy -a "src=file.txt dest=/home/user/"
```

Create directory:

```bash
ansible all -m file -a "path=/opt/test state=directory"
```

---

## 📜 Playbook Structure

A playbook is YAML:

```yaml
- hosts: webservers
  become: yes
  tasks:
    - name: Install nginx
      apt:
        name: nginx
        state: present
```

Run playbook:

```bash
ansible-playbook site.yml
```

---

## 🧩 Common Modules

| Module        | Purpose            |
| ------------- | ------------------ |
| `ping`        | test connectivity  |
| `apt` / `yum` | package management |
| `service`     | manage services    |
| `copy`        | copy files         |
| `file`        | manage files/dirs  |
| `command`     | run commands       |
| `shell`       | run shell commands |
| `user`        | user management    |

---

## ⚙️ Service Management

```yaml
- name: Start nginx
  service:
    name: nginx
    state: started
```

Enable service:

```yaml
- name: Enable nginx
  service:
    name: nginx
    enabled: yes
```

---

## 📂 Copy & Templates

Copy file:

```yaml
- name: Copy config
  copy:
    src: config.conf
    dest: /etc/app/config.conf
```

Template (Jinja2):

```yaml
- name: Deploy template
  template:
    src: config.j2
    dest: /etc/app/config.conf
```

---

## 🔑 Become (Root Privilege)

In playbook:

```yaml
become: yes
```

In command:

```bash
ansible-playbook play.yml --become
```

---

## 🧠 Variables

```yaml
vars:
  package: nginx
tasks:
  - name: Install package
    apt:
      name: "{{ package }}"
      state: present
```

---

## 🎯 Handlers (Run Only When Changed)

```yaml
tasks:
  - name: Install nginx
    apt:
      name: nginx
      state: present
    notify: restart nginx
handlers:
  - name: restart nginx
    service:
      name: nginx
      state: restarted
```

---

## 🧪 Dry Run (Check Mode)

```bash
ansible-playbook site.yml --check
```

---

## 🏎️ Speed Tips

Disable SSH host checking:

```ini
[defaults]
host_key_checking = False
```

Run in parallel:

```bash
ansible-playbook site.yml -f 10
```

---

## 🧾 Facts (System Info)

Show facts:

```bash
ansible all -m setup
```

Use in play:

```yaml
ansible_facts['ansible_hostname']
```

---

> [!Summary]
> Ansible is awesome because it is:

- Agentless
- Simple YAML-based
- Secure (SSH)
- Scalable
- DevOps standard

---

