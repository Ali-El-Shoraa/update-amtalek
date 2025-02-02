function ItemFeaturesList({ data }: any) {
  return (
    <ul className="mt-7 grid grid-cols-3 gap-5 asm:grid-cols-2 sm:grid-cols-1  w-full !list-disc">
      {data?.map((item: any, index: number) => (
        <li key={index} className="flex justify-start items- gap-3">
          <div className="w-5 h-5 aspect-square rounded-full border-secondary border-[2px]  flex justify-center items-center mt-[2px]">
            <span className="bg-secondary rounded-full w-1.5 h-1.5 min-w-[6px] min-h-[6px]"></span>
          </div>
          <h3 className=" relative group cursor-default  h-7 flex flex-col justify-start w-fit">
            {item?.title}
            <hr className=" border-[0px] border-secondary w-0  duration-300 ease-in-out transition-all group-hover:w-full group-hover:border-[1px]" />
          </h3>
        </li>
      ))}
    </ul>
  );
}

export default ItemFeaturesList;
