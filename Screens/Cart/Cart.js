import React from 'react'
import {
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
   Button
} from "react-native";
import {
  Container,
  Text,
  Left,
  Right,
  H1,
  Thumbnail,
  ListItem,
  Body,
 
  
} from "native-base";
import { connect } from 'react-redux'
var { height, width } = Dimensions.get("window");
import * as actions from "../../Redux/Actions/cartActions";
import CartItemss from './CartItemss'
import { SwipeListView } from 'react-native-swipe-list-view'
import Icon from "react-native-vector-icons/FontAwesome";

const Cart = (props) => {
  let total = 0;
  props.cartItems.forEach(cart => {
    return (total += cart.product.price)
  });
    return (
        <>
                {props.cartItems.length ? (
                        <Container>
                                <H1 style={{ alignSelf: "center" }}>Cart</H1>
                                 <SwipeListView 
                                  data={props.cartItems}
                                  renderItem={(data) => (
                                    <CartItemss item={data} />
                                  )}
                                  renderHiddenItem={(data) =>(
                                    <View style={styles.hiddenContainer}>
                                     <TouchableOpacity 
                                     style={styles.hiddenButton}
                                     onPress={() => props.removeFromCart(data.item)}
                                     >
                                      <Icon name="trash" color={"white"} size={30} />
                                     </TouchableOpacity>
                                    </View>
                                  )}
                                  disableRightSwipe={true}
                                  previewOpenDelay={3000}
                                  friction={1000}
                                  tension={40}
                                  leftOpenValue={75}
                                  stopLeftSwipe={75}
                                  rightOpenValue={-75}
                                 />
                                <View style={styles.bottomContainer}>
                                  <Left>
                                     <Text style={styles.price}>$ {total}</Text>
                                  </Left>
                                  <Right>
                                    <Button title="Clear" 
                                     onPress={() => props.clearCart()}
                                    />
                                  </Right>
                                  <Right>
                                    <Button title="Checkout" 
                                    onPress={() => props.navigation.navigate('Checkout')}
                                    />
                                  </Right>
                                </View>
                        </Container>
                ) : (
                        <Container style={styles.emptyContainer}>
                            <Text>Looks like your cart is empty</Text>
                            <Text>Add products to your cart to get started</Text>
                        </Container>
                )}
        </>
    );
}

const mapStateToProps = (state) =>{
    const { cartItems } = state;
    return {
        cartItems: cartItems,
    };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => dispatch(actions.clearCart()),
    removeFromCart: (item) => dispatch(actions.removeFromCart(item))
    }
}

const styles = StyleSheet.create({
  emptyContainer: {
    height: height,
    alignItems: "center",
    justifyContent: "center",
  },
  listItem: {
      alignItems: 'center',
      backgroundColor: 'white',
      justifyContent: 'center'
  },
  body:{
      margin: 10,
      alignItems: 'center',
      flexDirection: 'row'
  },
  bottomContainer: {
      flexDirection: 'row',
      position: 'absolute',
      bottom: 0,
      left: 0,
      backgroundColor: 'white',
      elevation: 20
  },
  price: {
      fontSize: 18,
      margin: 20,
      color: 'red'
  },

  hiddenContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row'
  },
  hiddenButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 25,
    height: 70,
    width: width / 1.2
  }
  
});


export default connect(mapStateToProps, mapDispatchToProps)(Cart);
