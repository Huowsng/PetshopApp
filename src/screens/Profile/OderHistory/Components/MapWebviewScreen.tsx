import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image, RefreshControl, ActivityIndicator, FlatList, TextInput, ScrollView } from "react-native";
import { useDispatch, useSelector, Provider } from "react-redux";
import { DrawerActions, useNavigation, useRoute } from "@react-navigation/native";
import colors from "../../../../shared/colors";
import { ICart, IDelivery, IItemType, SCREENNAME, fonts, ic_back } from "../../../../shared";
import WebView from "react-native-webview";

const MapWebviewScreen = () => {
    const navigation = useNavigation<any>();
  const route = useRoute();
  const { lat } = route.params as { lat: number };
  const { lng } = route.params as { lng: number };
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  return (
    <View style={styles.container}>
      <View style={styles.wrapHeader}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Image source={ic_back} resizeMode="contain" style={styles.wrapBack} />
        </TouchableOpacity>
        <Text style={styles.wrapTextHeader}>Map Location</Text>
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
          source={{
            uri: `http://maps.google.com/maps?q=${lat},${lng}`,
          }}
          javaScriptEnabled={true}
          onLoadStart={() => setIsLoading(true)}
          onLoadEnd={() => setIsLoading(false)}
        />
      </View>
    </View>
  );
}
export default MapWebviewScreen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 0,
        paddingVertical: 35,
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