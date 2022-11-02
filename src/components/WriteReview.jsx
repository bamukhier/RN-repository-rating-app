import { View, StyleSheet, Pressable, Button, Alert } from 'react-native'
import { useNavigate } from "react-router-native";
import { useMutation } from "@apollo/client";
import { Formik } from 'formik';
import * as yup from 'yup'
import FormikTextInput from './FormikTextInput'
import theme from '../theme';
import { WRITE_REVIEW } from "../graphql/mutations";
import { useLocation } from 'react-router-native';
import useAuthStorage from '../hooks/useAuthStorage';

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
          <Pressable style={{marginTop: 16}}>
            <Button onPress={onSubmit} title='Submit Review' color={theme.colors.primary} />
          </Pressable>
      </View>
  )
};


export const ReviewContainer = ({onSubmit}) => {
    const {state : repoDetails} = useLocation()
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


const WriteReview = () => {
    const authStorage = useAuthStorage()
    const userIsLoggedIn = authStorage.getAccessToken()
    const [mutate] = useMutation(WRITE_REVIEW)
    const navigate = useNavigate()

    const onSubmit = async (values) => {
        let {rating} = values
        rating = parseInt(rating, 10)
        try {
            const {data} = await mutate({variables: {...values, rating}})
            if (data.createReview.repositoryId){
                Alert.alert('Review submitted successfully ✔')
                navigate(-1)
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        userIsLoggedIn && <ReviewContainer onSubmit={onSubmit} />
    )
}
export default WriteReview;