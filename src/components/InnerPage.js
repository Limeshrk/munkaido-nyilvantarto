import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import HistoryPage from './HistoryPage';
import StatusPage from './StatusPage';

const Stack = createNativeStackNavigator();

// prop drilling problem: https://kentcdodds.com/blog/prop-drilling
const InnerPage = ({ userData, setUserData }) => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Munkaidő Nyilvántartó">
          {navigatorProps => (
            <StatusPage {...navigatorProps} setUserData={setUserData} userData={userData} />
          )}
        </Stack.Screen>
        <Stack.Screen name="Napló">
          {navigatorProps => <HistoryPage {...navigatorProps} userData={userData} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default InnerPage;
