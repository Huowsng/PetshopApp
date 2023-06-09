import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image, RefreshControl, ActivityIndicator, FlatList, TextInput } from "react-native";
import { useDispatch, useSelector, Provider } from "react-redux";
import { cat, fonts, ICart, ic_app_logo, ic_menu, ic_trash, IItemType, IListOrderItem, IProductCart, IStore, SCREENNAME, ic_paypal} from "../../shared";
import { DrawerActions, useNavigation, useRoute } from "@react-navigation/native";
import colors from "../../shared/colors";
import { RadioButton, Snackbar } from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import AppHeader from "../Header/AppHeader";
import { ScrollView } from "react-native-gesture-handler";

const PaymentScreen = ({ navigation }: any) => {

  const route = useRoute();
  const { orderID } = route.params as { orderID: string };
  const { totalPay } = route.params as { totalPay: number }
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [open, setOpen] = useState(false);
  const [provinces, setProvinces] = useState([{}])
  const [provinceIndex, setProvinceIndex] = useState<number>(-2);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [districts, setDistricts] = useState<any>([])
  const [isLoadingDistrict, setIsLoadingDistrict] = useState<boolean>(false);
  const [openDistric, setOpenDistrict] = useState(false);
  const [districtIndex, setDistrictIndex] = useState<number>(-2);
  const token = useSelector((state: IStore) => state?.appReducer.token);
  const [url, setURL] = useState<string>("")
  const [name, setName] = useState("")
  const [phone, setphone] = useState("")
  const [detailAddress, setDetailAddress] = useState<string>("")
    
  const checkoutOrder = (async () => {
      setIsLoading(true);
      var body = JSON.stringify({
          order_id: orderID
      })
      await fetch(`https://petshop-95tt.onrender.com/api/cart/checkout`,
          {
              method: "POST",
              headers: {
                  Accept: '*/*',
                  'Content-Type': 'application/json',
                  "Connection": "keep-alive",
                  "Authorization": `${token}`
              },
              body: body,
          }
      ).finally(() => {
          setIsLoading(false);
      }).then((response) => {
          return response.json()
      })
          .then((response,) => {
              if (response.url == null) {
                  Toast.show({
                      type : 'error',
                      text1 : 'An error when checkout order. Please try again later',
                      visibilityTime: 2000,
                    autoHide: true,
                  });
              }
              else {
                if( paymentMethod === 'cash'){
                    Toast.show({
                        type: 'success',
                        text1: 'Đặt hàng thành công',
                        visibilityTime: 2000,
                        autoHide: true,
                      });
                    navigation.navigate(SCREENNAME.HOME_SCREEN)
                  }
                  else if(paymentMethod === 'PayPal'){
                    navigation.navigate(SCREENNAME.WEBVIEW_CHECKOUT_SCREEN, { pay_url: response.url })
                  }
                  
              }
          })
          .catch((error) => {
              console.error(error);
          });
      setIsLoading(false);
  })

  const getProvinces = (async () => {
      await fetch(`https://vn-public-apis.fpo.vn/provinces/getAll?limit=-1`,
          {
              method: "GET",
              headers: {
                  Accept: '*/*',
                  'Content-Type': 'application/json',
                  "Connection": "keep-alive",
              },
          }
      ).finally(() => {
          setIsLoading(false);
      }).then((response) => {
          return response.json()
      })
          .then((response) => {
              var provinceData = [{ label: "Select province", value: -1, code: 0 }];
              response.data.data.map((item: any, index: number) => {
                  provinceData = [...provinceData, { label: item.name, value: index, code: item.code }]
              });
              setProvinces(provinceData)
          })
          .catch((error) => {
              console.error(error);
          });
  })

  const getDistricts = async () => {
    setIsLoadingDistrict(true);
    const code: any = provinces[provinceIndex + 1];
    const url = `https://vn-public-apis.fpo.vn/districts/getByProvince?limit=-1&provinceCode=${code.code}`;
    console.log(url);
    await fetch(url, {
        method: "GET",
        headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
            Connection: "keep-alive",
        },
    })
        .finally(() => {
            setIsLoading(false);
        })
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            if (response.data && response.data.data) {
                var districData = [{ label: "Chọn quận/huyện", value: -1 }];
                response.data.data.map((item: any, index: number) => {
                    districData = [...districData, { label: item.name, value: index }];
                });
                setDistricts(districData);
            }
        })
        .catch((error) => {
            console.error(error);
        });
    setIsLoadingDistrict(false);
};
  const onSetAddress = async () => {
      setIsLoading(true);
      const body = {
          order_id: orderID,
          phone: phone,
          name: name,
          address: `${detailAddress}, ${districts[districtIndex + 1].label}, ${provinces[provinceIndex + 1].label}`
      }
      await fetch(`https://petshop-95tt.onrender.com/api/orders`,
          {
              method: "PUT",
              headers: {
                  Accept: '*/*',
                  'Content-Type': 'application/json',
                  "Connection": "keep-alive",
                  "Authorization": `${token}`
              },
              body: JSON.stringify(body)
          }
      ).finally(() => {
      }).then((response) => {
            checkoutOrder();
          return response.json()
          
          
      })
          
          .catch((error) => {
              console.error(error);
          });
  }

  React.useEffect(() => {
      getProvinces()
  }, [])

  React.useEffect(() => {
      if (provinceIndex >= 0) {
          getDistricts()
          console.log("getojiadf")
      }
  }, [provinceIndex])

  React.useEffect(() => {
      if (provinces)
          console.log(provinces.length)
  }, [provinces])

  React.useEffect(() => {
      console.log("provinceIndex: " + JSON.stringify(provinces[provinceIndex]))
      setDistrictIndex(-2)
      setDistricts([])
  }, [provinceIndex])


  return (
      <View style={styles.container}>
            <AppHeader />
            <ScrollView>
          <View style={styles.body}>
              <View style={styles.creditCard}>

                  <TextInput
                      placeholder='Name'
                      value={name}
                      style={styles.txtInput}
                      placeholderTextColor='#C1C1C1'
                      onChangeText={(value) => setName(value)}
                  />
                  <TextInput
                      placeholder='Phone'
                      value={phone}
                      style={styles.txtInput}
                      placeholderTextColor='#C1C1C1'
                      onChangeText={(value) => setphone(value)}
                  />
                  {
                      provinces.length < 2
                          ?
                          <ActivityIndicator
                              color={colors.cyan}
                              size={"large"}
                          />
                          :
                          <View style={{ marginVertical: 10 }}>
                              <DropDownPicker
                                  open={open}
                                  value={provinceIndex}
                                  items={provinces}
                                  setOpen={setOpen}
                                  setValue={setProvinceIndex}
                                  setItems={setProvinces}
                                  listMode={"MODAL"}
                              />
                          </View>
                  }
                  {
                      isLoadingDistrict
                          ?
                          <ActivityIndicator
                              color={colors.cyan}
                              size={"large"}
                          />
                          :
                          <></>
                  }
                  {
                      districts.length < 1
                          ?
                          <></>
                          :
                          <DropDownPicker
                              open={openDistric}
                              value={districtIndex}
                              items={districts}
                              setOpen={setOpenDistrict}
                              setValue={setDistrictIndex}
                              setItems={setDistricts}
                              listMode={"MODAL"}
                          />
                  }
                  <View style={{ marginTop: 10 }}>
                      <TextInput
                          placeholder='Detail Address'
                          value={detailAddress}
                          style={styles.txtInput}
                          placeholderTextColor='#C1C1C1'
                          onChangeText={(value) => setDetailAddress(value)}
                      />
                  </View>
                  <View>
                        <Text style={styles.txtInput}>Chọn phương thức thanh toán</Text>
                            <RadioButton.Group onValueChange={value => setPaymentMethod(value)} value={paymentMethod}>                          
                                <View style={styles.paymentOption}>
                                    <RadioButton value="cash" />
                                    <Text style={styles.paymentOptionText}>Thanh toán tiền mặt</Text>
                                    
                                </View>
                                <View style={styles.paymentOption}>
                                    <RadioButton value="PayPal" />
                                    <Text style={styles.paymentOptionText}>Thanh toán qua PayPal</Text>
                                    
                                </View>
                        </RadioButton.Group>
                    </View>
              </View>
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                  <Text style={{ fontSize: 20, color: colors.cyan }}>$</Text>
                  <Text style={{ fontSize: 50, color: colors.cyan }}>{`${totalPay}.00`}</Text>
              </View>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                  <Image
                      source={ic_paypal}
                      style={{ height: 100, width: 150 }}
                      resizeMode="contain"
                  />
              </View>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <TouchableOpacity
                      style={[styles.wrapButton, { backgroundColor: (isLoading || name.length < 1 || phone.length < 1 || detailAddress.length < 1 || (districtIndex < 0 && districts.length > 0)) ? "gray" : colors.cyan }]}
                      disabled={isLoading || name.length < 1 || phone.length < 1 || detailAddress.length < 1 || (districtIndex < 0 && districts.length > 0)}
                      onPress={onSetAddress }
                  >
                      {
                          isLoading
                              ?
                              <ActivityIndicator
                                  color={colors.white}
                                  size="small"
                              />
                              :
                              <View>
                                  <Text style={styles.txtButton}>Pay</Text>
                              </View>
                      }
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                      <Text style={styles.txtButtonBack}>Cancel Payment</Text>
                  </TouchableOpacity>
              </View>
          </View>
          </ScrollView>
      </View>
  );
};

export default PaymentScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F2',
        paddingHorizontal: 0,
        paddingVertical: 35,
    },
    body: {
        marginTop: 20,
        flexDirection: 'column',
    },
    header: {
        display: 'flex',
        height: 60,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 20,
    },
    creditCard: {
        backgroundColor: '#FFF',
        padding: 12,
        borderRadius: 20,
        marginTop: 20,
        marginBottom: 50,
        marginHorizontal: 10,
        borderColor: '#D3D3D3',
        borderWidth: 2,
    },
    txtTitle: {
        fontSize: fonts.font20,
        fontWeight: 'bold',
        color: colors.black
    },
    txtView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10,
    },

    txtButton: {
        fontSize: fonts.font20,
        fontWeight: "500",
        color: colors.white
    },
    txtButtonBack: {
        fontSize: fonts.font17,
        fontWeight: "500",
        color: colors.cyan,
        marginTop: 20
    },
    txtInput: {
        fontSize: 20,
        color: colors.black,
        height: 44,
        borderBottomWidth: 1,
        borderBottomColor: colors.gray_bg,
        marginBottom: 20
    },
    wrapButton: {
        height: 50,
        width: 300,
        marginTop: 12,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
    },
    wrapHeaderLogo: {
        backgroundColor: colors.cyan,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: 70,
    },
    wrapLogo: {
        height: 38,
        width: 165,
        aspectRatio: 1,
        marginLeft: 20
    },
    paymentOption: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
      },
      paymentOptionText: {
        flex: 1,
        marginLeft: 10,
      },
})