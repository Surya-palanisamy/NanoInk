// List of available markdown notes with categories
const MANIFEST = [
  // DSA
  {
    title: "Overview",
    path: "DSA/README.md",
    category: "DSA",
  },
  {
    title: "Time and Space Complexity",
    path: "DSA/Algorithms.md",
    category: "DSA",
  },
  {
    title: "Arrays",
    path: "DSA/Arrays.md",
    category: "DSA",
  },
  {
    title: "Bit Manipulation",
    path: "DSA/BitManipulation.md",
    category: "DSA",
  },
  {
    title: "Dynamic Programming",
    path: "DSA/DynamicProgramming.md",
    category: "DSA",
  },
  {
    title: "Linked List",
    path: "DSA/LinkedList.md",
    category: "DSA",
  },
  {
    title: "Math",
    path: "DSA/Math.md",
    category: "DSA",
  },
  {
    title: "Matrix",
    path: "DSA/Matrix.md",
    category: "DSA",
  },
  {
    title: "Patterns",
    path: "DSA/Patterns.md",
    category: "DSA",
  },
  {
    title: "Stack",
    path: "DSA/Stack.md",
    category: "DSA",
  },
  {
    title: "Strings",
    path: "DSA/Strings.md",
    category: "DSA",
  },
  // Database
  {
    title: "Overview",
    path: "Database/README.md",
    category: "Database",
  },
  {
    title: "DBMS Fundamentals",
    path: "Database/SQL/DBMS.md",
    category: "Database",
  },
  {
    title: "SQL Language",
    path: "Database/SQL/SQL.md",
    category: "Database",
  },
  {
    title: "MongoDB",
    path: "Database/NoSQL/MongoDB.md",
    category: "Database",
  },
  {
    title: "Redis",
    path: "Database/NoSQL/Redis.md",
    category: "Database",
  },
  // Web Development
  {
    title: "Overview",
    path: "WebDev/README.md",
    category: "Web Development",
  },
  {
    title: "HTML",
    path: "WebDev/Html.md",
    category: "Web Development",
  },
  {
    title: "CSS",
    path: "WebDev/Css.md",
    category: "Web Development",
  },
  {
    title: "JavaScript",
    path: "WebDev/JavaScript.md",
    category: "Web Development",
  },
  {
    title: "JS Notes",
    path: "WebDev/Js.md",
    category: "Web Development",
  },
  {
    title: "Express.js",
    path: "WebDev/Express.js.md",
    category: "Web Development",
  },
  // DevOps
  {
    title: "Overview",
    path: "DevOps/README.md",
    category: "DevOps",
  },
  {
    title: "Ansible",
    path: "DevOps/Ansible.md",
    category: "DevOps",
  },
  {
    title: "Docker",
    path: "DevOps/Docker.md",
    category: "DevOps",
  },
  {
    title: "Nginx",
    path: "DevOps/Nginx.md",
    category: "DevOps",
  },
  {
    title: "Terraform vs Ansible vs Kubernetes",
    path: "DevOps/Terraform-vs-Ansible-vs-Kubernetes.md",
    category: "DevOps",
  },
  // Tools
  {
    title: "Overview",
    path: "Tools/README.md",
    category: "Tools",
  },
  {
    title: "Git & GitHub",
    path: "Tools/Git-Github.md",
    category: "Tools",
  },
  {
    title: "Markdown",
    path: "Tools/Markdown.md",
    category: "Tools",
  },
  {
    title: "Neovim",
    path: "Tools/Neovim.md",
    category: "Tools",
  },
  // Linux
  {
    title: "Overview",
    path: "Linux/README.md",
    category: "Linux",
  },
  {
    title: "Linux Guide",
    path: "Linux/Linux-Guide.md",
    category: "Linux",
  },
  {
    title: "SSH",
    path: "Linux/Ssh.md",
    category: "Linux",
  },
  {
    title: "Systemd",
    path: "Linux/Systemd-Linux.md",
    category: "Linux",
  },
  {
    title: "Zsh Configuration",
    path: "Linux/zshrc.md",
    category: "Linux",
  },
  // Computer Networks
  {
    title: "Overview",
    path: "ComputerNetworks/README.md",
    category: "Computer Networks",
  },
  {
    title: "OSI & TCP/IP Model",
    path: "ComputerNetworks/OSI-TCP-Model.md",
    category: "Computer Networks",
  },
  {
    title: "IP Addressing",
    path: "ComputerNetworks/IP-Addressing.md",
    category: "Computer Networks",
  },
  {
    title: "Transport Protocols",
    path: "ComputerNetworks/Transport-Protocols.md",
    category: "Computer Networks",
  },
  {
    title: "Routing",
    path: "ComputerNetworks/Routing.md",
    category: "Computer Networks",
  },
  {
    title: "HTTP & Web",
    path: "ComputerNetworks/HTTP-and-Web.md",
    category: "Computer Networks",
  },
  {
    title: "DNS",
    path: "ComputerNetworks/DNS.md",
    category: "Computer Networks",
  },
  {
    title: "Email Protocols",
    path: "ComputerNetworks/Email-Protocols.md",
    category: "Computer Networks",
  },
  {
    title: "FTP",
    path: "ComputerNetworks/FTP.md",
    category: "Computer Networks",
  },
  {
    title: "Network Security",
    path: "ComputerNetworks/Network-Security.md",
    category: "Computer Networks",
  },
  {
    title: "Encryption & SSL/TLS",
    path: "ComputerNetworks/Encryption-SSL-TLS.md",
    category: "Computer Networks",
  },
  {
    title: "Network Services",
    path: "ComputerNetworks/Network-Services.md",
    category: "Computer Networks",
  },
  {
    title: "Quick Q&A",
    path: "ComputerNetworks/Quick-QA.md",
    category: "Computer Networks",
  },
  // Operating Systems
  {
    title: "Overview",
    path: "OperatingSystems/README.md",
    category: "Operating Systems",
  },
  {
    title: "Introduction",
    path: "OperatingSystems/Introduction.md",
    category: "Operating Systems",
  },
  {
    title: "Process Management",
    path: "OperatingSystems/Process-Management.md",
    category: "Operating Systems",
  },
  {
    title: "Threads",
    path: "OperatingSystems/Threads.md",
    category: "Operating Systems",
  },
  {
    title: "CPU Scheduling",
    path: "OperatingSystems/CPU-Scheduling.md",
    category: "Operating Systems",
  },
  {
    title: "Process Synchronization",
    path: "OperatingSystems/Process-Synchronization.md",
    category: "Operating Systems",
  },
  {
    title: "Deadlocks",
    path: "OperatingSystems/Deadlocks.md",
    category: "Operating Systems",
  },
  {
    title: "Memory Management",
    path: "OperatingSystems/Memory-Management.md",
    category: "Operating Systems",
  },
  {
    title: "Virtual Memory",
    path: "OperatingSystems/Virtual-Memory.md",
    category: "Operating Systems",
  },
  {
    title: "File Systems",
    path: "OperatingSystems/File-Systems.md",
    category: "Operating Systems",
  },
  {
    title: "Disk Management",
    path: "OperatingSystems/Disk-Management.md",
    category: "Operating Systems",
  },
  {
    title: "I/O Systems",
    path: "OperatingSystems/IO-Systems.md",
    category: "Operating Systems",
  },
  {
    title: "System Calls",
    path: "OperatingSystems/System-Calls.md",
    category: "Operating Systems",
  },
  {
    title: "Inter-Process Communication",
    path: "OperatingSystems/IPC.md",
    category: "Operating Systems",
  },
  {
    title: "Quick Q&A",
    path: "OperatingSystems/Quick-QA.md",
    category: "Operating Systems",
  },
];
