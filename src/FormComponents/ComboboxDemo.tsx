"use client";
import { cn } from "@/Utilities";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "./command";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faChevronDown,
  faMagnifyingGlassLocation,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

export default function ComboboxDemo({
  width = "w-full",
  setValue,
  setSearchParams,
  stateName,
  placeholder,
  data,
  light,
  NotFoundMessage = "No data found",
  getDefaultValueFromURL,
  searchParams,
  selectBox,
  isSuccess,
  callBcFn,
  company_name,
  company_logo,
}: any) {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<any>("");
  useEffect(() => {
    if (isSuccess) {
      setSelectedLocation("");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (data && searchParams) {
      const title = data?.find(
        (location: any) =>
          Number(location.id) === Number(searchParams.get(`${getDefaultValueFromURL}`))
      )?.title;

      if (title) {
        //!to handle the case if the user enters in the url an id tat doesn't exist, so it prevents setting the value to undefined or ull
        setSelectedLocation(title.toLowerCase());
      } else setSelectedLocation(null);
    }
  }, [data, getDefaultValueFromURL, searchParams]);

  // const i18n.language = useSelector(lang);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className={`${width} `} asChild>
        <button
          className={`selected-location flex outline-none round justify-between w-full px-2 items-center gap-1 ${
            light ? "bg-grey" : "bg-bg"
          }  w-full h-[42px]  cursor-pointer ${
            selectedLocation ? "text-primary" : "text-secondary "
          } `}
        >
          <span
            className={`  text-[0.9rem] text-secondary truncate ${
              selectedLocation ? "opacity-100" : "opacity-50"
            }`}
          >
            {selectedLocation
              ? data?.find((location: any) => location?.title?.toLowerCase() === selectedLocation)
                  ?.title
              : placeholder}
          </span>
          <FontAwesomeIcon
            className={`transition-all text-[0.9rem] duration-200 ease-in-out ${
              selectedLocation ? "opacity-100" : "opacity-50"
            } ${open ? "rotate-180" : "rotate-0"}`}
            icon={faChevronDown}
          />
        </button>
      </PopoverTrigger>
      <PopoverContent className="PopoverContent p-0">
        <Command className={` ${light ? "bg-grey border-grey" : "bg-bg border-bg"}`}>
          <div
            className={`search-wrapper ${
              selectBox ? "h-0 opacity-0 pointer-events-none " : "h-12 "
            }  w-full  shadow-sm shadow-slate-200 flex px-4 gap-5 items-center ${
              light ? "bg-grey justify-start" : "bg-bg justify-between"
            } `}
          >
            <FontAwesomeIcon
              className="text-xl text-secondary opacity-50"
              icon={faMagnifyingGlassLocation}
            />
            <CommandInput
              className={`outline-none text-sm font-normal text-secondary  w-full 
            placeholder:text-sm placeholder:font-normal placeholder:text-secondary placeholder:opacity-50 ${
              light ? "bg-grey" : "bg-bg"
            }`}
              autoFocus={light ? false : true}
              placeholder={`${i18n.language === "ar" ? "البحث في" : "Search"} ${placeholder}`}
            />
          </div>
          <CommandEmpty>{i18n.language === "ar" ? "لا يوجد نتائج" : NotFoundMessage}</CommandEmpty>

          <CommandGroup className="h-fit max-h-72 overflow-y-auto">
            {data?.map((location: any) => (
              <CommandItem
                className={` cursor-pointer text-lg hover:bg-secondary aria-selected:bg-secondary/60 
                w-full truncate ${
                  light
                    ? "hover:text-grey aria-selected:text-grey"
                    : "hover:text-bg aria-selected:text-bg"
                } ${
                  selectedLocation === location?.title?.toLowerCase()
                    ? "bg-secondary text-bg"
                    : "pl-5 rtl:pl-0 rtl:pr-5"
                } `}
                key={location?.id}
                value={location?.title}
                onSelect={(currentValue: any) => {
                  //!it converts to lower case by default
                  setSelectedLocation(currentValue === selectedLocation ? "" : currentValue);
                  setValue && setValue(stateName, location?.id);

                  setSearchParams &&
                    setSearchParams((params: any) => {
                      params.set("srt", location?.id);
                      return params;
                    });
                  callBcFn && callBcFn(location?.id);
                  setOpen(false);
                }}
              >
                {selectedLocation === location?.title?.toLowerCase() && (
                  <FontAwesomeIcon
                    className={cn("mr-2 rtl:mr-0 rtl:ml-2 h-4 w-4")}
                    icon={faCheck}
                  />
                )}
                {location?.title}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
