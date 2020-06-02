import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import Collection from './Collection';
import Header from './Header';
import Category from './Category';
import TopProducts from './TopProducts';
import { localhost } from './localhost';
import checkLogin from './api/checkLogin';
import getToken from './api/getToken';
import Global from './Global';
import refreshToken from './api/refreshToken';

export default class HomeView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: [],
            topProducts: [],
        };
    }

    componentDidMount() {
        fetch(`http://192.168.122.1:8080/rest/s1/pop/categories/PopcAllProducts/products`)
            .then(res => res.json())
            .then(resJSON => {
                this.setState({
                    type: resJSON.productList,
                    topProducts: resJSON.download_url,
                });
            })
            .catch(error => console.log(error));
            
        getToken()
            .then(token => checkLogin(token))
            .then(res => {
                if (res === 'TOKEN_KHONG_HOP_LE') {
                    return;
                }
                Global.onSignIn(res.user);
            })
            .catch(err => console.log(err));

        setInterval(() => getToken().then(token => refreshToken(token)), 60000);
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
