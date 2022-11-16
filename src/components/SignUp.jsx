import { View, StyleSheet, Pressable, Button } from 'react-native'
import { useNavigate } from "react-router-native";
import { useMutation } from "@apollo/client";
import { Formik } from 'formik';
import * as yup from 'yup'
import tw from 'twrnc'
import Text from './Text';
import FormikTextInput from './FormikTextInput'
import theme from '../theme';
import useSignIn from "../hooks/useSignIn"
import { REGISTER_USER } from "../graphql/mutations";

const styles = StyleSheet.create({
    container: {
        padding: 12,
        marginTop: 256
    }
})


const intialValues = {
    username: '',
    password: '',
    confirmPassword: ''
}

const validationSchema = yup.object().shape({
    username: yup
        .string()
        .min(2)
        .max(30)
        .required('Username is required'),
    password: yup
        .string()
        .min(5)
        .max(50)
        .required('Password is required'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'confirmed password and password does not match')
        .required('Password confirmation is required')
})

const SignUpForm = ({onSubmit}) => {
  return (
      <View style={styles.container}>
          <FormikTextInput name='username' placeholder='Username' />
          <FormikTextInput name='password' placeholder='Password' secureTextEntry />
          <FormikTextInput name='confirmPassword' placeholder='Password Confirmation' secureTextEntry />
            <Pressable onPress={onSubmit} style={tw`justify-center items-center bg-blue-700 font-bold mx-2 mt-4 py-2 px-4 rounded-lg border border-blue-700`}>
              <Text fontWeight="bold" style={tw`text-white`}>Sign Up</Text>
            </Pressable>
      </View>
  )
};


export const SignUpContainer = ({onSubmit}) => {
    return (
        <Formik 
            initialValues={intialValues} 
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            { ({handleSubmit}) => <SignUpForm onSubmit={handleSubmit} /> }
        </Formik>
    )
}


const SignUp = () => {
    const [mutate] = useMutation(REGISTER_USER)
    const [signIn] = useSignIn()
    const navigate = useNavigate()

    const onSubmit = async (values) => {
        const {username, password} = values
        try {
            const {data} = await mutate({variables: {username, password}})
            if (data.createUser.id){
                await signIn({username, password})
                navigate('/', {replace: true})
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <SignUpContainer onSubmit={onSubmit} />
    )
}
export default SignUp;