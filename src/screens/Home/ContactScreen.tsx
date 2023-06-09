import React, { useState } from 'react';
import { View, Text, Image, ScrollView, FlatList, Dimensions, Pressable, TextInput } from 'react-native';
import { AntDesign, FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import colors from '../../shared/colors';
import { SCREENNAME, ic_app_logo, ic_cleaning, ic_hotel, ic_pet, ic_pet1, ic_pet2, ic_pet3, ic_vacin } from '../../shared';
import { ScreenHeight } from 'react-native-elements/dist/helpers';
import AppHeader from '../Header/AppHeader';
const ContactScreen = () => {
    return (
        <View style={styles.container}>
            <AppHeader/>
            <ScrollView>
            <View style={styles.contactInfo}>
                <Text style={styles.title}>Thông tin liên hệ</Text>
                <Text style={styles.text}>
                    Petshop thuộc công ty TNHH May Mặc Thăng Long là thương hiệu hơn 20 năm lĩnh vực dệt may thủ công
                    truyền thống. Chuyên xuất khẩu các sản phẩm từ cotton 100% từ thiết kế đến sản xuất: túi xách,
                    ba-lô, bóp ví, phụ kiện thời trang,....uy tín
                </Text>
                <View style={styles.contactInfoItem}>
                    {/* <FontAwesomeIcon icon={faLocation} style={styles.contactIcon} /> */}
                    <View style={styles.contactSs}>
                    <TouchableOpacity style={styles.contactButton}>
                    <AntDesign name="enviroment" style={styles.contactIcon} />
                        <Text style={styles.text}>Địa Chỉ {'\n'}62/4 Trần Bình Trọng, Phường 8, TP. Vũng Tàu </Text>
                    </TouchableOpacity>                   
                    </View>
                </View>
                <View style={styles.contactInfoItem}>
                <View style={styles.contactSs}>
                    <TouchableOpacity style={styles.contactButton}>
                        <FontAwesome5 name = "phone-alt" style={styles.contactIcon} />
                        <Text style={styles.text}>Điện thoại {'\n'}0825.178.860 </Text>
                    </TouchableOpacity>                   
                    </View>
                </View>
                <View style={styles.contactInfoItem}>
                    <View style={styles.contactSs}>
                    <TouchableOpacity style={styles.contactButton}>
                    <Ionicons name="mail" style={styles.contactIcon} />
                        <Text style={styles.text}>Email {'\n'}nguyen1522002@gmail.com </Text>
                    </TouchableOpacity>                   
                    </View>
                </View>
                <View style={styles.contactInfoItem}>
                <View style={styles.contactSs}>
                    <TouchableOpacity style={styles.contactButton}>
                    <Ionicons name="mail" style={styles.contactIcon} />
                        <Text style={styles.text}>Map {'\n'}nguyen1522002@gmail.com </Text>
                    </TouchableOpacity>                   
                    </View>
                </View>
            </View>
            <View style={styles.contactForm}>
                <Text style={styles.title}>Bạn có bất kỳ câu hỏi nào?</Text>
                <Text style={styles.text}>Bạn có câu hỏi, nhận xét hoặc ý tưởng tuyệt vời muốn chia sẻ? Gửi cho chúng tôi một ghi chú nhỏ bên dưới - chúng tôi muốn nghe ý kiến của bạn và sẽ luôn trả lời!</Text>

                <View style={styles.form}>
                    <View style={styles.contactInput}>
                        <Text>Họ và tên</Text>
                        <TextInput style={styles.input} placeholder='Nhập họ và tên' />
                    </View>
                    <View style={styles.contactInput}>
                        <Text>Số điện thoại</Text>
                        <TextInput style={styles.input} placeholder='Nhập số điện thoại' />
                    </View>
                    <View style={styles.contactInput}>
                        <Text>Nhập email</Text>
                        <TextInput style={styles.input} placeholder='Nhập email' />
                    </View>
                    <View style={styles.contactInput}>
<Text>Nhập nội dung</Text>
                        <TextInput style={styles.input} placeholder='Nhập nội dung liên hệ' />
                    </View>
                    <TouchableOpacity style={styles.button} onPress={() => {}}>
                        <Text style={styles.buttonText}>Gửi tin nhắn</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </ScrollView>
        </View>
    );
}

const styles = {
    container: { 
        flex: 1,
        paddingHorizontal: 0,
        paddingVertical: 35,
        backgroundColor: '#fff'
    },
    contactButton: {
        flexDirection: 'row',   
   
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10
    },
    text: {
        fontSize: 16,
        marginBottom: 20
    },
    contactInfo: {
        alignItems: 'center',
        marginBottom: 30,
        marginTop : 15,
    },
    contactInfoItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    contactIcon: {
        marginRight: 10,
        fontSize : 35
    },
    contactSs: {
        flex: 1,
        marginLeft: 10
    },
    contactTitle: {
        fontWeight: 'bold',
        marginBottom: 5
    },
    contactForm: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 20
    },
    form: {
        marginTop: 20
    },
    contactInput: {
        marginBottom: 20
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center'
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold'
    }
}

export default ContactScreen