import React from 'react';
import { View } from 'react-native';
import store from "./src/redux/store/store"
import { Provider } from 'react-redux';
import AppNavigation from './src/screens/Navigation/AppNavigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';





export default function App() {
  return (
    <Provider store={store}>
      {/* <NavigationContainer> */}
        <SafeAreaProvider>
        < AppNavigation/>
        </SafeAreaProvider> 
        {/* </NavigationContainer> */}
        
    </Provider>
  );
}