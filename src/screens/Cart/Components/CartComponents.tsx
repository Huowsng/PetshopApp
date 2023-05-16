import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import { useDispatch, useSelector, Provider } from "react-redux";
import { cat, fonts, ICart, ic_app_logo, ic_menu, ic_trash, IItemType, IListOrderItem, IProductCart, IStore } from "../../../shared";
import colors from "../../../shared/colors";
interface IProductCartParams {
    itemType: IItemType,
    order_id: string
}

const CartComponent = ({ itemType, order_id }) => {
    const token = useSelector((state : any) => state.appReducer.token);
    const dispatch = useDispatch();
  
    const [quantity, setQuantity] = useState(1);
  
    const HandleIncrease = () => {
      if (quantity !== 1) {
        setQuantity(quantity - 1);
      }
    };
  
    const onRemoveItem = async () => {
      const body = {
        order_id: order_id,
        product_id: itemType.product_id,
      };
  
      await fetch(`https://petshop-95tt.onrender.com/api/orders`, {
        method: 'DELETE',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
          Connection: 'keep-alive',
          Authorization: `${token}`,
        },
        body: JSON.stringify(body),
      })
      .finally(() => {})
        .then((response) => response.json())
        .then((response) => {
          dispatch({
            type: 'RELOAD_CART',
            payload: true,
          });
        })
        .catch((error) => {
          console.error(error);
        });
    };
  
    useEffect(() => {
        if (itemType && itemType.amount) {
            setQuantity(itemType.amount);
          }
        }, [itemType]);
  
    const renderPrice = (title, txtPrice) => {
      return (
        <View style={styles.wrapPrice}>
          <Text style={styles.txtTitle}>{title}</Text>
          <Text style={styles.txtName}>{`$${txtPrice * quantity}`}</Text>
        </View>
      );
    };
    const renderQuantity = () => {
        return (
          <View style={styles.wrapPrice}>
            <Text style={styles.txtTitle}>Quantity:</Text>
            <View style={styles.wrapQuantity}>
              <TouchableOpacity onPress={HandleIncrease}>
                <Text style={styles.txtQuantity}>-</Text>
              </TouchableOpacity>
              <Text style={styles.txtNumberQuantity}>{`${quantity}`}</Text>
              <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
                <Text style={styles.txtQuantity}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      };
      return (
        <View style={styles.container}>
          {itemType && (
            <>
              <Image
                source={{ uri: itemType.image }}
                style={styles.wrapImageProduct}
                resizeMode="contain"
              />
              <View style={styles.wrapDetail}>
                <View style={styles.wrapTrashDetail}>
                  <Text numberOfLines={3} style={styles.txtName}>
                    {itemType.product_name || ""}
                  </Text>
                  <TouchableOpacity onPress={onRemoveItem}>
                    <Image
                      source={ic_trash}
                      style={styles.wrapTrash}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>
                {renderPrice("Price: ", itemType.price)}
                {renderQuantity()}
                {renderPrice("Total Price: ", itemType.amount * itemType.price)}
                <View style={styles.wrapPadding} />
              </View>
            </>
          )}
        </View>
      );
    
}

export default CartComponent
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        padding: 10,
        marginTop: 20,
        backgroundColor: "white",
        borderRadius: 10,
        marginHorizontal: 10
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
    },
});
