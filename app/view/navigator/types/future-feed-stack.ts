import { CompositeScreenProps } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { RootStackParamsList } from './root-stack'

export type FutureFeedStackParamsList = {
  FeedScreen: undefined
  SingleFeed: { id: string }
}

export type FutureFeedStackScreenProps<
  Screen extends keyof FutureFeedStackParamsList
> = CompositeScreenProps<
  NativeStackScreenProps<FutureFeedStackParamsList, Screen>,
  NativeStackScreenProps<RootStackParamsList>
>
