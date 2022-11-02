import { gql } from '@apollo/client'

export const GET_REPOSITORIES = gql`
    query getAll($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String, $first: Int, $after: String){
        repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword, first: $first, after: $after) {
            edges {
                node {
                    id
                    ownerName
                    name
                    fullName
                    description
                    language
                    stargazersCount
                    forksCount
                    reviewCount
                    ratingAverage
                    ownerAvatarUrl
                    url
                }
            }
            pageInfo {
                startCursor
                endCursor
                hasNextPage
            }
        }
    }
`;

export const RETRIEVE_USER = gql`
    query getCurrentUser($includeReviews: Boolean =false) {
        me {
            id
            username
            reviews @include(if: $includeReviews){
                edges {
                    node {
                        id
                        text
                        rating
                        createdAt
                        repository {
                            id
                            fullName
                        }
                    }
                }
            }
        }
    }
`;

export const GET_REVIEWS = gql`
    query getReview($id: ID!) {
        repository(id: $id) {
            ownerName
            name
            fullName
            description
            language
            stargazersCount
            forksCount
            reviewCount
            ratingAverage
            ownerAvatarUrl
            url
            userHasReviewed
            reviews {
                edges {
                    node {
                        id
                        text
                        rating
                        createdAt
                        user {
                            id
                            username
                        }
                    }
                }
            }
        }
    }
`;