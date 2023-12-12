import React from 'react';
import { WebView } from 'react-native-webview';

const NewsViewer = ({ navigation, route }) => {
  const { url } = route.params;
  return <WebView source={{ uri: url }} style={{ flex: 1 }} />;
};

export default NewsViewer;
