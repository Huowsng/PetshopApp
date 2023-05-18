import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Alert,Image,ActivityIndicator } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, useTheme } from '@react-navigation/native';
import { useDispatch } from "react-redux";
import { Feedback, IProductprops, SCREENNAME, fonts, ic_dot_orange, ic_heart } from '../../../shared';
import colors from '../../../shared/colors';
import { Rating } from 'react-native-elements';
const FeedbackComp = ({ listFeedback }: any) => {
    const [data, setData] = React.useState<Feedback[]>([]);

    React.useEffect(() => {
        setData(listFeedback)
    }, [listFeedback])
    console.log(data)
    const FeedbackItem = (index: number, key: any) => {
        return <View style={styles.wrapItem} key={key}>
            <View style={{ flex: 1, height: 1, backgroundColor: "gray", marginBottom: 5 }} />
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                {data[index].user_id}
            </Text>
            <View style={{ width: 120, marginVertical: 10 }}>
                <Rating
                    ratingCount={5}
                    startingValue={data[index].rating}
                    readonly={true}
                    imageSize={20}
                />
            </View>
            <Text>
                {data[index].content}
            </Text>
            {
                !data[0].image_url
                    ?
                    <View />
                    :
                    <Image
                        source={{ uri: data[index].image_url }}
                        style={styles.wrapImage}
                        resizeMode={"cover"}
                    />
            }
        </View>
    }
    return (
        <View>
          <View style={styles.container}>
            <Text style={styles.txtTitle}>{`Product Feedback`}</Text>
            <Text style={{ fontSize: 16, fontWeight: "normal", marginBottom: 10 }}>{` (${data?.length ?? 0} feedbacks)`}</Text>
            {data?.map((item: any, index: number) => {
              return FeedbackItem(index, index);
            })}
          </View>
          <View style={{ height: 50 }} />
        </View>
      );
}
export default FeedbackComp
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: "white",
        borderRadius: 10,
    },
    wrapImage: {
        aspectRatio: 1,
        margin: 10,
        width: 100,
    },
    txtTitle: {
        fontSize: 20,
        fontWeight: "bold",
    },
    wrapItem: {
        marginVertical: 10
    }
});