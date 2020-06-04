import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, Picker, ScrollView } from 'react-native';
import Header from './Header';
import addShippingAddress from './api/addShippingAddress';
import Toast from 'react-native-simple-toast';

export default class CustomerShippingAddress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            rePassword: '',
            phone: '',
            stateList: [],
            selectedCountry:'',
            selectedState:'',
            countryList:[{'countryName':'India', 'code':'IND','states':[{'stateName':'Rajasthan','code':'IND_RJ'},{'stateName':'Gujrat','code':'IND_GJ'},{'stateName':'Maharashtra','code':'IND_MH'},{'stateName':'Uttar Pradesh','code':'IND_UP'},{'stateName':'Madhya Pradesh','code':'IND_MP'}]},
            {'countryName':'United States', 'code':'USA','states':[{'stateName':'Alaska','code':'USA_AK'},{'stateName':'Alabama','code':'USA_AL'},{'stateName':'Armed Forces Pacific','code':'USA_AP'},{'stateName':'Arkansas','code':'USA_AR'},{'stateName':'American Samoa','code':'USA_AS'}]}],
            firstNameError:'',
            address1Error:'',
            cityError:'',
            stateError:'',
            countryError:'',
            postalCodeError:'',
            contactNumberError:'',
        };
    }

    addAddress(firstName, address1, country, state, city, postalCode, contactNumber) {
        if(this.handleValidation()) {
            addShippingAddress(firstName, address1, country, state, city, postalCode, contactNumber)
            .then(res =>{ 
                if(Object.keys(res).length > 0){
                Toast.show('Address added Successfully!!', Toast.LONG);
                this.props.navigation.navigate('Cart');
                }else{
                Toast.show('Something goes Wrong..'+Object.keys(res).length, Toast.LONG);
                }
            })
        }
    }

    handleValidation(){
        let formIsValid = true;
        let numberRagex = /^\d+$/
        //firstName
        if(!this.state.firstName){
            formIsValid = false;
            this.setState({
                firstNameError:'Please Enter FirstName'
        })}else{
            this.setState({
                firstNameError:''
            })
        }
        if(!this.state.address1){
            formIsValid = false;
            this.setState({
                address1Error:'Please Enter Address'
        })}else{
            this.setState({
                address1Error:''
            })
        }
        if(!this.state.selectedCountry || this.state.selectedCountry === 'select'){
            formIsValid = false;
            this.setState({
                countryError:'Please Select Country'
        })}else{
            this.setState({
                countryError:''
            })
        }
        if(!this.state.selectedState || this.state.selectedState === 'select'){
            formIsValid = false;
            this.setState({
                stateError:'Please Select State'
        })}else{
            this.setState({
                stateError:''
            })
        }
        if(!this.state.city){
            formIsValid = false;
            this.setState({
                cityError:'Please Enter City Name'
        })}else{
            this.setState({
                cityError:''
            })
        }
        if(!this.state.postalCode){
            formIsValid = false;
            this.setState({
                postalCodeError:'Please Enter Postal Code'
        })}else{
            this.setState({
                postalCodeError:''
            })
        }
        if(!this.state.contactNumber || !(numberRagex.test(this.state.contactNumber))){
            formIsValid = false;
            this.setState({
                contactNumberError:'Please Enter ContactNumber'
        })}else{
            this.setState({
                contactNumberError:''
            })
        }
            
        return formIsValid;
    }

    onSelectCountry(country){
        this.setState({selectedCountry:country})

        if(country === 'select'){
            this.setState({stateList:[]})
        }else{
            this.state.countryList.map(e => 
                e.code === country &&
                this.setState({stateList:e.states})    
            )
        }
    }

    onSelectState(state){
        this.setState({selectedState:state})
    }

    render() {
        const { firstName, address1, city, postalCode, contactNumber } = this.state;
        return (
                <View style={styles.wrapper}>
                    <Header navigation={this.props.navigation} />
                    <ScrollView>
                            <View style={styles.header}>
                                <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                                    <Image style={styles.backStyle} source={require('../assets/appIcon/back.png')} />
                                </TouchableOpacity>
                                <Text style={{fontSize:20, color:'grey'}}>Add Address</Text>
                            </View>
                        <View style={styles.inputContainer}>
                        <TextInput
                            placeholder='Enter your first name'
                            style={styles.textInputStyle}
                            value={firstName}
                            onChangeText={(text) => this.setState({ firstName: text })}
                        />
                        <Text style={styles.errorTextStyle}>{this.state.firstNameError}</Text>
                        <TextInput
                            placeholder='Enter your address1'
                            style={styles.textInputStyle}
                            value={address1}
                            onChangeText={(text) => this.setState({ address1: text })}
                        />
                        <Text style={styles.errorTextStyle}>{this.state.address1Error}</Text>
                        <Text style={styles.textStyle}> Select Country</Text>
                        <Picker
                            selectedValue={this.state.selectedCountry}
                            style={{ height: 50, width: '80%', marginLeft:'10%'}}
                            onValueChange={(itemValue, itemIndex) => this.onSelectCountry(itemValue)}
                        >
                            <Picker.Item label = 'Select' value = 'select' />
                            {
                            this.state.countryList.map(country =>
                            <Picker.Item label = {country.countryName} value = {country.code} />
                            ) }
                        </Picker>
                        <Text style={styles.errorTextStyle}>{this.state.countryError}</Text>

                        <Text style={styles.textStyle}> Select State</Text>
                        <Picker
                            selectedValue={this.state.selectedState}
                            style={{ height: 50, width: '80%', marginLeft:'10%'}}
                            onValueChange={(itemValue, itemIndex) => this.onSelectState(itemValue)}
                        >
                            <Picker.Item label = 'Select' value = 'select' />
                            {
                            this.state.stateList.map(state =>
                            <Picker.Item label = {state.stateName} value = {state.code} />
                            ) }
                        </Picker>
                        <Text style={styles.errorTextStyle}>{this.state.stateError}</Text>
                        <TextInput
                            placeholder='Enter your City'
                            style={styles.textInputStyle}
                            value={city}
                            onChangeText={(text) => this.setState({ city: text })}
                        />
                        <Text style={styles.errorTextStyle}>{this.state.cityError}</Text>
                        <TextInput
                            placeholder='Enter your postal code'
                            style={styles.textInputStyle}
                            value={postalCode}
                            onChangeText={(text) => this.setState({ postalCode: text })}
                        />
                        <Text style={styles.errorTextStyle}>{this.state.postalCodeError}</Text>
                        <TextInput
                            placeholder='Postal Contact Number'
                            style={styles.textInputStyle}
                            value={contactNumber}
                            onChangeText={(text) => this.setState({ contactNumber: text })}
                        />
                        <Text style={styles.errorTextStyle}>{this.state.contactNumberError}</Text>
                        </View>
                    </ScrollView>
                    <TouchableOpacity
                            onPress={() => this.addAddress(firstName, address1, this.state.selectedCountry,this.state.selectedState, city, postalCode, contactNumber)}
                        >
                            <View style={styles.button}>
                                <Text style={styles.text}>Save</Text>
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
        borderBottomColor: 'grey',
        borderBottomWidth: 1
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
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingTop: 20
    },
    cartStyle: {
        width: 25,
        height: 25,
        paddingHorizontal: 15,
        paddingTop: 20
    },
    backStyle: {
        width: 25,
        height: 25
    },
    inputContainer: {
        flex: 1,
        flexDirection: 'column',
        marginTop: '10%'
    },
    textStyle: {
        height: 40,
        margin: 10,
        padding: 10,
        borderRadius: 4,
        backgroundColor: 'white',
    },
    errorTextStyle: {
        color: 'red', 
        marginLeft: '5%'
    }
});
