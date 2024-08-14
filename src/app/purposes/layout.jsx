import PageTitleName from "@components/Text/PageTitleName.jsx";
import FullRoundedFrame from "@components/Frames/FullRoundedFrame.jsx";
import CardTitle from "@components/Text/CardTitle.jsx";
import Link from "next/link";
import Image from "next/image";

async function getPurposes() {
  let response = await fetch("http://127.0.0.1:8000/api/purposes");

  return response.json();
}

export default async function PurposesList({children}) {
  const purposes = await getPurposes();

  console.log(purposes);

  return (
    <div>
      <PageTitleName>Цели питания</PageTitleName>
      <div className="grid grid-cols-4 gap-10">
        {purposes.result.map((purpose, index) => {
          return (
            <Link key={index} href={`/purposes/${purpose.purpose_id}`}>
              <FullRoundedFrame bg_color={"BCD1BD"}>
                <CardTitle title={purpose.name} />
                <Image
                  width={300}
                  height={300}
                  src={`/images/dishes/${purpose.img_name}`}
                  alt={""}
                />
              </FullRoundedFrame>
            </Link>
          );
        })}
      </div>
      <div></div>
      <div className={"py-10"}>
        {children}
      </div>
    </div>
  );
}
