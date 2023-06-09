import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image, RefreshControl, ActivityIndicator, FlatList, TextInput, ScrollView } from "react-native";
import { useDispatch, useSelector, Provider } from "react-redux";
import { DrawerActions, useNavigation, useRoute } from "@react-navigation/native";
import colors from "../../../../shared/colors";

import { IDelivery, SCREENNAME, ic_back } from "../../../../shared";
const DeliveryStatusScreen = () => {

        const navigation = useNavigation<any>();
        const route = useRoute<any>();
        const { deliveryID } = route.params as { deliveryID: string };
    
        const [data, setData] = React.useState<IDelivery>();
        const [loading, setLoading] = React.useState<boolean>(false);
        const [refreshing, setRefreshing] = React.useState<boolean>(false);
    
        const getData = (async () => {
            setLoading(true)
            await fetch(`https://petshop-95tt.onrender.com/api/delivery?delivery_id=LLUBXN`,
                {
                    method: "GET",
                    headers: {
                        Accept: '*/*',
                        'Content-Type': 'application/json',
                        "Connection": "keep-alive",
                    }
                }
            ).finally(() => {
                setLoading(false);
            }).then((response) => {
                return response.json()
            })
                .then((response,) => {
                    setData(response.data)
                })
                .catch((error) => {
                    console.error(error);
                });
            setLoading(false)
        })
    
        React.useEffect(() => {
            getData()
        }, [])
        const renderDeliveryItem = (title: string, value: string) => {
            return (
              <View style={styles.wrapTable}>
                <Text style={{ fontSize: 16, fontWeight: "bold", width: 150, color: 'orange' }}>{title}</Text>
                <Text style={styles.txtValue}>{value}</Text>
              </View>
            );}
            const renderLocation = (lat: number, long: number) => {
                return (
                  <View style={styles.wrapTable}>
                    <Text style={{ fontSize: 16, fontWeight: "bold", width: 150, color: 'orange' }}>Delivery Location</Text>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate(SCREENNAME.WEBVIEW_MAP_SCREEN, { lat: lat, lng: long });
                      }}
                    >
                      <Text style={{
                        fontSize: 16, fontWeight: "bold",
                        borderLeftColor: "gray",
                        borderLeftWidth: 2,
                        paddingLeft: 10, color: 'cyan'
                      }}>View in map</Text>
                    </TouchableOpacity>
                  </View>
                );
              };
              const pickupTime = React.useMemo(() => new Date(data?.pickup_time ?? "2022-12-01T01:00:11.741Z"), [data]);
              const createTime = React.useMemo(() => new Date(data?.created_date ?? "2022-12-01T01:00:11.741Z"), [data]);
            
              return (
                <View style={styles.container}>
                  <View style={styles.wrapHeader}>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.goBack();
                      }}
                    >
                      <Image
                        source={ic_back}
                        style={styles.wrapBack}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                    <Text style={styles.txtHeader}>
                      Delivery Status
                    </Text>
                  </View>
                  {loading ? (
                    <View style={{ justifyContent: "center", marginTop: 200 }}>
                      <ActivityIndicator size={"large"} color="cyan" />
                    </View>
                  ) : (
                    <ScrollView>
                      {renderDeliveryItem("Delivery code", deliveryID)}
                      {renderDeliveryItem("Delivery name", data?.to_name ?? "")}
                      {renderDeliveryItem("Code Amount: ", `${data?.cod_amount ?? ""} VND`)}
                      {renderDeliveryItem("Delivery phone", data?.to_phone ?? "")}
                      {renderDeliveryItem("Delivery address", data?.to_address ?? "")}
                      {renderLocation(data?.to_location.lat ?? 0, data?.to_location.long ?? 0)}
                      {renderDeliveryItem("Delivery content", data?.content ?? "")}
                      {renderDeliveryItem("Weight of goods", `${data?.weight ?? ""} gam`)}
                      {renderDeliveryItem("Height of goods", `${data?.height ?? ""} cm`)}
                      {renderDeliveryItem("Width of goods", `${data?.width ?? ""} cm`)}
                      {renderDeliveryItem("Length of goods", `${data?.length ?? ""} cm`)}
                      {renderDeliveryItem("Pickup Time", `${pickupTime.getFullYear()} - ${pickupTime.getMonth()} - ${pickupTime.getDate()}`)}
                      {renderDeliveryItem("Create Order At", `${createTime.getFullYear()} - ${createTime.getMonth()} - ${createTime.getDate()}`)}
                      {renderDeliveryItem("Note: ", data?.required_note ?? "")}
                      {renderDeliveryItem("Create Order at: ", data?.required_note ?? "")}
                      {renderDeliveryItem("Note: ", data?.required_note ?? "")}
                    </ScrollView>
                  )}
                </View>
              );    
            
}  
export default DeliveryStatusScreen
const styles = StyleSheet.create({
    container: {
      flex: 1,
        paddingHorizontal: 0,
        paddingVertical: 35,
    },
    wrapHeader: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        padding: 10,
    },
    wrapBack: {
        width: 20,
        height: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    txtHeader: {
        fontSize: 20,
        color: "#2b1e1e",
        flex: 1,
        textAlign: "center"
    },
    wrapTable: {
        flex: 1,
        flexDirection: "row",
        paddingHorizontal: 10,
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderColor: "gray",
        marginHorizontal: 10,
        alignItems: "center",
    },
    txtValue: {
        fontSize: 16,
        borderLeftColor: "gray",
        borderLeftWidth: 2,
        paddingLeft: 10,
        flex: 1,
    }
});
