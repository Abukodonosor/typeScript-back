# typeScript-back

This is my first time useing typeScript, so i tried to make wraper around express, and to use node with much more structural power.
(so excuse if i didn't use best industrial practices)

Need to implement:
- bcrypt for password
- tests for api and models

Structure:
src:
- this folder contains ts code, and all logic
- src/configDB.ts => is file where you need to change your DB connection params

TypeScript code can be transpiled with tsc command, and you will receive /dist folder with js files

Usage:
- npm install (for installing npm packages)
- npm run start (to run server)
