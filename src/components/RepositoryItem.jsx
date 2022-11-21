import { View, Image, Button, StyleSheet, Pressable } from "react-native"
import {openURL} from "expo-linking";
import tw from 'twrnc'
import Text from './Text'
import theme from "../theme";

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
    paddingHorizontal: 8,
    paddingVertical: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 16
  },
  buttonWrapper: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    borderTopWidth: 0.5,
    borderTopColor: '#f2f2f2',
  },
  button: {
    flex: 1,
    marginHorizontal: 6,
    marginTop: 12,
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

const RepositoryItem = ({item, showButtons, navigation}) => {
  return (
    <View testID="repoItem" style={[styles.card, {marginBottom: showButtons? 12 : 0}]}>
      <View style={styles.headline}>
        <View>
          <Image source={{uri: item.ownerAvatarUrl}} style={styles.image}/>
        </View>
        <View style={{flexShrink: 1, alignItems: 'baseline'}}>
          <Text fontWeight="bold" style={styles.details}>{item.fullName}</Text>
          <Text color={theme.colors.textSecondary} style={styles.details} >{item.description}</Text>
          <View style={[tw`bg-slate-100`, styles.langTag]}>
            <Text style={styles.details} >{item.language}</Text>
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
        showButtons && navigation &&
        <View style={styles.buttonWrapper}>
          <View style={styles.button}>{
            item.userHasReviewed ? (
              <Pressable disabled style={tw`justify-center items-center bg-transparent text-white font-bold py-2 px-4 rounded-lg border border-stone-400`}>
                <Text fontWeight="bold" style={tw`text-stone-400`}>Reviewed</Text>
              </Pressable>

            ) : (
              <Pressable onPress={() => navigation.navigate('Review', {ownerName: item.ownerName, repositoryName: item.name})}  style={tw`justify-center items-center bg-transparent font-bold py-2 px-4 rounded-lg border border-violet-900`}>
                <Text fontWeight="bold" style={tw`text-violet-900`}>Review Repo</Text>
              </Pressable>
            )
          }
          </View>
          <View style={styles.button}>
            <Pressable onPress={() => openURL(item.url)} style={tw`justify-center items-center bg-transparent font-bold py-2 px-4 rounded-lg border border-violet-900`}>
              <Text fontWeight="bold" style={tw`text-violet-900`}>Open in GitHub</Text>
            </Pressable>
          </View>
        </View> 
      }
    </View>
  );
};

export default RepositoryItem