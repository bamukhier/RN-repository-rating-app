import { FlatList, View, StyleSheet, Pressable} from 'react-native';
import { useNavigate } from "react-router-native";
import useRepositories from '../hooks/useRepositories'
import RepositoryItem from './RepositoryItem'

const styles = StyleSheet.create({
  separator: {
    height: 2,
  },
});


const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({repositories}) => {
  const navigate = useNavigate()
  // Get the nodes from the edges array
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({item}) =>  (
        <Pressable onPress={() => navigate('/repo', {state: item})}>
          <RepositoryItem item={item} />
        </Pressable>
      )}
    />
  );
}

const RepositoryList = () => {
  const {repositories} = useRepositories();
  
  return <RepositoryListContainer repositories={repositories} />

};

export default RepositoryList;