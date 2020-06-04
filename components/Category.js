import React, { Component } from 'react';
import {
    View, Text, Dimensions, StyleSheet, ImageBackground, TouchableOpacity, Image
} from 'react-native';

const { width } = Dimensions.get('window');

export default class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={styles.wrapper}>
                <Text style={styles.textStyle}>
                    LIST OF CATEGORY
                </Text>

                <View style = {styles.categoryContainer}>
                    <View style = {styles.containerStyle}>
                        <TouchableOpacity
                            key={this.props.type.id}
                            onPress={() => this.props.navigation.navigate('ListProducts', { category: this.props.type })}
                        >
                            <Image style={styles.categoryLogo}
                             source={require('../assets/temp/concrete.jpg')}
                            />
                            <Text style={styles.textStyle2}>Concrete</Text>
                        </TouchableOpacity>
                    </View>
                    <View style = {styles.containerStyle}>
                        <TouchableOpacity
                            key={this.props.type.id}
                            onPress={() => this.props.navigation.navigate('ListProducts', { category: this.props.type })}
                        >
                            <Image style={styles.categoryLogo}
                            source={require('../assets/temp/saria.jpg')}
                            />
                            <Text style={styles.textStyle2}>Saria</Text>
                        </TouchableOpacity>
                    </View>
                    <View style = {styles.containerStyle}>
                        <TouchableOpacity
                            key={this.props.type.id}
                            onPress={() => this.props.navigation.navigate('ListProducts', { category: this.props.type })}
                        >
                            <Image style={styles.categoryLogo}
                            source={require('../assets/temp/cement.png')}
                            />
                            <Text style={styles.textStyle2}>Cement</Text>
                        </TouchableOpacity>
                    </View>
                    <View style = {styles.containerStyle}>    
                        <TouchableOpacity
                            key={this.props.type.id}
                            onPress={() => this.props.navigation.navigate('ListProducts', { category: this.props.type })}
                        >
                            <Image style={styles.categoryLogo}
                            source={require('../assets/temp/bajri.png')}
                            />
                            <Text style={styles.textStyle2}>Bajri</Text>
                        </TouchableOpacity>
                    </View>        
                </View>

            </View>


        );
    }
}

//933 x 465
const imageWidth = width - 30;
const imageHeight = (imageWidth / 933) * 465;
//const imageHeight = width / 2;

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
        justifyContent: 'center',

    },
    textStyle: {
        color: 'gray',
        marginBottom: 10,
        fontSize: 20
    },
    textStyle2: {
        color: 'gray',
        fontSize: 10,
        alignSelf: 'center',


    },
    categoryContainer: {
        flex: 1,
        flexDirection:'row',
        backgroundColor: '#FFFFFF',
        margin: 10,
        borderRadius: 2,
        shadowColor: '#3B5458',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2
    },
    categoryLogo:{
        width: 60, 
        height: 60, 
        borderRadius: 2
    },
    containerStyle: {
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 1,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
      }

});
