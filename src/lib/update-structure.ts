import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import generateStructure from './generate-structure';

async function updateDirectoryStructure() {
    const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
    if (!workspaceFolder) {
        vscode.window.showErrorMessage('No workspace folder open');
        return;
    }

    try {
        const filePath = path.join(workspaceFolder.uri.fsPath, 'dir.md');
        const structure = await generateStructure(workspaceFolder.uri.fsPath);
        
        fs.writeFileSync(filePath, structure);
        vscode.window.showInformationMessage('Directory structure updated!');
    } catch (error) {
        vscode.window.showErrorMessage(`Error updating structure: ${error}`);
    }
}

export default updateDirectoryStructure;