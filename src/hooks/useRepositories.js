import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = ({orderBy, orderDirection, searchKeyword, first}) => {
  const {data, fetchMore, error, loading} = useQuery(GET_REPOSITORIES, {variables: {orderBy, orderDirection, searchKeyword, first}, fetchPolicy: 'cache-and-network',})

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage
    if (!canFetchMore){
      return
    }
   fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        orderBy, 
        orderDirection, 
        searchKeyword, 
        first
      }
    })
  }


  return { repositories: data?.repositories, fetchMore: handleFetchMore, loading, error};
};

export default useRepositories;