import { StyleSheet, View } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RepositoryList from './RepositoryList'
import SignIn from './SignIn'
import SignUp from './SignUp'
import SingleRepoView from './SingleRepoView'
import WriteReview from './WriteReview'
import theme from '../theme';
import MyReviews from './MyReviews';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    width: '100%',
    maxWidth: 768,
    height: '100%',
    marginHorizontal: 'auto',
    fontFamily: theme.fonts.main
  },
});


const Tab = createMaterialBottomTabNavigator()
const RepoStack = createNativeStackNavigator()
const AuthStack = createNativeStackNavigator()

const RepoStackScreen = () => (
  <RepoStack.Navigator>
    <RepoStack.Screen name='Home' component={RepositoryList} options={{headerShown: false}} />
    <RepoStack.Screen name='Repository' component={SingleRepoView} options={{headerStyle: {backgroundColor: '#f5f5f4'}}}/>
    <RepoStack.Screen name='Review' component={WriteReview} options={{headerStyle: {backgroundColor: '#f5f5f4'}}}/>
  </RepoStack.Navigator>
)

const AuthStackScreen = () => (
  <AuthStack.Navigator screenOptions={{headerShown: false}}>
    <AuthStack.Screen name='Login' component={SignIn}  />
    <AuthStack.Screen name='SignUp' component={SignUp} />
  </AuthStack.Navigator>
)


const Main = () => {
  return (
    <View style={styles.container}>
      <Tab.Navigator screenOptions={{headerShown: false}} barStyle={{ backgroundColor: '#f5f5f4'}} >
        <Tab.Screen name='Home' component={RepoStackScreen} options={{tabBarIcon: 'home', }} />
        <Tab.Screen name='MyReviews' component={MyReviews} options={{tabBarIcon: 'book'}} />
        <Tab.Screen name='Account' component={AuthStackScreen} options={{tabBarIcon: 'account'}} />
      </Tab.Navigator>    
    </View>
  );
};

export default Main;