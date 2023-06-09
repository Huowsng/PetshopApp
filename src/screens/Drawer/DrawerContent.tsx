import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Alert,Image,ActivityIndicator } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useTheme } from '@react-navigation/native';
import { useDispatch, useSelector } from "react-redux";
import { IProfile, IStore, SCREENNAME, img_profile } from '../../shared';
import colors from '../../shared/colors';
import { AntDesign } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Drawer } from 'react-native-paper';
import { SAVE_APP_TOKEN } from '../../redux/actions/actionTypes';



const Main_Menu = 'Main_Menu'
const Categories = 'Categories'
const DrawerContent = () => {
    const token = useSelector((state: IStore) => state?.appReducer.token);
    const dispatch = useDispatch<any>();
    const navigation = useNavigation<any>();

    const [page, setPage] = React.useState(Main_Menu);
    const [isLoading, setIsLoading] = React.useState<boolean>(true)
    const [data, setData] = React.useState<IProfile>();
    const getData = (() => {
        setIsLoading(true)
        fetch('https://petshop-95tt.onrender.com/user/infor',
            {
                method: "GET",
                headers: {
                    Accept: '*/*',
                    'Content-Type': 'application/json',
                    "Connection": "keep-alive",
                    "Authorization": `${token}`
                },
            })
            .then((response) => response.json())
            .then((responseJson) => {
                setData(responseJson);
            })
            .catch((error) => {
                console.error(error);
            });
        setIsLoading(false)

    })
    React.useEffect(() => {
        getData()
    }, [])
    React.useEffect(() => {
        console.log(isLoading)
    }, [isLoading])
    const BodyComponent = () => {
        return (
            <View style={styles.drawerList}>
      <View style={styles.wrapAvaName}>
        <Image
          source={img_profile}
          style={styles.wrapAvatar}
          resizeMode="contain"
        />
        <Text style={styles.wrapName}>{data?.name}</Text>
      </View>
      <DrawerItem
        icon={({ color, size }) => (
          <Ionicons name="home" size={24} color="black" />
        )}
        label="Home"
        onPress={() => navigation.navigate(SCREENNAME.HOME_SCREEN)}
      />
      <DrawerItem
        icon={({ color, size }) => (
            <MaterialCommunityIcons name="vector-difference" size={24} color="black" />
        )}
        label="About"
        onPress={() => {}}
      />
      <DrawerItem
        icon={({ color, size }) => (
          <Ionicons name="cart-sharp" size={24} color="black" />
        )}
        label="Shop"
        onPress={() => navigation.navigate(SCREENNAME.SHOP_SCREEN)}
      />
      <DrawerItem
        icon={({ color, size }) => (
            <MaterialCommunityIcons name="page-previous-outline" size={24} color="black" />
        )}
        label="Pages"
        onPress={() => {}}
      />
      <DrawerItem
        icon={({ color, size }) => (
          <Ionicons name="md-logo-dropbox" size={24} color="black" />
        )}
        label="Blog"
        onPress={() => {}}
      />
      <DrawerItem
        icon={({ color, size }) => (
          <Ionicons name="call" size={24} color="black" />
        )}
        label="Contact"
        onPress={() => navigation.navigate(SCREENNAME.CONTACT_SCREEN)}
      />
    </View>
        );
    }
    return (
        <View style={{ flex: 1 }}>
          <DrawerContentScrollView>
            <HeadComponent page={page} setPage={setPage} />
            {page === Main_Menu ? <BodyComponent /> : null}
          </DrawerContentScrollView>
          <Drawer.Section style={styles.bottomDrawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <Ionicons name="log-out" size={24} color="black" />
              )}
              label="Sign out"
              onPress={() => {
                dispatch({
                  type: SAVE_APP_TOKEN,
                  payload: '',
                });
                navigation.reset({
                  index: 0,
                  routes: [{ name: SCREENNAME.LOGIN_SCREEN }],
                });
              }}
            />
          </Drawer.Section>
        </View>
    );

}
export default DrawerContent
const HeadComponent = ({ page, setPage }: any) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
  
    const handleSetPage = (selectedPage: string) => {
        setPage(selectedPage);
    };
  
    return (
      <View style={styles.drawerContent}>
        <TouchableOpacity
          style={styles.DrawerHeaderMain}
          onPress={() => handleSetPage(Main_Menu)}
          disabled={page === Main_Menu ? true : false}
        >
          <Text style={styles.DrawerText}>Main Menu</Text>
          {page === Main_Menu ? <View style={styles.wrapText}></View> : null}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.DrawerHeaderCategories}
          onPress={() => handleSetPage(Categories)}
          disabled={page === Categories ? true : false}
        >
          <Text style={styles.DrawerText}>Shop by Categories</Text>
          {page === Categories ? <View style={styles.wrapText}></View> : null}
        </TouchableOpacity>
      </View>
    );
  };
  
const styles = StyleSheet.create({
    wrapText: {
        backgroundColor: "#3F3C9A",
        height: 3,
        width: "100%",
        position: 'absolute',
        bottom: 0,
    },
    wrapAvaName: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 20,
    },
    drawerContent: {
        backgroundColor: "#FFFFFF",
        marginTop: 30,
        height: 70,
        flexDirection: 'row',
        
    },
    DrawerHeaderMain: {
        width: '40%',
        justifyContent: 'center',
        alignItems: 'center',

    },
    DrawerHeaderCategories: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    DrawerClose: {
        width: '10%',
        justifyContent: 'center',
        alignItems: 'center',
        //borderWidth: 1,
    },
    DrawerText: {
        fontWeight: "bold",
        fontSize: 17,
    },
    drawerList: {
        //borderWidth: 1,
        //height:500,
        flex: 1,
    },
    wrapAvatar: {
        height: 70,
        width: 70,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        //marginTop: 5,
    },
    wrapName: {
        fontSize: 18,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        //borderTopWidth: 1,
    },
    wrapHeaderLogo: {
        height: 100,
        backgroundColor: colors.cyan
    },
});