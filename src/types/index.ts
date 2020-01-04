export interface UserType {
  id: Number | null,
  name: String | null
  isSuperuser: Boolean
}

export interface TwitchUserType {
  displayName: String
  minutesWatched: number,
  loyaltyPoints: number,
  messagesCount: number,
  viewCount: number
  followerCount: number,
  subscriberCount: number
  profileImageUrl: URL
}

export interface ProfileType {
  user: UserType | null
  twitchUser: TwitchUserType | null
}