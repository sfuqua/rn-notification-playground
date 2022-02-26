/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useCallback, useEffect, useState } from "react";
import {
    Button,
    Clipboard,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    useColorScheme,
    View,
} from "react-native";

import messaging from "@react-native-firebase/messaging";

import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from "react-native/Libraries/NewAppScreen";

const Section: React.FC<{
    title: string;
}> = ({ children, title }) => {
    const isDarkMode = useColorScheme() === "dark";
    return (
        <View style={styles.sectionContainer}>
            <Text
                style={[
                    styles.sectionTitle,
                    {
                        color: isDarkMode ? Colors.white : Colors.black,
                    },
                ]}
            >
                {title}
            </Text>
            <Text
                style={[
                    styles.sectionDescription,
                    {
                        color: isDarkMode ? Colors.light : Colors.dark,
                    },
                ]}
            >
                {children}
            </Text>
        </View>
    );
};

const App = () => {
    const isDarkMode = useColorScheme() === "dark";

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    const [fcmToken, setFcmToken] = useState<string | null>(null);

    useEffect(() => {
        const unsubscribe = messaging().onMessage(async (remoteMessage) => {
            console.log("A new FCM message arrived!", JSON.stringify(remoteMessage));
        });

        return unsubscribe;
    }, []);

    useEffect(() => {
        const unsubscribe = messaging().onTokenRefresh(async (token) => {
            console.log(`New FCM token: ${token}`);
            setFcmToken(token);
        });

        return unsubscribe;
    }, []);

    useEffect(() => {
        (async function () {
            const token = await messaging().getToken();
            console.log(`Initial FCM token: ${token}`);
            setFcmToken(token);
        })();
    }, []);

    const onCopyTokenPress = useCallback(() => {
        if (fcmToken) {
            Clipboard.setString(fcmToken);
        }
    }, [fcmToken]);

    return (
        <SafeAreaView style={backgroundStyle}>
            <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
            <ScrollView contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
                <Header />
                <View
                    style={{
                        backgroundColor: isDarkMode ? Colors.black : Colors.white,
                    }}
                >
                    <Text style={styles.sectionDescription}>FCM Token:</Text>
                    <TextInput
                        style={{ flex: 1 }}
                        value={fcmToken ?? undefined}
                        placeholder="FCM token will go here"
                        multiline={true}
                    />
                    <Button title="Copy token" disabled={!fcmToken} onPress={onCopyTokenPress} />

                    <Section title="Step One">
                        Edit <Text style={styles.highlight}>App.tsx</Text> to change this screen and then come back to
                        see your edits.
                    </Section>
                    <Section title="See Your Changes">
                        <ReloadInstructions />
                    </Section>
                    <Section title="Debug">
                        <DebugInstructions />
                    </Section>
                    <Section title="Learn More">Read the docs to discover what to do next:</Section>
                    <LearnMoreLinks />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: "600",
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: "400",
    },
    highlight: {
        fontWeight: "700",
    },
});

export default App;
