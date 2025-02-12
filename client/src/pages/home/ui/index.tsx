import { useState, useEffect } from 'react'
import { Head } from './head'
import { Counter } from './counter'
import { List } from './list'
import { useReactiveVar } from '@apollo/client'
import { useUserSoundtracksQuery } from '../api'
import { useTranslation } from 'react-i18next'
import { type Soundtrack, USER_PLAYLIST_PAGINATION_LEN } from '@/entities/soundtrack'
import { type User, userVar } from '@/entities/user'
import { useUserPlaylist } from '@/features/soundtrack/set-user-playlist'

export function Home() {
  const { t } = useTranslation()
  const currentUser = useReactiveVar(userVar) as User

  const [currentPage, setCurrentPage] = useState(1)
  const [hasNextPage, setHasNextPage] = useState(false)
  const [firstLoad, setFirstLoad] = useState(true)

  const [tracksNum, setTracksNum] = useState(0)

  const { setUserPlaylist } = useUserPlaylist()

  const { loading, error } = useUserSoundtracksQuery({
    variables: {
      id: currentUser.id,
      page: currentPage
    },

    fetchPolicy: 'network-only',
    onCompleted(q) {
      if (q.userSoundtracks.__typename === 'NotFound') {
        return
      }
      const tracks = q.userSoundtracks.soundtracks
      const totalNum = q.userSoundtracks.total

      setUserPlaylist(tracks as Soundtrack[])
      setTracksNum(totalNum)
      setHasNextPage(tracks.length < totalNum && tracks.length === USER_PLAYLIST_PAGINATION_LEN)
      setFirstLoad(false)
    },
    onError() {
      setFirstLoad(false)
    }
  })

  useEffect(() => {
    return () => {
      setUserPlaylist([])
    }
  }, [setUserPlaylist])

  const onTrackAttach = () => {
    setTracksNum((prev) => prev + 1)
  }

  const onUnattachHandler = () => {
    setTracksNum((prev) => prev - 1)
  }

  const fetchNextPage = () => {
    setCurrentPage((page) => page + 1)
  }

  return (
    <div className="flex h-screen flex-col px-1.5">
      <Head
        trackCounter={tracksNum}
        onTrackAttach={onTrackAttach}
        onTrackUnattach={onUnattachHandler}
      />
      <Counter text={t('common.soundtrack')} counter={tracksNum} />

      <List
        currentPage={currentPage}
        isLoad={loading}
        hasNextPage={hasNextPage}
        isFirstLoad={firstLoad}
        error={error}
        onFetchNextPage={fetchNextPage}
      />
    </div>
  )
}
