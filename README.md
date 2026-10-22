# Nothing OS 4.0.20 Launcher — Universal Android & Xiaomi 14 Civi Edition

An authentic, fully native **Nothing OS 4.0 Launcher** port patched and compiled for **any Android device** (Android 11 through Android 16 / API 30–36), specially optimized for the **Xiaomi 14 Civi** (Snapdragon 8s Gen 3 / HyperOS).

![Nothing OS 4.0 Wallpaper](assets/wallpaper.jpg)

---

## ⚡ 100% Native Android Launcher3 (Zero WebViews)

Unlike third-party mockups or WebView simulations, this project delivers the **genuine Nothing OS 4.0.20 Launcher codebase** (`com.nothing.launcher`):

* **Authentic Quickstep & SearchLauncher**: Built directly on Nothing OS's AOSP Quickstep and `com.android.searchlauncher.SearchLauncher` engine.
* **Full Multi-DEX Bytecode**: Contains all 5 official DEX bytecode partitions (`classes.dex` through `classes5.dex`, over 40 MB of uncompressed compiled Java/Kotlin bytecode).
* **Official 64-bit ARM64 Native Libraries**: Bundles real 64-bit ELF shared objects (`libsecurityJni.so`, `libdatastore_shared_counter.so`, `libandroidx.graphics.path.so`).
* **Genuine Nothing OS 4.0 Resources**: Includes official dot-matrix typography, Nothing Weather & Clock widgets, 2x2 enlarged folder layouts, Quick Settings widgets, custom icon pack integration, and Lottie gesture tutorials.

---

## 🛠️ Universal OEM Compatibility Patches

Stock Nothing OS APKs typically fail on non-Nothing devices because they call proprietary Nothing OS framework services and Android 15/16 private system APIs. This universal edition incorporates **79 targeted smali compatibility patches**:

1. **System Service Fallbacks**:
   * Graceful try-catch fallbacks for `com.nothing.os.service`, `com.nothing.experience`, and `DisplayHelper` hardware hooks.
   * Prevents `ClassNotFoundException`, `NoSuchMethodError`, and `NoSuchFieldError` on Xiaomi HyperOS, Samsung OneUI, ColorOS, OxygenOS, and Stock Android.
2. **Android 11+ Zero-Compression (`STORED`) Policy**:
   * Enforces uncompressed storage (`STORED`) for `resources.arsc` and `.so` files aligned to 4-byte memory boundaries.
   * Completely eliminates Android package parse failure `INSTALL_PARSE_FAILED_UNEXPECTED_EXCEPTION` (error code -124).
3. **Multi-Scheme Cryptographic Signing**:
   * Signed with release RSA-2048 keystore under APK Signature Scheme v1, v2, and v3.
   * Directly sideloadable on any modern Android device without root or system modifications.

---

## 📦 APK Downloads & Releases

Pre-compiled, zipaligned, and signed release packages are available on GitHub Releases:

🔗 **[Download Latest Universal Release (GitHub Releases)](https://github.com/MythicRa11/NothingLauncher4-Civi14/releases/tag/v4.0.20-universal)**

| Package | File Size | Description |
| :--- | :--- | :--- |
| **[`NothingLauncher-v4.0.20-Universal.apk`](https://github.com/MythicRa11/NothingLauncher4-Civi14/releases/download/v4.0.20-universal/NothingLauncher-v4.0.20-Universal.apk)** | **31.84 MB** (~60 MB uncompressed) | **Official Nothing Launcher 4.0.20 Universal**: Standard package name and labels with full universal OEM patch set. |
| **[`MYTHICRA11-v4.0.20-Universal.apk`](https://github.com/MythicRa11/NothingLauncher4-Civi14/releases/download/v4.0.20-universal/MYTHICRA11-v4.0.20-Universal.apk)** | **31.84 MB** (~60 MB uncompressed) | **MYTHICRA11 Edition**: Features custom `MYTHICRA11` application branding and launcher metadata. |

---

## 📲 How to Install & Set as Default Launcher

### Step 1: Install APK
Download either APK above to your phone and tap to install (enable "Install unknown apps" in browser/file manager when prompted), or install directly via ADB:
```bash
adb install -r NothingLauncher-v4.0.20-Universal.apk
```

### Step 2: Set as Default Home App
- **Xiaomi / Redmi / POCO (HyperOS / MIUI)**:
  1. Open **Settings** → **Apps** → **Manage apps**.
  2. Tap the **Three Dots (⋮)** in the top-right corner → **Default apps**.
  3. Select **Launcher** → Choose **Nothing Launcher** (or **MYTHICRA11**).
- **Samsung Galaxy (One UI)**:
  1. Open **Settings** → **Apps** → **Choose default apps** → **Home app**.
  2. Select **Nothing Launcher**.
- **Google Pixel / Motorola / Stock Android**:
  1. Open **Settings** → **Apps** → **Default apps** → **Home app**.
  2. Select **Nothing Launcher**.

---

## 🔍 Verification & Integrity Tooling

This repository includes automated integrity verification scripts:

### PowerShell Verification
```powershell
.\scripts\Verify-ApkIntegrity.ps1 -ApkPath NothingLauncher-v4.0.20-Universal.apk
```
* Checks all 5 DEX partitions (~40.4 MB bytecode).
* Verifies `resources.arsc` zero-compression compliance.
* Performs full-stream CRC32 decompression check across all 3,104 archive entries (0 corruptions).
* Validates v1, v2, v3 signature and 4-byte zipalign.

### Java Verification Engine
```bash
java BuildUniversalApk.java
```

---

## 📄 License & Attribution

* Launcher base and Quickstep subsystems are derived from AOSP (Android Open Source Project) under the Apache License 2.0.
* "Nothing" and "Nothing OS" are registered trademarks of Nothing Technology Limited. This project is an independent community compatibility port.
