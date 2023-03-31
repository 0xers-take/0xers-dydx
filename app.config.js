module.exports = ({ config }) => ({
    expo: {
        name: "0xers dydx",
        icon: "./assets/icon/512x512.png",
        slug: "0xers-dydx",
        owner: "0xers",
        android: {
            googleServicesFile: "./google-services-0xers-dydx.json",
            package: "zeroxers.takeon.dydx"
        },
        plugins: [
            "@react-native-firebase/app",
            "@react-native-firebase/perf",
            "@react-native-firebase/crashlytics"
        ],
        extra: {
            eas: {
                projectId: "5d1c9da4-07ed-42c8-aaf2-6893388dff53"
            }
        }
    }
});
