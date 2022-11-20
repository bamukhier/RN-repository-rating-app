import { StatusBar } from 'expo-status-bar'
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { ApolloProvider } from '@apollo/client';
import createApolloClient from './src/utils/apolloClient';
import AuthStorage from './src/utils/authStorage';
import Main from './src/components/Main'
import AuthStorageContext from './src/contexts/AuthStorageContext';
import { Provider as PaperProvider } from "react-native-paper";
const authStorage = new AuthStorage()
const apolloClient = createApolloClient(authStorage);

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'rgb(241 245 249)'
  }
}
const App = () => {
  return (
    <>
      <NavigationContainer>
        <ApolloProvider client={apolloClient}>
          <AuthStorageContext.Provider value={authStorage}>
            <PaperProvider>
              <Main />
            </PaperProvider>
          </AuthStorageContext.Provider>
        </ApolloProvider>
      </NavigationContainer>
      <StatusBar style='auto' />
    </>
  )
};

export default App;