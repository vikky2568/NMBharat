import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import register from './api/register';

export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            rePassword: '',
            phone: '',
        };
    }

    onSuccess() {
        Alert.alert(
            'Notice',
            'Sign up Successfully!',
            [
                { text: 'OK', onPress: () => this.props.gotoSignIn() }
            ],
            { cancelable: false }
        );
    }
    onFail() {
        Alert.alert(
            'Notice',
            'Email has been used by other',
            [
                { text: 'OK', onPress: () => this.removeEmail() }
            ],
            { cancelable: false }
        );
    }

    removeEmail() {
        this.setState({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            rePassword: '',
            phone: '',
            });
    }

    registerUser(firstName, lastName, email, password, rePassword) {
        register(firstName, lastName, email, password, rePassword)
            .then(res => {
                if (res.messages) return this.onSuccess();
                this.onFail();
            });
    }

    render() {
        const { firstName, lastName, email, password, rePassword } = this.state;
        return (
            <View style={styles.wrapper}>
                {/* <FloatingLabel
                    style={styles.textInputStyle}
                    value={name}
                    onChangeText={(text) => this.setState({ name: text })}
                >
                    Name
                </FloatingLabel> */}
                <TextInput
                    placeholder='Enter your first name'
                    style={styles.textInputStyle}
                    value={firstName}
                    onChangeText={(text) => this.setState({ firstName: text })}
                />
                <TextInput
                    placeholder='Enter your last name'
                    style={styles.textInputStyle}
                    value={lastName}
                    onChangeText={(text) => this.setState({ lastName: text })}
                />
                <TextInput
                    placeholder='Enter your email'
                    style={styles.textInputStyle}
                    value={email}
                    onChangeText={(text) => this.setState({ email: text })}
                />
                <TextInput
                    placeholder='Enter your password'
                    style={styles.textInputStyle}
                    value={password}
                    onChangeText={(text) => this.setState({ password: text })}
                    secureTextEntry
                />
                <TextInput
                    placeholder='Re-enter your password'
                    style={styles.textInputStyle}
                    value={rePassword}
                    onChangeText={(text) => this.setState({ rePassword: text })}
                    secureTextEntry
                />
                <TouchableOpacity
                    onPress={() => this.registerUser(firstName, lastName, email, password, rePassword)}
                >
                    <View style={styles.button}>
                        <Text style={styles.text}>SIGN UP</Text>
                    </View>
                </TouchableOpacity>
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
    button: {
        height: 40,
        margin: 10,
        borderRadius: 4,
        alignItems: 'center',
        padding: 5,
        backgroundColor: '#F39C12',
        borderColor: 'white',
        borderWidth: 1,
    },
    text: {
        color: 'white',
        fontSize: 20,
    },
    wrapper: {
        backgroundColor: '#F39C12',
    }
});
