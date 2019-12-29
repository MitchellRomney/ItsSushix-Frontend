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