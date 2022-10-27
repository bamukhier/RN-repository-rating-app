import { gql } from "@apollo/client";

export const AUTHENTICATE = gql`
    mutation auth($username: String!, $password: String!){
        authenticate(credentials: { username: $username, password: $password} ) {
            accessToken
        }
    }
`