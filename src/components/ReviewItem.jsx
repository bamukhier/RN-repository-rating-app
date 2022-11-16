import { View, StyleSheet, Pressable, Alert } from "react-native"
import { useNavigate } from "react-router-native";
import Text from './Text'
import theme from "../theme";
import tw from 'twrnc'

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
  details: {
    paddingBottom: 4,
  },
  ratingBox: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 40,
      height: 40,
      marginRight: 12,
      borderWidth: 2,
      borderColor: theme.colors.primary,
      borderRadius: 20
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

const formatDate = (dateString) => {
    const dateOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }
    return new Date(dateString).toLocaleDateString('en-uk',dateOptions).replace(/\//g, '-')
}

const ReviewItem = ({review, onlyUserReview, deleteReview}) => {
  
    const navigate = useNavigate()
    
    const calcRatingBorderColor = (rating) => {
        const borderColor = rating > 80 ? 'green' : (rating > 50 ? 'gold' : 'red')
        return {borderColor}
    }

    const handleDeleteReview = (id) => {
      Alert.alert(
        'Are you sure you want to delete this review?', '',
        [
          {
            text: 'Cancel',
          },
          {
            text: 'Delete',
            style: {color: 'red'},
            onPress: async () => {await deleteReview(id)}
          }
        ]
        )
    }
  return (
    <View style={styles.card}>
      <View style={styles.headline}>
        <View style={[styles.ratingBox, calcRatingBorderColor(review.rating)]}>
          <Text fontWeight="bold">{review.rating}</Text>
        </View>
        <View style={{flexShrink: 1}}>
          <Text fontWeight="bold" style={styles.details}>{onlyUserReview ? review.repository.fullName : review.user.username}</Text>
          <Text color={theme.colors.textSecondary} style={styles.details} >{formatDate(review.createdAt)}</Text>
          <View>
            <Text style={[styles.details, {marginTop: 4}]} >{review.text ? review.text : ''}</Text>
          </View>  
        </View>
        </View>
        {
          onlyUserReview && (
        <View style={styles.buttonWrapper}>
          <View style={styles.button}>
            {/* <Button onPress={() => navigate('/repo', {state: {id: review.repository.id}})} title='View Repository' color='darkgreen' /> */}
              <Pressable onPress={() => navigate('/repo', {state: {id: review.repository.id}})} style={tw`justify-center items-center bg-transparent font-bold py-2 px-4 rounded-lg border border-blue-700`}>
                <Text fontWeight="bold"style={tw`text-blue-700`}>View Repo</Text>
              </Pressable>
          </View>
          <View style={styles.button}>
            {/* <Button onPress={() => handleDeleteReview(review.id)} title='Delete Review' color='red' /> */}
              <Pressable onPress={() => handleDeleteReview(review.id)}  style={tw`justify-center items-center bg-transparent font-bold py-2 px-4 rounded-lg border border-blue-700`}>
                <Text fontWeight="bold" style={tw`text-blue-700`}>Delete Review</Text>
              </Pressable>
          </View>
        </View> 



          )
        }
    </View>
  );
};

export default ReviewItem