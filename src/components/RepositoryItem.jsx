import { View, Image, Button, StyleSheet } from "react-native"
import Text from './Text'
import theme from "../theme";
import {openURL} from "expo-linking";
import { useNavigate } from "react-router-native";

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.repoItemBg,
    padding: 12,
    marginHorizontal: 8,
    marginTop: 8,
    borderRadius: 6
  },
  headline: {
      flexDirection: 'row',
  },
  image: {
    width: 40, 
    height: 40,
    marginRight: 12
  },
  details: {
    paddingBottom: 4,
  },
  langTag: {
    backgroundColor: theme.colors.langTagBg,
    paddingHorizontal: 6,
    paddingVertical: 2,
    justifyContent: 'center',
    borderRadius: 6
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 16
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
    marginTop: 16,
    borderRadius: 16
  }
});

const formatNumber = (num) => {
  if (num >= 1000){

    const dividedbyThousand = num/1000
    return dividedbyThousand.toFixed(1)+ 'k'

  } else {
    return num
  }
}

const RepositoryItem = ({item, showButtons}) => {
  const navigate = useNavigate()

  return (
    <View testID="repoItem" style={[styles.card, {marginBottom: showButtons? 12 : 0}]}>
      <View style={styles.headline}>
        <View>
          <Image source={{uri: item.ownerAvatarUrl}} style={styles.image}/>
        </View>
        <View style={{flexShrink: 1, alignItems: 'baseline'}}>
          <Text fontWeight="bold" style={styles.details}>{item.fullName}</Text>
          <Text color={theme.colors.textSecondary} style={styles.details} >{item.description}</Text>
          <View style={styles.langTag}>
            <Text style={{...styles.details, color: 'white'}} >{item.language}</Text>
          </View>  
        </View>
      </View>

      <View style={styles.stats}>
        <View style={{alignItems: 'center'}}>
            <Text fontWeight="bold" style={styles.details}>{formatNumber(item.stargazersCount)}</Text>
            <Text>Stars</Text>
        </View>
        <View style={{alignItems: 'center'}}>
            <Text fontWeight="bold" style={styles.details}>{formatNumber(item.forksCount)}</Text>
            <Text>Forks</Text>
        </View>
        <View style={{alignItems: 'center'}}>
            <Text fontWeight="bold" style={styles.details}>{formatNumber(item.reviewCount)}</Text>
            <Text>Reviews</Text>
        </View>
        <View style={{alignItems: 'center'}}>
            <Text fontWeight="bold" style={styles.details}>{formatNumber(item.ratingAverage)}</Text>
            <Text>Rating</Text>
        </View>
      </View>
      {
        showButtons &&
        <View style={styles.buttonWrapper}>
          <View style={styles.button}>
            <Button onPress={() => navigate('/review', {state: {ownerName: item.ownerName, repositoryName: item.name}})} title='Write a Revew' color='darkgreen' />
          </View>
          <View style={styles.button}>
            <Button onPress={() => openURL(item.url)} title='Open in GitHub' color='silver' />
          </View>
        </View> 
      }
    </View>
  );
};

export default RepositoryItem