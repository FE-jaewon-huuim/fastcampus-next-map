import { LocationType, SearchType, StoreType } from '@/interface';
import { atom } from 'recoil';

const DEFAULT_LAT = '37.497625203';
const DEFAULT_LNG = '127.03088379';
const DEFAULT_ZOOM = 3;

export const mapState = atom({
  key: 'map',
  default: null,
  dangerouslyAllowMutability: true, // Atom의 상태를 직접적으로 변경할 수 있는 기능을 활성화
});

export const currentStoreState = atom<StoreType | null>({
  key: 'store',
  default: null,
});

export const locationState = atom<LocationType>({
  key: 'location',
  default: {
    lat: DEFAULT_LAT,
    lng: DEFAULT_LNG,
    zoom: DEFAULT_ZOOM,
  },
});

export const searchState = atom<SearchType | null>({
  key: 'search',
  default: null,
});
