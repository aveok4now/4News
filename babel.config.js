module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  // "react-native-sqlite-storage": {
  //   platforms: {
  //     android: {
  //       sourceDir:
  //         "../node_modules/react-native-sqlite-storage/platforms/android-native",
  //       packageImportPath: "import io.liteglue.SQLitePluginPackage;",
  //       packageInstance: "new SQLitePluginPackage()"
  //     }
  //   }
  // }
  plugins: [
    'react-native-reanimated/plugin',
  ]
};
