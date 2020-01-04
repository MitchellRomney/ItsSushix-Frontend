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
      color
      subscriptionMonths
      subscriber
      messagesCount
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
export const query_userPlatformLoad =
  `query UserPlatformLoad($userId: Int!){
    user(userId: $userId) {
      id
      lastLogin
      isSuperuser
      username
      firstName
      lastName
      email
      isStaff
      isActive
      dateJoined
    }
    profile(userId: $userId){
      id  
      emailConfirmed
      twitchUser {
        twitchId
        login
        displayName
        type
        broadcasterType
        description
        profileImageUrl
        offlineImageUrl
        viewCount
        followerCount
        subscriberCount
        messagesCount
        loyaltyPoints
        minutesWatched
        bot
        color
        subscriptionMonths
        subscriber
        dateModified
        dateCreated
      }
    }
  }`
export const mutation_twitchLogin =
  `mutation TwitchLogin($twitchUsername: String!, $twitchId: Int!, $email: String!) {
    twitchLogin(twitchUsername: $twitchUsername, twitchId: $twitchId, email: $email) {
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
      created
    }
  }`
export const query_getTwitchUser =
  `query GetTwitchUser($username: String!) {
    twitchUser(username: $username){
      twitchId
      login
      displayName
      type
      broadcasterType
      description
      profileImageUrl
      offlineImageUrl
      viewCount
      followerCount
      subscriberCount
      messagesCount
      loyaltyPoints
      minutesWatched
      bot
      color
      subscriptionMonths
      subscriber
      dateModified
      dateCreated
    }
  }`
