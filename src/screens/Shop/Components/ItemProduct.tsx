import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Alert,Image,ActivityIndicator } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, useTheme } from '@react-navigation/native';
import { useDispatch } from "react-redux";
import { IProductprops, SCREENNAME, fonts, ic_dot_orange, ic_heart } from '../../../shared';
import colors from '../../../shared/colors';

const ItemProduct = ({ item }: IProductprops) => {
    const navigation = useNavigation<any>();
    // const router = useRoute();
    const name = item?.title;

    const price = item?.price;
    const image = item?.images?.url;
    return (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(SCREENNAME.DETAIL_PRODUCT_SCREEN, {
              productID: item._id,
            });
          }}
          style={styles.container}
        >
          <View style={styles.wrapIcon}>
            <Image
              source={ic_dot_orange}
              style={styles.imgIcon}
              resizeMode="contain"
            />
            <Ionicons
                name="heart"
                 ize={24}
                color="red"
                />
        
          </View>
          <Image
            style={styles.wrapProductImage}
            source={{ uri: image }}

            resizeMode="center"
          />
          <View style={styles.wrapDetail}>
            <View style={styles.wrapTxtDetail}>
              <Text style={styles.txtPrice}>{`$ ${item?.price ?? '20000'}`}</Text>  
              <Text numberOfLines={2} style={styles.txtName}>
                {name}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      );
}
export default ItemProduct
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        borderRadius: 10,
        borderWidth: 2,
        borderColor: colors.gray_bg,
        margin: 10,
        backgroundColor: colors.white
    },
    imgIcon: {
        height: 24,
        aspectRatio: 1,
    },
    wrapIcon: {
        flexDirection: "row",
        padding: 20,
        justifyContent: "space-between",
        alignItems: "center",
        alignContent: "center",
    },
    wrapProductImage: {
        height: 160,
        aspectRatio: 1,
        margin: 20,
        borderRadius: 100
    },
    wrapDetail: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around"
    },
    txtName: {
        fontSize: fonts.font18,
        color: colors.cyan_text,
        marginHorizontal: 10,
        marginBottom: 4
    },
    wrapTxtDetail: {
        flexDirection: "column",
        alignItems: "flex-start",
        flex: 1,
    },
    txtPrice: {
        fontSize: fonts.font22,
        color: colors.red,
        fontWeight: "bold",
        marginHorizontal: 10
    },
});
