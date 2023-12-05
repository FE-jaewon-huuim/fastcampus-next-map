/*global kakao*/
import Script from 'next/script';

declare global {
    interface Window {
        kakao: any;
    }
}

export default function Map() {
    const loadKakaoMap = () => {
        window.kakao.maps.load(() => {
            const mapContainer = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
            const mapOption = {
                //지도를 생성할 때 필요한 기본 옵션
                center: new window.kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표
                level: 3, //지도의 레벨(확대, 축소 정도)
            };
            new window.kakao.maps.Map(mapContainer, mapOption);
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
