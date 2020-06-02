import React, { Component } from 'react';
import {
    View, Text, StyleSheet, Image, Dimensions, ScrollView, TouchableOpacity,ImageBackground
} from 'react-native';
//import { withNavigationFocus } from 'react-navigation';
import { localhost } from './localhost';
import Swiper from 'react-native-swiper';

import Global from './Global';
import Header from './Header';
import getProductById from './api/getProductById';

// const back = require('../assets/appIcon/back.png');
// const cart = require('../assets/appIcon/cart.png');

const imageUrl = `http://${localhost}/AppBanHangServer/images/product/`;

export default class ProductDetails extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            product: [],
            contentList: []
        };
    }
    addThisProductToCart(product) {
        Global.addProductToCart(product);
        this.refreshPage;
  }

  refreshPage() {
    window.location.reload(false);
  }

  componentDidMount() {
    const productid = this.props.navigation.getParam('product', 'null');
    getProductById(productid)
        .then(res => {
            this.setState({product: res});
            this.setState({contentList: this.state.product.contentList});
        });
}

    render() {
        const {
            wrapper, cardStyle, header,
            footer, backStyle,
            imageContainer, cartStyle, textBlack,
            textSmoke, textHighlight, textMain, titleContainer,
            descContainer, productImageStyle, descStyle, txtMaterial, txtColor
        } = styles;

        // const arrCart = this.props.navigation.getParam('arrCart', 'null');
        return (
            <View style={wrapper}>
                <Header navigation={this.props.navigation} />
                <View style={cardStyle}>
                    <View style={header}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Image style={backStyle} source={require('../assets/appIcon/back.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.addThisProductToCart(this.state.product)}
                        >
                            <Image style={cartStyle} source={require('../assets/appIcon/cart.png')} />
                        </TouchableOpacity>
                    </View>
                    <View style={imageContainer}>
                    <Swiper width={swiperWidth} height={swiperHeight} autoplay >    
                    {this.state.contentList.map(e => 
                        e.productContentTypeEnumId ==='PcntImageLarge' &&
                            (  
                            <TouchableOpacity
                            key={e.productId}
                            onPress={() => ''}
                        >  
                                <ImageBackground
                                    source={{ uri: 'http://192.168.122.1:8080/store/content/productImage/'+e.productContentId  }}
                                    style={styles.imageStyle}

                                >
                                </ImageBackground>
                            </TouchableOpacity> 
                         )
                    )}
                     </Swiper>
                    </View>
                    <View style={footer}>
                        <View style={titleContainer}>
                            <Text style={textMain}>
                                <Text style={textBlack}>{this.state.product.productName}</Text>
                                <Text style={textHighlight}> / </Text>
                                <Text style={textSmoke}>{this.state.product.price}₹</Text>
                            </Text>
                        </View>
                        <View style={descContainer}>
                            <Text style={descStyle}>{this.state.product.productName}</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 15 }}>
                                <Text style={txtMaterial}>Material: {this.state.product.productName}</Text>
                                <View style={{ flexDirection: 'row' }} >
                                    <Text style={txtColor}>Color: {this.state.product.productName}</Text>
                                    <View style={{ height: 15, width: 15, borderRadius: 15, marginLeft: 10 }} />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const { width } = Dimensions.get('window');
const swiperWidth = width - 30;
const swiperHeight = (width / 933) * 465;

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#D6D6D6',
    },
    cardStyle: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        marginHorizontal: 10,
        marginVertical: 10
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        paddingHorizontal: 15,
        paddingTop: 20
    },
    cartStyle: {
        width: 25,
        height: 25
    },
    backStyle: {
        width: 25,
        height: 25
    },
    productStyle: {
        width: width / 2,
        height: width / 2
    },
    footer: {
        flex: 6
    },
    imageContainer: {
        flex: 6,
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: 10
    },
    textMain: {
        paddingLeft: 20,
        marginVertical: 10
    },
    textBlack: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#3F3F46'
    },
    textSmoke: {
        fontSize: 20,
        color: '#9A9A9A'
    },
    textHighlight: {
        fontSize: 20,
        color: '#7D59C8'
    },
    titleContainer: {
        borderBottomWidth: 1,
        borderColor: '#F6F6F6',
        marginHorizontal: 20,
        paddingBottom: 5
    },
    descContainer: {
        margin: 10,
        paddingTop: 10,
        paddingHorizontal: 10
    },
    descStyle: {
        color: '#AFAFAF'
    },
    linkStyle: {
        color: '#7D59C8'
    },
    productImageStyle: {
        width: swiperWidth,
        height: swiperHeight,
        marginHorizontal: 5
    },
    mainRight: {
        justifyContent: 'space-between',
        alignSelf: 'stretch',
        paddingLeft: 20
    },
    txtColor: {
        color: '#C21C70',
        fontSize: 15,
        fontWeight: '400',
    },
    txtMaterial: {
        color: '#C21C70',
        fontSize: 15,
        fontWeight: '400',
    },
    imageStyle: {
        width: swiperWidth,
        height: swiperHeight,
        alignSelf: 'center',
        justifyContent: 'center',

    },
});