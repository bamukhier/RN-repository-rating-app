import { useMutation } from "@apollo/client";
import { DELETE_REVIEW } from "../graphql/mutations";

const useDeleteReview = () =>  {

    const [mutate] = useMutation(DELETE_REVIEW)

    const deleteReview = async (id) => {
        try {
            const res = await mutate({variables: {reviewID: id}})
            return res
        } catch (error) {
            console.log(error)
        }
    }

    return [deleteReview]
}


export default useDeleteReview