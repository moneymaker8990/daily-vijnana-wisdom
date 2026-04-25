# Native Release Runbook

Step-by-step for producing a signed, uploaded iOS build and a signed Android App Bundle for MindVanta.

## 0. Pre-flight

```bash
cd daily-vijnana-app
npm ci
npm run release:check:strict
```

Strict preflight must exit 0. If it does not, fix env values before proceeding — do not ship.

## 1. Bundle-ID drift warning (one-time decision)

There is currently an intentional drift:

| File | Identifier |
| --- | --- |
| [capacitor.config.ts](../capacitor.config.ts) | `app.mindvanta.main` |
| [ios/App/App.xcodeproj/project.pbxproj](../ios/App/App.xcodeproj/project.pbxproj) | `app.mindvanta.main` |
| [android/app/build.gradle](../android/app/build.gradle) | `com.mindvanta.app` |
| [APP_STORE_METADATA.md](../store-assets/APP_STORE_METADATA.md) | `app.mindvanta.main` |

**Before first submission**, pick ONE. Android and iOS bundle IDs do not have to match, and many apps keep them distinct. If you want them identical:

- Change `android/app/build.gradle` `namespace` and `applicationId` to `app.mindvanta.main`.
- Rename `android/app/src/main/java/com/mindvanta/app/` to `android/app/src/main/java/app/mindvanta/main/`.
- Update the package declaration inside those Java files.
- Run `npx cap sync android` and rebuild.

Once the first AAB is uploaded, the Android `applicationId` is frozen for the lifetime of the listing. Decide before upload.

## 2. Version bump

Whenever you cut a release candidate:

```bash
# Edit "version" in package.json, e.g. "1.0.0" -> "1.0.1"
npm run sync-versions -- --bump-build
npx cap sync ios
npx cap sync android
```

`sync-versions` writes `versionName` + `versionCode` into `android/app/build.gradle` and `MARKETING_VERSION` + `CURRENT_PROJECT_VERSION` into the Xcode project, keyed off `package.json`. With `--bump-build` it also increments the native build number (`versionCode` / `CURRENT_PROJECT_VERSION`).

## 3. Build web bundle + copy to native

```bash
npm run build
npx cap copy
```

Verify `daily-vijnana-app/dist/` contains fresh assets before continuing.

## 4. iOS — Xcode signing & archive

```bash
npx cap open ios
```

In Xcode:

1. Select the **App** target -> **Signing & Capabilities**:
   - Team: your Apple Developer team
   - Automatically manage signing: on
   - Bundle Identifier: `app.mindvanta.main`
2. **General** tab:
   - Version: `1.0.0`
   - Build: `1`
3. **Capabilities** (add if notifications used):
   - Push Notifications (requires APNs key from Apple Developer portal)
   - Background Modes -> Remote notifications
4. Select **Any iOS Device (arm64)** scheme.
5. **Product -> Archive**. Wait for archive to complete.
6. **Organizer -> Distribute App -> App Store Connect -> Upload**.

Apple's build processing can take 10-60 minutes. The build appears in App Store Connect -> TestFlight when ready.

## 5. Android — release keystore

**Create the keystore exactly once.** Losing it means the app can never be updated.

```bash
keytool -genkey -v \
  -keystore mindvanta-release.keystore \
  -alias mindvanta \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000
```

Store the keystore file AND its passwords in at least two secure locations (e.g. password manager + encrypted offline backup). **Do not commit to git.** The repo's [.gitignore](../.gitignore) should already cover `*.keystore`; verify before first build.

Configure Gradle to sign release builds. In `android/app/build.gradle`, inside `android { ... }` add (paths relative to the `android/` folder):

```gradle
signingConfigs {
    release {
        storeFile file("../mindvanta-release.keystore")
        storePassword System.getenv("MINDVANTA_KEYSTORE_PASSWORD")
        keyAlias "mindvanta"
        keyPassword System.getenv("MINDVANTA_KEY_PASSWORD")
    }
}
buildTypes {
    release {
        signingConfig signingConfigs.release
        minifyEnabled false
        proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
    }
}
```

Export the env vars before building:

```bash
export MINDVANTA_KEYSTORE_PASSWORD="..."
export MINDVANTA_KEY_PASSWORD="..."
```

## 6. Android — build signed AAB

```bash
npx cap open android
```

In Android Studio: **Build -> Generate Signed Bundle / APK -> Android App Bundle -> Release**. Or from CLI:

```bash
cd android
./gradlew bundleRelease
```

Output AAB: `android/app/build/outputs/bundle/release/app-release.aab`.

## 7. Push notifications (optional but required for reminders)

- iOS: create an APNs Authentication Key in Apple Developer portal, upload to Firebase (if using) or directly use in your push provider. Add `aps-environment=production` via Capabilities.
- Android: create a Firebase project, download `google-services.json`, place in `android/app/google-services.json`. The existing `build.gradle` already applies the plugin if the file is present.

## 8. Upload to stores

- iOS: handled by Xcode -> Distribute App in step 4.
- Android: Play Console -> your app -> **Production** (or internal/closed testing first) -> **Create new release** -> upload the AAB -> complete release notes -> **Review release** -> **Start rollout**.

## 9. Post-build sanity

Before submitting for review:

- [ ] Install the TestFlight build on a real iPhone; complete the core flows in [SMOKE_TEST_LOG.md](../store-assets/SMOKE_TEST_LOG.md).
- [ ] Install the Play internal track build on a real Android; complete the same flows.
- [ ] Trigger a real sandbox purchase on each; restore after reinstall.
- [ ] Confirm at least one Sentry event appears in the dashboard from the device build.
- [ ] Update [DEVICE_QA_MATRIX.md](../store-assets/DEVICE_QA_MATRIX.md) with the real device rows and flip sign-off to `GO`.

Only submit for review after all nine checks above are green.
