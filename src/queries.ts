export const query_getLeaderboard =
  `query getLeaderboard($metric: String!){
    leaderboard(metric: $metric){
      id
      displayName
      minutesWatched
      profileImageUrl
      loyaltyPoints
      broadcasterType
      viewCount
    }
  }`

export const mutation_login =
    `mutation Login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            user {
                token
                id
                username
                firstName
                lastName
                isStaff
                isActive
                isSuperuser
                lastLogin
                dateJoined
            }
        }
    }`

export const mutation_refreshToken =
    `mutation RefreshToken($token: String!) {
          refreshToken(token: $token) {
            token
            payload
          }
        }`

export const query_getStatistics =
  `{
    statistics {
      meepCount
      followerCount
      subscriberCount
      viewCount
      messagesCount
    }
  }`