import React, { Component } from 'react';
import { View, Text, Image, Dimensions, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import Swiper from 'react-native-swiper';

const { width } = Dimensions.get('window');

export default class Collection extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={styles.wrapper}>
                <Text style={styles.textStyle}>
                    OFFERS FOR YOU
                    </Text>
                <Swiper width={imageWidth} height={imageHeight} autoplay >
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('ListProducts', { category: '' })}
                        >
                            <ImageBackground
                                source={require('../assets/temp/banner1.jpg')}
                                style={styles.imageStyle}
                            >
                            </ImageBackground>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('ListProducts', { category: '' })}
                        >
                            <ImageBackground
                                source={require('../assets/temp/offers.png')}
                                style={styles.imageStyle}
                            >
                            </ImageBackground>
                        </TouchableOpacity>
                </Swiper>
            </View>
        );
    }
}

//933 x 465
const imageWidth = width - 30;
const imageHeight = (width / 933) * 465;

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
    imageStyle: {
        width: imageWidth,
        height: imageHeight,
        alignSelf: 'center',
    },
    textStyle: {
        color: 'gray',
        marginBottom: 10,
        fontSize: 20
    }

});
