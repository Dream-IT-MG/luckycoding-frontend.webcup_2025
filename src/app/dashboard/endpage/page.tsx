import Image from "next/image";
import Link from "next/link";

import bg1 from "./assets/bg1.jpg";
import { PageWrapper } from "./components/PageWrapper";
import EndpageCard from "./components/EndpageCard";
import NewEndpageCard from "./components/NewEndpageCard";

const endpages = [
  { name: "Custom endpage", code: "azerty", preview: "" },
  { name: "Project endpage", code: "qwerty", preview: "" },
];

export default function Page() {
  return (
    <>
      <div>
        <PageWrapper>
          <div className="relative rounded-[--radius] flex">
            <Image
              alt="image 3"
              src={bg1}
              style={{
                objectPosition: "50% 40%",
              }}
              className=" w-full h-24 rounded-[--radius] object-cover"
            />
            <div className="w-full h-full rounded-[--radius] absolute bg-gradient-to-b from-transparent to-black/60 text-primary-foreground p-6 flex flex-col justify-end">
              <div className="text-2xl">Endpages</div>
            </div>
          </div>
          <div className="text-2xl mt-10">
            Manage all of your endpages here...
          </div>
          <div className="mt-10 flex flex-col gap-5">
            {endpages.map((endpage) => (
              <Link href={`/app/endpage/${endpage.code}`} key={endpage.code}>
                <EndpageCard endpage={endpage} />
              </Link>
            ))}
            <NewEndpageCard />
          </div>
        </PageWrapper>
      </div>
    </>
  );
}
