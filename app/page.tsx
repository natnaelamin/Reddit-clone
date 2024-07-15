import { Card } from "@/components/ui/card";
import Image from "next/image";
import Banner from "../public/banner.png"
import helloImage from "../public/hero-image.png"


export default function Home() {


  return (
    <div className="max-w-[1000px] mx-auto mt-4 flex gap-x-10">
      <div className="w-[65%] flex flex-col gap-y-5">
        <p>hey there reddit people</p>
      </div>
      <div className="w-[35%]">
        <Card>
          <Image src={Banner} alt="banner"/>
          <div className="p-2">
            <div className="flex items-center">
              <Image
              src={helloImage}
              alt="Hello Image"
              className="w-10 h-16 -mt-6"
              />
              <h1 className="font-medium pl-3">Home</h1>
            </div>
            <p className="text-sm text-muted-foreground p-2">
              Your Home Reddit frontpage. Come here to check in with your favorite communities!
            </p>
          </div>
        </Card>
      </div>
      
    </div>
  );
}
