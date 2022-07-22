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

<!-- blog start -->
## Blog

- [Membuat File HTML + Windi CSS + Alpine JS](https://github.zenia.my.id/tulisan/windiAlpine)
- [Script Golang untuk Ngecek Error](https://github.zenia.my.id/tulisan/error)
- [Otomatis "go fmt" Setiap Save](https://github.zenia.my.id/tulisan/gofmt)
- [Install Workflow Automa dari Digimart](https://github.zenia.my.id/tulisan/digimart)
- [Mengatasi Bun Error Illegal Instruction](https://github.zenia.my.id/tulisan/bun)
<!-- blog end -->
