import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Alert,Image,ActivityIndicator } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import { FontAwesome, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { NavigationContainer, useTheme } from '@react-navigation/native';
import { useDispatch, useSelector } from "react-redux";
import { SCREENNAME, fonts, ic_heart, ic_shop, ic_store, ic_user } from '../../shared';
import colors from '../../shared/colors';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ShopScreen from '../Shop/ShopScreen';
import LoginScreen from '../Authentication/LoginScreen/LoginScreen';
import ForgetLogin from '../Authentication/LoginScreen/ForgetLogin';
import DrawerContent from '../Drawer/DrawerContent';
import ForgetPassword from '../Authentication/LoginScreen/ForgetLogin';
import CartScreen from '../Cart/CartScreen';
import DetailProductScreen from '../Shop/DetailProductScreen';
import PaymentScreen from '../Cart/PaymentScreen';
import DeliveryStatusScreen from '../Profile/OderHistory/Components/DeliveryStatusScreen';
import HistoryScreen from '../Profile/OderHistory/HistoryScreen';
import CheckoutWebviewScreen from '../Cart/Components/CheckoutWebviewScreen';
import ProfilePage from '../Profile/ProfilePage';
import ProfileScreen from '../Profile/ProfileScreen';
import EditProfileScreen from '../Profile/EditProfileScreen';
import MapWebviewScreen from '../Profile/OderHistory/Components/MapWebviewScreen';
import WishListScreen from '../Wishlist/WishListScreen';


const AppNavigation = () => {
    const Stack = createNativeStackNavigator();
    const Tab = createBottomTabNavigator();
    const Drawer = createDrawerNavigator();
    const token = useSelector((state: any) => state?.appReducer.token);
    console.log("Token: " + token)
    const tabbarIcon = (focus, icon, txtName) => {
        const tintColor = focus ? colors.orangeTabbar : colors.grayTabbar;
    
        return (
            <View style={styles.wrapIconTabbar}>
                <FontAwesome5 name={icon} size={24} color={tintColor} style={styles.wrapIcon} />
                {focus && <Text style={styles.txtTabbarFocus}>{txtName}</Text>}
                
            </View>
            
        );
    };
    
    const HomeStack = (() => {
        return <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    minHeight: 70,
                    justifyContent: "center",
                    alignItems: "center",
                    alignSelf: "center",
                    marginTop: 5
                }
            }}
        >
            <Tab.Screen
                name={SCREENNAME.SHOP_SCREEN}
                component={ShopScreen}
                options={{
                    tabBarLabel: "",
                    tabBarIcon: ({ focused }) => { return tabbarIcon(focused, 'shopping-bag', "Shop") }
                }}
            />
            <Tab.Screen
                name={SCREENNAME.CART_SCREEN}
                component={CartScreen}
                options={{
                    tabBarLabel: "",
                    tabBarIcon: ({ focused }) => { return tabbarIcon(focused, "shopping-cart", "Cart") }
                }}
            />
            {/* <Tab.Screen
                name={SCREENNAME.WISHLIST_SCREEN}
                component={WishListScreen}
                options={{
                    tabBarLabel: "",
                    tabBarIcon: ({ focused }) => { return tabbarIcon(focused, "list", "WishList") }
                }}
            /> */}
            <Tab.Screen
                name={SCREENNAME.PROFILE_SCREEN}
                component={ProfileScreen}
                options={{
                    tabBarLabel: "",
                    tabBarIcon: ({ focused }) => { return tabbarIcon(focused, "user", "Profile") }
                }}
            />
        </Tab.Navigator>
    })
    const HomeDrawer = (() => {
        return <Stack.Navigator
            initialRouteName={token.length === 0 ? SCREENNAME.LOGIN_SCREEN : SCREENNAME.HOME_STACK
            }>
            <Stack.Screen
                name={SCREENNAME.LOGIN_SCREEN}
                options={{ headerShown: false }}
                component={LoginScreen}
            />
            <Stack.Screen
                name={SCREENNAME.HOME_STACK}
                options={{ headerShown: false }}
                component={HomeStack}
            />
            <Stack.Screen
                name={SCREENNAME.DETAIL_PRODUCT_SCREEN}
                options={{ headerShown: false }}
                component={DetailProductScreen}
            />
            <Stack.Screen
                name={SCREENNAME.PROFILE_PAGE}
                options={{ headerShown: false }}
                component={ProfilePage}
            />
             <Stack.Screen
                name={SCREENNAME.EDIT_PROFILE_SCREEN}
                options={{ headerShown: false }}
                component={EditProfileScreen}
            />
            <Stack.Screen
                name={SCREENNAME.FORGOT_PASSWORD_SCREEN}
                options={{ headerShown: false }}
                component={ForgetPassword}
            />
            <Stack.Screen
                name={SCREENNAME.WEBVIEW_CHECKOUT_SCREEN}
                options={{ headerShown: false }}
                component={CheckoutWebviewScreen}
            />
             <Stack.Screen
                name={SCREENNAME.WEBVIEW_MAP_SCREEN}
                options={{ headerShown: false }}
                component={MapWebviewScreen}
            />
            <Stack.Screen
                name={SCREENNAME.HISTORY_SCREEN}
                options={{ headerShown: false }}
                component={HistoryScreen}
            />
            <Stack.Screen
                name={SCREENNAME.DELIVERY_STATUS_SCREEN}
                options={{ headerShown: false }}
                component={DeliveryStatusScreen}
            />
            <Stack.Screen
                name={SCREENNAME.PAYMENT_SCREEN}
                options={{ headerShown: false }}
                component={PaymentScreen}
            />
        </Stack.Navigator>
    })

    return (
        <NavigationContainer>
            <Drawer.Navigator
                initialRouteName={SCREENNAME.HOME_DRAWER}
                drawerContent={props => <DrawerContent />}>
                <Drawer.Screen
                    options={{ headerShown: false }}
                    name={"Homepage"}
                    component={HomeDrawer}
                />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}
export default AppNavigation
const styles = StyleSheet.create({
    container: {
    },
    tabbarStyle: {
        height: 90
    },
    wrapIconTabbar: {
        justifyContent: "center",
        flex: 1,
        alignItems: "center"
    },
    wrapIcon: {
        height: 25,
        aspectRatio: 1,
        justifyContent: "center",
    },
    txtTabbarFocus: {
        fontSize: fonts.font16,
        color: colors.orangeTabbar,
    },
    wrapTabbar: {
        height: 60,
        padding: 12,
        margin: 12,
        borderRadius: 10
    }
});
