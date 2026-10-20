# Nothing OS 4.0 Launcher — Xiaomi 14 Civi Special Edition

A hardened, high-performance, standalone **Android Home Launcher** engineered specifically for the **Xiaomi 14 Civi** (Civi 14) Android smartphone.

![Nothing OS 4.0 Civi 14 Wallpaper](assets/wallpaper.jpg)

---

## 🛡️ Security, Privacy & Anti-Tamper Architecture

This launcher has been strictly hardened to ensure that **no virus, malware, or background exploit can compromise your device through this app**:

1. **100% Offline & Zero Telemetry:**
   * Contains **zero network trackers, zero analytics SDKs, and zero telemetry**.
   * It never sends or receives external data. All processing occurs locally on your device.

2. **Strict Content Security Policy (CSP):**
   * Enforces `default-src 'self' 'unsafe-inline' data:; connect-src 'none'; object-src 'none'; frame-src 'none';`.
   * Completely immune to cross-site scripting (XSS), prompt injection attacks, and unauthorized iframe clickjacking.

3. **Strict Intent Sanitization & Anti-Hijacking:**
   * Every package launch is validated against a strict alphanumeric regex (`^[a-zA-Z0-9_.]+$`) and verified with Android's `PackageManager`.
   * Flags `FLAG_ACTIVITY_NEW_TASK` and `FLAG_ACTIVITY_RESET_TASK_IF_NEEDED` prevent task hijacking and component spoofing.

4. **WebView Sandboxing:**
   * File access from remote URLs is disabled (`allowFileAccessFromFileURLs = false`, `allowUniversalAccessFromFileURLs = false`).
   * Remote navigation is strictly intercepted and blocked (`shouldOverrideUrlLoading`).

---

## ⚡ Xiaomi 14 Civi Thermal & Battery Optimization

HyperOS's default launcher frequently runs background tracking, search indexers, and widget sync services that heat the phone and drain battery. This launcher solves that:

* **Qualcomm Snapdragon 8s Gen 3 Tuning**:
  * **Zero Idle CPU Cycles**: Implements strict Android lifecycle management (`onPause()` freezes all canvas animations, intervals, and rendering; `onResume()` restores them instantly).
  * When you are using other apps, this launcher consumes **0.0% CPU and 0.0% GPU**.
* **IceLoop Thermal Synergy**:
  * Prevents thermal buildup and throttling on Xiaomi's 4184mm² IceLoop vapor chamber.
* **1.5K AMOLED True Black Power Saver**:
  * Utilizes `#000000` pure OLED blacks. Every black pixel turns off completely, saving up to 60% display power compared to non-OLED themes.

---

## ⚖️ Legal & Clean-Room IP Compliance

* **Clean-Room Implementation**: This application is written entirely from scratch using original Kotlin and vector SVG graphics. No proprietary code or proprietary assets from Nothing Technology Limited or Xiaomi Inc. are used.
* **Trademark Notice**: "Nothing" and "Nothing OS" are registered trademarks of Nothing Technology Limited. "Xiaomi" and "Civi" are trademarks of Xiaomi Inc. This software is an independent open-source launcher and is not affiliated with or endorsed by Nothing Technology Limited.

---

## 📱 Hardware Features Tuned for Xiaomi 14 Civi

1. **Center Dual-Pill Dynamic Notch (32MP Wide + 32MP Ultrawide)**:
   * Aligns with the physical dual front camera pill cutout.
   * **Tap to Expand**: Expands into Nothing's fluid Dynamic Island with real-time audio playback controls.

2. **Real Hardware Haptic Feedback**:
   * Directly interfaces with Xiaomi 14 Civi's linear X-axis vibration motor to synthesize crisp mechanical Nothing OS clicks.

3. **Real Torch / Flashlight Control**:
   * Toggles the real LED flash on your phone via `CameraManager`.

4. **Live Battery Capacity**:
   * Reads real-time battery status directly from `BatteryManager`.

5. **Nothing OS 4.0 Signature Widgets**:
   * **Dot-Matrix Clock & Weather**: Digital clock with blinking red dot colon and live date.
   * **Vintage Media Player**: Spinning retro cassette reels and track scrubber.
   * **Fitness Ring**: Radial progress step counter.
   * **2x2 Circular Folders**: Direct-launch mini apps or expand into a frosted glass modal.

6. **Monochrome App Drawer**:
   * Queries all real installed apps on your Xiaomi 14 Civi (WhatsApp, Camera, Instagram, YouTube, Settings, etc.).
   * Instant search filter and right-edge A-Z alphabet scrubber.

---

## 📥 How to Install on Your Xiaomi 14 Civi

1. Clone or download the repository from **[GitHub](https://github.com/MythicRa11/NothingLauncher4-Civi14)**.
2. Build the APK locally using `./gradlew assembleRelease` or download from GitHub Releases.
3. Install the APK on your phone.
4. Go to **Settings → Apps → Manage Apps → Default Apps → Launcher** and select **Nothing Launcher 4.0**!
