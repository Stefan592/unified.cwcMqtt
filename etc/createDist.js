import fs from 'fs-extra';


const src = './src';
const dist = './dist';

// folder
const control = '/control';
const css = '/css';

// files
const manifest = '/manifest.json';
const index = '/index.html';
const webCC = '/js/webcc.min.js';
const icon = '/img/icon.ico';

// Copy files
fs.cpSync(src + manifest, dist + manifest);
fs.cpSync(src + index, dist + control + index);
fs.cpSync(src + webCC, dist + control + webCC);
fs.cpSync(src + icon, dist + control + icon);
fs.copySync(src + css, dist + control + css);