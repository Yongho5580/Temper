'use client'

import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import { ICafe } from "@/types/cafe";
import Image from "next/image";
import cafeImage from "@/public/cover.jpg"
import { Button } from "@/components/ui/button";

// CSR Function 
export default function List() {
  const [cafes, setCafes] = useState<ICafe>();
  const [cafe, setCafe] = useState();
  const [api, setApi] = useState<CarouselApi>();
  /* 사용자 위치 중심 카페 리스트 가져오기 */
  useEffect(() => {
    if ("geolocation" in navigator) {
      /* 위치 정보 사용 가능 */
      navigator.geolocation.getCurrentPosition((position) => {
        getCafes({ lat: position.coords.latitude, lon: position.coords.longitude });
      });

    } else {
      /* 위치 정보 사용 불가능 */
      window.alert("위치 정보 미동의시 서비스 이용이 불가합니다.")
    }
  }, []);

  useEffect(() => {
    if (!api) {
      return
    }

    api.on("select", () => {
      getCafeDetail(api.slideNodes()[api.selectedScrollSnap()].tabIndex)
    })

  }, [api])

  const getCafes = async ({ lat, lon }: { lat: number, lon: number }) => {
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
    setCafes(result);
  };

  const getCafeDetail = async (id: number) => {
    try {
      const response = await fetch(`/api/cafe/${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setCafe(data)
    } catch (err) {
      console.log(err);
    }
  }

  console.log(cafe);
  return (
    <main className="min-h-screen h-full w-full bg-red-400 flex justify-center items-center">
      <Carousel opts={{
        align: "start",
      }} setApi={setApi} className="w-full max-w-xs" orientation="vertical">
        <CarouselContent className="h-[422px]">
          {cafes?.documents.map((item) => <CarouselItem className="w-full" tabIndex={Number(item.id)} key={item.id}>
            <div className="p-1">
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-6 h-[400px]">
                  <Image className="w-[200px] h-[200px] object-cover rounded-md" src={cafe?.basicInfo?.mainphotourl ? cafe.basicInfo.mainphotourl : cafeImage} priority alt="카페 사진" unoptimized width={200} height={200} />
                  <div className="text-2xl font-semibold">{cafe?.basicInfo.placenamefull}</div>
                  <div>영업시간 {cafe?.basicInfo?.openHour?.realtime.currentPeriod.timeList[0].timeSE}</div>
                  <div>{cafe?.comment ? `⭐️ ${(cafe?.comment?.scoresum / cafe?.comment?.scorecnt).toFixed(1)}` : '❗️ 후기 미제공'}</div>
                  <div>{item.phone || '없음'}</div>
                  <div>{item.distance}m</div>
                  <Button>길 찾기</Button>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>)}
        </CarouselContent>
        <CarouselNext />
        <CarouselPrevious />
      </Carousel>
    </main>
  )
}