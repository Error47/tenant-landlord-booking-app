import React, { useState, Component } from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Utility from "../../common/utility";
const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  property: {
    // height: "40%",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    margin: "5%",
    borderBottomWidth: 2,
    borderWidth: 0,
    borderRadius: 15,
    marginBottom: height*0.01,
    paddingBottom: height*0.01
  },

  main: {
    backgroundColor: "#fff",
    width: "90%",
    display: "flex",
    // maxHeight: "20%",
    flex: 1,
    flexDirection: "column",
    marginTop: "5%",
  },

  corner: {
    height: "10%",
    width: "20%",
    position: "absolute",
    right: 5,
    marginTop: "2%",
  },

  top: {
    width: "100%",
    height: height*0.05,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    shadowColor: "#000",
    shadowRadius: 20,
    overflow: "hidden",
    shadowOpacity: 1,
    shadowOffset:{width:0, height: 0},
    elevation: 10,
    color: "#000",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    position: "absolute",
    backgroundColor: "#FFF",
    marginBottom: "5%"
  },
});
// =====================STYLE_SHEET===========================

class List extends React.Component {
  constructor(props) {
    super(props);
    console.log("list constructor");
    this.utility = new Utility();
  }
  utility;
  state = {
    user: {},
    search: "",
    propertyList: [],
  };

  async setPropertyList() {
    return (await this.state.propertyList.length)
      ? true
      : this.utility.makeGetRequest("search").then((resp) => {
          console.log("response property", resp);
          if (resp?.success) {
            this.setState({ propertyList: resp?.data });
          }
        });
  }
  componentDidMount() {
    this.utility.getValue("api_url").then((res) => {
      if (this.props.searchKey.length > 0)
        return this.setState({ propertyList: this.props.propertyList });
      this.setPropertyList();
    });
  }
  componentWillUnmount() {
    this.props.resetSearch("");
  }
  render() {
    const { search } = this.state;
    const { navigate } = this.props.navigation;
    let url = this.utility.getApiUrl();
    console.log("url in list", this.utility.getApiUrl());
    return (
      <ScrollView
        style={{
          backgroundColor: "#FFF",
          // height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <View style={styles.top}>
          <Text style={{
                        fontSize: 16,
                        color: "#23b3d5",
                        fontWeight: "bold",
                        paddingVertical: 10
                      }}>
                        Available Properties
            </Text>
        </View>
        <View style={styles.main}>
          {this.state.propertyList.length ? (
            this.state.propertyList.map((property) => {
              return (
                <View style={styles.property} key={property?.id}>
                  <TouchableOpacity
                    activeOpacity={1}
                    style={{
                      width: "40%",
                      height: "70%",
                      borderRadius: 15,
                      marginTop: "2.5%",
                      position: "absolute",
                      left: "7%",
                      marginRight: "70%",
                    }}
                    onPress={() => {
                      navigate("Detail", { id: property?.id });
                    }}
                  >
                    <Image
                      key={property?.id}
                      source={
                        !property?.image_url
                          ? require("../../../assets/1.jpg")
                          : {
                              uri: url?.slice(0, -1) + property?.image_url,
                            }
                      }
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: 15,
                      }}
                    />
                  </TouchableOpacity>

                  {property?.for_sell == "true" ? (
                    <Image
                      key={property?.for_rent}
                      source={require("../../../assets/sell.png")}
                      style={styles.corner}
                    />
                  ) : (
                    <Image
                      key={property?.for_rent}
                      source={require("../../../assets/rent.png")}
                      style={styles.corner}
                    />
                  )}
                  {console.log()}
                  <View
                    style={{
                      marginLeft: "30%",
                      marginTop: "10%",
                      justifyContent: "flex-start",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "bold",
                      }}
                    >
                      {property?.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        color: "#23b3d5",
                        fontWeight: "bold",
                      }}
                    >
                      Location : {property?.location}
                    </Text>
                    <View style={{ display: "flex", flexDirection: "row" }}>
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: "bold",
                          color: "#057a0f",
                        }}
                      >
                        {property?.user.name}
                      </Text>
                      {property?.user.role == "seller" ? (
                        <Image
                          source={require("../../../assets/verified.png")}
                          style={{ width: 20, height: 20 }}
                        />
                      ) : (
                        <Image />
                      )}
                    </View>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: "bold",
                        color: "#057a0f",
                      }}
                    >
                      ₹
                      {property?.rent_detail?.rent_per_month == undefined
                        ? "50,00000"
                        : property?.rent_detail?.rent_per_month + "/month"}
                    </Text>
                    {property?.for_rent == "true" ? (
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: "bold",
                        }}
                      >
                        Members Allowed:{" "}
                        {property?.rent_detail?.members == undefined
                          ? "2"
                          : property?.rent_detail?.members}
                        {"\n"}
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: "bold",
                            position: "absolute",
                            color: "#D3D3D3",
                          }}
                        >
                        {parseInt(property?.created_at) == 0 ? "Published Today" : "Published " + property?.created_at +" ago" }
                        </Text>
                      </Text>
                    ) : (
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: "bold",
                          color: "#D3D3D3",
                        }}
                      >
                        {parseInt(property?.created_at) == 0 ? "Published Today" : "Published " + property?.created_at + " ago" }
                      </Text>
                    )}
                  </View>
                </View>
              );
            })
          ) : (
            <Text style={{textAlign: "center", color: "#5694ca", fontSize: 14}}> No property matched with your current search!</Text>
          )}
        </View>
      </ScrollView>
    );
  }
}
export default List;
