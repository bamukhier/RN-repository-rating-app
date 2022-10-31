import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = ({orderBy, orderDirection, searchKeyword}) => {
  const [repositories, setRepositories] = useState();
  const {data, error, loading} = useQuery(GET_REPOSITORIES, {variables: {orderBy, orderDirection, searchKeyword}, fetchPolicy: 'cache-and-network',})


  useEffect(() => {
      if (!error && !loading){
          setRepositories(data.repositories);
      }
  }, [loading]);

  return { repositories, loading, error};
};

export default useRepositories;