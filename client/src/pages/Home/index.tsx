import React, { useState, useEffect } from 'react'
import { NowPlaying } from './NowPlaying'
import { ScaleLoader } from '@/components/ui/Loader'
import { ErrorPlug } from './plugs'
import { useReactiveVar } from '@apollo/client'
import { UserMutations } from '@/apollo/cache/mutations'
import { List } from './List'
import { userVar } from '@/apollo/cache/variables'
import { useUserSoundtracksLazyQuery } from '@/graphql/user/_gen_/userSoundtracks.query'
import { Counter } from './Counter'
import { useTranslation } from 'react-i18next'
import type { Soundtrack } from '@/apollo/cache/types'

import { Container, MountLoader } from './Home.styled'

const ITEMS_PER_PAGE = 15

export default function Home() {
  const { t } = useTranslation()
  const currentUser = useReactiveVar(userVar)

  const [currentPage, setCurrentPage] = useState(1)

  const [hasNextPage, setHasNextPage] = useState<boolean>(false)
  const [totalTracks, setTotalTracks] = useState<number>(0)
  const [firstLoad, setFirstLoad] = useState<boolean>(true)

  const [getTracks, { loading, error }] = useUserSoundtracksLazyQuery({
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

      console.log('set playlist')

      UserMutations.setUserPlaylist(tracks as Soundtrack[])

      setHasNextPage(tracks.length < totalNum && tracks.length === ITEMS_PER_PAGE)
      setTotalTracks(totalNum)
    }
  })

  useEffect(() => {
    getTracks()
  }, [currentPage])

  useEffect(() => {
    return () => {
      console.log('clear playlist')

      UserMutations.clearUserPlaylist()
    }
  }, [])

  const handlePageChange = () => {
    setCurrentPage((prev) => prev + 1)
  }

  const handleIntersectionLoad = () => {
    setFirstLoad(false)
  }

  const isMountLoad = firstLoad && loading

  const onTrackAttach = () => {
    setTotalTracks((prev) => prev + 1)
  }

  const onUnattachHandler = () => {
    setTotalTracks((prev) => prev - 1)
  }

  const mountPlug = (
    <MountLoader>
      <ScaleLoader fallback />
    </MountLoader>
  )

  if (error) {
    return (
      <Container>
        <NowPlaying />
        <ErrorPlug />
      </Container>
    )
  }

  return (
    <Container>
      <NowPlaying
        trackCounter={totalTracks}
        onTrackAttach={onTrackAttach}
        onTrackUnattach={onUnattachHandler}
      />
      <Counter text={t('common.soundtrack')} counter={totalTracks} />

      {isMountLoad ? (
        mountPlug
      ) : (
        <List
          isLoad={loading}
          isFirstLoad={firstLoad}
          hasNextPage={hasNextPage}
          onPageChange={handlePageChange}
          onIntersectionLoad={handleIntersectionLoad}
        />
      )}
    </Container>
  )
}
