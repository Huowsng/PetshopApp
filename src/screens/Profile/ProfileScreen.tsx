import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image, RefreshControl, ActivityIndicator, FlatList, TextInput, ScrollView } from "react-native";
import { useDispatch, useSelector, Provider } from "react-redux";
import { cat, fonts, ICart, ic_app_logo, ic_menu, ic_trash, IItemType, IListOrderItem, IProductCart, IStore, SCREENNAME, ic_paypal, IProfile, ic_back, img_avatar} from "../../shared";
import { DrawerActions, useNavigation, useRoute } from "@react-navigation/native";
import colors from "../../shared/colors";
import AppHeader from "../Header/AppHeader";
import { SAVE_APP_TOKEN } from "../../redux/actions/actionTypes";
import { MaterialIcons, FontAwesome, FontAwesome5 } from '@expo/vector-icons';

const ProfileScreen = () => {
    const renderBody = (() => {
        const navigation = useNavigation<any>();
        const dispatch = useDispatch<any>();
        return (
          <ScrollView>
            <View style={styles.containerBody}>
              <View style={styles.wrapHome}>
                <Text style={styles.TextAccount}>My account</Text>
                <Text style={styles.TextHome}>Home / My account</Text>
              </View>
              <View style={styles.wrapBody}>
                <TouchableOpacity
                  onPress={() => { navigation.navigate(SCREENNAME.PROFILE_PAGE) }}
                  style={styles.wrapButton}>
                  <Text style={styles.ButtonText}>Person</Text>
                  <MaterialIcons name="person" style={styles.ButtonIcon} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.wrapButton}
                  onPress={() => {
                    navigation.navigate(SCREENNAME.HISTORY_SCREEN)
                  }}
                >
                  <Text style={styles.ButtonText}>Orders</Text>
                  <FontAwesome5 name="border-all" style={styles.ButtonIcon} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.wrapButton}>
                  <Text style={styles.ButtonText}>Account details</Text>
                  <MaterialIcons name="account-box" style={styles.ButtonIcon} />
                </TouchableOpacity>
      
                <TouchableOpacity style={styles.wrapButton} onPress={() => {
                  dispatch({
                    type: SAVE_APP_TOKEN,
                    payload: ""
                  })
                  navigation.reset({
                    index: 0,
                    routes: [
                      {
                        name: SCREENNAME.LOGIN_SCREEN,
                      },
                    ],
                  })
                }}>
                  <Text style={styles.ButtonText}>Logout</Text>
                  <MaterialIcons name="logout" style={styles.ButtonIcon} />
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        );
      })
      
      return (
        <View style={styles.container} >
          <AppHeader />
          {renderBody()}
        </View>
      );
}
export default ProfileScreen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 0,
        paddingVertical: 35,
    },
    containerBody: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: 'center',
        borderWidth:1,
        width: 400,
        height: 650
    },
    wrapHome: {
        height: '20%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F7F7F7',
        //borderWidth:1,
    },
    TextAccount: {
        fontSize: 32,
        color: 'black',
        fontWeight: 'bold',
    },
    TextHome: {
        paddingTop: 5,
        fontSize: 12,
    },
    wrapBody: {
        width: '100%',
        height: '85%',
        borderWidth: 0.5,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',

    },
    wrapButton: {
        width: 314,
        height: 50, 
        flexDirection: 'row',
        backgroundColor: '#F7F7F7',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        marginVertical: 7,
    },
    ButtonText: {
        fontSize: 18,
        color: 'black',
        marginLeft: 10,
    },
    ButtonIcon: {
        marginRight: 10,
        alignItems: 'center',
        fontSize: 18,
        color: 'black'
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
        flex: 1,
    },
    wrapMenu: {
        height: 25,
        aspectRatio: 1,
    },
    txtSearch: {
        fontSize: fonts.font20,
        paddingHorizontal: 20
    }
});

