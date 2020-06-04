import { createStackNavigator } from 'react-navigation-stack';
import HomeView from './HomeView';
import ProductDetails from './ProductDetails';
import ListProducts from './ListProducts';
import ListProductsInCollection from './ListProductsInCollection';
import CustomerShippingAddress from './CustomerShippingAddress';

const stackRouteConfigs = {
  ProductDetails: {
    screen: ProductDetails,
  },
  HomeView: {
    screen: HomeView,
  },
  ListProducts: {
    screen: ListProducts,
  },
  ListProductsInCollection: {
    screen: ListProductsInCollection,
  },
  CustomerShippingAddress: {
    screen: CustomerShippingAddress
  }
};
const stackNavigatorConfig = {
  initialRouteName: 'HomeView',
  headerMode: 'none',
};
const Home = createStackNavigator(stackRouteConfigs, stackNavigatorConfig);
export default Home;
