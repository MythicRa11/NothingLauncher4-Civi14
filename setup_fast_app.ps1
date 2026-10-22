# Setup FastAndroidApp template files
$baseDir = "C:\Users\Pratik\FastAndroidApp"

# 1. settings.gradle.kts
$settingsGradle = @"
pluginManagement {
    repositories {
        google()
        mavenCentral()
        gradlePluginPortal()
    }
}
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()
    }
}
rootProject.name = "FastAndroidApp"
include(":app")
"@
[System.IO.File]::WriteAllText("$baseDir\settings.gradle.kts", $settingsGradle)

# 2. build.gradle.kts (root)
$rootBuildGradle = @"
plugins {
    id("com.android.application") version "8.5.2" apply false
    id("org.jetbrains.kotlin.android") version "2.0.21" apply false
}
"@
[System.IO.File]::WriteAllText("$baseDir\build.gradle.kts", $rootBuildGradle)

# 3. gradle.properties
$gradleProperties = @"
org.gradle.jvmargs=-Xmx4096m -XX:+UseParallelGC -Dfile.encoding=UTF-8
org.gradle.parallel=true
org.gradle.caching=true
org.gradle.configuration-cache=true
android.useAndroidX=true
android.nonTransitiveRClass=true
kotlin.code.style=official
"@
[System.IO.File]::WriteAllText("$baseDir\gradle.properties", $gradleProperties)

# 4. app/build.gradle.kts
$appBuildGradle = @"
plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
}

android {
    namespace = "com.mythic.fastapp"
    compileSdk = 34

    defaultConfig {
        applicationId = "com.mythic.fastapp"
        minSdk = 26
        targetSdk = 34
        versionCode = 1
        versionName = "1.0.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
    kotlinOptions {
        jvmTarget = "17"
    }
    buildFeatures {
        viewBinding = true
    }
}

dependencies {
    implementation("androidx.core:core-ktx:1.13.1")
    implementation("androidx.appcompat:appcompat:1.7.0")
    implementation("com.google.android.material:material:1.12.0")
    implementation("androidx.constraintlayout:constraintlayout:2.1.4")
}
"@
[System.IO.File]::WriteAllText("$baseDir\app\build.gradle.kts", $appBuildGradle)

# 5. app/src/main/AndroidManifest.xml
$manifest = @"
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.NothingDark">
        <activity
            android:name=".MainActivity"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>

</manifest>
"@
[System.IO.File]::WriteAllText("$baseDir\app\src\main\AndroidManifest.xml", $manifest)

# 6. app/src/main/res/values/strings.xml
$strings = @"
<resources>
    <string name="app_name">Nothing FastApp</string>
    <string name="title_hero">NOTHING OS // KOTLIN</string>
    <string name="subtitle_hero">Universal High-Performance Android Architecture</string>
    <string name="btn_test">EXECUTE BENCHMARK</string>
    <string name="card_specs_title">HARDWARE ACCELERATION</string>
</resources>
"@
[System.IO.File]::WriteAllText("$baseDir\app\src\main\res\values\strings.xml", $strings)

# 7. app/src/main/res/values/colors.xml
$colors = @"
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="black">#FF000000</color>
    <color name="white">#FFFFFFFF</color>
    <color name="nothing_red">#FFD71921</color>
    <color name="card_bg">#FF18181A</color>
    <color name="card_border">#FF2A2A2D</color>
    <color name="text_secondary">#FFA0A0A5</color>
</resources>
"@
[System.IO.File]::WriteAllText("$baseDir\app\src\main\res\values\colors.xml", $colors)

# 8. app/src/main/res/values/themes.xml
$themes = @"
<resources>
    <style name="Theme.NothingDark" parent="Theme.Material3.Dark.NoActionBar">
        <item name="android:statusBarColor">@color/black</item>
        <item name="android:navigationBarColor">@color/black</item>
        <item name="android:windowBackground">@color/black</item>
        <item name="colorPrimary">@color/white</item>
        <item name="colorSecondary">@color/nothing_red</item>
    </style>
</resources>
"@
[System.IO.File]::WriteAllText("$baseDir\app\src\main\res\values\themes.xml", $themes)

# 9. app/src/main/res/layout/activity_main.xml
$layout = @"
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:background="@color/black"
    android:padding="24dp">

    <TextView
        android:id="@+id/tvHeader"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="32dp"
        android:text="@string/title_hero"
        android:textColor="@color/white"
        android:textSize="22sp"
        android:textStyle="bold"
        android:letterSpacing="0.08" />

    <TextView
        android:id="@+id/tvSubHeader"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="4dp"
        android:text="@string/subtitle_hero"
        android:textColor="@color/text_secondary"
        android:textSize="13sp" />

    <androidx.cardview.widget.CardView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginTop="28dp"
        android:backgroundTint="@color/card_bg">

        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:orientation="vertical"
            android:padding="20dp">

            <TextView
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:text="DEVICE TELEMETRY"
                android:textColor="@color/nothing_red"
                android:textSize="12sp"
                android:textStyle="bold"
                android:letterSpacing="0.05" />

            <TextView
                android:id="@+id/tvDeviceModel"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:layout_marginTop="8dp"
                android:text="Detecting Device..."
                android:textColor="@color/white"
                android:textSize="16sp"
                android:textStyle="bold" />

            <TextView
                android:id="@+id/tvOsDetails"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:layout_marginTop="4dp"
                android:text="Android 14 // Architecture arm64-v8a"
                android:textColor="@color/text_secondary"
                android:textSize="13sp" />

        </LinearLayout>
    </androidx.cardview.widget.CardView>

    <Button
        android:id="@+id/btnAction"
        android:layout_width="match_parent"
        android:layout_height="56dp"
        android:layout_marginTop="24dp"
        android:backgroundTint="@color/white"
        android:text="@string/btn_test"
        android:textColor="@color/black"
        android:textStyle="bold"
        android:letterSpacing="0.05" />

    <TextView
        android:id="@+id/tvLog"
        android:layout_width="match_parent"
        android:layout_height="0dp"
        android:layout_weight="1"
        android:layout_marginTop="20dp"
        android:background="@color/card_bg"
        android:padding="16dp"
        android:textColor="@color/white"
        android:textSize="12sp"
        android:fontFamily="monospace"
        android:text="Ready for Kotlin execution..." />

</LinearLayout>
"@
[System.IO.File]::WriteAllText("$baseDir\app\src\main\res\layout\activity_main.xml", $layout)

# 10. app/src/main/java/com/mythic/fastapp/MainActivity.kt
$mainActivityKt = @"
package com.mythic.fastapp

import android.os.Build
import android.os.Bundle
import android.widget.Button
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val tvDeviceModel = findViewById<TextView>(R.id.tvDeviceModel)
        val tvOsDetails = findViewById<TextView>(R.id.tvOsDetails)
        val tvLog = findViewById<TextView>(R.id.tvLog)
        val btnAction = findViewById<Button>(R.id.btnAction)

        val model = Build.MODEL ?: "Android Device"
        val manufacturer = Build.MANUFACTURER ?: "OEM"
        val sdk = Build.VERSION.SDK_INT
        val release = Build.VERSION.RELEASE

        tvDeviceModel.text = "$manufacturer $model"
        tvOsDetails.text = "Android $release (API $sdk) // ${Build.SUPPORTED_ABIS.firstOrNull() ?: "arm64-v8a"}"

        var counter = 0
        btnAction.setOnClickListener {
            counter++
            val time = System.currentTimeMillis()
            val logEntry = "[EXEC #$counter] Kotlin Runtime Active @ ${time}ms\n- Memory: Free ${Runtime.getRuntime().freeMemory() / 1024 / 1024}MB / Max ${Runtime.getRuntime().maxMemory() / 1024 / 1024}MB\n- Nothing Style Engine: Active\n\n"
            tvLog.text = logEntry + tvLog.text
        }
    }
}
"@
[System.IO.File]::WriteAllText("$baseDir\app\src\main\java\com\mythic\fastapp\MainActivity.kt", $mainActivityKt)

# 11. build_and_run.ps1
$buildAndRunScript = @"
`$ErrorActionPreference = "Stop"
`$gradle = "C:\Users\Pratik\AndroidDevTools\gradle\gradle-8.10.2\bin\gradle.bat"
`$env:ANDROID_HOME = "C:\Users\Pratik\AndroidDevTools\android-sdk"
`$env:JAVA_HOME = "C:\Program Files\Microsoft\jdk-17.0.20.101-hotspot"

Write-Host "Building FastAndroidApp with Gradle..."
& `$gradle assembleDebug

`$apk = "app\build\outputs\apk\debug\app-debug.apk"
if (Test-Path `$apk) {
    Write-Host "Installing to connected phone via ADB..."
    adb install -r `$apk
    Write-Host "Launching MainActivity..."
    adb shell am start -n com.mythic.fastapp/.MainActivity
    Write-Host "Done!"
} else {
    Write-Error "APK not found at `$apk"
}
"@
[System.IO.File]::WriteAllText("$baseDir\build_and_run.ps1", $buildAndRunScript)

Write-Host "FastAndroidApp setup files written successfully."
