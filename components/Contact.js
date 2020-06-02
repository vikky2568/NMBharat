import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';

import map from '../assets/appIcon/map.png';
import phoneIcon from '../assets/appIcon/phone.png';
import mailIcon from '../assets/appIcon/mail.png';
import messageIcon from '../assets/appIcon/message.png';
import locationIcon from '../assets/appIcon/location.png';
import logoutIcon from '../assets/temp/logout1.png';

class Contact extends Component {
    render() {
        const {
            profileContainer, wrapper, infoContainer,
            rowInfoContainer, imageStyle, infoText
        } = styles;
        return (
            <View style={wrapper}>
                <View style={profileContainer}>
                <Image style={styles.profileLogo}
                  source={require('../assets/temp/profile1.png')}
                  />

                <Text style={styles.name}>Vikram Kumar </Text>
                <Text style={styles.userInfo}>vkumar@gmail.com</Text>
                <Text style={styles.userInfo}>Jaipur </Text>
                </View>
                <View style={infoContainer}>
                    <View style={rowInfoContainer}>
                        <Image source={locationIcon} style={imageStyle} />
                        <Text style={infoText}>193/84 sector-19, pratapNagar, Sanganer, Jaipur-302033</Text>
                    </View>
                    <View style={rowInfoContainer}>
                        <Image source={phoneIcon} style={imageStyle} />
                        <Text style={infoText}>(+91) 123456789</Text>
                    </View>
                    <View style={rowInfoContainer}>
                        <Image source={mailIcon} style={imageStyle} />
                        <Text style={infoText}>vkumar@gmail.com</Text>
                    </View>
                    <View style={[rowInfoContainer, { borderBottomWidth: 0 }]}>
                        <Image source={messageIcon} style={imageStyle} />
                        <Text style={infoText}>(+91) 123456789</Text>
                    </View>
                    <View style={[rowInfoContainer, { borderBottomWidth: 0 }]}>
                        <Image source={logoutIcon} style={imageStyle} />
                        <Text style={infoText}>Logout</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    wrapper: { flex: 1, backgroundColor: '#F6F6F6' },
    mapStyle: {
        width: width - 40,
        height: 230,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    profileContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#FFFFFF',
        margin: 10,
        borderRadius: 2,
        shadowColor: '#3B5458',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2
    },
    infoContainer: {
        padding: 10,
        flex: 1,
        backgroundColor: '#FFF',
        margin: 10,
        marginTop: 0,
        borderRadius: 2,
        shadowColor: '#3B5458',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2
    },
    rowInfoContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#D6D6D6'
    },
    imageStyle: {
        width: 30,
        height: 30
    },
    infoText: {
        color: '#AE005E',
        fontWeight: '500'
    },
    profileLogo:{
        width: 200, 
        height: 200, 
        borderRadius: 200/ 2
    }
});

export default Contact;