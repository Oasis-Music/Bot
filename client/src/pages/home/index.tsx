import React, { useState, useEffect } from 'react'
import { NowPlaying } from './NowPlaying'
import { useReactiveVar } from '@apollo/client'
import { List } from './List'
import { type User, userVar } from '@/entities/user'
import { useUserSoundtracksQuery } from '@/graphql/user/_gen_/userSoundtracks.query'
import { Counter } from './Counter'
import { useTranslation } from 'react-i18next'
import type { Soundtrack } from '@/entities/soundtrack'

import styles from './Home.module.scss'
import { useUserPlaylist } from '@/features/soundtrack/set-user-playlist'

const ITEMS_PER_PAGE = 15

export default function Home() {
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
      setHasNextPage(tracks.length < totalNum && tracks.length === ITEMS_PER_PAGE)
      setFirstLoad(false)
    },
    onError() {
      setFirstLoad(false)
    }
  })

  useEffect(() => {
    return () => {
      console.log('clear playlist')

      setUserPlaylist([])
    }
  }, [])

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
    <div className={styles.container}>
      <NowPlaying
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
