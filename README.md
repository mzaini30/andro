# Andro

Tools untuk generate aplikasi Android dari HTML.

## Tutorial

https://youtu.be/AgsDgpfjoGI

## Install

```bash
npm i -g andro degit
```

## Init Project

```bash
andro init
```

Otomatis, akan terbentuk file `andro.json` yang merupakan file config dan folder `andro` yang merupakan template Android Studio.

## Generate Aplikasi Android

Sebelumnya, jika di HTML kita itu menggunakan absolute URL untuk memanggil file CSS maupun JS, ubah dulu menjadi base-nya: `/assets/`. Kalau menggunakan Vite, perintahnya seperti ini:

```bash
vite build --base /assets/
```

Lalu, generate dengan perintah `andro`.
