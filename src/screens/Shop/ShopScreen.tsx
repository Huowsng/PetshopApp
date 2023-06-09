import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Alert,Image,ActivityIndicator, FlatList, RefreshControl } from "react-native";
import colors from '../../shared/colors';
import { IProduct, IProductprops, fonts, ic_empty, ic_search } from '../../shared';
import DropDownPicker from "react-native-dropdown-picker";
import AppHeader from '../Header/AppHeader';
import ItemProduct from './Components/ItemProduct';

const ShopScreen = () => {
    const [searchToken, setSearchToken] = React.useState<string>("");

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState<any>(-1);
    const [data, setData] = useState<IProduct[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [refreshing, setRefreshing] = useState(false);
    const [items, setItems] = useState([{ label: 'All', value: 'All', index: -1 }]);
    const [isLoadingCategory, setIsLoadingCategory] = useState<boolean>(false);

    const loadData = async () => {
        setIsLoading(true);
        fetch('https://petshop-95tt.onrender.com/api/products')
            .then((response) => response.json())
            .then((responseJson) => {
                setData(responseJson.products);
                console.log(responseJson.products)
                setIsLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setIsLoading(false);
            });
    }

    const getCategory = () => {
        setIsLoadingCategory(true);
        fetch('https://petshop-95tt.onrender.com/api/category')
            .then((response) => response.json())
            .then((responseJson) => {
                setItems([{ label: 'All', value: 'All', index: -1 }])
                responseJson.map((item: any, index: number) => {
                    setItems(prevState => [...prevState, { label: item.name, value: item._id, index: index }])
                })
            })
            .catch((error) => {
                console.error(error);
            });
        setIsLoadingCategory(false);
    }

    const getProductbyCategory = async () => {
        setIsLoading(true);
        fetch(`https://petshop-95tt.onrender.com/api/products?category=${value}`)
            .then((response) => response.json())
            .then((responseJson) => {
                setData(responseJson.products);
                console.log(responseJson.products)
                setIsLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setIsLoading(false);
            });
    }

    const onSearchProduct = async () => {
        setIsLoading(true);
        const url = `https://petshop-95tt.onrender.com/api/products/search?searchToken=${searchToken}`
        console.log(url)
        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                setData(responseJson);
                setIsLoading(false);
            })
            .catch((error) => {
                setIsLoading(false);
            });
    }

    const onRefresh = () => {
        setRefreshing(true);
        loadData();
        setRefreshing(false);
    }

    React.useEffect(() => {
        if (value === "All") {
            loadData();
        }
        else {
            getProductbyCategory();
        }
    }, [value])

    React.useEffect(() => {
        loadData();
        getCategory();
    }, [])
    const renderItem = ({ item }: IProductprops) => {
        return <ItemProduct item={item} />
    }
    const keyExtractor = React.useCallback((item: any, index: any) => `${item} ${index}`, []);

    const headerComponent = (() => {
        return <View >
            <View style={{ paddingVertical: 10, paddingHorizontal: 20, backgroundColor: "#3f3f52", flexDirection: "row", flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <TextInput
                        style={{ backgroundColor: '#ebf4f5', borderRadius: 10, padding: 10 }}
                        onChangeText={text => setSearchToken(text)}
                        value={searchToken}
                        placeholder={"Search"}
                        onKeyPress={(e) => {
                            if (e.nativeEvent.key === "Enter") {
                                console.log("Enter")
                                onSearchProduct();
                            }
                        }}
                    />
                </View>
                <TouchableOpacity onPress={onSearchProduct}>
                    <Image
                        source={ic_search}
                        style={{ width: 20, height: 20, position: "absolute", right: 30, top: 15 }}
                        resizeMode={"contain"}
                    />
                </TouchableOpacity>
            </View>
            <View style={{ padding: 20, height: open ? items.length * 60 : 90 }}>
                <DropDownPicker
                    open={open}
                    items={items}
                    value={value}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                />
            </View>
        </View>
    })
    const renderEmpty = () => {
        return <View style={{ justifyContent: "center", marginTop: 100 }}>
            <Image
                source={ic_empty}
                style={{ width: 100, height: 100, alignSelf: "center", marginBottom: 10 }}
                
            />
            <Text style={{ fontSize: 18, color: colors.cyan, textAlign: "center" }}>{`Empty Product\nTry remove filter`}</Text>
        </View>
    }

    return (
        <View style={styles.container}>
            <AppHeader />
            {
                isLoading
                    ?
                    <View style={{ flex: 1, justifyContent: "center", marginTop: 100 }}>
                        <ActivityIndicator
                            size={"large"}
                            color={colors.black}
                        />
                    </View>
                    :
                    <FlatList
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                        refreshing={true}
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={keyExtractor}
                        ListEmptyComponent={renderEmpty}
                        showsVerticalScrollIndicator={false}
                        numColumns={2}
                        ListHeaderComponent={headerComponent}
                    />
            }
        </View>
    );
}
export default ShopScreen 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 0,
        paddingVertical: 35,
    },
    wrapHeader: {
        padding: 30,
        height: 160,
        justifyContent: "center",
        backgroundColor: colors.cyan
    },
    wrapLogo: {
        height: 38,
        width: 165
    },
    wrapHeaderLogo: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        flex: 1
    },
    wrapMenu: {
        height: 25,
        aspectRatio: 1,
    },
    wrapSearch: {
        height: 25,
        aspectRatio: 1,
        marginRight: 20
    },
    wrapSearchBox: {
        backgroundColor: colors.white,
        borderRadius: 20,
        marginTop: 20,
        height: 50,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
    txtSearch: {
        fontSize: fonts.font20,
        paddingHorizontal: 20
    },
    wrapLoading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});


