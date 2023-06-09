import React, { useState } from 'react';
import { View, Text, Image, ScrollView, FlatList, Dimensions } from 'react-native';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import colors from '../../../shared/colors';
import { SCREENNAME, ic_app_logo, ic_cleaning, ic_hotel, ic_pet, ic_pet1, ic_pet2, ic_pet3, ic_vacin } from '../../../shared';
import { ScreenHeight } from 'react-native-elements/dist/helpers';
import AppHeader from '../../Header/AppHeader';

const data1 = ['Cắt Gọn Lông', 'Tỉa Lông Tạo Kiểu', 'Cạo Lông'];
const data2 = [
    {
        comboName: 'Combo #1',
        price: 'Chỉ từ 200.000Đ',
        serviceHas: ['TẮM SẤY', ' VỆ SINH / XỊT THƠM'],
        serviceNone: ['CẠO LÔNG', 'CẮT TỈA / TẠO KIỂU'],
    },
    {
        comboName: 'Combo #2',
        price: 'Chúng từ 300.000Đ',
        serviceHas: ['CẠO LÔNG', 'TẮM SẤY'],
        serviceNone: [' VỆ SINH / XỊT THƠM', 'CẮT TỈA / TẠO KIỂU'],
    },
    {
        comboName: 'Combo #3',
        price: 'Chỉ từ 400.000Đ',
        serviceHas: ['TẮM SẤY', ' VỆ SINH / XỊT THƠM', 'CẮT TỈA / TẠO KIỂU'],
        serviceNone: ['CẠO LÔNG'],
    },
];

const GroomingScreen = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <AppHeader />
            <ScrollView>
                <View style={styles.groomingUp}>
                    <Image
                        source={{ uri: 'https://static.wixstatic.com/media/7cd323_d28ffd44527d4b4b9fdbb22b061979a8~mv2.jpeg/v1/fill/w_1110,h_740,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/7cd323_d28ffd44527d4b4b9fdbb22b061979a8~mv2.jpeg' }}
                        style={styles.groomingUpImg}
                    />
                </View>
                <View style={styles.groomingSer}>
                    <Text style={styles.groomingSerInfo}>Thông tin & bảng giá</Text>
                    <Text style={styles.groomingTitle}>
                        Dịch vụ cắt tỉa lông <Text style={styles.groomingTitleStrong}>TẠI NHÀ</Text>
                    </Text>
                    <View style={styles.groomingInfo}>
                        <View style={styles.groomingInfoLeft}>
                        {data1.map((item, index) => (
                            <View key={index} style={styles.groomingInfoItem}>
                                <FontAwesome5 name='check' color="black" size={24} />
                                <Text style={styles.groomingInfoText}>{item}</Text>
                            </View>
))}
                        </View>
                        <View style={styles.groomingInfoRight}>
                            <Text style={styles.groomingPrice}>Chỉ từ {'\n'} 400.000Đ</Text>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.contactButton} >
                        <FontAwesome5 name = "phone-alt" style={styles.contactIcon} />
                        <Text style={styles.groomingInfoText} onPress={() => navigation.navigate(SCREENNAME.CONTACT_SCREEN )}>Liên hệ chúng tôi</Text>
                    </TouchableOpacity>
                </View>
            
            <View style={styles.groomingCombo}>
            
                <View style={styles.groomingComboLeft}>
                    <Text style={styles.groomingComboTitle}>Bảng giá</Text>
                    <Text style={styles.groomingComboSubtitle}>PET SERVICE COMBO</Text>
                </View>
                <View style={styles.groomingComboRight}>
                {data2.map((item, index) => (
                        <View key={index} style={styles.groomingComboItem}>
                            <View style={styles.comboItem}>
                            <Text style={styles.serComboName}>{item.comboName}</Text>
                            <Text style={styles.serComboPrice}>{item.price}</Text>
                            <View style={styles.serList}>
                                {item.serviceNone.map((items, i) => (
                                <View key={i} style={styles.groomingInfoItem}>
                                    <FontAwesome5 name="minus" size={24} color="black" />
                                    <Text style={styles.groomingInfoText}>{items}</Text>
                                </View>
                                ))}
                                {item.serviceHas.map((items, i) => (
                                <View key={i} style={styles.groomingInfoItem}>
                                    <FontAwesome5 name="check" size={24} color="black" />
                                    <Text style={styles.groomingInfoText}>{items}</Text>
                                </View>
                                ))}
                            </View>
                            <TouchableOpacity style={styles.contactButton} >
                                <FontAwesome5 name="phone-alt" style={styles.contactIcon} />
                                <Text style={styles.groomingInfoText} onPress={() => navigation.navigate(SCREENNAME.CONTACT_SCREEN )}>Liên hệ chúng tôi</Text>
                            </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </View>
            </View>
            </ScrollView>
        </View>
    );
};

const styles = {
    container: {
        flex: 1,
        paddingHorizontal: 0,
        paddingVertical: 35,

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
    groomingSer: {
        backgroundColor: '#18a8a2',
        alignItems: 'center',
    },
    groomingSerInfo: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    groomingTitle: {
        fontSize: 20,
        marginBottom: 10,
    },
    groomingTitleStrong: {
        fontWeight: 'bold',
    },
    groomingInfo: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    groomingInfoLeft: {
        marginLeft: 20,
        flex: 2,
    },
    groomingInfoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    groomingInfoText: {
        marginLeft: 10,
        fontSize : 17,
        
    },
    groomingInfoRight: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F2F2F2',
        padding: 10,
    },
    groomingPrice: {
        textAlign: 'center',
        fontWeight: 'bold',
    },
    contactButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#00BFFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginTop: 10,
    },
    contactIcon: {
        marginRight: 10,
       
    },
    contactText: {
        fontWeight: 'bold',
        color: 'white',
    },
    groomingCombo: {
        backgroundColor: '#18a8a2',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 10,
        paddingHorizontal: 20,
    },
    groomingComboLeft: {
        
        flex: 1,
    },
    groomingComboTitle: {
        fontSize : 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    groomingComboSubtitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    groomingComboRight: {
        flex: 3,
    },
    groomingComboItem: {
        marginBottom: 10,
    },
    comboItem: {
        backgroundColor: '#F2F2F2',
        padding: 10,
        borderRadius: 10,
    },
    serComboName: {
        fontWeight: 'bold',
        marginBottom: 10,
    },
    serComboPrice: {
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#00BFFF',
    },
    serList: {
        marginBottom: 10
    }
}
export default GroomingScreen