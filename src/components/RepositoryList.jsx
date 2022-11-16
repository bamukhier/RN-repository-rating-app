import {useState, useEffect} from 'react'
import { FlatList, View, StyleSheet, Pressable, TextInput} from 'react-native';
import { useNavigate } from "react-router-native";
import { useDebounce } from "use-debounce";
import { Picker } from "@react-native-picker/picker";
import tw from 'twrnc'
import useRepositories from '../hooks/useRepositories'
import RepositoryItem from './RepositoryItem'
import themes from '../theme'

const styles = StyleSheet.create({
  separator: {
    height: 2,
  },
  searchBox: {
    backgroundColor: 'white',
    padding: 12,
    marginTop: 8,
    marginHorizontal: 8,
    borderColor: 'white',
    borderRadius: 8
  },
  picker: {
    height: 40, 
    marginTop: 8, 
    padding: 4, 
    marginHorizontal: 8, 
    borderRadius: 8
  }
});


const ItemSeparator = () => <View style={styles.separator} />;


const SortingMethodPicker = ({order, changeOrderMethod}) => {
  const newSelected = order.orderBy === 'CREATED_AT'
                                    ? 'latest'
                                    : (order.orderBy === 'RATING_AVERAGE' && order.orderDirection === 'DESC' 
                                        ? 'highest' : 'lowest')
  return (
    <Picker
        style={[styles.picker, tw`bg-slate-100 border-slate-100`]}  
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
    <Picker.Item label="Latest repositories" value="latest" />
    <Picker.Item label="Highest rated repositories" value="highest" />
    <Picker.Item label="Lowest rated repositories" value="lowest" />
  </Picker>
  )
}

const RepoListActions = ({order, changeOrderMethod, searchText, setSearchText}) => (
  <View>
    <TextInput style={styles.searchBox} placeholder='Search for a repository' value={searchText} onChangeText={(value) => setSearchText(value)} />
    <SortingMethodPicker order={order} changeOrderMethod={changeOrderMethod} />
  </View>
)


export const RepositoryListContainer = ({repositories, order, changeOrderMethod, searchText, setSearchText, onEndReach}) => {
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
      ListHeaderComponent={<RepoListActions order={order} changeOrderMethod={changeOrderMethod} searchText={searchText} setSearchText={setSearchText}/>}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.40}
    />
  );
}



const RepositoryList = () => {
  const [orderMethod, setOrderMethod] = useState({orderBy: 'CREATED_AT', orderDirection: 'DESC'})
  const [searchText, setSearchText] = useState('')
  const handleNewOrder = (newOrder) => setOrderMethod(newOrder)

  // this is for debouncing the changing text from making unnecessary requests while typing
  const [debouncedSearchText] = useDebounce(searchText, 1000)

  const {repositories, fetchMore} = useRepositories({...orderMethod, searchKeyword: debouncedSearchText, first: 7});
  
  const onEndReach = () => fetchMore()

  return <RepositoryListContainer 
    repositories={repositories} 
    order={orderMethod} 
    changeOrderMethod={handleNewOrder}
    searchText={searchText}
    setSearchText={setSearchText}
    onEndReach={onEndReach}
  />

};

export default RepositoryList;