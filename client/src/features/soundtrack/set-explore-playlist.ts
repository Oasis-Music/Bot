import { SoundtrackStore } from '@/entities/soundtrack'

export const useExplorePlaylist = () => {
  return {
    setExplorePlaylist: SoundtrackStore.setExplorePlaylist
  }
}
