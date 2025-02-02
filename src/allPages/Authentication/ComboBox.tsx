"use client";

import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faChevronDown,
  faMagnifyingGlassLocation,
} from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function ComboBox({
  width = "w-full",
  setValue,
  stateName,
  placeholder,
  data,
  light,
  NotFoundMessage = "No data found",
  callBcFn,
  getValues,
}: any) {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<string | null>("");
  // const objDataForm = getValues();

  // تحديث القيمة الافتراضية عند تغيير البيانات أو اللغة
  useEffect(() => {
    // if (data && placeholder) {
    if (data && placeholder && typeof getValues === "function") {
      const defaultItem = data?.find(
        (item: any) => item.id === getValues()?.[stateName]
      )?.title;
      // const defaultItem = data?.find((item: any) => item.title === placeholder);

      // const defaultItem = data.find((item: any) => item.title === placeholder);
      // if (defaultItem) {
      setSelectedLocation(defaultItem);
      // }
    }
  }, [data, i18n.language, placeholder]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className={`${width}`} asChild>
        <button
          className={`selected-location flex outline-none rounded justify-between w-full px-2 items-center gap-1 ${
            light ? "bg-grey" : "bg-bg"
          } h-[42px] cursor-pointer ${
            selectedLocation ? "text-primary" : "text-secondary"
          }`}
        >
          <span
            className={`text-[0.9rem] truncate ${
              selectedLocation ? "opacity-100" : "opacity-50"
            }`}
          >
            {selectedLocation || placeholder}
          </span>
          <FontAwesomeIcon
            className={`transition-all text-[0.9rem] duration-200 ease-in-out ${
              open ? "rotate-180" : "rotate-0"
            }`}
            icon={faChevronDown}
          />
        </button>
      </PopoverTrigger>
      <PopoverContent className="PopoverContent p-0">
        <Command
          className={`${light ? "bg-grey border-grey" : "bg-bg border-bg"}`}
        >
          <div
            className={`search-wrapper h-12 w-full shadow-sm shadow-slate-200 flex px-4 gap-5 items-center ${
              light ? "bg-grey" : "bg-bg"
            }`}
          >
            <FontAwesomeIcon
              className="text-xl text-secondary opacity-50"
              icon={faMagnifyingGlassLocation}
            />
            <CommandInput
              className={`outline-none text-sm font-normal text-secondary w-full ${
                light ? "bg-grey" : "bg-bg"
              }`}
              autoFocus={light ? false : true}
              placeholder={`${
                i18n.language === "ar" ? "البحث في" : "Search"
              } ${placeholder}`}
            />
          </div>
          <CommandEmpty>
            {i18n.language === "ar" ? "لا يوجد نتائج" : NotFoundMessage}
          </CommandEmpty>
          <CommandGroup className="h-fit max-h-72 overflow-y-auto">
            {data?.map((item: any) => (
              <CommandItem
                className={`cursor-pointer text-lg hover:bg-secondary aria-selected:bg-secondary/60 w-full truncate ${
                  light
                    ? "hover:text-grey aria-selected:text-grey"
                    : "hover:text-bg aria-selected:text-bg"
                } ${
                  selectedLocation === item?.title
                    ? "bg-secondary text-bg"
                    : "pl-5 rtl:pl-0 rtl:pr-5"
                }`}
                key={item.id}
                value={item.title}
                onSelect={(currentValue: string) => {
                  const selectedItem = data.find(
                    (item: any) => item.title === currentValue
                  );
                  if (selectedItem) {
                    setSelectedLocation(selectedItem.title);
                    setValue(stateName, selectedItem.id); // تحديث القيمة في النموذج
                    callBcFn && callBcFn(selectedItem.id); // تنفيذ الكول باك إذا وُجد
                  }
                  setOpen(false);
                }}
              >
                {selectedLocation === item?.title && (
                  <FontAwesomeIcon
                    className="mr-2 rtl:mr-0 rtl:ml-2 h-4 w-4"
                    icon={faCheck}
                  />
                )}
                {item.title}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
