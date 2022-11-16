import { View, StyleSheet, Pressable, Button } from 'react-native'
import { useNavigate } from "react-router-native";
import { Formik } from 'formik';
import * as yup from 'yup'
import tw from 'twrnc'
import Text from './Text';
import FormikTextInput from './FormikTextInput'
import theme from '../theme';
import useSignIn from "../hooks/useSignIn"

const styles = StyleSheet.create({
    container: {
        padding: 12,
        marginTop: 256
    }
})


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

const SignInForm = ({onSubmit}) => {
  const navigate = useNavigate()

  return (
      <View style={styles.container}>
          <FormikTextInput name='username' placeholder='Username' />
          <FormikTextInput name='password' placeholder='Password' secureTextEntry />
            <Pressable onPress={onSubmit}  style={tw`justify-center items-center mt-4 bg-blue-700 hover:bg-blue-700 text-white font-bold mx-2 py-2 px-4 rounded-lg border border-blue-700`}>
                <Text fontWeight="bold" style={{color: "white"}}>Sign In</Text>
            </Pressable>
            <View style={tw`w-full relative flex pt-8 items-center`}>
                <Text style={tw`flex-shrink mx-4 text-gray-600`}>Don't have account?</Text>
                <Pressable onPress={() => navigate('/signup')} style={tw`justify-center items-center bg-transparent font-bold mx-2 py-2 px-4 rounded-lg `}>
                <Text fontWeight="bold" style={tw`text-blue-700`}>Create Account</Text>
                </Pressable>
            </View>
      </View>
  )
};


export const SignInContainer = ({onSubmit}) => {
    return (
        <Formik 
            initialValues={intialValues} 
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            { ({handleSubmit}) => <SignInForm onSubmit={handleSubmit} /> }
        </Formik>
    )
}


const SignIn = () => {
    const [signIn] = useSignIn()
    const navigate = useNavigate()

    const onSubmit = async (values) => {
        const {username, password} = values
        try {
            const {data} = await signIn({username, password})
            if (data.authenticate.accessToken){
                navigate('/', {replace: true})
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <SignInContainer onSubmit={onSubmit} />
    )
}
export default SignIn;