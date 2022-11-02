import { gql } from "@apollo/client";

export const AUTHENTICATE = gql`
    mutation auth($username: String!, $password: String!){
        authenticate(credentials: { username: $username, password: $password} ) {
            accessToken
        }
    }
`;

export const REGISTER_USER = gql`
    mutation register($username: String!, $password: String!){
        createUser(user: { username: $username, password: $password} ) {
            id
            username
        }
    }
`;

export const WRITE_REVIEW = gql`
    mutation reviewRepo($ownerName: String!, $repositoryName: String!, $rating: Int!, $text: String){
        createReview(review: {ownerName: $ownerName, repositoryName: $repositoryName, rating: $rating, text: $text}){
            repositoryId
        }
    }
`;

export const DELETE_REVIEW = gql`
    mutation deleteMyReview($reviewID: ID!){
        deleteReview(id: $reviewID)
    }
`;