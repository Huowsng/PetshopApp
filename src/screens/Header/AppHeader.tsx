import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Alert,Image,ActivityIndicator, Pressable } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { DrawerActions, useNavigation, useTheme } from '@react-navigation/native';
import { useDispatch } from "react-redux";
import colors from '../../shared/colors';
import { SCREENNAME, ic_app_logo, ic_menu } from '../../shared';
const appAppHeader = () => {
    return (
        <AppNavbar />
    );
} 
export default appAppHeader
const AppNavbar = () => {
  const navigation = useNavigation();

    return (
      <View style={styles.wrapHeader}>
        <Image
          source={ic_app_logo}
          resizeMode="contain"
          style={styles.wrapLogo}
        />
        <Pressable onPress={() => navigation.navigate(SCREENNAME.CART_SCREEN)}>
            <FontAwesome5 name="shopping-cart" size={26} color="black" />
        </Pressable>     
        <Pressable onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <Ionicons name="menu" size={40} color="black" />
        </Pressable>
    </View>
      );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    wrapHeader: {      
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 30,
        backgroundColor: "#3f3f52",
        height: 145,
    },
    wrapLogo: {
        height: 38,
        width: 165,
        aspectRatio: 1
    },
    wrapMenu: {
        height: 25,
        aspectRatio: 1,
    },
});