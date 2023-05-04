import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { signOutUser } from '../auth';

const SettingsPage = ({ userData, setUserData }) => {
  const handleLogout = async () => {
    await signOutUser();
    setUserData(null);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Kijelentkezés</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
    flex: 1,
  },
  button: {
    margin: 50,
    alignSelf: 'stretch',
    textAlign: 'center',
    paddingVertical: '5%',
    paddingHorizontal: '7%',
    borderRadius: 20,
    color: 'blue',
    backgroundColor: '#0091ff',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 15,
    color: 'white',
  },
});

export default SettingsPage;
