import { cva } from 'cva'
import { Playlist } from '@/widgets/playlist'
import { FeedbackPlug } from '../plugs/feedback'
import { Loader } from '@/shared/ui/loader'
import { ApolloError, useReactiveVar } from '@apollo/client'
import { userPlaylistVar } from '@/entities/soundtrack'

const container = cva('flex h-full items-center justify-center')

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
      <div className={container()}>
        <Loader />
      </div>
    )
  }

  if (error) {
    return (
      <div className={container()}>
        <FeedbackPlug errorType="fetch" />
      </div>
    )
  }

  if (!isLoad && userPlaylist.length === 0) {
    return (
      <div className={container()}>
        <FeedbackPlug errorType="nodata" />
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
