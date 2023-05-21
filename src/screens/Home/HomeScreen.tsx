import React, { useState } from 'react';
import { View, Text, Image, ScrollView, FlatList, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import colors from '../../shared/colors';
import { ic_app_logo, ic_cleaning, ic_hotel, ic_pet, ic_vacin } from '../../shared';
import { ScreenHeight } from 'react-native-elements/dist/helpers';
import AppHeader from '../Header/AppHeader';

const HomeScreen = () => {
    const navigation = useNavigation();
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
                </TouchableOpacity>
            </View>,
      ];
        return (
            <View style={styles.container}>
                <AppHeader />
                <ScrollView>
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
                    <Text style={styles.serviceLabelText}>Our Services</Text>
                </View>
                <View style={styles.serviceParagraph}>
                    <Text style={styles.serviceParagraphText}>
                    Grooming & Supply provides grooming services for all dog and catbreeds. We are fully committed to the health.
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
     
        height: 350,
    },
    slide: {
        height: '100%',
      },
}
  
  export  default HomeScreen