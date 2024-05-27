'use client'

import { useEffect } from "react";

// CSR Function 
export default function List() {
  /*
    사용자 위치 중심 카페 리스트 가져오기
  */
  useEffect(() => {
    if ("geolocation" in navigator) {
      /* 위치 정보 사용 가능 */
      navigator.geolocation.getCurrentPosition((position) => {
        fetchData({ lat: position.coords.latitude, lon: position.coords.longitude });
      });

    } else {
      /* 위치 정보 사용 불가능 */
      window.alert("위치 정보 미동의시 서비스 이용이 불가합니다.")
    }
  }, []);

  const fetchData = async ({ lat, lon }: { lat: number, lon: number }) => {
    const url = `https://dapi.kakao.com/v2/local/search/category.json?category\_group\_code=CE7&radius=5000&y=${lat}&x=${lon}`;
    const response = await fetch(
      url,
      {
        headers: {
          Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_KEY}`
        }
      }
    );

    if (!response.ok) {
      throw new Error('네트워크 오류가 발생했어요');
    }

    const result = await response.json();

    console.log(result);
  }



  return (
    <main></main>
  )
}