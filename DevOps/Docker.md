# 🐳 Docker Beginner to Advanced – Single Markdown
---
![Docker vs VM comparison](images/Docker-and-VM.png)
| Feature        | VMs                 | Containers            |
| -------------- | ------------------- | --------------------- |
| Virtualizes    | Hardware            | OS / Runtime          |
| OS Requirement | Own OS per VM       | Shared host OS        |
| Size           | Heavy (GBs)         | Light (MBs)           |
| Boot Time      | Minutes             | Seconds               |
| Performance    | Moderate            | Near-native           |
| Isolation      | Strong              | Moderate–Strong       |
| Portability    | Good                | Excellent             |
| Use Case       | Monolithic / Legacy | Microservices / Cloud |
---
## Real-World Examples
**VMs Used In:**
- AWS EC2, Azure VM
- Running Windows + Linux on same server
- Banking and enterprise systems
**Containers Used In:**
- Docker
- Kubernetes
- Microservices like Netflix, Uber, Spotify
- CI/CD pipelines
### What Is Docker?
> Docker is a platform that lets you build, run, and manage applications in lightweight containers.
> Containers include everything needed to run apps — code, libraries, runtime, and configs.
---
### 1. Install Docker
Check Docker version
```bash
docker --version
```
If not installed → download from [Link](https://docs.docker.com/get-docker/)
---
Run a container in **background**
```docker
docker run -d -p 80:80 docker/getting-started
```
> Meaning:
- `-d` → detached mode
- `-p 80:80` → hostPort:containerPort
- `docker/getting-started` → image name
---
Run container in foreground interactive
```docker
docker run -it -p 8001:8080 --name my-nginx nginx
```
> Meaning:
- `-it` → interactive shell
- `--name my-nginx` → give name, if not random name is given
- `nginx` → image name
---
### 2. Basic Docker Commands
| Command                          | Use                   |
| -------------------------------- | --------------------- |
| `docker images`                  | List images           |
| `docker rm <name/id>`            | Remove container      |
| `docker logs <name/id>`          | View logs             |
| `docker exec -it <name/id> bash` | Enter container shell |
---
### 3. Containers
- Start a container
```docker
docker start <name/id>
```
---
- Stop a container
```docker
docker stop <name/id>
```
---
- Restart a container
```docker
docker restart <name/id>
```
---
- Stop a container
```docker
docker stop <name/id>
```
---
- Kill a container
```docker
docker kill <name/id>
```
---
- Clean All
> Cleans up dangling images, containers, volumes, and networks (ie, not associated with a container)
```shell
docker system prune
```
---
> Additionally, remove any stopped containers and all unused images (not just dangling images)
```shell
docker system prune -a
```
---
### 3. Information
| Example                    | Description                            |
| -------------------------- | -------------------------------------- |
| `docker ps`                | List running containers                |
| `docker ps -a`             | List all containers                    |
| `docker logs <name/id>     | Container Logs                         |
| `docker inspect <name/id>` | Inspecting Containers                  |
| `docker events <name/id>`  | Containers Events                      |
| `docker port <name/id>`    | Public Ports                           |
| `docker top <name/id>`     | Running Processes                      |
| `docker stats <name/id>`   | Container Resource Usage               |
| `docker diff <name/id>`    | Lists the changes made to a container. |
---
### 4. Update
1.  **Create Container (without running)**
```docker
docker create --name my_redis --expose 6379 redis
```
---
2. **Rename a existing container**
```docker
docker rename oldName newName
```
---
3. **Update Resources**
```docker
docker update --cpu-shares 512 -m 300M <name/id>
```
---
### 5. Manipulating
| `Example`                          | Description                     |
| ---------------------------------- | ------------------------------- |
| `docker images`                    | Listing images                  |
| `docker rmi nginx`                 | Removing an image               |
| `docker load < ubuntu.tar.gz`      | Loading a tarred repository     |
| `docker load --input ubuntu.tar`   | Loading a tarred repository     |
| `docker save busybox > ubuntu.tar` | Save an image to a tar archive  |
| `docker history`                   | Showing the history of an image |
| `docker commit nginx`              | Save a container as an image.   |
| `docker tag nginx eon01/nginx`     | Tagging an image                |
| `docker push eon01/nginx`          | Pushing an image                |
---
### 6. Docker HUB
```docker
docker login
docker push myrepo/nginx
```
---
- Commit Container → Image
```docker
docker commit containerName newImageName
```
---
- docker search
```docker
docker search nginx
```
---
- logout
```docker
docker logout
```
---
### 7. Build Your Own Image (Dockerfile)
```docker
docker build -t myapp .
```
---
### 8. Docker Networking
> List Networks
```docker
docker network ls
```
---
> Inspect Network
```docker
docker network inspect MyNetwork
```
---
> Create Network
```docker
docker network create MyNetwork
```
---
> Run Container With Network
```docker
docker run -d --network MyNetwork nginx
```
---
> Connect Running Container
```docker
docker network connect MyNetwork my-nginx
```
---
> Disconnect
```docker
docker network disconnect MyNetwork my-nginx
```
---
> Remove Network
```docker
docker network rm MyNetwork
```
---
#### 9.Volumes (Persistent Storage)
1. Create Volume
```docker
docker volume create myVolume
```
---
2. Attach Volume
```docker
docker run -d -v myVolume:/data nginx
```
---
3. List Volumes
```docker
docker volume ls
```
---
4. Remove Unused
```docker
docker volume prune
```
---
### 9.Adding DNS to Docker Containers
You can control how containers resolve domain names using Docker DNS options.
---
> Add DNS While Running a Container
Use the `--dns` flag with `docker run`
```docker
docker run -it --name myapp --dns 8.8.8.8 --dns 1.1.1.1 ubuntu bash
```
> Meaning:
- `8.8.8.8` → Google DNS
- `1.1.1.1` → Cloudflare DNS
- Multiple DNS servers allowed (Docker tries in order)
> 🔎 Check DNS Inside Container
```docker
cat /etc/resolv.conf
```
You will see entries like:
nameserver 8.8.8.8
nameserver 1.1.1.1
---
