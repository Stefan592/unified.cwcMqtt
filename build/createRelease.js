import fs from 'fs-extra';
import {archive} from './utils.js';


const release = './release';
const dist = './dist';

const releaseRaw = release + '/raw/';
const control = releaseRaw + '/control';

const manifest = '/manifest.json';
const src = '/control';

if (fs.existsSync(release)){
    fs.rmSync(release, { recursive: true});
}

// Create folders
fs.mkdirSync(release);
fs.mkdirSync(releaseRaw);


// Copy files
fs.cpSync(dist + manifest, releaseRaw + manifest);
fs.copySync(dist + src, control);


const manifestData = JSON.parse(fs.readFileSync(`${dist}/manifest.json`));
const guid = manifestData.control.identity.type.split('guid://')[1];

await archive(releaseRaw, release, guid);
