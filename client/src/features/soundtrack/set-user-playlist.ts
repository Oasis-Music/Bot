import { SoundtrackStore } from '@/entities/soundtrack'

export const useUserPlaylist = () => {
  return {
    setUserPlaylist: SoundtrackStore.setUserPlaylist
  }
}
