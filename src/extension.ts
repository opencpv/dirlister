import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import generateStructure from './lib/generate-structure';
import updateDirectoryStructure from './lib/update-structure';

export function activate(context: vscode.ExtensionContext) {
    

    const dirUpdate = vscode.commands.registerCommand('dirlister.dirUpdate', async() => {
        const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
        if (!workspaceFolder) {
            vscode.window.showErrorMessage('No workspace folder open');
            return;
        }

		try {
			const filePath = path.join(workspaceFolder.uri.fsPath,'dir.md');
			const structure = await generateStructure(workspaceFolder.uri.fsPath);
			fs.writeFileSync(filePath,structure);

			const document = await vscode.workspace.openTextDocument(filePath);
			await vscode.window.showTextDocument(document);

			vscode.window.showInformationMessage('Directory structure file created successfully!');
		} catch (error) {
			vscode.window.showInformationMessage(`Error creating file: ${error}`);

		}
    });

	const fileCreateWatcher = vscode.workspace.createFileSystemWatcher('**/*',false,false,false);
	fileCreateWatcher.onDidCreate(async()=>{
		await updateDirectoryStructure();
		vscode.window.showInformationMessage('Directory structure file updated successfully!');
	});

	const fileDeleteWatcher = vscode.workspace.createFileSystemWatcher('**/*',false,false,false);
	fileDeleteWatcher.onDidDelete(async (uri) => {
		// Check if the deleted file is NOT directory-structure.md
		if (!uri.fsPath.endsWith('dir.md')) {
			await updateDirectoryStructure();
			vscode.window.showInformationMessage('Directory structure file updated successfully!');
		}});


	context.subscriptions.push(dirUpdate);
	context.subscriptions.push(fileCreateWatcher);
	context.subscriptions.push(fileDeleteWatcher);


}

export function deactivate() {}