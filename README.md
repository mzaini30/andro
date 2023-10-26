# Andro

Convert HTML Project to Android Project.

## Install

```bash
npm i -g andro degit
```

## Init Project

```bash
andro init
```

## Generate Android Project

Previously, if in our HTML we used absolute URLs to call CSS or JS files, first change them to the base: `/assets/`. If you use Vite, the command is like this:

```bash
vite build --base /assets/
```

Then, generate with command `andro`
