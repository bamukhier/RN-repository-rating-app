import { useState, useEffect } from "react";
import { FlatList } from "react-native";
import { useQuery } from "@apollo/client";
import { RETRIEVE_USER } from "../graphql/queries";
import useAuthStorage from '../hooks/useAuthStorage';
import ReviewItem from './ReviewItem'


const MyReviews = () => {
  const authStorage = useAuthStorage()
  const userIsLoggedIn = authStorage.getAccessToken()
  let [userReviews, setUserReviews] = useState([])
  const {data, error, loading} = useQuery(RETRIEVE_USER, {variables: {includeReviews: true}})
      useEffect(() => {
        if (!error && !loading){
            const reviews = data?.me?.reviews.edges.map(edge => edge.node)
            setUserReviews(reviews)
        }
     }, [data, loading]);

  return (
      userIsLoggedIn && <FlatList 
        data={userReviews}
        keyExtractor={({id}) => id}
        renderItem={({item}) => <ReviewItem review={item} onlyUserReview={true} />}        
      />
  )
};

export default MyReviews;