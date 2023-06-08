import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { useDispatch, useSelector, Provider } from "react-redux";
import { cat, fonts, ICart, ic_app_logo, ic_menu, ic_trash, IItemType, IListOrderItem, IProductCart, IStore, SCREENNAME, ic_back } from "../../../shared";
import colors from "../../../shared/colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import { RELOAD_CART } from "../../../redux/actions/actionTypes";
import { WebView } from 'react-native-webview';
import { Toast } from "react-native-toast-message/lib/src/Toast";

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

        const handleURL = (url: string) => {
          if (url.includes('success')) {
            Toast.show({
              type: 'success',
              text1:"Checkout Succes",
              visibilityTime: 3000,
              autoHide : true,
              topOffset: 40,
              onPress: () => {
                navigation.navigate(SCREENNAME.CART_SCREEN);
              },
            });
          }
          
          if (url.includes('cancel')) {
            Toast.show({
              type: 'success',
              text1:"Checkout Cancel",
              visibilityTime: 3000,
              autoHide  : true,
              onPress: () => {
                navigation.navigate(SCREENNAME.CART_SCREEN);
              },
            });
          }
          dispatch({
            type: RELOAD_CART,
            payload: true,
          });
        };
      
        useEffect(() => {
          setWebviewUrl(pay_url);
        }, [pay_url]);
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
          onNavigationStateChange={(newNavState) => handleURL(newNavState.url)}
          source={{ uri: webviewUrl }}
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
        height: 70,
        marginTop: 30,
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
