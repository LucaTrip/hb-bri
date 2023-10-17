import Image from "next/image";
import ZodiacalRender from "./componets/ZodiacalRender";
import Bg1 from "./assets/bg1.jpg";
import Bg2 from "./assets/bg2.jpg";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col relative">
      <Image alt="" src={Bg1} style={{ objectFit: "contain" }} />
      <Image alt="" src={Bg2} style={{ objectFit: "contain" }} />
      <ZodiacalRender />
    </main>
  );
}
