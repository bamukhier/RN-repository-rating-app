import { View, Image, StyleSheet } from "react-native"
import Text from './Text'
import theme from "../theme";

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.repoItemBg,
    padding: 12
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
    padding: 4,
    width: 'fit-content',
    borderRadius: 4
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 16
  },
});

const formatNumber = (num) => {
  if (num >= 1000){

    const dividedbyThousand = num/1000
    return dividedbyThousand.toFixed(1)+ 'k'

  } else {
    return num
  }
}

const RepositoryItem = ({item}) => {
  return (
    <View style={styles.card}>
      <View style={styles.headline}>
        <View>
          <Image source={{uri: item.ownerAvatarUrl}} style={styles.image}/>
        </View>
        <View style={{flexShrink: 1}}>
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
    </View>
  );
};

export default RepositoryItem