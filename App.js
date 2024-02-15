import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import NewsList from '/NewsList';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <NewsList />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;