import React, { useState } from 'react';
import { View, Text, Image, ScrollView, FlatList, Dimensions } from 'react-native';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import colors from '../../../shared/colors';
import { SCREENNAME, ic_app_logo, ic_clean, ic_cleaning, ic_hotel, ic_pet, ic_pet1, ic_pet2, ic_pet3, ic_vacin } from '../../../shared';
import { ScreenHeight } from 'react-native-elements/dist/helpers';
import AppHeader from '../../Header/AppHeader';
const CleaningScreen = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.containerMain}>              
        <ScrollView style={styles.container}>
            <View style={styles.groomingUp}>
                    <Image
                        source={ic_clean}
                        style={styles.groomingUpImg}
                    />
                </View>
            <View style={styles.hotelContainer}>
            
                <View style={styles.hotelLeft}>
                    <View style={styles.title}>
                    <Text style={styles.title}>Thông Tin & Bảng Giá</Text>
                    <Text style={styles.subtitle}>
                        Dịch vụ tắm vệ sinh <Text style={{ fontWeight: 'bold' }}>tại nhà</Text>
                    </Text>
                    </View>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>DỊCH VỤ BAO GỒM</Text>
                    </TouchableOpacity>
                    <View style={styles.serviceList}>
                       
                        <Text style ={styles.text}>- Cạo bàn chân/bụng/hậu môn</Text>
                        <Text style ={styles.text}>- Cắt & mài nhẵn móng chân</Text>
                        <Text style ={styles.text}>- Vệ sinh tai & khử mùi tuyến hôi</Text>
                        <Text style ={styles.text}>- Tắm sạch bằng 2 loại sữa tắm</Text>
                        <Text style ={styles.text}>- Sấy & chải bung xù lông</Text>
                        <Text style ={styles.text}>- Xịt thơm bằng nước hoa</Text>
                    </View>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>BẢNG GIÁ</Text>
                    </TouchableOpacity>
                    <View style={styles.servicePrice}>
                      
                        <Text style ={styles.text}>- Dưới 10 kg: <Text style={{ fontWeight: 'bold' }}>300.000đ</Text></Text>
                        <Text style ={styles.text}>- Dưới 20 kg: <Text style={{ fontWeight: 'bold' }}>380.000đ</Text></Text>
                        <Text style ={styles.text}>- Dưới 30 kg: <Text style={{ fontWeight: 'bold' }}>460.000đ</Text></Text>
                        <Text style ={styles.text}>- Dưới 40 kg: <Text style={{ fontWeight: 'bold' }}>540.000đ</Text></Text>
                        <Text style ={styles.text}>- Trên 40 kg: <Text style={{ fontWeight: 'bold' }}>Liên hệ</Text></Text>
                        <Text style ={styles.text1}>Bảng giá sẽ phụ thuộc vào chủng loại + cân nặng + Khu vực.</Text>
                    </View>
                </View>
                <TouchableOpacity  
                         
                        style={styles.contactButton}>
                                <FontAwesome5 name = "phone-alt" style={styles.contactIcon} />
                                    <Text style = {styles.groomingInfoText} onPress={() => navigation.navigate(SCREENNAME.CONTACT_SCREEN )}>Liên hệ chúng tôi</Text>
                </TouchableOpacity>
             
            </View>
        </ScrollView>
        </View> 
    );
};

const styles = {
    container: {
        flexDirection: 'column',
        flex: 1,
        
    },
    containerMain: {
        paddingVertical: 35,
        flex : 1
    },
    hotelContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
    },
    hotelLeft: {
        flex: 1,
        
    },
    title: {
        alignItems: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        
    },
    groomingUp: {
        alignItems: 'center',
        marginTop: 20,
        marginBottom :  5,
        paddingHorizonta2l: 20, 
    },
    groomingUpImg: {
        width: '100%',
        height: 200,
    },
    subtitle: {
        alignItems: 'center',
        fontSize: 25,
        marginBottom: 5,
    },
    button: {
        backgroundColor: 'lightblue',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    icon: {
        fontSize: 20,
    },
    serviceList: {
        marginBottom: 20,
    },
    listTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    servicePrice: {
        marginBottom: 20,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    contactWU: {
        backgroundColor: 'lightgray',
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    text:{
        fontSize : 18,
    },
    text1:{
        fontSize : 18,
        fontStyle: 'italic'
    },
    contactButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#00BFFF',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 20,
        marginBottom : 25
   
    },
    contactIcon: {
        marginRight: 10,
       
    },
    groomingInfoText: {
        marginLeft: 10,
        fontSize : 17,
        
    },
}

export default CleaningScreen