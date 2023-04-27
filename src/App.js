import React, { useState, useEffect } from 'react';

import { loginStatus } from './auth';
import InnerPage from './components/InnerPage';
import LoginPage from './components/LoginPage';
import { getUserDataByEmail } from './database';

const App = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const getUserData = async () => {
    const storedUser = await loginStatus();
    if (storedUser) {
      console.log('restored user from async storage: ', storedUser.email);
      const userData = await getUserDataByEmail(storedUser.email);
      if (!userData) return;
      console.log(`${userData.name} is loaded from the remote database`);
      setUserData(userData);
    }
  };

  useEffect(() => {
    getUserData()
      .then(() => setLoading(false))
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  if (userData === null) {
    return loading ? null : <LoginPage setUserData={setUserData} />;
  }
  return loading ? null : <InnerPage setUserData={setUserData} userData={userData} />;
};

export default App;
