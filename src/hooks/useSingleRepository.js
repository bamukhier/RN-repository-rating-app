import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_REVIEWS } from '../graphql/queries';

const useRepositoryReviews = (id) => {
  const {data, error, loading} = useQuery(GET_REVIEWS, {
      fetchPolicy: 'cache-and-network',
      variables: {id}
    })

  return { data, loading, error};
};

export default useRepositoryReviews;