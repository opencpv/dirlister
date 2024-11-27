import * as fs from 'fs';
import * as path from 'path';

async function generateStructure(rootPath: string, indent: string = ''): Promise<string> {
    let output = '';
    const items = await fs.promises.readdir(rootPath, { withFileTypes: true });
    
    const sortedItems = items.sort((a, b) => {
        if (a.isDirectory() && !b.isDirectory()) {return -1;};
        if (!a.isDirectory() && b.isDirectory()) {return 1;};
        return a.name.localeCompare(b.name);
    });

    for (const item of sortedItems) {
        if (item.name === 'node_modules' || item.name === '.git') {continue;}

        output += `${indent}${item.isDirectory() ? '📁' : '📄'} ${item.name}\n`;
        
        if (item.isDirectory()) {
            output += await generateStructure(path.join(rootPath, item.name), indent + '  ');
        }
    }
    
    return output;
}
export default generateStructure;