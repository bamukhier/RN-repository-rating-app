import { useLocation } from 'react-router-native';
import RepositoryItem from "./RepositoryItem";
import ReviewItem from './ReviewItem'
import useRepositoryReviews from '../hooks/useRepositoryReviews'
import { FlatList } from "react-native";


const SingleRepoView = () => {
  const {state : item} = useLocation()
  const {reviews, loading, error} = useRepositoryReviews(item.id)
  return (
      <FlatList 
        data={reviews}
        keyExtractor={({id}) => id}
        renderItem={({item}) => <ReviewItem review={item} />}
        ListHeaderComponent={()=> <RepositoryItem item={item} showButtons={true} /> }
        
      />
  )
};

export default SingleRepoView;