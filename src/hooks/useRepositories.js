import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  const [repositories, setRepositories] = useState();
  const {data, error, loading} = useQuery(GET_REPOSITORIES, {fetchPolicy: 'cache-and-network',})


  useEffect(() => {
      if (!error && !loading){
          setRepositories(data.repositories);
      }
  }, [loading]);

  return { repositories, loading, error};
};

export default useRepositories;