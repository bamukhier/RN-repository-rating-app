import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native'
import RepositoryList from './RepositoryList'
import SignIn from './SignIn'
import Text from './Text'
import AppNavBar from './AppNavBar'
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
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
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
      
    </View>
  );
};

export default Main;