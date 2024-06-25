import instance from 'app/utils/axios'

export const fetchJoinedChallenges = () =>
  instance.get('/challenges/joined-challenges').then((res) => res.data.data)

export const joinChallenge = (payload: Partial<ChallengeData>) =>
  instance.post('/challenges/register', payload).then((res) => {
    if (res.status === 200) {
      return {
        message: 'You have successfully joined the challenge!',
        planId: res?.data?.data?.id,
        requestStatus: 'success'
      }
    }
  })
