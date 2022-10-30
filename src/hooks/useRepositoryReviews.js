import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_REVIEWS } from '../graphql/queries';

const useRepositoryReviews = (id) => {
  const [reviews, setReviews] = useState();
  const {data, error, loading} = useQuery(GET_REVIEWS, {
      fetchPolicy: 'cache-and-network',
      variables: {id}
    })


  useEffect(() => {
      if (!error && !loading){
        const reviewsNodes = data.repository.reviews.edges.map(edge => edge.node)
          setReviews(reviewsNodes);
      }
  }, [loading]);

  return { reviews, loading, error};
};

export default useRepositoryReviews;