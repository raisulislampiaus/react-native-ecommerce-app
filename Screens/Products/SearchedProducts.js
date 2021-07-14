import React from 'react'
import { View, StyleSheet,Dimensions } from 'react-native';
import { Content, Left, Body, ListItem, Thumbnail, Text } from 'native-base';
var { width } = Dimensions.get("window");

const SearchedProducts = (props) => {
    const { productsFiltered } = props;
    return (
        <Content style={{ width: width }}>
          { productsFiltered.length > 0 ? (
               productsFiltered.map((item) => (
                    <ListItem 
                      onPress={() => 
                        props.navigation.navigate("Product Detail", { item: item})
                       }
                      key={item._id}
                      avatar
                    >
                       <Left>
                         <Thumbnail
                           source={{ uri: item.image ? 
                           item.image : 'https://cdn.pixabay.com/photo/2016/09/23/11/37/cardboard-1689424_960_720.png' 
                                  }}
                         />
                       </Left>
                       <Body>
                         <Text>{item.name}</Text>
                         <Text note>{item.description}</Text>
                       </Body>
                    </ListItem>
               ))
          ) : (
              <View style={styles.center}>
                <Text style={{ alignSelf: 'center' }}>
                  no products match
                </Text>
              </View>
          )}
        </Content>
    );
};

const styles = StyleSheet.create({
    center: {
        alignContent: 'center',
        justifyContent: 'center',
    }
})

export default SearchedProducts
