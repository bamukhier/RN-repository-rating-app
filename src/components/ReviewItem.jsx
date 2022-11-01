import { View, StyleSheet } from "react-native"
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

const ReviewItem = ({review, onlyUserReview}) => {
    const calcRatingBorderColor = (rating) => {
        const borderColor = rating > 80 ? 'green' : (rating > 50 ? 'gold' : 'red')
        return {borderColor}
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
    </View>
  );
};

export default ReviewItem