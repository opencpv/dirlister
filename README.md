# Directory Structure Generator Extension

Automatically generates and maintains a markdown file showing your workspace's directory structure.

## Features

- Creates a `dir.md` file in your workspace showing the complete directory structure
- Auto-updates when files/folders are created or deleted
- Excludes `node_modules` and `.git` directories
- Uses emoji indicators for files (📄) and folders (📁)

## Usage

1. Command: "Directory Structure Init"

   - Creates initial `dir.md` file
   - Opens file automatically after creation

2. Automatic Updates:
   - Structure updates when files are created
   - Structure updates when files are deleted (except `dir.md`)

## Installation

1. Install via VS Code Extensions Marketplace
2. Reload VS Code
3. Open a workspace
4. Run "Directory Structure Init" from command palette

## Requirements

- VS Code 1.95.0 or higher
- Active workspace folder

## Known Limitations

- Must have an active workspace folder
- Single workspace folder support only
- Large directories may take longer to process

## Extension Settings

None currently configured.
