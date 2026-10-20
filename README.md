# Nothing OS 4.0 Launcher — Xiaomi 14 Civi Edition

A pixel-perfect, interactive recreation of the **Nothing OS 4.0 Launcher** specifically engineered and scaled for the **Xiaomi 14 Civi** (Civi 14) Android smartphone.

![Nothing OS 4.0 Civi 14 Wallpaper](assets/wallpaper.jpg)

---

## 📱 Hardware & Display Specifications (Xiaomi 14 Civi)

* **Display Profile**: 6.55" 1.5K AMOLED (1236 x 2750), 20:9 aspect ratio, 120Hz refresh rate.
* **Front Camera System**: Center **Dual-Pill Punch Hole** (32 MP Wide + 32 MP Ultrawide).
* **Industrial Design**: Floating quad-curved front glass with symmetric micro-bezels.

---

## ⚡ Nothing OS 4.0 Signature Features

### 1. Interactive Dual-Pill Dynamic Island
* Seamlessly fits around the Xiaomi 14 Civi's pill-shaped dual camera cutout.
* **Tap to Expand**: Expands into Nothing's fluid **Dynamic Island** with animated sound waves, track details, and quick controls.

### 2. Dot-Matrix Typography & Live Widgets
* **NDot Clock & Weather**: Live digital clock with red blinking dot-matrix colon, live date, and weather conditions.
* **Vintage Media Player**: Retro dual cassette reels with real-time spinning animation, track title scrubber, and audio visualizer.
* **Fitness Ring Widget**: Circular progress ring showing live step counts towards the 10,000-step goal.
* **Quick Toggles**: Circular glyph buttons for Torch (with full screen flashlight overlay), Wi-Fi, Bluetooth, and Dark/Light mode with glowing red LED status dots.

### 3. Nothing 2x2 Circular Folders
* Iconic circular folder design from Nothing OS 4.0.
* **Direct-Launch**: Tap any of the 4 mini app glyphs to launch instantly without opening the folder.
* **Enlarged Suite**: Tap the folder backdrop to open the full-screen frosted glass suite modal.

### 4. Slide-Up Monochrome App Drawer
* Vertical fluid scrolling with 24+ monochrome Nothing OS-style glyph icons.
* Instant live search filtering.
* Quick A-Z alphabetical jump scrubber on the right rail.

### 5. Procedural Mechanical Audio Haptics
* Uses the **Web Audio API** to generate tactile, mechanical clicks for taps, toggles, and drawer actions (can be muted via the top controls bar).

---

## 🚀 Running the Project

You can run the launcher directly in any web browser:

1. **Option A (Instant Open)**:
   Double-click `index.html` to open in your default browser.

2. **Option B (PowerShell Static Server)**:
   ```powershell
   powershell.exe -ExecutionPolicy Bypass -File .\server.ps1
   ```
   Then open `http://localhost:8080/`.

---

## 📂 Project Structure

```text
NothingLauncher4_Civi14/
├── index.html        # Main launcher structure & Civi 14 chassis
├── style.css         # Nothing OS 4.0 design system & animations
├── app.js            # Widget logic, audio haptics & interactions
├── server.ps1        # Built-in lightweight HTTP server
├── README.md         # Documentation & specs
└── assets/
    └── wallpaper.jpg # High-resolution Nothing 4.0 OLED wallpaper
```
