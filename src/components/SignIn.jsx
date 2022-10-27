import { View, StyleSheet, Pressable, Button } from 'react-native'
import { useNavigate } from "react-router-native";
import { Formik } from 'formik';
import * as yup from 'yup'
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
  return (
      <View style={styles.container}>
          <FormikTextInput name='username' placeholder='Username' />
          <FormikTextInput name='password' placeholder='Password' secureTextEntry />
          <Pressable style={{marginTop: 16}}>
            <Button onPress={onSubmit} title='Sign In' color={theme.colors.primary} />
          </Pressable>
      </View>
  )
};

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
        <Formik 
            initialValues={intialValues} 
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            { ({handleSubmit}) => <SignInForm onSubmit={handleSubmit} /> }
        </Formik>
    )
}
export default SignIn;