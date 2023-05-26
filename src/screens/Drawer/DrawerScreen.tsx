import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Alert,Image,ActivityIndicator } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { useDispatch } from "react-redux";
const DrawerScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Drawer Screen</Text>
        </View>
    );
}
export default DrawerScreen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
        
    },
});