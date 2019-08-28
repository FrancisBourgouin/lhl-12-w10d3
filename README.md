# Advanced Lecture - What is TypeScript and why should you use it

## Less bugs through typing (Types, not keyboard key pressing)

## Interfaces

## Documentation

## Export targeting

## How to play with it ?

### Package installation

Same install as what we already have, but let's add typescript packages :

- npm i -D node-typescript typescript ts-node-dev tslint tsc-watch
- npm i -D @types/express @types/express-session @types/node @types/request @types/uuid @types/cookie-session @types/cookie-parser
- npx tsc --init
- npx tslint --init

What are all the @types packages ? They are documentation documents to explain to typescript what type of data go in and out of the functions provided by those librairies.

### TypeScript configuration

### TypeScript Linter configuration

### Node package.json update

## What does it looks like in a bigger project





{
    "defaultSeverity": "error",
    "extends": [
        "tslint:recommended"
    ],
    "jsRules": {},
    "rules": {
        "trailing-comma": [ false ]
    },
    "rulesDirectory": []
}