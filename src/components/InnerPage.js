import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import HistoryPage from './HistoryPage';
import SettingsPage from './SettingsPage';
import StatusPage from './StatusPage';
import { updateUserState } from '../database';

const Stack = createNativeStackNavigator();

// prop drilling problem: https://kentcdodds.com/blog/prop-drilling
const InnerPage = ({ userData, setUserData }) => {
  const toggleSwitch = () => {
    let newState = '';
    if (userData.currentState === 'in') {
      newState = 'out';
    } else {
      newState = 'in';
    }
    setUserData({ ...userData, currentState: newState });
    updateUserState(userData.email, newState);
    //historyt nem kell mindig frissiteni  amikor a kapcsolo állapota változik (maradt a StatusPage-en)
    return newState; //tovább kell vinni hogy az uj mi állapot (kell a history iráshoz)
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Munkaidő Nyilvántartó">
          {navigatorProps => (
            <StatusPage
              {...navigatorProps}
              setUserData={setUserData}
              userData={userData}
              toggleSwitch={toggleSwitch}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Napló">
          {navigatorProps => (
            <HistoryPage {...navigatorProps} userData={userData} toggleSwitch={toggleSwitch} />
          )}
        </Stack.Screen>
        <Stack.Screen name="Beállítások">
          {navigatorProps => (
            <SettingsPage {...navigatorProps} setUserData={setUserData} userData={userData} />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default InnerPage;
