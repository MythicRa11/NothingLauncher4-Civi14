# ProGuard & R8 Security & Anti-Tamper Hardening
# Prevents reverse engineering, strips debug telemetry, and secures bridge

-assumenosideeffects class android.util.Log {
    public static boolean isLoggable(java.lang.String, int);
    public static int v(...);
    public static int d(...);
    public static int i(...);
    public static int w(...);
    public static int e(...);
}

# Secure JavaScript Interface methods
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}

# Preserve main activity and bridge integrity
-keep class com.mythic.nothinglauncher.civi14.MainActivity { *; }
-keep class com.mythic.nothinglauncher.civi14.MainActivity$SecureLauncherBridge { *; }
