import { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet, Pressable } from 'react-native';
import Constants from 'expo-constants';
import {Link} from 'react-router-native'
import { useQuery, useApolloClient } from "@apollo/client";
import { RETRIEVE_USER } from "../graphql/queries";
import useAuthStorage from '../hooks/useAuthStorage';

import Text from './Text'
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flexDirection: 'row',
    backgroundColor: theme.colors.navBarBg,

  },
  flexItem: {
      flexGrow: 1,
      paddingVertical: 16,
      paddingHorizontal: 12,
      color: 'white'
  }
});

const AppNavBar = () => {
    const authStorage = useAuthStorage()
    const apolloClient = useApolloClient()
    const [loggedUser, setLoggedUser] = useState(authStorage.getAccessToken())
    const {data, error, loading} = useQuery(RETRIEVE_USER)

    const handleLogout = async () => {
        await authStorage.removeAccessToken()
        setLoggedUser(null)        
        await apolloClient.resetStore()
    }

    useEffect(() => {
        if (!error && !loading){
            setLoggedUser(data.me);
        }
     }, [data, loading]);

  return <View style={styles.container}>
      <ScrollView horizontal>
        <Pressable>
            <Link to='/'>
                <Text fontWeight="bold" fontSize="subheading" style={styles.flexItem}>
                    Repositories
                </Text>
            </Link>
        </Pressable>
        {
            loggedUser
                ? (
                    <Pressable onPress={() => handleLogout()}>
                            <Text fontWeight="bold" fontSize="subheading" style={styles.flexItem}>
                                Sign out
                            </Text>
                    </Pressable>
                ) : (
                    <Pressable>
                        <Link to='/login'>
                            <Text fontWeight="bold" fontSize="subheading" style={styles.flexItem}>
                               Sign In
                            </Text>
                        </Link>
                    </Pressable>
                )
        }
      </ScrollView>
  </View>;
};

export default AppNavBar;