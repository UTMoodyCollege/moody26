#!/usr/bin/env node

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';

const themeRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outputDirectory = resolve(themeRoot, 'js/dist');
const vendorDirectory = resolve(themeRoot, 'js/vendor');

await Promise.all([
  mkdir(outputDirectory, { recursive: true }),
  mkdir(vendorDirectory, { recursive: true }),
]);

await build({
  banner: {
    js: '/*! Moody26 motion · Anime.js 4.5.0 (MIT) · source: js/motion.js */',
  },
  bundle: true,
  entryPoints: [resolve(themeRoot, 'js/motion.js')],
  format: 'iife',
  legalComments: 'eof',
  minify: true,
  outfile: resolve(outputDirectory, 'motion.min.js'),
  target: ['chrome110', 'firefox109', 'safari15.6'],
});

const normalize = (value) => `${value.trim().replace(/[ \t]+$/gm, '')}\n`;
const [output, gsap] = await Promise.all([
  readFile(resolve(outputDirectory, 'motion.min.js'), 'utf8'),
  readFile(resolve(themeRoot, 'node_modules/gsap/dist/gsap.min.js'), 'utf8'),
]);

await Promise.all([
  writeFile(resolve(outputDirectory, 'motion.min.js'), normalize(output)),
  writeFile(resolve(vendorDirectory, 'gsap.min.js'), normalize(gsap)),
]);
