import Image from "next/image";

export const imageStyle = "w-full h-52 object-cover rounded-[--radius]";

export default function EndpageCard({
  endpage = {
    code: "",
    name: "",
    preview: "",
  },
}: Readonly<{ endpage: { code: string; name: string; preview: string } }>) {
  return (
    <div>
      <Image
        src={endpage.preview == "" ? "/default.jpg" : endpage.preview}
        alt="Endpage preview"
        className={imageStyle}
      />
      <div className="font-bold mt-2">{endpage.name}</div>
      <div className="text-gray-600">{endpage.code}</div>
    </div>
  );
}
