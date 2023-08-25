module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ["module:react-native-dotenv"],
    'react-native-reanimated/plugin',
    ["module-resolver", {
      alias: {
        src: "./src",
        app: "./app",
        types: "./types",
        assets: "./assets"
      }
    }],
    // ["@babel/plugin-transform-private-property-in-object", { "loose": true }]
  ]
};
