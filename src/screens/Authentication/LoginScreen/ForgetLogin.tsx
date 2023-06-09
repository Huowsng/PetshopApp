import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Alert,Image,ActivityIndicator } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import colors from '../../../shared/colors';
import { ic_app_logo, img_login } from '../../../shared/assets';
import { SCREENNAME } from '../../../shared';

const ForgetPassword = ({navigation}:any) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { colors } = useTheme();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    return ( 
        <ScrollView>
            <View style={styles.wrapImage}>
           <Image
                source={ic_app_logo}
                style={styles.img}
                resizeMode={"contain"}
           />
            </View>
            <Text style={styles.txtLogin}>
                Forgot Password 
            </Text>
             
           <Text style={styles.txtDetail}>Email</Text>
            <View style={styles.wrapBorderInput}  >
                <Ionicons
                    name="person-outline"
                    color={colors.text}
                    size={20}
                    style={{ marginLeft: 10 }}
                />
                <TextInput
                    style={styles.txtInput}
                    numberOfLines={1}
                    value={email}
                    placeholder={"Email"}
                    onChangeText={(value) => setEmail(value)}
                />
            </View>
            <Text style={styles.LableError}>A link to set a new password will be sent to your email address</Text>
            <TouchableOpacity>
            <View style={styles.wrapButtonLogin}>
                    {
                        isLoading ?
                            <ActivityIndicator
                                size={20}
                                color={"white"}
                            />
                            :
                            <Text style={styles.txtButtonLogin}>
                                Forget now 
                            </Text>
                    }
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                 onPress={() => navigation.navigate(SCREENNAME.LOGIN_SCREEN )}
                 style={{ alignItems: "center" }}
            >
                 <Text style={styles.txtDetailCreate}>You has account?
                    <Text style={styles.txtCreateAccount}>{" Login now"}</Text>
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
}
export default ForgetPassword;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 0,
        paddingVertical: 35,
    },
    txtLogin: {
        fontSize: 30,
        fontWeight: "bold",
        color: colors.cyan,
        marginTop: 10,
        alignSelf: "center",
        marginBottom : 10
    },
    wrapImage: {
        flexDirection: "row",
        marginTop : 30
    },
    img: {
        marginHorizontal: 80,
        marginVertical: 20,
        aspectRatio: 1,
        flex: 1,
    },
    txtDetail: {
        fontSize: 18,
        color: "#05375a",
        marginHorizontal: 20,
        paddingBottom: 10,
        fontWeight: 'bold',
    },
    wrapBorderInput: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: colors.cyan,
        borderRadius: 10,
        marginHorizontal: 20,
        marginBottom: 24,
        alignItems: 'center'
    },
    txtInput: {
        flex: 1,
        fontSize: 20,
        color: colors.cyan,
        marginHorizontal: 10
    },
    wrapButtonLogin: {
        backgroundColor: colors.cyan,
        marginHorizontal: 50,
        marginTop: 20,
        borderRadius: 10,
        alignItems: "center",
        paddingVertical: 15,
    },
    txtButtonLogin: {
        fontSize: 20,
        color: colors.white,
        fontWeight: "bold",
    },
    txtDetailCreate: {
        fontSize: 16,
        color: "gray",
        marginVertical: 20,
    },
    txtCreateAccount: {
        fontSize: 16,
        color: colors.cyan,
        fontWeight: "bold",
    },
    LableError: {
        paddingTop: 30,
        fontSize: 18,
        marginLeft: 30
    },
    Header: {
        width: '100%',
        height: '20%',
        backgroundColor: 'white'
    },
    
})
