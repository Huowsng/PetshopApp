import React, { useState } from 'react';
import { View, Text, Image, ScrollView, FlatList, Dimensions, Pressable } from 'react-native';
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import colors from '../../shared/colors';
import { SCREENNAME, ic_app_logo, ic_cleaning, ic_hotel, ic_pet, ic_pet1, ic_pet2, ic_pet3, ic_vacin } from '../../shared';
import { ScreenHeight } from 'react-native-elements/dist/helpers';
import AppHeader from '../Header/AppHeader';

const HomeScreen = () => {
    const navigation = useNavigation();
    const images = [
            <View style={styles.slide}>
                <Image
                source={ic_pet1}
                style={styles.image}
                resizeMode="contain"
                />
            </View>,
            <View style={styles.slide}>
                <Image
                source={ic_pet2}
                style={styles.image}
                resizeMode="contain"
                />
            </View>,
            <View style={styles.slide}>
                <Image
                source={ic_pet3}
                style={styles.image}
                resizeMode="contain"
                />
            </View>
    ];
    const views = [
            <View style={styles.serviceGridContainer}>
                <TouchableOpacity style={styles.serviceContainer}>
                    <View style={styles.serviceContainerImage}>
                        <Image
                            source={ic_vacin}
                            style={{ width: 100, height: 50 }}
                        />
                    </View>
                    <View style={styles.serviceContainerLabel}>
                        <Text style={styles.serviceContainerLabelText}>Vaccination</Text>
                    </View>
                    <View style={styles.serviceContainerParagraph}>
                        <Text style={styles.serviceContainerParagraphText}>
                             With lots of unique blocks you can easily create a page without coding with Appmax easily.
                    </Text>
                    </View>
               </TouchableOpacity>
            </View>,
            <View style={styles.serviceGridContainer}>
                <TouchableOpacity style={styles.serviceContainer}>
                    <View style={styles.serviceContainerImage}>
                        <Image
                            source={ic_pet}
                            style={{ width: 100, height: 50 }}
                        />
                    </View>
                    <View style={styles.serviceContainerLabel}>
                        <Text style={styles.serviceContainerLabelText}>Pet Grooming</Text>
                    </View>
                    <View style={styles.serviceContainerParagraph}>
                        <Text style={styles.serviceContainerParagraphText}>
                            We know how to make your pet more classy. With the dog / cat hair trimming service, we will help the children become the most perfect version.
                        </Text>
                    </View>
                    <Pressable style = {styles.next} onPress={() => { navigation.navigate(SCREENNAME.GROMMING_SCREEN) }}>
                    <FontAwesome5 name="arrow-right" size={35} color="black" />
                     </Pressable>
                </TouchableOpacity>
            </View>,
            <View style={styles.serviceGridContainer}>
                <TouchableOpacity style={styles.serviceContainer}>
                    <View style={styles.serviceContainerImage}>
                        <Image
                            source={ic_hotel}
                            style={{ width: 100, height: 50 }}
                        />
                    </View>
                    <View style={styles.serviceContainerLabel}>
                        <Text style={styles.serviceContainerLabelText}>Hotel</Text>
                    </View>
                    <View style={styles.serviceContainerParagraph}>
                        <Text style={styles.serviceContainerParagraphText}>
                             Every action at PET FIRST starts with the mission of Sending Love. Every new pet that comes to us is taken care of by a team of experienced staff.
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>,
            <View style={styles.serviceGridContainer}>
                <TouchableOpacity style={styles.serviceContainer}>
                    <View style={styles.serviceContainerImage}>
                        <Image
                            source={ic_cleaning}
                            style={{ width: 100, height: 50 }}
                        />
                    </View>
                    <View style={styles.serviceContainerLabel}>
                        <Text style={styles.serviceContainerLabelText}>Cleaning</Text>
                    </View>
                    <View style={styles.serviceContainerParagraph}>
                        <Text style={styles.serviceContainerParagraphText}>
                            With lots of unique blocks you can easily create a page without coding with Appmax easily.
                        </Text>
                    </View>
                    <Pressable style = {styles.next} onPress={() => { navigation.navigate(SCREENNAME.CLEANING_SCREEN) }}>
                    <FontAwesome5 name="arrow-right" size={35} color="black" />
                     </Pressable>
                </TouchableOpacity>
            </View>,
      ];
        return (
            <View style={styles.container}>
                <AppHeader />
                <ScrollView>
                <Swiper style={styles.wrapper} autoplay={true} >
                        {images.map((images, index) => (
                             <View key={index} style={styles.slide}>
                                {images}
                             </View>
                             ))}
                    </Swiper>
                <View style={styles.serviceImage}>
                    <Image
                    source={{
                        uri:
                        'https://demothemedh.b-cdn.net/petpuzzy/wp-content/uploads/2022/07/h1-foot.png',
                    }}
                    style={{ width: 100, height: 100 }}
                    />
                </View>
                <View style={styles.serviceLabel}>
                    <Text style={styles.serviceLabelText}>Our Services</Text>
                </View>
                <View style={styles.serviceParagraph}>
                    <Text style={styles.serviceParagraphText}>
                    Grooming & Supply provides grooming services for all dog and catbreeds. We are fully committed to the health.
                    </Text>
                </View>
                
                
                <Swiper style={styles.wrapper} autoplay={true} >
                {views.map((view, index) => (
                <View key={index} style={styles.slide}>
                    {view}
                    
                </View>
                ))}
            </Swiper>
            <View style={styles.serviceLabel}>
                    <Text style={styles.serviceLabelText}>Safety</Text>
            </View>
             <View style={styles.serviceParagraph}>
                    <Text style={styles.serviceParagraphText}>
                    Chúng tôi đặt sức khỏe của thú cưng của bạn lên hàng đầu và làm mọi thứ trong khả năng của
                            mình để đảm bảo rằng bạn và thú cưng của bạn có một cuộc sống năng động.
                    </Text>
                </View>
            </ScrollView>
            </View>
        );
};

const styles = {
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingHorizontal: 0,
        paddingVertical: 35,
    },
    serviceWrapper: {
      paddingHorizontal: 20,
      paddingVertical: 30,
    },
    serviceLabelContainer: {
      marginBottom: 0,
    },
    serviceImage: {
      marginBottom: 10,
      alignItems: 'center',
    },
    serviceLabel:{
      alignItems: 'center',
      marginBottom: 10,
    },
    serviceLabelText: {
        
      fontSize: 25,
      fontWeight: 'bold',
      color : '#082d33'
    },
    serviceParagraph: {
      marginBottom: 0,
    },
    serviceParagraphText: {
      textAlign: 'center',
      fontSize: 16,
    },
    serviceGridContainer: {
        backgroundColor : 'grey',
        width: '100%', 
    },
    serviceContainer: {
      width: '100%',
      
      padding: 80,
      marginBottom: 600,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 200,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    serviceContainerImage: {
      alignItems: 'center',
      marginBottom: 10,
    },
    serviceContainerLabel: {
      alignItems: 'center',
      marginBottom: 10,
    },
    serviceContainerLabelText: {
      fontSize: 25,
      fontWeight: 'bold',
    },
    serviceContainerParagraph: {
      marginBottom: 10,
    },
    serviceContainerParagraphText: {
      textAlign: 'center',
    },
    serviceBtn: {
      marginTop: 20,
      alignItems: 'center',
    },
    serviceBtnTouchable: {
      backgroundColor: '#fff',
    },
    txtHome: {
        fontSize: 40,
        fontWeight: "bold",
        color: '#082d33',
        marginTop: 30,
        alignSelf: "center",
    },
    wrapper: {
        marginBottom: 10,
        height: 350,
    },
    slide: {
        height: '100%',
      },
      image: {
        width: '100%',
        height: '100%',
      },
    next :{
        alignItems: 'center',
    }
}
  
  export  default HomeScreen