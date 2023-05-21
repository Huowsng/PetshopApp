import React from 'react';
import { View } from 'react-native';
import store from "./src/redux/store/store"
import { Provider } from 'react-redux';
import LoginScreen from './src/screens/Authentication/LoginScreen/LoginScreen';
import AppHeader from './src/screens/Header/AppHeader';
import { NavigationContainer } from "@react-navigation/native";
import ShopScreen from './src/screens/Shop/ShopScreen';
import ItemProduct from './src/screens/Shop/Components/ItemProduct';
import AppNavigation from './src/screens/Navigation/AppNavigation';
import DrawerScreen from './src/screens/Drawer/DrawerScreen';
import DrawerContent from './src/screens/Drawer/DrawerContent';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import CartComponent from './src/screens/Cart/Components/CartComponents';
import CartScreen from './src/screens/Cart/CartScreen';
import DetailProductScreen from './src/screens/Shop/DetailProductScreen';
import HomeScreen from './src/screens/Home/HomeScreen';




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