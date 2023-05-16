import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import { useDispatch, useSelector, Provider } from "react-redux";
import { cat, fonts, ICart, ic_app_logo, ic_menu, ic_trash, IItemType, IListOrderItem, IProductCart, IStore, SCREENNAME} from "../../shared";
import { useNavigation, useRoute } from "@react-navigation/native";
import colors from "../../shared/colors";
interface IProductCartParams {
    item: IProductCart
}
export default  () => {
    const dispatch = useDispatch();
const navigation = useNavigation<any>();
const token = useSelector((state: IStore) => state?.appReducer.token);
const isReloadCart = useSelector((state: IStore) => state?.appReducer.isReloadCart);

const [total, setTotal] = useState<number>(0);
const [isLoading, setIsLoading] = useState<boolean>(false);
const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
const [data, setData] = useState<ICart | undefined>(undefined);

const getData = async () => {
  setIsLoading(true);
  await fetch(`https://pet.kreazy.me/api/cart`, {
    method: "GET",
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/json',
      "Connection": "keep-alive",
      "Authorization": `${token}`
    },
  })
    .finally(() => {
      setIsLoading(false);
    })
    .then((response) => response.json())
    .then((response) => {
      setData(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
  setIsLoading(false);
};

useEffect(() => {
  if (isReloadCart) {
    getData();
    dispatch({ type: "RELOAD_CART", payload: false });
  }
}, [isReloadCart]);
const renderCheckout = () => {
    const navigation = useNavigation();
  
    return (
      <TouchableOpacity
        disabled={total === 0}
        style={styles.wrapCheckout}
        onPress={() => {
          navigation.navigate(SCREENNAME.PAYMENT_SCREEN, { orderID: data?._id, totalPay: data?.total })
        }}
      >
        <Text style={styles.txtCheckout}>{`Check out: $${total}`}</Text>
      </TouchableOpacity>
    );
  };
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flex: 1,
    },
    wrapCheckout: {
        height: 50,
        backgroundColor: colors.cyan,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 50
    },
    txtCheckout: {
        fontSize: fonts.font20,
        fontWeight: "500",
        color: colors.white
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
    wrapHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 20,
        backgroundColor: colors.cyan,
        height: 80,
    },
});