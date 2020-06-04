import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import Collection from './Collection';
import Header from './Header';
import Category from './Category';
import TopProducts from './TopProducts';
import checkLogin from './api/checkLogin';
import getToken from './api/getToken';
import Global from './Global';
import {localhost} from './localhost';
import getCustomerInfo from './api/getCustomerInfo';


export default class HomeView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: [],
            topProducts: [],
        };
    }

    componentDidMount() {
        fetch(`http://${localhost}/rest/s1/pop/categories/PopcAllProducts/products`)
            .then(res => res.json())
            .then(resJSON => {
                this.setState({
                    type: resJSON.productList,
                    topProducts: resJSON.download_url,
                });
            })
            .catch(error => console.log(error));
            
        getToken()
            .then(token => token !== '' &&
                getCustomerInfo()
                .then( customerInfo =>  Object.keys(customerInfo).length !== 0 &&
                    Global.onSignIn(customerInfo)
                )
            )
            .catch(err => console.log(err));

    }

    render() {
        return (

            <View style={{ flex: 1, backgroundColor: 'darkgray' }}>
                <Header navigation={this.props.navigation} />
                <ScrollView>
                    <Collection navigation={this.props.navigation} />
                    <Category navigation={this.props.navigation} type={this.state.type} />
                    <TopProducts navigation={this.props.navigation} topProducts={this.state.type} />
                </ScrollView>
            </View>


        );
    }
}
