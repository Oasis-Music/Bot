import { SoundtrackStore } from '@/entities/soundtrack'

export const useMainPlaylist = () => {
  return {
    bindMainPlaylist: SoundtrackStore.bindMainPlaylist
  }
}
