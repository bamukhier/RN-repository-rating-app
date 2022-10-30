import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native'
import RepositoryList from './RepositoryList'
import SignIn from './SignIn'
import AppNavBar from './AppNavBar'
import SingleRepoView from './SingleRepoView'
import WriteReview from './WriteReview'
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    maxWidth: 1080,
    backgroundColor: theme.colors.mainBg,
    fontFamily: theme.fonts.main
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppNavBar />
      <Routes>
        <Route path='/' element={<RepositoryList />} exact />
        <Route path='/login' element={<SignIn />} exact />
        <Route path='/repo' element={<SingleRepoView />} exact />
        <Route path='/review' element={<WriteReview />} exact  />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
      
    </View>
  );
};

export default Main;