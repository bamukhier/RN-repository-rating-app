import RepositoryItem from "./RepositoryItem";
import ReviewItem from './ReviewItem'
import useRepositoryReviews from '../hooks/useSingleRepository'
import { FlatList, View } from "react-native";
import { useState, useEffect } from "react";



const SingleRepoView = ({route, navigation}) => {
  const {repoID} = route.params
  const [repo, setRepo] = useState()
  const [reviews, setReviews] = useState()
  const {data, loading, error} = useRepositoryReviews(repoID)

  useEffect(() => {
    if (!error && !loading){
      const reviewNodes = data?.repository.reviews.edges.map(edge => edge.node)
      setReviews(reviewNodes)
      setRepo(data?.repository)
    }
  }, [data, loading])

  return (
     <View style={{flex: 1}}>
      {repo ?  (
        <FlatList 
          data={reviews}
          keyExtractor={({id}) => id}
          renderItem={({item}) => <ReviewItem review={item} />}
          ListHeaderComponent={()=> <RepositoryItem item={repo} showButtons={true} navigation={navigation} /> }
          
        />
        ) : null
      }
  </View> 
  );

}

  export default SingleRepoView;