import { useState, useEffect } from "react";
import { FlatList } from "react-native";
import { useQuery, useMutation } from "@apollo/client";
import { RETRIEVE_USER } from "../graphql/queries";
// import { DELETE_REVIEW } from "../graphql/mutations";
import useAuthStorage from '../hooks/useAuthStorage';
import useDeleteReview from '../hooks/useDeleteReview'
import ReviewItem from './ReviewItem'


const MyReviews = () => {
  const authStorage = useAuthStorage()
  const userIsLoggedIn = authStorage.getAccessToken()
  let [userReviews, setUserReviews] = useState([])
  const {data, error, loading, refetch} = useQuery(RETRIEVE_USER, {fetchPolicy: 'cache-and-network', variables: {includeReviews: true}})
//   const [mutate] = useMutation(DELETE_REVIEW)
  const [deleteReview] = useDeleteReview()

  const deleteAndRefetch = async (id) => {
      try {
          await deleteReview(id)
          refetch()
      } catch (e) {
          console.log(e)
      }
   } 

  useEffect(() => {
    if (!error && !loading){
        const reviews = data.me?.reviews.edges.map(edge => edge.node)
        setUserReviews(reviews)
    }
    }, [data, loading]);

  return (
      userIsLoggedIn && <FlatList 
        data={userReviews}
        keyExtractor={({id}) => id}
        renderItem={({item}) => <ReviewItem review={item} onlyUserReview={true} deleteReview={deleteAndRefetch} />}        
      />
  )
};

export default MyReviews;