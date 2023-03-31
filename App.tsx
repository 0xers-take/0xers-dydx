import {AppState, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import { WebView } from 'react-native-webview';
import {useEffect, useRef} from "react";
import analytics from '@react-native-firebase/analytics';

export default function App() {
    const appState = useRef(AppState.currentState);

    useEffect(() => {
        const subscription = AppState.addEventListener('change', nextAppState => {
            if (
                appState.current.match(/inactive|background/) &&
                nextAppState === 'active'
            ) {
                analytics().logEvent('APP_ACTIVE')
            } else if (appState.current.match(/inactive|active/) &&
                nextAppState === 'background') {
                analytics().logEvent('APP_SENT_TO_BACKGROUND')
            } else if (appState.current.match(/active|background/) &&
                nextAppState === 'inactive') {
                analytics().logEvent('APP_EXITED')
            }
        });

        return () => {
            subscription.remove();
        };
    }, []);

  return (
      <SafeAreaView style={{flex: 1}}>
        <WebView
            style={styles.container}
            source={{ uri: 'https://trade.dydx.exchange/' }}
        />
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c28',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
