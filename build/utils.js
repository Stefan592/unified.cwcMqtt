

import fs from 'fs-extra';
import archiver from 'archiver';

/**
 * Minizie all js files in a directory
 * @param {string} dir directory with to minimized files
 */
export function minimizeAllInDir(dir){

    dir = dir  + '/';

    const files = fs.readdirSync(dir);
    for (const file of files){
        if (!file.includes('.min') && file.includes('.js')){

            const minFileName = file.replace('.js', '.min.js');

            const data = fs.readFileSync(dir + file ,{encoding: 'utf-8'});

            fs.writeFileSync(dir + minFileName, data);
            fs.removeSync(dir + file);
        }
    }
}

/**
 * Change the scripting reference from *.js to *.min.js
 * @param {string} file File to check/modify
 */
export function changeFileReference(file){

    const data = fs.readFileSync(file, {encoding:'utf8', flag:'r'});
    const replacedData = data.replace(/(?<!\.min)\.js/g, '.min.js');

    fs.writeFileSync(file, replacedData);

}

export async function archive(dir, targetDir, guid){

    return new Promise(resolve => {

        const archive = archiver.create('zip', {});
        const output = fs.createWriteStream(`${targetDir}/{${guid}}.zip`);
        archive.pipe(output);
        archive.directory(dir, false);
        archive.finalize();
        

        output.on('close', function() {
            resolve();
        });

    });
}
