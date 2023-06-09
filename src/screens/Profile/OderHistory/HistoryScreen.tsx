import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image, RefreshControl, ActivityIndicator, FlatList, TextInput, ScrollView } from "react-native";
import { useDispatch, useSelector, Provider } from "react-redux";
import { DrawerActions, useNavigation, useRoute } from "@react-navigation/native";
import colors from "../../../shared/colors";
import { ICart, IDelivery, IItemType, IStore, SCREENNAME, fonts, ic_back } from "../../../shared";
import HistoryItem from "./Components/HistoryItem";
const HistoryScreen = ({ navigation }: any) => {
            const token = useSelector((state: IStore) => state?.appReducer.token);
            const [data, setData] = React.useState<ICart[]>([]);
            const [loading, setLoading] = React.useState(false);
            const [isRefreshing, setIsRefreshing] = React.useState(false);
        
            const getData = React.useCallback(async () => {
            setLoading(true);
            try {
                const response = await fetch('https://petshop-95tt.onrender.com/api/orders', {
                method: 'GET',
                headers: {
                    Accept: '*/*',
                    'Content-Type': 'application/json',
                    Connection: 'keep-alive',
                    Authorization: `${token}`,
                },
                });
                const json = await response.json();
                setData(json);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
            }, [token]);
        
            const onRefresh = React.useCallback(() => {
            setIsRefreshing(true);
            getData();
            setIsRefreshing(false);
            }, [getData]);
        
            React.useEffect(() => {
            getData();
            }, [getData]);
        
            React.useEffect(() => {
            console.log('243423 ', JSON.stringify(data[0]));
            }, [data]);
        
            const renderItem = React.useCallback(({ item }: { item: ICart }) => {
            return <HistoryItem item={item} />;
            }, []);
        
            const keyExtractor = React.useCallback((item: any, index: number) => `${item} ${index}`, []);
            return (
              <View style={styles.container}>
                  <View style={styles.wrapHeader}>
                      <TouchableOpacity
                          onPress={() => { navigation.goBack() }}
                      >
                          <Image
                              source={ic_back}
                              resizeMode="contain"
                              style={{ width: 20, height: 20, marginRight: 20 }}
                          />
                      </TouchableOpacity>
                      <View style={styles.wrapTextHeader}>
                          <Text style={styles.txtHeader}>
                              Order History
                          </Text>
                      </View>
      
                  </View>
                  <View>
                      {
                          loading
                              ?
                              <View style={{ marginTop: 200 }}>
                                  <ActivityIndicator
                                      size={50}
                                      color={colors.cyan}
                                  />
                              </View>
                              :
                              <FlatList
                                  data={data}
                                  renderItem={(item) => renderItem(item)}
                                  keyExtractor={keyExtractor}
                                  refreshControl={
                                      <RefreshControl
                                          refreshing={isRefreshing}
                                          onRefresh={onRefresh}
                                      />
                                  }
                                  ListFooterComponent={
                                      <View style={{ height: 100 }} />
                                  }
                              />
                      }
                  </View>
              </View>
          );
}
export default HistoryScreen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 0,
        paddingVertical: 35,
    },
    wrapHeader: {
        flexDirection: "row",
        height: 50,
        backgroundColor: "white",
        borderBottomWidth: 1,
        borderBottomColor: "#E5E5E5",
        paddingHorizontal: 20,
        paddingVertical: 10,
        alignItems: 'center'
    },
    wrapTextHeader: {
        flex: 1,
        justifyContent: "center",
    },
    txtHeader: {
        fontSize: fonts.font20,
        color: colors.black,
    },
});
