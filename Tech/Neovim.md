# NVChad Beginner Guide (Fedora-focused)

## Prerequisites

- Fedora package manager (`dnf`)
- Git
- Neovim 0.9+
- Nerd Font (JetBrainsMono Nerd Font recommended)

### Install required packages

```bash
sudo dnf install -y git neovim
```

### Install JetBrainsMono Nerd Font

```bash
sudo dnf install -y jetbrains-mono-fonts
```

After installation:

- Open Konsole → Settings → Edit Profile → Appearance
- Select **JetBrainsMono Nerd Font**
- Restart the terminal

## Backup any existing Neovim config

```bash
mv ~/.config/nvim ~/.config/nvim.bak
mv ~/.local/share/nvim ~/.local/share/nvim.bak
mv ~/.cache/nvim ~/.cache/nvim.bak
```

## Install NvChad

```bash
git clone https://github.com/NvChad/starter ~/.config/nvim
```

Launch Neovim (stay open until plugins finish installing):

```bash
nvim
```

## Core concepts

- Modes: **Normal** (default), **Insert** (`i`), **Visual** (`v`), **Command** (`:`)
- Leader key: **Space**
- Keys are pressed in sequence, not simultaneously
- `Esc` reliably returns to Normal mode

## File operations

- Save file: `Space f s`
- Open file picker: `Space f f`
- Live grep text: `Space f w`
- File tree: `Space e`

## Windows and buffers

- Vertical split: `:v`
- Horizontal split: `:s`
- Move between windows: `Ctrl+h`, `Ctrl+j`, `Ctrl+k`, `Ctrl+l`
- Switch buffers (open files): `Space b b`

## Code intelligence (LSP)

- Go to definition: `g d`
- Hover docs: `K`
- Rename symbol: `Space r n`
- Format buffer: `Space f m`
- Check LSP status: `:LspInfo`
- Install language servers: `:Mason`

## Integrated terminal

- Toggle floating terminal: `Space h`
- Exit terminal mode: type `exit`

## Discoverability & help

- Show which-key menu: press **Space** and wait
- NvChad cheatsheet: `:NvCheatsheet`

## Important config entrypoints

- `~/.config/nvim/lua/custom/chadrc.lua`
- `~/.config/nvim/lua/custom/mappings.lua`
- `~/.config/nvim/lua/custom/plugins.lua`

## Quick troubleshooting

- Plugins didn’t install: reopen `nvim`, then run `:PackerSync`
- Fonts look wrong: confirm JetBrainsMono Nerd Font is selected in terminal
- LSP missing: open `:Mason` and install the relevant server

## At-a-glance cheatsheet

- Leader: **Space**
- Save: `Space f s`
- Files: `Space f f`
- Search: `Space f w`
- Tree: `Space e`
- Buffers: `Space b b`
- Format: `Space f m`
- Terminal: `Space h`
- LSP info: `:LspInfo`
- Mason: `:Mason`

## Summary

- Use Space as leader, `Esc` to reset
- Keep Neovim open after first launch to let plugins install
- Customizations live under `~/.config/nvim/lua/custom/`
