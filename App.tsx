import {AppState, BackHandler, SafeAreaView, StyleSheet} from 'react-native';
import {useEffect, useRef, useState} from "react";
import analytics from '@react-native-firebase/analytics';
import ExchangeWebView from "./ExchangeWebView";

export default function App() {
    const appState = useRef(AppState.currentState);
    const webViewRef = useRef(null);
    const INITIAL_URL = 'https://trade.dydx.exchange/portfolio/overview';

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
      <SafeAreaView style={styles.container}>
          <ExchangeWebView webViewRef={webViewRef}
                           source={{uri: INITIAL_URL}} >
          </ExchangeWebView>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c28'
  }
});
