const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const defaultConfig = getDefaultConfig(__dirname);

// Ensure .cjs is included in the resolver
defaultConfig.resolver.sourceExts.push("cjs");

// Add NativeWind configuration
const config = withNativeWind(defaultConfig, { input: "./global.css" });

module.exports = config;
