import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Alert,Image,ActivityIndicator } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { useDispatch } from "react-redux";
import colors from '../../shared/colors';
import { ic_app_logo, ic_menu } from '../../shared';
const appAppHeader = () => {
    return (
        <AppNavbar />
    );
} 
export default appAppHeader
const AppNavbar = () => {
    return (
        <View style={styles.wrapHeader}>
      <Image
        source={ic_app_logo}
        resizeMode="contain"
        style={styles.wrapLogo}
      />
      {/* <TouchableOpacity onPress={openDrawer}>
        <Image
          source={ic_menu}
          resizeMode="contain"
          style={styles.wrapMenu}
        />
      </TouchableOpacity> */}
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
        padding: 20,
        backgroundColor: colors.cyan,
        height: 80,
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