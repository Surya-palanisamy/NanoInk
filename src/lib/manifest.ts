export interface ManifestNode {
  name: string;
  path?: string;
  children?: ManifestNode[];
}
export interface ManifestRoot {
  name: string;
  children: ManifestNode[];
}
// Read manifest from the original manifest.js
export function getManifest(): ManifestRoot {
  return {
    name: "root",
    children: [
      {
        name: "ComputerNetworks",
        children: [
          { name: "README", path: "ComputerNetworks/README.md" },
          { name: "DNS", path: "ComputerNetworks/DNS.md" },
          {
            name: "Email-Protocols",
            path: "ComputerNetworks/Email-Protocols.md",
          },
          {
            name: "Encryption-SSL-TLS",
            path: "ComputerNetworks/Encryption-SSL-TLS.md",
          },
          { name: "FTP", path: "ComputerNetworks/FTP.md" },
          { name: "HTTP-and-Web", path: "ComputerNetworks/HTTP-and-Web.md" },
          { name: "IP-Addressing", path: "ComputerNetworks/IP-Addressing.md" },
          {
            name: "Network-Security",
            path: "ComputerNetworks/Network-Security.md",
          },
          {
            name: "Network-Services",
            path: "ComputerNetworks/Network-Services.md",
          },
          { name: "OSI-TCP-Model", path: "ComputerNetworks/OSI-TCP-Model.md" },
          { name: "Quick-QA", path: "ComputerNetworks/Quick-QA.md" },
          { name: "Routing", path: "ComputerNetworks/Routing.md" },
          {
            name: "Transport-Protocols",
            path: "ComputerNetworks/Transport-Protocols.md",
          },
        ],
      },
      {
        name: "Database",
        children: [
          { name: "README", path: "Database/README.md" },
          {
            name: "NoSQL",
            children: [
              { name: "README", path: "Database/NoSQL/README.md" },
              { name: "MongoDB", path: "Database/NoSQL/MongoDB.md" },
              { name: "Redis", path: "Database/NoSQL/Redis.md" },
            ],
          },
          {
            name: "SQL",
            children: [
              { name: "README", path: "Database/SQL/README.md" },
              { name: "DBMS", path: "Database/SQL/DBMS.md" },
              { name: "SQL", path: "Database/SQL/SQL.md" },
            ],
          },
        ],
      },
      {
        name: "DevOps",
        children: [
          { name: "README", path: "DevOps/README.md" },
          { name: "Ansible", path: "DevOps/Ansible.md" },
          { name: "Docker", path: "DevOps/Docker.md" },
          { name: "Nginx", path: "DevOps/Nginx.md" },
          {
            name: "Terraform-vs-Ansible-vs-Kubernetes",
            path: "DevOps/Terraform-vs-Ansible-vs-Kubernetes.md",
          },
        ],
      },
      {
        name: "DSA",
        children: [
          { name: "README", path: "DSA/README.md" },
          { name: "Algorithms", path: "DSA/Algorithms.md" },
          { name: "Arrays", path: "DSA/Arrays.md" },
          { name: "BitManipulation", path: "DSA/BitManipulation.md" },
          { name: "DynamicProgramming", path: "DSA/DynamicProgramming.md" },
          { name: "LinkedList", path: "DSA/LinkedList.md" },
          { name: "Math", path: "DSA/Math.md" },
          { name: "Matrix", path: "DSA/Matrix.md" },
          { name: "Patterns", path: "DSA/Patterns.md" },
          { name: "Stack", path: "DSA/Stack.md" },
          { name: "Strings", path: "DSA/Strings.md" },
        ],
      },
      {
        name: "Linux",
        children: [
          { name: "README", path: "Linux/README.md" },
          { name: "Linux", path: "Linux/Linux.md" },
          { name: "Ssh", path: "Linux/Ssh.md" },
          { name: "Systemd-Linux", path: "Linux/Systemd-Linux.md" },
          { name: "zshrc", path: "Linux/zshrc.md" },
        ],
      },
      {
        name: "OperatingSystems",
        children: [
          { name: "README", path: "OperatingSystems/README.md" },
          {
            name: "CPU-Scheduling",
            path: "OperatingSystems/CPU-Scheduling.md",
          },
          { name: "Deadlocks", path: "OperatingSystems/Deadlocks.md" },
          {
            name: "Disk-Management",
            path: "OperatingSystems/Disk-Management.md",
          },
          { name: "File-Systems", path: "OperatingSystems/File-Systems.md" },
          { name: "IO-Systems", path: "OperatingSystems/IO-Systems.md" },
          { name: "Introduction", path: "OperatingSystems/Introduction.md" },
          { name: "IPC", path: "OperatingSystems/IPC.md" },
          {
            name: "Memory-Management",
            path: "OperatingSystems/Memory-Management.md",
          },
          {
            name: "Process-Management",
            path: "OperatingSystems/Process-Management.md",
          },
          {
            name: "Process-Synchronization",
            path: "OperatingSystems/Process-Synchronization.md",
          },
          { name: "Quick-QA", path: "OperatingSystems/Quick-QA.md" },
          { name: "System-Calls", path: "OperatingSystems/System-Calls.md" },
          { name: "Threads", path: "OperatingSystems/Threads.md" },
          {
            name: "Virtual-Memory",
            path: "OperatingSystems/Virtual-Memory.md",
          },
        ],
      },
      {
        name: "Tools",
        children: [
          { name: "README", path: "Tools/README.md" },
          { name: "Git-Github", path: "Tools/Git-Github.md" },
          { name: "Markdown", path: "Tools/Markdown.md" },
          { name: "Neovim", path: "Tools/Neovim.md" },
        ],
      },
      {
        name: "WebDev",
        children: [
          { name: "README", path: "WebDev/README.md" },
          { name: "Css", path: "WebDev/Css.md" },
          { name: "Express.js", path: "WebDev/Express.js.md" },
          { name: "Html", path: "WebDev/Html.md" },
          { name: "JavaScript", path: "WebDev/JavaScript.md" },
          { name: "REST", path: "WebDev/REST.md" },
        ],
      },
      {
        name: "Java",
        children: [
          { name: "README", path: "Java/README.md" },
          { name: "Java Basics", path: "Java/Java.md" },
          { name: "OOPs", path: "Java/OOP.md" },
        ],
      },
    ],
  };
}
// Get all file entries flattened
export function getAllEntries(
  manifest: ManifestRoot,
): { name: string; path: string; parentPath: string }[] {
  const entries: { name: string; path: string; parentPath: string }[] = [];
  function collect(node: ManifestNode, parentPath = "") {
    if (node.path) {
      entries.push({
        name: node.name,
        path: node.path,
        parentPath,
      });
    }
    if (node.children) {
      const currentPath = parentPath ? `${parentPath}/${node.name}` : node.name;
      node.children.forEach((child) => collect(child, currentPath));
    }
  }
  manifest.children.forEach((child) => collect(child, ""));
  return entries;
}
// Count files in a node
export function countFiles(node: ManifestNode): number {
  if (!node.children) return 1;
  return node.children.reduce((acc, child) => acc + countFiles(child), 0);
}
// Format category name
export function formatCategoryName(name: string): string {
  return name
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase())
    .replace(/-/g, " ")
    .trim();
}
