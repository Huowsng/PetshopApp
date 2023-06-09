import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image, RefreshControl, ActivityIndicator, FlatList } from "react-native";
import { useDispatch, useSelector, Provider } from "react-redux";
import { cat, fonts, ICart, ic_app_logo, ic_menu, ic_trash, IItemType, IListOrderItem, IProductCart, IStore, SCREENNAME} from "../../shared";
import { DrawerActions, useNavigation, useRoute } from "@react-navigation/native";
import colors from "../../shared/colors";
import CartComponent from "./Components/CartComponents";
import { RELOAD_CART } from "../../redux/actions/actionTypes";
import axios, { AxiosRequestHeaders } from "axios";
import AppHeader from "../Header/AppHeader";
interface IProductCartParams {
    item: IProductCart
}
              const CartScreen = () => {
                  const dispatch = useDispatch();
              const navigation = useNavigation<any>();
              const token = useSelector((state: IStore) => state?.appReducer.token);
              const isReloadCart = useSelector((state: IStore) => state?.appReducer.isReloadCart);

              const [total, setTotal] = useState<number>(0);
              const [isLoading, setIsLoading] = useState<boolean>(false);
              const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
              const [data, setData] = useState<ICart | undefined>(undefined);

              const getData = (async () => {
                setIsLoading(true);
                await fetch(`https://petshop-95tt.onrender.com/api/cart`,
                    {
                        method: "GET",
                        headers: {
                            Accept: '*/*',
                            'Content-Type': 'application/json',
                            "Connection": "keep-alive",
                            "Authorization": `${token}`
                        },
                    }
                ).finally(() => {
                    setIsLoading(false);
                }).then((response) => response.json())
                    .then((response,) => {
                        setData(response)
                    })
                    .catch((error) => {
                        console.error(error);
                    });
                setIsLoading(false);
            })

            React.useEffect(() => {
              setTotal(data?.total ?? 0);
            }, [data]);

            React.useEffect(() => {
              getData();
            }, []);

            React.useEffect(() => {
              if (isReloadCart) {
                getData();
                dispatch({
                  type: RELOAD_CART,
                  payload: false,
                });
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
        const renderEmpty = (() => {
          return <View style={{ marginTop: 200 }}>
              <Text style={{ color: colors.cyan, fontSize: 20, textAlign: "center" }}>{`Empty Card!\n Add any product to checkout`}</Text>
              <TouchableOpacity
                style={styles.wrapCheckout}
                onPress={() => {
                navigation.navigate(SCREENNAME.SHOP_SCREEN)
              }}
            >
              <Text style={styles.txtCheckout}>{`Go to shop`}</Text>
            </TouchableOpacity>
          </View>
      })
      const renderHeader = (() => {
        // return <View style={styles.wrapHeader}>
        //     {/* <Image
        //         source={ic_app_logo}
        //         resizeMode="contain"
        //         style={styles.wrapLogo}
        //     /> */}
        //     <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
        //         <Image
        //               source={ic_menu}
        //               resizeMode="contain"
        //               style={styles.wrapMenu}
        //         />
        //     </TouchableOpacity>
        // </View>
      })
      const keyExtractor = useCallback((item, index) => `${item} ${index}`, []);

return (
  <View style={styles.cart}>
    <AppHeader />
    <View style={styles.container}>
      {isLoading ? (
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          <ActivityIndicator size="large" color={colors.cyan} />
        </View>
      ) : (
        <FlatList
          renderItem={({ item }) => <CartComponent order_id={data?._id ?? ''} itemType={item} />}
          data={data?.listOrderItems}
          keyExtractor={keyExtractor}
          ListEmptyComponent={renderEmpty}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={renderHeader}
          ListFooterComponent={<View style={{ height: 50 }} />}
          stickyHeaderIndices={[0]}
          refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={getData} />}
        />
      )}
    </View>
    {renderCheckout()}
    
  </View>
);

}
export default CartScreen

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flex: 1,
    },
    cart:{
      flex: 1,
        paddingHorizontal: 0,
        paddingVertical: 35,
    },
    wrapCheckout: {
        height: 50,
        backgroundColor: colors.cyan,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 50,
        marginTop: 15
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