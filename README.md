# Nano Ink

A personal knowledge base for Computer Science and Software Engineering.

## Features

- Clean, fast docs UI with search and theme toggle
- Topic-based navigation powered by a manifest
- Markdown-driven content with code highlighting
- Mobile-friendly layout with responsive cards

## Tech Stack

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- Marked + gray-matter (Markdown parsing)
- highlight.js (syntax highlighting)

## Content Areas

- Computer Networks
- Operating Systems
- Database (SQL/NoSQL)
- DSA
- Linux
- DevOps
- Web Development
- Tools and workflows

## Getting Started

1. Install dependencies
   - `npm install`
2. Run the dev server
   - `npm run dev`

## Scripts

- `npm run dev` - start local dev server
- `npm run build` - production build
- `npm run start` - run production server
- `npm run lint` - lint the codebase

## Project Structure

- `src/app` - routes and layout
- `src/components` - UI components
- `src/lib` - utilities and manifest logic
- `public` - static assets
- Topic folders (e.g., `ComputerNetworks`, `Database`) - Markdown content

## Contributing

Thanks for your interest in contributing.

1. Fork the repo and create your branch: `git checkout -b feature/my-change`
2. Make your changes and ensure formatting/lint passes: `npm run lint`
3. Commit your changes: `git commit -m "Describe your change"`
4. Push to your fork and open a pull request

Please keep changes focused and include notes on any content additions.

If you are adding a new topic folder, include a `README.md` in that folder and
update content links in the UI as needed.

## License

MIT. See [LICENSE](LICENSE).
