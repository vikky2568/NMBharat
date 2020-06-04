
import { Image, Dimensions, Text, View } from 'react-native';
import React from 'react';

import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Home from './components/Home';
import Search from './components/Search';
import OrderHistory from './components/OrderHistory';
import ChangeInfo from './components/ChangeInfo';
import Authencation from './components/Authencation';
import CustomDrawerContentComponent from './components/CustomDrawerContentComponent';
import Global from './components/Global';
import Cart from './components/Cart';
import updateQuantity from './components/api/updateQuantity';
import getCustomerCart from './components/api/getCustomerCart';
import getProductById from './components/api/getProductById';
import getToken from './components/api/getToken';
import addCart from './components/api/addCart';
import getCart from './components/api/getCart';


const { width } = Dimensions.get('window');


const routeConfigs = {
    Home: {
        screen: Home,
        navigationOptions: {
            tabBarLabel: 'Home',
            tabBarIcon: ({ focused }) => {
                const icon1 = require('./assets/appIcon/home.png');
                const icon2 = require('./assets/appIcon/home0.png');

                const icon = focused ? icon1 : icon2;
                return (
                    <Image
                        source={icon}
                        style={{ width: 25, height: 25, }}
                    />
                );
            }
        },
    },
    Cart: {
        screen: Cart,
        navigationOptions: {
            tabBarLabel: 'Cart',
            tabBarIcon: ({ focused }) => {
                const icon1 = require('./assets/appIcon/cart.png');
                const icon2 = require('./assets/appIcon/cart0.png');

                const icon = focused ? icon1 : icon2;
                return (
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <Image
                            source={icon}
                            style={{ width: 30, height: 30, alignSelf: 'flex-end' }}
                        />
                        {Global.productsInCart.length !== 0 &&
                            <View style={{ backgroundColor: 'red', width: 16, height: 16, borderRadius: 8, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>{Global.productsInCart.length}</Text>
                            </View>
                        }
                    </View>
                );
            }
        },
    },
    Search: {
        screen: Search,
        navigationOptions: {
            tabBarLabel: 'Search',
            tabBarIcon: ({ focused }) => {
                const icon1 = require('./assets/appIcon/search.png');
                const icon2 = require('./assets/appIcon/search0.png');

                const icon = focused ? icon1 : icon2;
                return (<Image
                    source={icon}
                    style={{ width: 25, height: 25, }}
                />
                );
            }
        },
    },
    Contact: {
        screen: Home,
        navigationOptions: {
            tabBarLabel: 'Contact',
            tabBarIcon: ({ focused }) => {
                const icon1 = require('./assets/appIcon/contact.png');
                const icon2 = require('./assets/appIcon/contact0.png');

                const icon = focused ? icon1 : icon2;
                return (<Image
                    source={icon}
                    style={{ width: 25, height: 25, }}
                />
                );
            }
        },
    },


};

const bottomTabNavigatorConfig = {
    initialRouteName: 'Home',
    tabBarOptions: {
        activeTintColor: 'green',
        inactiveBackgroundColor: '',
        inactiveTintColor: 'gray',
    }
};

const TabNavigator = createBottomTabNavigator(routeConfigs, bottomTabNavigatorConfig);
//---------------------------------------------------------------
const drawerRouteConfigs = {
    Home: {
        screen: TabNavigator,
    },
    OrderHistory: {
        screen: OrderHistory,
    },
    ChangeInfo: {
        screen: ChangeInfo,
    },
    SignIn: {
        screen: Authencation,
    }
};

const drawerNavigatorConfig = {
    initialRouteName: 'Home',
    drawerWidth: width / 2,
    drawerPosition: 'left',
    contentComponent: CustomDrawerContentComponent,
    headerMode: 'screen',
    drawerBackgroundColor: 'white',
    useNativeAnimations: 'true',
    contentOptions: {
        activeTintColor: 'red',
    },
};

const DrawerNavigator = createDrawerNavigator(drawerRouteConfigs, drawerNavigatorConfig);
//---------------------------------------------
const stackRouteConfigs = {
    DrawerNavigator: {
        screen: DrawerNavigator
    }
};

const stackNavigatorCofig = {
    initialRouteName: 'DrawerNavigator',
    headerMode: 'none'
};

const StackNavigator = createStackNavigator(stackRouteConfigs, stackNavigatorCofig);
//export default stackNavigator;

export const Apps = createAppContainer(StackNavigator);

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            arrCart: [],
            refresh: false,
            token:''
        };
        Global.addProductToCart = this.addProductToCart.bind(this);
        Global.increaseQuantity = this.increaseQuantity.bind(this);
        Global.decreaseQuantity = this.decreaseQuantity.bind(this);
        Global.removeProduct = this.removeProduct.bind(this);
        Global.removeCart = this.removeCart.bind(this);
        Global.updateCart = this.updateCart.bind(this);
    }

    addProductToCart(product, quantity, orderItemSeqId, orderId) {
        const check = this.state.arrCart.findIndex(e => e.product.productId === product.productId);
        if (check !== -1) { // this product is exist in cart
            const newCart = this.state.arrCart;
            newCart.splice(check, 1, { product, quantity: newCart[check].quantity + 1 });
            this.setState({ arrCart: newCart },
                () => this.updateProductsInCart()
            );
        } else {
            this.setState({
                arrCart: this.state.arrCart.concat({ product, quantity: quantity, orderItemSeqId: orderItemSeqId, orderId: orderId}),
            }, () => this.updateProductsInCart());
        }
    }

    updateProductsInCart() {
        Global.productsInCart = this.state.arrCart;
        addCart(this.state.arrCart);
    }

    async setToken(){
        this.setState({token: await getToken()})
        if(this.state.token){
            this.saveToken();
        }
    }

    saveToken(){
        getCart()
        .then(res => res.length === 0 ?
            getCustomerCart()
            .then(res => res.orderItemList.map(item =>
                    getProductById(item.productId)
                    .then(resp => this.addProductToCart(resp, item.quantity, item.orderId, item.orderItemSeqId))
                )
            )
            : this.setState({arrCart: res}, () => this.updateProductsInCart())
        )
    }

    componentWillMount(){
        this.setToken();
        
    }

    updateCart(){
        this.setToken();
    }

    increaseQuantity(productId, orderId, orderItemSeqId) {
        var updatedQuantity
        const newArrCart = this.state.arrCart.map(e => {
            if (e.product.productId !== productId) return e;
            updatedQuantity = e.quantity + 1
            return { product: e.product, quantity: e.quantity + 1, orderItemSeqId: orderItemSeqId, orderId: orderId };
            // return (e.product.id !== productId) ? e : { product: e.product, quantity: e.quantity + 1 };
        });
        updateQuantity(orderId, orderItemSeqId, updatedQuantity)
        .then(
                this.setState({ arrCart: newArrCart },
                () => this.updateProductsInCart()
            )
        )
    }

    decreaseQuantity(productId, orderId, orderItemSeqId) {
        var updatedQuantity
        const newArrCart = this.state.arrCart.map(e => {
            if (e.product.productId !== productId) return e; 
            updatedQuantity = e.quantity > 1 ? (e.quantity - 1) : 1 ;
            updateQuantity(orderId, orderItemSeqId, updatedQuantity);
            return ({ product: e.product, quantity: e.quantity > 1 ? (e.quantity - 1) : 1 });
        });
        this.setState({ arrCart: newArrCart },
            () => this.updateProductsInCart()
        );
    }

    removeProduct(productId) {
        const newCart = this.state.arrCart.filter(e => e.product.productId !== productId);
        this.setState({ arrCart: newCart },
            () => this.updateProductsInCart()
        );
    }

    removeCart() {
        this.setState({ arrCart: [] },
            () => this.updateProductsInCart()
        );
    }

    render() {
        return (
            <Apps />
        );
    }
}
