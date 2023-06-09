import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Alert,Image,ActivityIndicator, FlatList, RefreshControl } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, useTheme } from '@react-navigation/native';
import { useDispatch, useSelector } from "react-redux";
import colors from '../../shared/colors';
import { IProduct, IProductprops, IStore, SCREENNAME, fonts, ic_back, ic_empty, ic_search, img_error } from '../../shared';
import DropDownPicker from "react-native-dropdown-picker";
import { RELOAD_CART } from '../../redux/actions/actionTypes';
import FeedbackComp from './Components/FeedbackComp';
import Toast from 'react-native-toast-message';



const DetailProductScreen = () => {

    const navigation = useNavigation<any>();
    const dispatch = useDispatch();
    const route = useRoute();
    const token = useSelector((state: any) => state?.appReducer.token);

    const { productID } = route.params as { productID: string };
    const [cardCount, setCardCount] = useState<number>(1);
    const [data, setData] = React.useState<IProduct>();
    const [refreshing, setRefreshing] = useState(false);


    const [isLoading, setIsLoading] = React.useState(false);
    const [isAddCart, setIsAddCart] = React.useState(false);


    const [open, setOpen] = useState(false);
    const [value, setValue] = useState<number>(-1);
    const [items, setItems] = useState([{}]);

    const getData = (async () => {
        setIsLoading(true);
        await fetch(`https://petshop-95tt.onrender.com/api/products/${productID}`,
            {
                method: "GET",
                headers: {
                    Accept: '*/*',
                    'Content-Type': 'application/json',
                    "Connection": "keep-alive"
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

    const addCart = (async () => {
        setIsAddCart(true)
        var body = {
            "type_id": data?.types[value]._id,
            "amount": cardCount,
            "product_id": productID
        }
        console.log(JSON.stringify(body))
        await fetch(`https://petshop-95tt.onrender.com/api/cart`,
            {
                method: "PUT",
                headers: {
                    Accept: '*/*',
                    'Content-Type': 'application/json',
                    "Connection": "keep-alive",
                    "Authorization": `${token}`
                },
                body: JSON.stringify(body)
            }
        ).finally(() => {
            setIsAddCart(false);
        }).then((response) => {
            if (response.status === 200) {
                console.log('okokokokokokokoko')
                Toast.show({
                  type: 'success',
                  text1: 'Add this product to cart successfully!',
                  visibilityTime: 2000,
                  autoHide: true,
                  topOffset: 30,
                  onPress: () => {
                    navigation.navigate(SCREENNAME.CART_SCREEN);
                  },
                  
                });
                dispatch({
                    type: RELOAD_CART,
                    payload: true
                })
              } else {
                Toast.show({
                  type: 'error',
                  text1: 'Cannot add to cart!',
                  visibilityTime: 2000,
                  autoHide: true,
                  topOffset: 30,
                });
              }
            return response.json()
        })
            .then((response,) => {
                console.log(response)
            })
            .catch((error) => {
                console.error(error);
            });
        setIsAddCart(false);
    })

    const onRefresh = (() => {
        setRefreshing(true);
        getData()
        setRefreshing(false);
    })

    console.log(data)
    React.useEffect(() => {
        getData();
    }, []);

    React.useEffect(() => {
        setItems([])
        if (data?.types != null) {
            data?.types.map((item, index) => {
                setItems((prev) => [...prev, { label: item.name, value: index }])
            })
        }
        setValue(0)
    }, [data])


    const renderAddtoCart = (() => {
        return <View style={styles.wrapViewAddcard}>
            <View style={styles.wrapBorder}>
                <TouchableOpacity
                    onPress={() => {
                        if (cardCount > 1)
                            setCardCount(cardCount - 1)
                    }}
                    style={styles.wrapAddBuon}>
                    <Text style={styles.txtBuonAdd}>
                        -
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.wrapAddBuon}>
                    <Text style={styles.txtBuonAdd}>
                        {`${cardCount}`}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        setCardCount(cardCount + 1)
                    }}
                    style={styles.wrapAddBuon}>
                    <Text style={styles.txtBuonAdd}>
                        +
                    </Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                style={styles.wrapCheckout}
                onPress={() => {
                    addCart()
                    

                }}
            >
                {
                    isAddCart
                        ?
                        <ActivityIndicator
                            size={"small"}
                            color={"white"}
                        />
                        :
                        <Text style={styles.txtCheckout}>Add to Cart</Text>
                }
            </TouchableOpacity>
        </View>
    })
    const keyExtractor = React.useCallback((item: any, index: any) => `${item} ${index}`, []);

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
                        resizeMode={"contain"}
                        // tintColor={"black"}
                        style={styles.ButtonIcon} />
                </TouchableOpacity>
                <Text style={{ color: "#000", fontSize: fonts.font18 }}>Product Detail</Text>
            </View>
            <View style={{ flex: 1 }}>
                {
                    isLoading
                        ?
                        <View style={{ flex: 1, justifyContent: "center", flexDirection: "column" }}>
                            <ActivityIndicator
                                size={"large"}
                                color={colors.cyan}
                            />
                        </View>
                        :
                        <View style={{ flex: 1 }}>
                            {
                                data?._id == null
                                    ?
                                    <View style={{ flex: 1, alignItems: "center", paddingTop: 100 }}>
                                        <Image
                                            source={img_error}
                                            style={{ height: 300, width: 300, }}
                                            resizeMode={"contain"}
                                        />
                                    </View>
                                    :
                                    <ScrollView
                                        showsVerticalScrollIndicator={false}
                                    >
                                        <View style={{ backgroundColor: "white", paddingVertical: 20, paddingHorizontal: 10, borderRadius: 10 }}>
                                            <Image
                                                source={{ uri: data?.images?.url ?? "" }}
                                                style={styles.wrapImage}
                                            />
                                            <Text
                                                style={styles.txtTitle}
                                            >{data?.title}</Text>
                                            <Text
                                                style={styles.txtPrice}
                                            >{(data?.types[value]?.price ?? "0") + " $"}</Text>
                                            <Text
                                                style={styles.txtDescription}
                                            >{data?.description}</Text>

                                            <View style={{ height: open ? (data?.types?.length ?? 1) * 50 : 60, }}>
                                                <DropDownPicker
                                                    open={open}
                                                    value={value}
                                                    items={items}
                                                    setOpen={setOpen}
                                                    setValue={setValue}
                                                    setItems={setItems}
                                                    listMode={"SCROLLVIEW"}
                                                />
                                            </View>

                                            <FlatList
                                                horizontal={true}
                                                data={[data?.category]}
                                                renderItem={({ item }) => (
                                                    <View style={styles.wrapCategory}>
                                                        <Text style={styles.txtCategory}>{item}</Text>
                                                    </View>
                                                )}
                                                refreshControl={
                                                    <RefreshControl
                                                        refreshing={refreshing}
                                                        onRefresh={onRefresh}
                                                    />
                                                }
                                                refreshing={true}
                                                keyExtractor={keyExtractor}
                                            />

                                            <Text
                                                style={styles.txtDescription}
                                            >{`Sold out: ${data?.sold}`}</Text>
                                        </View>
                                        <View style={{ height: 50 }} />
                                        {
                                            data?.feedbacks.length == 0
                                                ?
                                                <View></View>
                                                :
                                                <FeedbackComp
                                                    listFeedback={data?.feedbacks}
                                                />
                                        }
                                    </ScrollView>
                            }
                        </View>
                }
            </View>
            {
                renderAddtoCart()
            }
        </View>
    );
        
}

export default DetailProductScreen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor : '',
        paddingHorizontal: 0,
        paddingVertical: 35,

    },
    wrapImage: {
        aspectRatio: 1,
        margin: 10,
    },
    ButtonIcon: {
        marginRight: 16,
        alignItems: 'center',
        height: 16,
        aspectRatio: 1
    },
    wrapHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: "center",
        paddingHorizontal: 20,
        height: 50,
        borderBottomColor: "gray",
        borderBottomWidth: 1
    },
    txtTitle: {
        fontSize: fonts.font24,
        color: colors.cyan,
        fontWeight: "bold",

    },
    txtPrice: {
        fontSize: fonts.font24,
        color: colors.orangeTabbar,
        fontWeight: 'bold',
        marginVertical: 10
    },
    txtDescription: {
        fontSize: fonts.font18,
        color: colors.grayTabbar,
    },

    wrapCheckout: {
        height: 50,
        backgroundColor: colors.cyan,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        alignContent: "center"
    },

    txtCheckout: {
        fontSize: fonts.font20,
        fontWeight: "500",
        color: colors.white
    },

    wrapLsCategory: {
        flexDirection: "row",
    },

    txtCategory: {

    },

    wrapCategory: {
        backgroundColor: colors.gray_bg,
        padding: 4,
        margin: 4,
        borderRadius: 2,
    },

    wrapBorder: {
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 20,
        flex: 1,
        marginRight: 20,
        flexDirection: "row"
    },

    wrapViewAddcard: {
        flexDirection: "row",
    },

    wrapAddBuon: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    },

    txtBuonAdd: {
        color: colors.cyan,
        fontSize: fonts.font20,
        fontWeight: "bold",
    },

});
