/*global kakao*/
import { locationState, mapState } from '@/atom';
import Script from 'next/script';
import { Dispatch, SetStateAction } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

declare global {
  interface Window {
    kakao: any;
  }
}

interface MapProps {
  lat?: string | null;
  lng?: string | null;
  zoom?: number;
}

const DEFAULT_LAT = 37.497625203;
const DEFAULT_LNG = 127.03088379;

const DEFAULT_ZOOM = 3;

export default function Map({ lat, lng, zoom }: MapProps) {
  const setMap = useSetRecoilState(mapState);
  const location = useRecoilValue(locationState);

  const loadKakaoMap = () => {
    window.kakao.maps.load(() => {
      const mapContainer = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
      const mapOption = {
        //지도를 생성할 때 필요한 기본 옵션
        center: new window.kakao.maps.LatLng(lat ?? location.lat, lng ?? location.lng), //지도의 중심좌표
        level: zoom ?? location.zoom, //지도의 레벨(확대, 축소 정도)
      };
      const map = new window.kakao.maps.Map(mapContainer, mapOption);
      setMap(map);
    });
  };
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_CLIENT}&autoload=false`}
        onReady={loadKakaoMap}
      ></Script>
      <div id="map" className="w-full h-screen"></div>
    </>
  );
}
