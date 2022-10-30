import { gql } from "@apollo/client";

export const AUTHENTICATE = gql`
    mutation auth($username: String!, $password: String!){
        authenticate(credentials: { username: $username, password: $password} ) {
            accessToken
        }
    }
`

export const WRITE_REVIEW = gql`
    mutation reviewRepo($ownerName: String!, $repositoryName: String!, $rating: Int!, $text: String){
        createReview(review: {ownerName: $ownerName, repositoryName: $repositoryName, rating: $rating, text: $text}){
            repositoryId
        }
    }
`;