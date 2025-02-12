export interface SpritesMap {
  action: 'copy' | 'trash'
  common:
    | 'angle-arrow'
    | 'arrow-alt'
    | 'check'
    | 'list-music'
    | 'music'
    | 'pause'
    | 'play'
    | 'random'
    | 'repeat'
    | 'search'
    | 'settings'
    | 'share'
  other: 'eye' | 'file-mp3'
}
export const SPRITES_META: {
  [Key in keyof SpritesMap]: {
    filePath: string
    items: Record<
      SpritesMap[Key],
      {
        viewBox: string
        width: number
        height: number
      }
    >
  }
} = {
  action: {
    filePath: 'action.06b43d60.svg',
    items: {
      copy: {
        viewBox: '0 0 448 512',
        width: 448,
        height: 512
      },
      trash: {
        viewBox: '0 0 448 512',
        width: 448,
        height: 512
      }
    }
  },
  common: {
    filePath: 'common.7d2fce2c.svg',
    items: {
      'angle-arrow': {
        viewBox: '0 0 320 512',
        width: 320,
        height: 512
      },
      'arrow-alt': {
        viewBox: '0 0 448 512',
        width: 448,
        height: 512
      },
      check: {
        viewBox: '0 0 512 512',
        width: 512,
        height: 512
      },
      'list-music': {
        viewBox: '0 0 512 512',
        width: 512,
        height: 512
      },
      music: {
        viewBox: '0 0 512 512',
        width: 512,
        height: 512
      },
      pause: {
        viewBox: '0 0 448 512',
        width: 448,
        height: 512
      },
      play: {
        viewBox: '0 0 448 512',
        width: 448,
        height: 512
      },
      random: {
        viewBox: '0 0 512 512',
        width: 512,
        height: 512
      },
      repeat: {
        viewBox: '0 0 512 512',
        width: 512,
        height: 512
      },
      search: {
        viewBox: '0 0 512 512',
        width: 512,
        height: 512
      },
      settings: {
        viewBox: '0 0 20 20',
        width: 20,
        height: 20
      },
      share: {
        viewBox: '0 0 20 20',
        width: 20,
        height: 20
      }
    }
  },
  other: {
    filePath: 'other.c9a1fec3.svg',
    items: {
      eye: {
        viewBox: '0 0 576 512',
        width: 576,
        height: 512
      },
      'file-mp3': {
        viewBox: '0 0 512 512',
        width: 512,
        height: 512
      }
    }
  }
}
