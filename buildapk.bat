del myapp.apk
del my-release-key.keystore
cordova build --release android
"\Program Files\Java\jdk1.8.0_60\bin\keytool.exe" -genkey -v -keystore my-release-key.keystore -alias alias_name -keyalg RSA -keysize 2048 -validity 10000 
"\Program Files\Java\jdk1.8.0_60\bin\jarsigner.exe" -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore platforms\android\build\outputs\apk\android-release-unsigned.apk alias_name 
"\Program Files (x86)\Android\android-sdk\build-tools\23.0.0\zipalign.exe" -v 4 platforms\android\build\outputs\apk\android-release-unsigned.apk myapp.apk 
