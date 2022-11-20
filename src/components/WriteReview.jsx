import { View, StyleSheet, Pressable, Alert } from 'react-native'
import { useMutation } from "@apollo/client";
import { Formik } from 'formik';
import * as yup from 'yup'
import FormikTextInput from './FormikTextInput'
import Text from './Text'
import SignInPrompt from './SignInPrompt'
import tw from 'twrnc'
import { WRITE_REVIEW } from "../graphql/mutations";
import useAuthStorage from '../hooks/useAuthStorage';
import { useEffect, useState } from 'react';

const styles = StyleSheet.create({
    container: {
        padding: 12,
        marginTop: 8
    }
})

const intialValues = {
    ownerName: '',
    repositoryName: '',
    rating: '',
    text: ''
}

const validationSchema = yup.object().shape({
    ownerName: yup
        .string()
        .required('Repository owner name is required'),
    repositoryName: yup
        .string()
        .required('Repository name is required'),
    rating: yup
        .number()
        .integer()
        .min(0)
        .max(100)
        .required('Rating is required'),
    text: yup
        .string()
})

const ReviewForm = ({onSubmit}) => {
  return (
      <View style={styles.container}>
          <FormikTextInput name='ownerName' placeholder='Repository Owner Name' editable={false} />
          <FormikTextInput name='repositoryName' placeholder='Repository Name'  editable={false}/>
          <FormikTextInput name='rating' placeholder='Rating between 0-100' keyboardType='number-pad' />
          <FormikTextInput name='text' placeholder='Enter your review'  multiline numberOfLines={4} />
          <Pressable onPress={onSubmit}  style={tw`justify-center items-center mt-4 bg-blue-700 hover:bg-blue-700 text-white font-bold mx-2 py-2 px-4 rounded-lg border border-blue-700`}>
            <Text fontWeight="bold" style={{color: "white"}}>Publish</Text>
           </Pressable>
      </View>
  )
};


export const ReviewContainer = ({onSubmit, repoDetails}) => {
    return (
        <Formik 
            initialValues={
                {
                    ...intialValues, 
                    ownerName: repoDetails.ownerName ? repoDetails.ownerName : '',
                    repositoryName: repoDetails.repositoryName ? repoDetails.repositoryName : ''
                }} 
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            { ({handleSubmit}) => <ReviewForm onSubmit={handleSubmit}/> }
        </Formik>
    )
}


const WriteReview = ({route, navigation}) => {
    const repoDetails = route.params
    const authStorage = useAuthStorage()
    const [userIsLoggedIn, setUserIsLoggedIn] = useState()
    const [mutate] = useMutation(WRITE_REVIEW)

    const onSubmit = async (values) => {
        let {rating} = values
        rating = parseInt(rating, 10)
        try {
            const {data} = await mutate({variables: {...values, rating}})
            if (data.createReview.repositoryId){
                Alert.alert('Review submitted successfully ✔')
                navigation.goBack()
            }
        } catch (e) {
            console.log(e)
        }
    }

    useEffect( () => {
        authStorage.getAccessToken().then(token => setUserIsLoggedIn(token))
    }, [])

    return (
        userIsLoggedIn ? <ReviewContainer onSubmit={onSubmit} repoDetails={repoDetails} /> : <SignInPrompt navigation={navigation}/>
    )
}
export default WriteReview;