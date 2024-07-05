import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export default function Home() {

  return (
    <main className="min-h-screen h-full w-full bg-red-400 flex-col justify-center align-center">
      <div>로고</div>
      <Button>
        <Link href="/list">
          주변 카페 찾아보기
        </Link>
      </Button>
    </main>
  );
}
