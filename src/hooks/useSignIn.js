import { useMutation, useApolloClient } from "@apollo/client";
import { AUTHENTICATE } from "../graphql/mutations";
import useAuthStorage from '../hooks/useAuthStorage';

const useSignIn = () =>  {
    const authStorage = useAuthStorage()
    const apolloClient = useApolloClient()
    const [mutate, result] = useMutation(AUTHENTICATE)

    const signIn = async ({username, password}) => {
        try {
            const res = await mutate({variables: {username, password}})   
            await authStorage.setAccessToken(res.data.authenticate.accessToken)         
            await apolloClient.resetStore()
            return res
        } catch (error) {
            console.log(error)
        }
    }

    return [signIn, result]
}


export default useSignIn