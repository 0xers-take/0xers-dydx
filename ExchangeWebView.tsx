import React, {useState} from 'react';
import WebView from 'react-native-webview';
import {ActivityIndicator, Dimensions, StyleSheet, Text, View} from 'react-native';

const styles = StyleSheet.create({
    view: {flex: 1, height: '100%'}
});

const ExchangeWebView = ({webViewRef, ...webViewProps}) => {
    const [height] = useState(Dimensions.get('screen').height);
    const [isLoading, setLoading] = useState(false);

    const loadingStarted = () => {
        setLoading(true);
    }

    const loadingStopped = () => {
        setLoading(false);
    }

    return (
        <>
            <WebView
                {...webViewProps}
                ref={webViewRef}
                onLoad={loadingStopped}
                onLoadStart={loadingStarted}
                style={[styles.view, {height}, webViewProps.style]}
            />
        </>
    );
};

export default ExchangeWebView;
