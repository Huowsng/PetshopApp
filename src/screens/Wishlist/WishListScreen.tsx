import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Alert,Image,ActivityIndicator, FlatList, RefreshControl } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { useDispatch } from "react-redux";
import colors from '../../shared/colors';
import { IProduct, IProductWishList, IProductprops, cat, fonts, ic_empty, ic_search } from '../../shared';
import DropDownPicker from "react-native-dropdown-picker";
import AppHeader from '../Header/AppHeader';
import WishListComponent from './Component/WishListComponent';


  
  interface IProductWishListParams {
    item: IProductWishList;
  }
  
const WishListScreen = () => {
    const listProduct = [
        {
          image: require('../../assets/images/cat_demo.jpg'),
          title: "Cat's Best Original Cat litter",
          price: 20000,
          status: true
        },
        {
          image: require('../../assets/images/cat_demo.jpg'),
          title: "Cat's Best Original Cat litter",
          price: 20000,
          status: false
        },
        // ...rest of the items
      ];
    const [total, setTotal] = React.useState<number>(0);
    const keyExtractor = React.useCallback((item: any, index: any) => `${item} ${index}`, []);
  
    return (
      <View style={{ flex: 1 }}>
        <AppHeader />
        <View style={styles.container}>
          <FlatList
            renderItem={({ item }) => (
              <WishListComponent item={item} />
            )}
            data={listProduct}
            keyExtractor={keyExtractor}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    );
  };
export default WishListScreen
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flex: 1,
        padding: 20,
    },
    wrapCheckout: {
        height: 50,
        backgroundColor: colors.cyan,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center"
    },
    txtCheckout: {
        fontSize: fonts.font20,
        fontWeight: "500",
        color: colors.white
    }
});
