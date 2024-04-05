import { Playlist } from '@/widgets/playlist'
import { Loader } from '@/shared/ui/loader'
import { ApolloError, useReactiveVar } from '@apollo/client'
import { explorePlaylistVar } from '@/entities/soundtrack'

import styles from './styles.module.scss'

interface ListProps {
  currentPage: number
  isLoad: boolean
  isFirstLoad: boolean
  hasNextPage: boolean
  error: ApolloError | undefined
  onFetchNextPage(): void
}

export function List({
  currentPage,
  isLoad,
  error,
  isFirstLoad,
  hasNextPage,
  onFetchNextPage
}: ListProps) {
  const explorePlaylist = useReactiveVar(explorePlaylistVar)

  if (isFirstLoad) {
    return (
      <div className={styles.container}>
        <Loader fallback />
      </div>
    )
  }

  if (error) {
    return <div className={styles.container}>Error</div>
  }

  if (!isLoad && explorePlaylist.length === 0) {
    return <div className={styles.container}>nothing found</div>
  }

  return (
    <div>
      <Playlist
        relatedTo="explore"
        height="77vh"
        data={explorePlaylist}
        hasNextPage={hasNextPage}
        isFetchingNextPage={currentPage > 1 && isLoad}
        onFetchNextPage={onFetchNextPage}
      />
    </div>
  )
}
