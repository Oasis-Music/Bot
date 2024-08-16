import { Playlist } from '@/widgets/playlist'
import { NoDataPlug, ErrorPlug } from '../plugs'
import { Loader } from '@/shared/ui/loader'
import { ApolloError, useReactiveVar } from '@apollo/client'
import { userPlaylistVar } from '@/entities/soundtrack'

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
  const userPlaylist = useReactiveVar(userPlaylistVar)

  if (isFirstLoad) {
    return (
      <div className={styles.container}>
        <Loader />
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.container}>
        <ErrorPlug />
      </div>
    )
  }

  if (!isLoad && userPlaylist.length === 0) {
    return (
      <div className={styles.container}>
        <NoDataPlug />
      </div>
    )
  }

  return (
    <div>
      <Playlist
        relatedTo="user"
        height="65vh"
        data={userPlaylist}
        hasNextPage={hasNextPage}
        isFetchingNextPage={currentPage > 1 && isLoad}
        onFetchNextPage={onFetchNextPage}
      />
    </div>
  )
}
