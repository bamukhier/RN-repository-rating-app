import { useState, useEffect } from "react";
import useAuthStorage from '../hooks/useAuthStorage';
import { View, Pressable } from 'react-native'
import { Formik } from 'formik';
import * as yup from 'yup'
import tw from 'twrnc'
import Text from '../components/Text';
import FormikTextInput from '../components/FormikTextInput'
import useSignIn from "../hooks/useSignIn"
import { useApolloClient } from "@apollo/client";


const intialValues = {
    username: '',
    password: ''
}

const validationSchema = yup.object().shape({
    username: yup
        .string()
        .required('Username is required'),
    password: yup
        .string()
        .required('Password is required')
})

const SignInForm = ({onSubmit, navigation}) => {

  return (
      <View style={tw`w-full h-screen m-auto p-3`}>
          <FormikTextInput name='username' placeholder='Username' />
          <FormikTextInput name='password' placeholder='Password' secureTextEntry />
            <Pressable onPress={onSubmit}  style={tw`justify-center items-center mt-8 bg-violet-800 text-white font-bold mx-2 py-2 px-4 rounded-lg border border-violet-800`}>
                <Text fontWeight="bold" style={tw`text-md text-white`}>Sign In</Text>
            </Pressable>
            <View style={tw`w-full relative flex pt-8 items-center`}>
                <Text style={tw`flex-shrink mx-4 text-gray-600`}>Don't have account?</Text>
                <Pressable onPress={() => navigation.navigate('SignUp')} style={tw`justify-center items-center bg-transparent font-bold mx-2 py-2 px-4 rounded-lg `}>
                <Text fontWeight="bold" style={tw`text-violet-800`}>Create Account</Text>
                </Pressable>
            </View>
      </View>
  )
};


export const SignInContainer = ({onSubmit, navigation}) => {
    return (
        <Formik 
            initialValues={intialValues} 
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            { ({handleSubmit}) => <SignInForm onSubmit={handleSubmit} navigation={navigation} /> }
        </Formik>
    )
}

const SignOutPrompt = ({handleLogout}) => {

    return (
        <View style={tw`justify-center items-center  h-screen m-auto`}>
            <Text fontWeight="bold" style={tw` text-lg`}>You're signed in</Text>
            <Pressable onPress={() => handleLogout()}  style={tw`justify-center items-center bg-violet-800 font-bold mt-6 py-3 px-6 rounded-lg border border-violet-800`}>
                <Text fontWeight="bold" style={tw`text-white text-md`}>Sign Out</Text>
            </Pressable>
        </View>
    )
}


const SignIn = ({navigation}) => {
    const apolloClient = useApolloClient()
    const authStorage = useAuthStorage()
    const [userIsLoggedIn, setUserIsLoggedIn] = useState()
    const [signIn] = useSignIn()
    console.log(userIsLoggedIn)

    useEffect(() => {
      authStorage.getAccessToken().then(token => setUserIsLoggedIn(token))
    }, [])

    const handleLogout = async () => {
        await authStorage.removeAccessToken()
        setUserIsLoggedIn(null)        
        await apolloClient.resetStore()
    }

    const onSubmit = async (values) => {
        const {username, password} = values
        try {
            const {data} = await signIn({username, password})
            if (data.authenticate.accessToken){
                setUserIsLoggedIn(data.authenticate.accessToken)
                navigation.navigate('Home')
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        userIsLoggedIn ? <SignOutPrompt handleLogout={handleLogout} /> : <SignInContainer onSubmit={onSubmit} navigation={navigation} />
    )
}
export default SignIn;