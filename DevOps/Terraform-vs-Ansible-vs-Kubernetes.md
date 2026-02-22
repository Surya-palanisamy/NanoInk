### DevOps Core Tools — Terraform vs Ansible vs Kubernetes
#### 🧭 Big Picture
These three tools do different jobs. They are not replacements.
| Tool           | What it Mainly Does                     |
| -------------- | --------------------------------------- |
| **Terraform**  | Builds infrastructure (Cloud resources) |
| **Ansible**    | Configures & automates systems          |
| **Kubernetes** | Runs & manages containers               |
---
### 🧱 Terraform — Infrastructure as Code (IaC)
### 🔹 Purpose
- Create and manage cloud infrastructure
### 🔹 What Terraform Can Create
- Virtual Machines (EC2, Compute Engine, Azure VM)
- Networks (VPC, Subnets)
- Databases
- Load Balancers
- Storage
- Kubernetes Clusters
#### Key Features
- Declarative (You say _what_ you want, Terraform handles _how_)
- Maintains State (remembers what it created)
- Cloud Agnostic (AWS / Azure / GCP / On-prem)
- Safe Apply (plan → review → execute)
#### Use Cases
- Build production cloud setup
- Create environments (Dev, Test, Prod)
- Automate infrastructure creation
- Version-controlled infrastructure
---
### Ansible — Configuration & Automation
### Purpose
- Configure systems
- Automate repetitive admin work
#### Common Uses
- Install software
- Configure servers
- Manage packages
- Deploy applications
- System updates
- Security configurations
#### Key Features
- Agentless (uses SSH)
- YAML Playbooks
- Idempotent (won’t redo same work)
- Easily integrates in DevOps pipelines
#### Use Case Example
Instead of configuring 100 servers manually:
- Write one Ansible Playbook
- Run once → everything gets configured identically
---
#### Kubernetes — Container Orchestration
#### Purpose
Run and manage containerized applications at scale.
#### What Kubernetes Does
- Deploys containers
- Scales automatically
- Load balances
- Restarts failed containers
- Rolling updates
- Manages cluster state
#### Why It’s Needed
When you have:
- Many microservices
- Many containers
- Need reliability and scaling
#### Works Best With
- Docker containers
- Cloud native apps
- Microservices architectures
---
#### 🧠 Simple Analogy
Imagine building a city:
- **Terraform** = Builds roads, buildings, power supply (Infrastructure)
- **Ansible** = Sets up furniture, wiring, and equipment inside buildings (Configuration)
- **Kubernetes** = Manages daily business operations inside buildings (Running workloads)
---
#### Do They Work Together?
Yes! In real DevOps pipelines, they are commonly used together.
#### 🔥 Real-World Workflow Example
1. **Terraform**
- Creates AWS EC2
- Creates VPC
- Sets networking
2. **Ansible**
- Installs software
- Configures servers
- Prepares environment
3.  **Kubernetes**
- Deploys applications
- Manages scaling & reliability
They are **teammates**, not competitors.
---
#### 🏁 Summary Table
| Feature  | Terraform             | Ansible              | Kubernetes              |
| -------- | --------------------- | -------------------- | ----------------------- |
| Type     | IaC tool              | Config & Automation  | Orchestration           |
| Purpose  | Builds infrastructure | Manages systems      | Runs containers         |
| State    | Maintains state       | Stateless            | Maintains cluster state |
| Focus    | Cloud resources       | Server configuration | Application runtime     |
| Works On | Cloud / VMs           | Any servers          | Containers              |
---
