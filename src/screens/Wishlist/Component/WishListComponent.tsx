import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Alert,Image,ActivityIndicator } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, useTheme } from '@react-navigation/native';
import { useDispatch } from "react-redux";
import { IProductWishList, IProductprops, SCREENNAME, fonts, ic_add_shop, ic_dot_orange, ic_heart, ic_trash } from '../../../shared';
import colors from '../../../shared/colors';
interface IProductWishListParams {
    item: IProductWishList
}
const WishListComponent = ({ item }: IProductWishListParams) => {
    const image = item.image;
const productName = item.title;
const price = item.price;
const status = item.status;

const renderStatus = (title: string, status: boolean) => {
    return (
        <View style={styles.wrapPrice}>
            <Text style={styles.txtTitle}>{title}</Text>
            {status === true ? (
                <View>
                    <Text style={styles.txtName}>IN STOCK</Text>
                </View>
            ) : (
                <View>
                    <Text style={styles.txtName}>EXPORTED</Text>
                </View>
            )}
        </View>
    );
};

const renderPrice = (title: string, txtPrice: any) => {
    return (
        <View style={styles.wrapPrice}>
            <Text style={styles.txtTitle}>{title}</Text>
            <Text style={styles.txtName}>{`$${txtPrice}`}</Text>
        </View>
    );
};

return (
    <View style={styles.container}>
        <Image
            source={image}
            style={styles.wrapImageProduct}
            resizeMode="contain"
        />
        <View style={styles.wrapDetail}>
            <View style={styles.wrapTrashDetail}>
                <Text numberOfLines={3} style={styles.txtName}>
                    {productName || ''}
                </Text>
                <View>
                    <Image
                        source={ic_trash}
                        style={styles.wrapTrash}
                        resizeMode="contain"
                    />
                    <Image
                        source={ic_add_shop}
                        style={styles.wrapAdd}
                        resizeMode="contain"
                    />
                </View>
            </View>

            {renderPrice('Price: ', price)}
            {renderStatus('Stock status: ', status)}

            <View style={styles.wrapPadding} />
        </View>
    </View>
);
}
export default WishListComponent
const styles = StyleSheet.create({
    container: {
        borderTopColor: colors.gray_bg,
        borderTopWidth: 2,
        flexDirection: "row",
        padding: 10,
        paddingTop: 20
    },
    wrapImageProduct: {
        height: 120,
        aspectRatio: 1,
        marginRight: 10,
        borderRadius: 10
    },
    wrapDetail: {
        flex: 1,
        flexDirection: "column"
    },
    wrapTrash: {
        height: 24,
        aspectRatio: 1,
        margin: 10,
    },
    wrapAdd: {
        height: 24,
        aspectRatio: 1,
        marginLeft: 10,
    },
    wrapTrashDetail: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingBottom: 10
    },
    txtName: {
        fontSize: fonts.font20,
        fontWeight: "600",
        color: colors.cyan_text,
        flex: 1
    },
    txtTitle: {
        fontSize: fonts.font20,
        fontWeight: "400",
        color: colors.cyan_text

    },
    wrapPrice: {
        borderTopColor: colors.gray_bg,
        borderTopWidth: 2,
        flexDirection: "row",
        padding: 10,
        justifyContent: "space-between",
        alignItems: "center"
    },
    txtQuantity: {
        fontSize: fonts.font24,
        fontWeight: "700"
    },
    txtNumberQuantity: {
        fontSize: fonts.font20,
        fontWeight: "700",
        borderRightWidth: 2,
        borderRightColor: colors.gray_bg,
        borderLeftColor: colors.gray_bg,
        borderLeftWidth: 2,
        paddingHorizontal: 15
    },
    wrapQuantity: {
        borderRadius: 50,
        width: 150,
        borderWidth: 1,
        borderColor: colors.gray_bg,
        flexDirection: "row",
        justifyContent: "space-evenly",
        height: 40,
        alignItems: "center"
    },
    wrapPadding: {
        height: 30,
        width: 30
    }
});
