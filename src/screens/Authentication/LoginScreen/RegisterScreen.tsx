import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Alert,Image,ActivityIndicator } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useTheme } from '@react-navigation/native';
import { useDispatch } from "react-redux";
import colors from '../../../shared/colors';
import { ic_app_logo, img_login } from '../../../shared/assets';
import { SAVE_APP_TOKEN } from '../../../redux/actions/actionTypes';
import { SCREENNAME } from '../../../shared';
import axios from 'axios';
import Toast from 'react-native-toast-message';
const RegisterScreen = () => {
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const { colors } = useTheme();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const handleLogin = async () => {
      setIsLoading(true);
      var body = JSON.stringify({
        email: email,
        password: password,
        name : name
      });
    
      try {
        const response = await axios.post('https://petshop-95tt.onrender.com/user/register', body, {
          headers: {
            Accept: '*/*',
            'Content-Type': 'application/json',
            "Connection": "keep-alive"
          }
        });
    
        if (response.status === 400) {
          showPopup();
          throw new Error("Invalid email or password");
        }
    
        const responseData = response.data;
        Toast.show({
          type: 'success',
          text1: 'Dang ki thanh cong',
          visibilityTime: 2000,
          autoHide: true,
          topOffset: 30,
        });
        navigation.navigate(SCREENNAME.LOGIN_SCREEN);
        dispatch({
          type: SAVE_APP_TOKEN,
          payload: responseData.accesstoken
        });
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
      
      const showPopup = () => {
        Alert.alert(
          "Login Failed",
          "Try another password or username",
          [
            { text: "OK" }
          ]
        );
      };
    return (
    
    <ScrollView >
      <View style={styles.wrapImage}>
           <Image
                source={ic_app_logo}
                style={styles.img}
                resizeMode={"contain"}
           />
      </View>
      <Text style={styles.txtLogin}>
        Register
      </Text>
      
      <Text style={styles.txtDetail}>Name</Text>
      <View style={styles.wrapBorderInput}>
      <Ionicons
            name="person-outline"
            color={colors.text}
            size={20}
            style={{ marginLeft: 10 }}
      />
      <TextInput
            style={styles.txtInput}
            numberOfLines={1}
            value={name}
            placeholder="Name"
            onChangeText={value => setName(value)}
      />
    </View>
      <Text style={styles.txtDetail}>Email</Text>
      <View style={styles.wrapBorderInput}>
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
            placeholder="Email"
            onChangeText={value => setEmail(value)}
      />
    </View>
    <Text style={styles.txtDetail}>Password</Text>
    <View style={styles.wrapBorderInput}>
      <Ionicons
        name="lock-closed-outline"
        color={colors.text}
        size={20}
        style={{ marginLeft: 10 }}
      />
      <TextInput
        style={styles.txtInput}
        secureTextEntry={true}
        numberOfLines={1}
        placeholder="Password"
        value={password}
        onChangeText={value => setPassword(value)}
      />
    </View>
    <TouchableOpacity onPress={handleLogin}>
      <View style={styles.wrapButtonLogin}>
        {isLoading ? (
          <ActivityIndicator size={20} color={colors.text} />
        ) : (
          <Text style={styles.txtButtonLogin}>Register now</Text>
        )}
      </View>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() => navigation.navigate(SCREENNAME.LOGIN_SCREEN )}
      style={{ alignItems: 'center' }}
    >
      <Text style={styles.txtDetailCreate}>
        Login?
        <Text style={styles.txtCreateAccount}> </Text>
      </Text>
    </TouchableOpacity>
    
    </ScrollView>
    );
}
export default RegisterScreen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 0,
        paddingVertical: 35,
    },
    img: {
        marginHorizontal: 80,
        marginVertical: 20,
        aspectRatio: 1,
        flex: 1,
    },
    wrapImage: {
        flexDirection: "row",
        alignSelf: 'center'
        
    },
    txtLogin: {
        fontSize: 40,
        fontWeight: "bold",
        color: colors.cyan,
        marginTop: 30,
        alignSelf: "center",
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
    txtButtonLogin: {
        fontSize: 20,
        color: colors.white,
        fontWeight: "bold",
    },
    wrapButtonLogin: {
        backgroundColor: colors.cyan,
        marginHorizontal: 50,
        marginTop: 20,
        borderRadius: 10,
        alignItems: "center",
        paddingVertical: 15,
    },
    txtDetail: {
        fontSize: 18,
        color: "#05375a",
        marginHorizontal: 20,
        paddingBottom: 10,
        fontWeight: 'bold',
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
    }
})
