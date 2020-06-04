import React, { Component } from 'react';
import { View, Text, Image, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import GridView from 'react-native-super-grid';
import {localhost} from './localhost';

const { width } = Dimensions.get('window');

export default class TopProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={styles.wrapper}>
                <Text style={styles.textStyle}>
                    POPULAR PRODUCTS
            </Text>
                <GridView 
                    itemDimension={130}
                    items={this.props.topProducts}
                    renderItem={(item) => ( item.item.smallImageInfo &&
                        <TouchableOpacity
                            key={item.item.productId}
                            onPress={() => this.props.navigation.navigate('ProductDetails', { product: item.item.productId })}
                        >
                            <View style={styles.wrapper2}>
                                <Image
                                    source={{ uri: 'http://'+localhost+'/store/content/productImage/'+item.item.smallImageInfo.productContentId }}
                                    style={styles.imageStyle}
                                />
                                <Text style={styles.productName}>{item.item.productName}</Text>
                                <Text style={styles.productPrice}>{item.item.price}₹</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
        );
    }
}

//361x452
const imageWidth = (width - 60) / 2;
const imageHeight = (imageWidth / 361) * 452;

const styles = StyleSheet.create({
    wrapper: {
        shadowColor: '#2E272B',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        borderRadius: 6,
        padding: 10,
        margin: 5,
        backgroundColor: 'white'
    },
    wrapper2: {
        shadowColor: '#2E272B', // for ios
        shadowOffset: { width: 0, height: 3 }, //for ios
        shadowOpacity: 0.2,
        borderRadius: 0,
        padding: 0,
        margin: 0,
        backgroundColor: 'white',
        elevation: 8 // shadow for android
    },
    imageStyle: {
        width: imageWidth,
        height: imageHeight,
        alignSelf: 'center',
        //resizeMode: 'cover',
    },
    textStyle: {
        color: 'gray',
        marginBottom: 10,
        fontSize: 20
    },
    productName: {
        fontSize: 13,
        color: 'gray',
        marginLeft: 10,
    },
    productPrice: {
        fontSize: 16,
        color: 'gray',
        marginLeft: 10,
    }

});
