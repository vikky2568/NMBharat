import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import SignIn from './SignIn';
import SignUp from './SignUp';

export default class Authencation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSignIn: true,
        };
    }

    gotoSignIn() {
        this.setState({ isSignIn: true });
    }

    render() {
       const MainJSX = this.state.isSignIn ? <SignIn navigation={this.props.navigation} /> : < SignUp gotoSignIn={() => this.gotoSignIn()} />;
        //const MainJSX = this.state.isSignIn ? SignIn : SignUp;
        return (
            <View style={styles.wrapper}>
                <View style={styles.header}>
                    <Text style={styles.text}>Nirmit Bharat</Text>
                    <Image
                        style={styles.iconStyle}
                        source={require('../assets/appIcon/logo.png')}
                    />
                </View>
                <View>
                    {MainJSX}
                </View>
                <View style={styles.footer}>
                    <TouchableOpacity onPress={() => this.setState({ isSignIn: true })} disabled={this.state.isSignIn}>
                        <View style={styles.buttonSignIn}>
                            <Text style={!this.state.isSignIn ? styles.textActiveStyle : styles.textInActiveStyle}>SIGN IN</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setState({ isSignIn: false })} disabled={!this.state.isSignIn}>
                        <View style={styles.buttonSignUp}>
                            <Text style={this.state.isSignIn ? styles.textActiveStyle : styles.textInActiveStyle}>SIGN UP</Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    textInputStyle: {
        height: 40,
        margin: 10,
        padding: 10,
        borderRadius: 4,
        backgroundColor: 'white',
    },
    buttonSignIn: {
        height: 40,
        margin: 10,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        alignItems: 'center',
        padding: 5,
        backgroundColor: 'white',
        marginRight: 0,
    },
    buttonSignUp: {
        height: 40,
        margin: 10,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        alignItems: 'center',
        padding: 5,
        backgroundColor: 'white',
        marginLeft: 2,
    },
    text: {
        color: 'white',
        fontSize: 20,
        margin: 10
    },
    textActiveStyle: {
        color: '#F39C12',
        fontSize: 20,
        margin: 2
    },
    textInActiveStyle: {
        color: 'lightgray',
        fontSize: 20,
        margin: 2,
    },
    wrapper: {
        flex: 1,
        backgroundColor: '#F39C12',
    },
    iconStyle: {
        width: 30,
        height: 30,
        margin: 10
    },
    header: {
        backgroundColor: '#F39C12',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    footer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        backgroundColor: '#F39C12',
        marginBottom: 20,
    }
});
