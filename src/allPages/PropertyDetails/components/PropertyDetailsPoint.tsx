import Heading from "@/components/Heading";

export default function PropertyDetailsPoint({ data, locale, t }: any) {
  return (
    <div className="w-full flex flex-col ">
      <Heading className={""}>
        {" "}
        {t("details.title", {
          defaultValue: t("details.title", {
            lng: locale === "en" ? "ar" : "en",
          }),
        })}
      </Heading>
      <div className="w-full ss:gap-4 grid grid-cols-2 gap-10 ss:grid-cols-1">
        <div className="flex col-span-1 flex-col gap-4 ">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 aspect-square rounded-full border-custome-blue border-2  flex justify-center items-center mt-[2px]">
              <span className="bg-custome-blue rounded-full w-1.5 h-1.5 min-w-[6px] min-h-[6px]"></span>
            </div>
            <div className="w-full flex justify-between items-center">
              {t("details.Type", {
                defaultValue: t("details.Type", {
                  lng: locale === "en" ? "ar" : "en",
                }),
              })}
              <span>{data?.property_type}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-5 h-5 aspect-square rounded-full border-custome-blue border-2  flex justify-center items-center mt-[2px]">
              <span className="bg-custome-blue rounded-full w-1.5 h-1.5 min-w-[6px] min-h-[6px]"></span>
            </div>
            <div className="w-full flex justify-between items-center">
              {t("details.PropArea", {
                defaultValue: t("details.PropArea", {
                  lng: locale === "en" ? "en" : "",
                }),
              })}
              <span>
                {data?.total_property_area} {locale === "ar" ? "متر" : "M"}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 aspect-square rounded-full border-custome-blue border-2  flex justify-center items-center mt-[2px]">
              <span className="bg-custome-blue rounded-full w-1.5 h-1.5 min-w-[6px] min-h-[6px]"></span>
            </div>
            <div className="w-full flex justify-between items-center">
              {t("details.BuildingNumber", {
                defaultValue: t("details.BuildingNumber", {
                  lng: locale === "en" ? "en" : "",
                }),
              })}

              <span>{data?.building_num}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 aspect-square rounded-full border-custome-blue border-2  flex justify-center items-center mt-[2px]">
              <span className="bg-custome-blue rounded-full w-1.5 h-1.5 min-w-[6px] min-h-[6px]"></span>
            </div>
            <div className="w-full flex justify-between items-center">
              {t("details.Floor", {
                defaultValue: t("details.Floor", {
                  lng: locale === "en" ? "en" : "",
                }),
              })}
              <span>{data?.floor_num}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 aspect-square rounded-full border-custome-blue border-2  flex justify-center items-center mt-[2px]">
              <span className="bg-custome-blue rounded-full w-1.5 h-1.5 min-w-[6px] min-h-[6px]"></span>
            </div>
            <div className="w-full flex justify-between items-center">
              {t("details.apartmentNumber", {
                defaultValue: t("details.apartmentNumber", {
                  lng: locale === "en" ? "en" : "",
                }),
              })}
              <span>{data?.apartment_num}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-5 h-5 aspect-square rounded-full border-custome-blue border-2  flex justify-center items-center mt-[2px]">
              <span className="bg-custome-blue rounded-full w-1.5 h-1.5 min-w-[6px] min-h-[6px]"></span>
            </div>
            <div className="w-full flex justify-between items-center">
              {t("details.Category", {
                defaultValue: t("details.Category", {
                  lng: locale === "en" ? "en" : "",
                }),
              })}
              <span>{data?.category}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 aspect-square rounded-full border-custome-blue border-2  flex justify-center items-center mt-[2px]">
              <span className="bg-custome-blue rounded-full w-1.5 h-1.5 min-w-[6px] min-h-[6px]"></span>
            </div>
            <div className="w-full flex justify-between items-center">
              {t("details.Finishing", {
                defaultValue: t("details.Finishing", {
                  lng: locale === "en" ? "en" : "",
                }),
              })}
              <span>{data?.finishing}</span>
            </div>
          </div>
        </div>
        <div className="flex col-span-1 flex-col gap-4 ">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 aspect-square rounded-full border-custome-blue border-2  flex justify-center items-center mt-[2px]">
              <span className="bg-custome-blue rounded-full w-1.5 h-1.5 min-w-[6px] min-h-[6px]"></span>
            </div>
            <div className="w-full flex justify-between items-center">
              {t("details.GarageNumber", {
                defaultValue: t("details.GarageNumber", {
                  lng: locale === "en" ? "en" : "",
                }),
              })}
              <span>{data?.garage_no}</span>
            </div>
          </div>
          {/* <div className="flex items-center gap-2">
                    <div className="w-5 h-5 aspect-square rounded-full border-custome-blue border-2  flex justify-center items-center mt-[2px]">
                      <span className="bg-custome-blue rounded-full w-1.5 h-1.5 min-w-[6px] min-h-[6px]"></span>
                    </div>
                    <div className="w-full flex justify-between items-center">
                      {t("details.GarageSize")}
                      <span>{data?.garage_size}</span>
                    </div>
                  </div> */}
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 aspect-square rounded-full border-custome-blue border-2  flex justify-center items-center mt-[2px]">
              <span className="bg-custome-blue rounded-full w-1.5 h-1.5 min-w-[6px] min-h-[6px]"></span>
            </div>
            <div className="w-full flex justify-between items-center">
              {t("details.Kitchens", {
                defaultValue: t("details.Kitchens", {
                  lng: locale === "en" ? "en" : "",
                }),
              })}
              <span>{data?.kitchens_no}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-5 h-5 aspect-square rounded-full border-custome-blue border-2  flex justify-center items-center mt-[2px]">
              <span className="bg-custome-blue rounded-full w-1.5 h-1.5 min-w-[6px] min-h-[6px]"></span>
            </div>
            <div className="w-full flex justify-between items-center">
              {t("details.LivingRooms", {
                defaultValue: t("details.LivingRooms", {
                  lng: locale === "en" ? "en" : "",
                }),
              })}
              <span>{data?.living_room}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-5 h-5 aspect-square rounded-full border-custome-blue border-2  flex justify-center items-center mt-[2px]">
              <span className="bg-custome-blue rounded-full w-1.5 h-1.5 min-w-[6px] min-h-[6px]"></span>
            </div>
            <div className="w-full flex justify-between items-center">
              {t("details.ReceptionPieces", {
                defaultValue: t("details.ReceptionPieces", {
                  lng: locale === "en" ? "en" : "",
                }),
              })}
              <span>{data?.reception_pieces}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 aspect-square rounded-full border-custome-blue border-2  flex justify-center items-center mt-[2px]">
              <span className="bg-custome-blue rounded-full w-1.5 h-1.5 min-w-[6px] min-h-[6px]"></span>
            </div>
            <div className="w-full flex justify-between items-center">
              {t("details.FloorType", {
                defaultValue: t("details.FloorType", {
                  lng: locale === "en" ? "en" : "",
                }),
              })}
              <span>{data?.reception_floor_type}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 aspect-square rounded-full border-custome-blue border-2  flex justify-center items-center mt-[2px]">
              <span className="bg-custome-blue rounded-full w-1.5 h-1.5 min-w-[6px] min-h-[6px]"></span>
            </div>
            <div className="w-full flex justify-between items-center">
              {t("details.NumberOfFloors", {
                defaultValue: t("details.NumberOfFloors", {
                  lng: locale === "en" ? "en" : "",
                }),
              })}
              <span>{data?.no_floors}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 aspect-square rounded-full border-custome-blue border-2  flex justify-center items-center mt-[2px]">
              <span className="bg-custome-blue rounded-full w-1.5 h-1.5 min-w-[6px] min-h-[6px]"></span>
            </div>
            <span className="w-full flex justify-between items-center">
              {t("details.Bathrooms", {
                defaultValue: t("details.Bathrooms", {
                  lng: locale === "en" ? "en" : "",
                }),
              })}
              <span>{data?.bath_room_no}</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 aspect-square rounded-full border-custome-blue border-2  flex justify-center items-center mt-[2px]">
              <span className="bg-custome-blue rounded-full w-1.5 h-1.5 min-w-[6px] min-h-[6px]"></span>
            </div>
            <div className="w-full flex justify-between items-center">
              {t("details.Beds", {
                defaultValue: t("details.Beds", {
                  lng: locale === "en" ? "en" : "",
                }),
              })}
              <span>{data?.bed_rooms_no}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
