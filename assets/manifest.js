// List of available markdown notes with categories
const MANIFEST = [
  { title: "Mongodb", path: "Tech/Mongodb.md", category: "Database" },
  { title: "Mongodb", path: "Tech/DBMS.md", category: "Database" },
  { title: "Arrays", path: "DSA/Arrays.md", category: "DSA" },
  {
    title: "Bit Manipulation",
    path: "DSA/BitManipulation.md",
    category: "DSA",
  },
  {
    title: "DSA Overview",
    path: "DSA/DSA.md",
    category: "DSA",
  },
  {
    title: "DynamicProgramming",
    path: "DSA/DynamicProgramming.md",
    category: "DSA",
  },
  {
    title: "LinkedList",
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
  {
    title: "Ansible",
    path: "Tech/Ansible.md",
    category: "Tech",
  },
  {
    title: "Css",
    path: "Tech/Css.md",
    category: "Tech",
  },
  {
    title: "Docker",
    path: "Tech/Docker.md",
    category: "Tech",
  },
  {
    title: "Express.js",
    path: "Tech/Express.js.md",
    category: "Tech",
  },
  {
    title: "Git & Github",
    path: "Tech/Git-Github.md",
    category: "Tech",
  },
  {
    title: "Html",
    path: "Tech/Html.md",
    category: "Tech",
  },
  {
    title: "Linux Guide",
    path: "Tech/Linux-Guide.md",
    category: "Tech",
  },
  {
    title: "Markdown",
    path: "Tech/Markdown.md",
    category: "Tech",
  },
  {
    title: "Neovim",
    path: "Tech/Neovim.md",
    category: "Tech",
  },
  {
    title: "Nginx",
    path: "Tech/Nginx.md",
    category: "Tech",
  },
  {
    title: "SSH",
    path: "Tech/Ssh.md",
    category: "Tech",
  },
  {
    title: "Systemd Linux",
    path: "Tech/systemd linux.md",
    category: "Tech",
  },
  {
    title: "Java Script",
    path: "Tech/JavaScript.md",
    category: "Tech",
  },
  {
    title: "Terraform vs Ansible vs Kubernetes",
    path: "Tech/Terraform vs Ansible vs Kubernetes.md",
    category: "Tech",
  },
  {
    title: "zshrc",
    path: "Tech/zshrc.md",
    category: "Tech",
  },
  // Computer Networks - Organized
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
  // Operating Systems - Organized
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
