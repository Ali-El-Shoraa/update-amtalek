"use client";
import LatestPropertiesCard from "./LatestPropertiesCard";

export default function LatestPropertiesAllCards({ data, t }: any) {
  return (
    <>
      <div className="w-full grid grid-cols-3 gap-4 max-lg:grid-cols-2 clg:grid-cols-1">
        {data?.cards?.map((card: any, index: number) => (
          <div key={card.id}>
            <LatestPropertiesCard card={card} data={data} />
          </div>
        ))}
      </div>
    </>
  );
}
