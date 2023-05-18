import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { useDispatch, useSelector, Provider } from "react-redux";
import { cat, fonts, ICart, ic_app_logo, ic_menu, ic_trash, IItemType, IListOrderItem, IProductCart, IStore, SCREENNAME, ic_back } from "../../../shared";
import colors from "../../../shared/colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Snackbar } from "react-native-paper";
import { RELOAD_CART } from "../../../redux/actions/actionTypes";
import { WebView } from 'react-native-webview';
import { showMessage } from "react-native-flash-message";

const CheckoutWebviewScreen = () => {
        const navigation = useNavigation();
        const route = useRoute();
        if (!route) {
            return null;
        }
        const { pay_url } = route.params as { pay_url: string };
        const dispatch = useDispatch();
        const [isLoading, setIsLoading] = React.useState(false);
        const [webviewUrl, setWebviewUrl] = React.useState(pay_url);

  const handleURL = (newNavState) => {
    const { url } = newNavState;
    useEffect(() => {
        if (webviewUrl.includes('success')) {
            showMessage({
              message: 'Checkout Success',
              type: 'success',
              duration: 3000,
              description: 'Checkout Success',
              textStyle: { color: 'white' },
              backgroundColor: 'green',
              onPress: () => {
                navigation.navigate(SCREENNAME.CART_SCREEN);
              },
            });
          }
          
          if (webviewUrl.includes('cancel')) {
            showMessage({
              message: 'Checkout Cancel',
              type: 'danger',
              duration: 3000,
              description: 'Checkout Cancel',
              textStyle: { color: 'white' },
              backgroundColor: 'red',
              onPress: () => {
                navigation.navigate(SCREENNAME.CART_SCREEN);
              },
            });
          }
        dispatch({
          type: RELOAD_CART,
          payload: true,
        });
      }, [webviewUrl]);
    setWebviewUrl(url);
  };
  return (
    <View style={styles.container}>
      <View style={styles.wrapHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={ic_back}
            resizeMode="contain"
            style={styles.wrapBack}
          />
        </TouchableOpacity>
        <Text style={styles.wrapTextHeader}>Checkout your Paypal</Text>
        <View style={{ width: 40 }}>
          {isLoading ? (
            <View style={styles.wrapLoading}>
              <ActivityIndicator size={30} color={colors.cyan} />
            </View>
          ) : (
            <View />
          )}
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <WebView
          onNavigationStateChange={handleURL}
          source={{ uri: pay_url }}
          javaScriptEnabled={true}
          onLoadStart={() => setIsLoading(true)}
          onLoadEnd={() => setIsLoading(false)}
        />
      </View>
    </View>
  );

}
export default CheckoutWebviewScreen
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    wrapBack: {
        height: 20,
        aspectRatio: 1,
        marginRight: 20
    },
    wrapHeader: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 70
    },
    wrapLoading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    wrapTextHeader: {
        fontSize: fonts.font24,
        fontWeight: 'bold',
    }
});