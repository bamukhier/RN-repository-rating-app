import {useState} from 'react'
import { FlatList, View, StyleSheet, Pressable, TextInput} from 'react-native';
import { useDebounce } from "use-debounce";
import { Picker } from "@react-native-picker/picker";
import tw from 'twrnc'
import useRepositories from '../hooks/useRepositories'
import RepositoryItem from '../components/RepositoryItem'

const styles = StyleSheet.create({
  separator: {
    height: 2,
  },
  searchBox: {
    backgroundColor: 'white',
    padding: 12,
    marginTop: 12,
    marginHorizontal: 8,
    borderColor: 'white',
    borderRadius: 8
  },
  picker: {
    width: 'fit-content',
    height: 40, 
    marginTop:16, 
    padding: 4, 
    marginHorizontal: 8, 
    borderRadius: 8,
    backgroundColor: '#f2f2f2',
    borderColor: '#f2f2f2',
  },
});


const ItemSeparator = () => <View style={styles.separator} />;


const SortingMethodPicker = ({order, changeOrderMethod}) => {
  const newSelected = order.orderBy === 'CREATED_AT'
                                    ? 'latest'
                                    : (order.orderBy === 'RATING_AVERAGE' && order.orderDirection === 'DESC' 
                                        ? 'highest' : 'lowest')
  return (
    <Picker
        style={[styles.picker, tw` self-end`]}  
        selectedValue={newSelected}
        onValueChange={(itemValue, itemPosition) =>{
          let order;
          if (itemValue === 'latest'){
            order = {
              orderBy: 'CREATED_AT',
              orderDirection: 'DESC'
            }
          } else if (itemValue === 'highest'){
            order = {
              orderBy: 'RATING_AVERAGE',
              orderDirection: 'DESC'
            }
          } else if (itemValue === 'lowest'){
            order = {
              orderBy: 'RATING_AVERAGE',
              orderDirection: 'ASC'
            }
          }
        changeOrderMethod(order)
      }
    }
    >
    <Picker.Item label="Latest Reviewd" value="latest" />
    <Picker.Item label="Highest Rated" value="highest" />
    <Picker.Item label="Lowest Rated" value="lowest" />
  </Picker>
  )
}

const RepoListActions = ({order, changeOrderMethod, searchText, setSearchText}) => (
  <View>
    <TextInput style={styles.searchBox} placeholder='Search for a repository...' value={searchText} onChangeText={(value) => setSearchText(value)} />
    <SortingMethodPicker order={order} changeOrderMethod={changeOrderMethod} />
  </View>
)


export const RepositoryListContainer = ({repositories, order, changeOrderMethod, searchText, setSearchText, onEndReach, navigateToRepo}) => {
  // Get the nodes from the edges array
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];
  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({item}) =>  (
        <Pressable onPress={() => navigateToRepo(item.id)}>
          <RepositoryItem item={item} />
        </Pressable>
      )}
      ListHeaderComponent={<RepoListActions order={order} changeOrderMethod={changeOrderMethod} searchText={searchText} setSearchText={setSearchText}/>}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.40}
    />
  );
}



const RepositoryList = ({navigation}) => {
  const [orderMethod, setOrderMethod] = useState({orderBy: 'CREATED_AT', orderDirection: 'DESC'})
  const [searchText, setSearchText] = useState('')
  const handleNewOrder = (newOrder) => setOrderMethod(newOrder)

  // this is for debouncing the changing text from making unnecessary requests while typing
  const [debouncedSearchText] = useDebounce(searchText, 1000)

  const {repositories, fetchMore} = useRepositories({...orderMethod, searchKeyword: debouncedSearchText, first: 7});
  
  const onEndReach = () => fetchMore()

  const navigateToRepo = (repoID) => navigation.navigate('Repository', {repoID})

  return <RepositoryListContainer 
    repositories={repositories} 
    order={orderMethod} 
    changeOrderMethod={handleNewOrder}
    searchText={searchText}
    setSearchText={setSearchText}
    onEndReach={onEndReach}
    navigateToRepo={navigateToRepo}
  />

};

export default RepositoryList;