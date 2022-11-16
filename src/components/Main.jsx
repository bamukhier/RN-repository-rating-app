import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native'
import tw from 'twrnc';
import RepositoryList from './RepositoryList'
import SignIn from './SignIn'
import SignUp from './SignUp'
import AppNavBar from './AppNavBar'
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

const Main = () => {
  return (
    <View style={[tw`bg-slate-100`, styles.container]}>
      <AppNavBar />
      <Routes>
        <Route path='/' element={<RepositoryList />} exact />
        <Route path='/login' element={<SignIn />} exact />
        <Route path='/signup' element={<SignUp />} exact />
        <Route path='/repo' element={<SingleRepoView />} exact />
        <Route path='/review' element={<WriteReview />} exact  />
        <Route path='/my-reviews' element={<MyReviews />} exact  />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
      
    </View>
  );
};

export default Main;