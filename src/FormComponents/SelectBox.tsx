import { cn } from "@/Utilities/index";
import { Command, CommandGroup, CommandItem } from "./command";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { memo, useState } from "react";
import { useSelector } from "react-redux";
import { lang } from "@/Store/Features/MiscellaneousSlice";

const SelectBox = memo(function SelectBox({
  width = "w-full",
  setValue,
  stateName,
  placeholder,
  data,
  light,
}: any) {
  const [open, setOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");
  const lng = useSelector(lang);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className={`${width} `} asChild>
        <button
          className={`selected-location flex outline-none round justify-between w-full px-2 items-center gap-5 ${
            light ? "bg-custome-venice" : "bg-custome-white"
          }  w-full h-[42px]  cursor-pointer ${
            selectedLocation ? "text-primary" : "text-custome-blue "
          } `}
        >
          <span
            className={`  text-[0.9rem] text-custome-blue truncate ${
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
        <Command
          className={` ${light ? "bg-custome-venice border-grey" : "bg-custome-white border-bg"}`}
        >
          <CommandGroup className="h-fit max-h-72 overflow-y-auto">
            {data?.map((location: any) => (
              <CommandItem
                className={` cursor-pointer text-lg hover:bg-custome-blue aria-selected:bg-custome-blue/60 
                w-full truncate ${
                  light
                    ? "hover:text-grey aria-selected:text-grey"
                    : "hover:text-custome-white aria-selected:text-custome-white"
                } ${
                  selectedLocation === location?.title?.toLowerCase()
                    ? "bg-custome-blue text-custome-white"
                    : "pl-5 rtl:pl-0 rtl:pr-5"
                } `}
                key={location?.id}
                value={location?.title}
                onSelect={(currentValue: any) => {
                  //!it converts to lower case by default
                  setSelectedLocation(currentValue === selectedLocation ? "" : currentValue);
                  setValue(stateName, location?.id);

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
});
export default SelectBox;
