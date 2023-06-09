import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image, RefreshControl, ActivityIndicator, FlatList, TextInput, ScrollView } from "react-native";
import { useDispatch, useSelector, Provider } from "react-redux";
import { cat, fonts, ICart, ic_app_logo, ic_menu, ic_trash, IItemType, IListOrderItem, IProductCart, IStore, SCREENNAME, ic_paypal, IProfile, ic_back, img_avatar} from "../../shared";
import { DrawerActions, useNavigation, useRoute } from "@react-navigation/native";
import colors from "../../shared/colors";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from '@react-native-community/datetimepicker';

const EditProfileScreen = ({ navigation }: any) => {
        const [image, setImage] = React.useState("");
        const [name, setName] = React.useState("Lam");
        const [username, setUsername] = React.useState("");
        const [email, setEmail] = React.useState("");
        const [address, setAddress] = React.useState("");
        const [phone, setPhone] = React.useState("");
        const [date, setDate] = React.useState(new Date());
        const [open, setOpen] = React.useState(false);

        const avatar = img_avatar;

        const renderHeader = () => {
            return (
                <View style={styles.wrapHeader}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.goBack();
                        }}
                    >
                        <Ionicons name="arrow-back" size={24} color="black" style={styles.wrapButtonBack} />
                    </TouchableOpacity>
                    <View style={styles.wrapTextHeader}>
                        <Text style={styles.txtHeader}>Edit Profile</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.goBack();
                        }}
                    >
                        <MaterialIcons name="done" size={24} color="black" style={styles.ButtonIcon} />
                    </TouchableOpacity>
                </View>
            );}
            return (
                <ScrollView style={styles.container}>
                    {renderHeader()}
                    <View style={{ borderRadius: 100 }}>
                        <Image
                            source={avatar}
                            style={styles.wrapAvatar}
                            resizeMode="contain"
                        />
                    </View>
                    <View style={styles.wrapEditor}>
                        <View style={styles.wrapTextInput}>
                            <Text>Name</Text>
                            <TextInput
                                value={name}
                                placeholder="Enter your name"
                                style={styles.txtInput}
                                onChangeText={setName}
                            />
                        </View>
                        <View style={styles.wrapTextInput}>
                            <Text>Username</Text>
                            <TextInput
                                value={username}
                                placeholder="Enter your username"
                                style={styles.txtInput}
                                onChangeText={setUsername}
                            />
                        </View>
                        <View style={styles.wrapTextInput}>
                            <Text>Email</Text>
                            <TextInput
                                value={email}
                                placeholder="Enter your email"
                                style={styles.txtInput}
                                onChangeText={setEmail}
                            />
                        </View>
                        <View style={styles.wrapTextInput}>
                            <Text>Phone Number</Text>
                            <TextInput
                                value={phone}
                                placeholder="Enter your phone number"
                                style={styles.txtInput}
                                onChangeText={setPhone}
                            />
                        </View>
                        <View style={{ paddingVertical: 40 }}>
                            <Text>Birth day</Text>
                            <TouchableOpacity
                                style={styles.wrapDatePicker}
                                onPress={() => {
                                    setOpen(true);
                                }}
                            >
                                <Text style={styles.txtInput}>{`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`}</Text>
                            </TouchableOpacity>
                        </View>
                        {open && (
                            <DateTimePicker
                                testID="datePicker"
                                value={date}
                                mode="date"
                                display="default"
                                onChange={(event, selectedDate) => {
                                    setOpen(false);
                                    setDate(selectedDate || date);
                                }}
                            />
                        )}
                    </View>
                </ScrollView>
            );
}
export default EditProfileScreen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 0,
        paddingVertical: 35,
    },
    wrapButtonBack: {
        height: 24,
        aspectRatio: 1,
    },
    txtHeader: {
        fontSize: fonts.font20,
        color: colors.black
    },
    wrapTextHeader: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    wrapHeader: {
        flexDirection: "row",
        padding: 20
    },
    wrapAvatar: {
        height: 150,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        marginTop: 40
    },
    wrapEditor: {
        marginHorizontal: 50
    },
    wrapTextInput: {
        marginTop: 40,
        borderBottomColor: colors.gray_bg,
        borderBottomWidth: 2
    },
    txtInput: {
        fontSize: fonts.font16,
        color: colors.black
    },
    wrapDatePicker: {
        padding: 20
    },
    ButtonIcon: {
        marginRight: 16,
        alignItems: 'center',
        fontSize: 24,
        color: 'black'
    },
});
