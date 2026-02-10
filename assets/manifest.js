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
  { title: "Arrays", path: "DSA/Arrays.md", category: "DSA" },
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
  // Database - SQL
  {
    title: "Overview",
    path: "Tech/Database/README.md",
    category: "Database",
  },
  {
    title: "DBMS Fundamentals",
    path: "Tech/Database/SQL/DBMS.md",
    category: "Database",
  },
  {
    title: "SQL Language",
    path: "Tech/Database/SQL/SQL.md",
    category: "Database",
  },
  // Database - NoSQL
  {
    title: "MongoDB",
    path: "Tech/Database/NoSQL/MongoDB.md",
    category: "Database",
  },
  {
    title: "Redis",
    path: "Tech/Database/NoSQL/Redis.md",
    category: "Database",
  },
  // Web Development
  {
    title: "Overview",
    path: "Tech/WebDev/README.md",
    category: "Web Development",
  },
  {
    title: "HTML",
    path: "Tech/WebDev/Html.md",
    category: "Web Development",
  },
  {
    title: "CSS",
    path: "Tech/WebDev/Css.md",
    category: "Web Development",
  },
  {
    title: "JavaScript",
    path: "Tech/WebDev/JavaScript.md",
    category: "Web Development",
  },
  {
    title: "JS Notes",
    path: "Tech/WebDev/Js.md",
    category: "Web Development",
  },
  {
    title: "Express.js",
    path: "Tech/WebDev/Express.js.md",
    category: "Web Development",
  },
  // DevOps
  {
    title: "Overview",
    path: "Tech/DevOps/README.md",
    category: "DevOps",
  },
  {
    title: "Ansible",
    path: "Tech/DevOps/Ansible.md",
    category: "DevOps",
  },
  {
    title: "Docker",
    path: "Tech/DevOps/Docker.md",
    category: "DevOps",
  },
  {
    title: "Nginx",
    path: "Tech/DevOps/Nginx.md",
    category: "DevOps",
  },
  {
    title: "Terraform vs Ansible vs Kubernetes",
    path: "Tech/DevOps/Terraform-vs-Ansible-vs-Kubernetes.md",
    category: "DevOps",
  },
  // Tools
  {
    title: "Overview",
    path: "Tech/Tools/README.md",
    category: "Tools",
  },
  {
    title: "Git & GitHub",
    path: "Tech/Tools/Git-Github.md",
    category: "Tools",
  },
  {
    title: "Markdown",
    path: "Tech/Tools/Markdown.md",
    category: "Tools",
  },
  {
    title: "Neovim",
    path: "Tech/Tools/Neovim.md",
    category: "Tools",
  },
  // Linux
  {
    title: "Overview",
    path: "Tech/Linux/README.md",
    category: "Linux",
  },
  {
    title: "Linux Guide",
    path: "Tech/Linux/Linux-Guide.md",
    category: "Linux",
  },
  {
    title: "SSH",
    path: "Tech/Linux/Ssh.md",
    category: "Linux",
  },
  {
    title: "Systemd",
    path: "Tech/Linux/Systemd-Linux.md",
    category: "Linux",
  },
  {
    title: "Zsh Configuration",
    path: "Tech/Linux/zshrc.md",
    category: "Linux",
  },
  // Computer Networks
  {
    title: "Overview",
    path: "Tech/ComputerNetworks/README.md",
    category: "Computer Networks",
  },
  {
    title: "OSI & TCP/IP Model",
    path: "Tech/ComputerNetworks/OSI-TCP-Model.md",
    category: "Computer Networks",
  },
  {
    title: "IP Addressing",
    path: "Tech/ComputerNetworks/IP-Addressing.md",
    category: "Computer Networks",
  },
  {
    title: "Transport Protocols",
    path: "Tech/ComputerNetworks/Transport-Protocols.md",
    category: "Computer Networks",
  },
  {
    title: "Routing",
    path: "Tech/ComputerNetworks/Routing.md",
    category: "Computer Networks",
  },
  {
    title: "HTTP & Web",
    path: "Tech/ComputerNetworks/HTTP-and-Web.md",
    category: "Computer Networks",
  },
  {
    title: "DNS",
    path: "Tech/ComputerNetworks/DNS.md",
    category: "Computer Networks",
  },
  {
    title: "Email Protocols",
    path: "Tech/ComputerNetworks/Email-Protocols.md",
    category: "Computer Networks",
  },
  {
    title: "FTP",
    path: "Tech/ComputerNetworks/FTP.md",
    category: "Computer Networks",
  },
  {
    title: "Network Security",
    path: "Tech/ComputerNetworks/Network-Security.md",
    category: "Computer Networks",
  },
  {
    title: "Encryption & SSL/TLS",
    path: "Tech/ComputerNetworks/Encryption-SSL-TLS.md",
    category: "Computer Networks",
  },
  {
    title: "Network Services",
    path: "Tech/ComputerNetworks/Network-Services.md",
    category: "Computer Networks",
  },
  {
    title: "Quick Q&A",
    path: "Tech/ComputerNetworks/Quick-QA.md",
    category: "Computer Networks",
  },
  // Operating Systems
  {
    title: "Overview",
    path: "Tech/OperatingSystems/README.md",
    category: "Operating Systems",
  },
  {
    title: "Introduction",
    path: "Tech/OperatingSystems/Introduction.md",
    category: "Operating Systems",
  },
  {
    title: "Process Management",
    path: "Tech/OperatingSystems/Process-Management.md",
    category: "Operating Systems",
  },
  {
    title: "Threads",
    path: "Tech/OperatingSystems/Threads.md",
    category: "Operating Systems",
  },
  {
    title: "CPU Scheduling",
    path: "Tech/OperatingSystems/CPU-Scheduling.md",
    category: "Operating Systems",
  },
  {
    title: "Process Synchronization",
    path: "Tech/OperatingSystems/Process-Synchronization.md",
    category: "Operating Systems",
  },
  {
    title: "Deadlocks",
    path: "Tech/OperatingSystems/Deadlocks.md",
    category: "Operating Systems",
  },
  {
    title: "Memory Management",
    path: "Tech/OperatingSystems/Memory-Management.md",
    category: "Operating Systems",
  },
  {
    title: "Virtual Memory",
    path: "Tech/OperatingSystems/Virtual-Memory.md",
    category: "Operating Systems",
  },
  {
    title: "File Systems",
    path: "Tech/OperatingSystems/File-Systems.md",
    category: "Operating Systems",
  },
  {
    title: "Disk Management",
    path: "Tech/OperatingSystems/Disk-Management.md",
    category: "Operating Systems",
  },
  {
    title: "I/O Systems",
    path: "Tech/OperatingSystems/IO-Systems.md",
    category: "Operating Systems",
  },
  {
    title: "System Calls",
    path: "Tech/OperatingSystems/System-Calls.md",
    category: "Operating Systems",
  },
  {
    title: "Inter-Process Communication",
    path: "Tech/OperatingSystems/IPC.md",
    category: "Operating Systems",
  },
  {
    title: "Quick Q&A",
    path: "Tech/OperatingSystems/Quick-QA.md",
    category: "Operating Systems",
  },
];
