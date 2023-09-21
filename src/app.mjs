#!/usr/bin/env node
import { writeFileSync, existsSync, readFileSync } from "fs";
import template from "./template.mjs";
import { $ } from "zx";

const { argv } = process;
const { stringify, parse } = JSON;

async function init() {
  if (argv.length == 2) {
    const data = parse(readFileSync("andro.json").toString());
    await $`rm -rf andro/app/src/main/assets`;
    await $`cp -r ${data.folder} andro/app/src/main/`;
    await $`mv andro/app/src/main/${data.folder} andro/app/src/main/assets`;

    const file = {
      gradle: "andro/app/build.gradle",
      strings: "andro/app/src/main/res/values/strings.xml",
      layout: "andro/app/src/main/res/layout/activity_main.xml",
      manifest: "andro/app/src/main/AndroidManifest.xml",
    };

    function ubah(filenya, before, after) {
      let mulai = readFileSync(filenya).toString();
      mulai = mulai.replace(before, after);
      writeFileSync(filenya, mulai);
    }

    ubah(file.gradle, /applicationId ".+"/, `applicationId "${data.id}"`);
    ubah(file.manifest, /package=".+"/, `package="${data.id}"`);

    const idPecah = data.id.split(".");

    if (!existsSync(`andro/app/src/main/java/${idPecah[0]}/`)) {
      await $`mkdir andro/app/src/main/java/${idPecah[0]}/`;
    }
    if (!existsSync(`andro/app/src/main/java/${idPecah[0]}/${idPecah[1]}/`)) {
      await $`mkdir andro/app/src/main/java/${idPecah[0]}/${idPecah[1]}/`;
    }
    if (existsSync("andro/app/src/main/java/com/user/app/")) {
      await $`mv andro/app/src/main/java/com/user/app/ andro/app/src/main/java/${idPecah[0]}/${idPecah[1]}/${idPecah[2]}/`;
    }
    if (idPecah[1] != "user") {
      await $`rm -rf andro/app/src/main/java/com/user/`;
    }

    ubah(
      `andro/app/src/main/java/${idPecah[0]}/${idPecah[1]}/${idPecah[2]}/MainActivity.java`,
      /package .+;/,
      `package ${data.id};`
    );

    ubah(
      file.strings,
      /<string name="app_name">.+<\/string>/,
      `<string name="app_name">${data.judul}</string>`
    );
    ubah(
      file.layout,
      /ads:adUnitId=".+"/,
      `ads:adUnitId="${data.admobBanner}"`
    );
    ubah(
      file.manifest,
      /android:name="com.google.android.gms.ads.APPLICATION_ID" android:value=".+"/,
      `android:name="com.google.android.gms.ads.APPLICATION_ID" android:value="${data.admobApplication}"`
    );
    // ubah(
    //   file.manifest,
    //   /android:name="com.startapp.sdk.APPLICATION_ID" android:value=".+"/,
    //   `android:name="com.startapp.sdk.APPLICATION_ID" android:value="${data.startAds}"`
    // );
    // ubah(
    //   `andro/app/src/main/java/${idPecah[0]}/${idPecah[1]}/${idPecah[2]}/MainActivity.java`,
    //   /StartAppSDK\.init\(this, ".+", false\);/,
    //   `StartAppSDK.init(this, "${data.startAds}", false);`
    // );
    ubah(file.gradle, /versionCode .+/, `versionCode ${data.versi}`);
    ubah(file.gradle, /versionName ".+"/, `versionName "${data.versi}"`);
  }
  if (argv[2] && argv[2] == "init") {
    if (!existsSync("andro.json")) {
      writeFileSync("andro.json", stringify(template, null, 2));
    }

    if (!existsSync(".gitignore")) {
      writeFileSync(".gitignore", "andro");
    } else {
      let isiGitignore = readFileSync(".gitignore").toString();
      isiGitignore = isiGitignore.split("\n").filter((x) => x);

      if (!isiGitignore.includes("andro")) {
        isiGitignore.push("andro");
        writeFileSync(".gitignore", isiGitignore.join("\n"));
      }
    }

    if (!existsSync("andro")) {
      await $`degit mzaini30/android-template andro`;
    }
  }
}
init();
