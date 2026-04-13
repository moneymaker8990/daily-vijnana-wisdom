# MindVanta App Store Submission Checklist

## Pre-Submission Tasks

### Review Evidence
- [x] Review evidence pack prepared (`store-assets/REVIEW_EVIDENCE_PACK.md`)
- [x] Device QA matrix completed (`store-assets/DEVICE_QA_MATRIX.md`)
- [x] Smoke test log completed (`store-assets/SMOKE_TEST_LOG.md`)

### Developer Accounts
- [ ] Apple Developer Account ($99/year) - https://developer.apple.com
- [ ] Google Play Developer Account ($25 one-time) - https://play.google.com/console

### Icons & Graphics
- [x] Generate PNG icons (run `npm install sharp && node scripts/generate-icons.cjs`)
- [ ] Create feature graphic for Google Play (1024x500 PNG)
- [x] Verify iOS app icon (1024x1024 PNG)
- [x] Verify Android adaptive icon layers

### Screenshots
- [x] iPhone 6.7" screenshots (1290x2796) - 6 images
- [x] iPhone 6.5" screenshots (1242x2688) - 6 images
- [ ] iPad Pro screenshots (2048x2732) - 6 images (optional but recommended)
- [x] Android phone screenshots (1080x1920+) - 6 images
- [ ] Android tablet screenshots (optional)

### Legal
- [x] Privacy Policy (public/privacy-policy.html)
- [x] Terms of Service (public/terms-of-service.html)
- [x] Host legal pages at public URL (https://mindvanta.io/privacy-policy.html and https://mindvanta.io/terms-of-service.html)

### App Configuration
- [x] Version number set to 1.0.0
- [x] Bundle ID finalized (app.mindvanta.main)
- [x] App name confirmed (MindVanta)
- [x] Android permissions configured
- [x] PWA manifest updated

---

## iOS App Store Submission

### Xcode Setup
- [ ] Open `ios/App/App.xcworkspace` in Xcode
- [ ] Set Team (your Apple Developer account)
- [ ] Set Bundle Identifier to `app.mindvanta.main`
- [ ] Set Version to `1.0.0` and Build to `1`
- [ ] Configure signing certificates

### Build & Archive
```bash
# Sync Capacitor
npx cap sync ios

# Open in Xcode
npx cap open ios

# In Xcode: Product > Archive
# Then: Distribute App > App Store Connect
```

### App Store Connect
- [ ] Create new app in App Store Connect
- [ ] Fill in app metadata (see APP_STORE_METADATA.md)
- [ ] Upload screenshots
- [ ] Set pricing (Free with In-App Purchases)
- [ ] Configure age rating
- [ ] Add privacy policy URL
- [ ] Submit for review

---

## Google Play Store Submission

### Build Signed APK/AAB
```bash
# Sync Capacitor
npx cap sync android

# Open in Android Studio
npx cap open android

# Build > Generate Signed Bundle/APK
# Choose Android App Bundle (AAB)
# Create new keystore or use existing
```

### Keystore Management
- [ ] Create release keystore (KEEP THIS SAFE!)
```bash
keytool -genkey -v -keystore mindvanta-release.keystore -alias mindvanta -keyalg RSA -keysize 2048 -validity 10000
```
- [ ] Store keystore securely (never commit to git!)
- [ ] Document keystore password securely

### Google Play Console
- [ ] Create new app in Play Console
- [ ] Complete app content questionnaire
- [ ] Fill in store listing (see APP_STORE_METADATA.md)
- [ ] Upload screenshots and feature graphic
- [ ] Set content rating
- [ ] Configure pricing & distribution
- [ ] Upload AAB to production track
- [ ] Submit for review

---

## Post-Submission

### After Approval
- [ ] Announce launch on social media
- [ ] Verify analytics dashboard events are flowing
- [ ] Monitor crash reports
- [ ] Respond to user reviews

### Future Updates
- [ ] Increment version for updates
- [ ] Document changes in release notes
- [ ] Test thoroughly before each release

---

## Important Notes

### Keystore Security
**CRITICAL**: Never lose your Android keystore! You cannot update your app without it.
- Store in a secure location (password manager, encrypted drive)
- Make backups in multiple locations
- Document the passwords securely

### Review Times
- Apple App Store: Usually 24-48 hours
- Google Play: Usually 1-3 days for first submission

### Common Rejection Reasons
1. Missing privacy policy
2. App crashes on launch
3. Misleading screenshots
4. Incomplete metadata
5. Permission usage not explained

### Testing Before Submission
```bash
# Build and test locally
npm run build
npx cap sync

# Test on real devices (not just simulators!)
npx cap run ios
npx cap run android
```
