"use client";

import React, { useEffect, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlassLocation } from "@fortawesome/free-solid-svg-icons";

export default function ComboBoz({
  width = "w-full",
  setValue,
  setSearchParams,
  stateName,
  placeholder,
  data = [],
  light,
  NotFoundMessage = "No data found",
  getDefaultValueFromURL,
  searchParams,
  selectBox,
  isSuccess,
  callBcFn,
}: any) {
  const [open, setOpen] = useState(false);
  const [selectedLocationId, setSelectedLocationId] = useState<any>(null);
  const [options, setOptions] = useState<any>([]);

  const { i18n } = useTranslation();
  // const [active, setActive] = useState<any>("");

  useEffect(() => {
    if (Array.isArray(data)) {
      setOptions(
        data?.map((item: any) => ({
          value: item.id,
          label: item.title,
        }))
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, getDefaultValueFromURL, searchParams, selectedLocationId]);
  // function active() {
  //   setOptions(
  //     data?.map((item: any) => ({
  //       value: item.id,
  //       label: item.title,
  //     }))
  //   );
  // }

  useEffect(() => {
    // active();
    if (isSuccess) {
      setSelectedLocationId(null);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (data && searchParams) {
      // const selectedId = searchParams.get(`${getDefaultValueFromURL}`);
      const selectedId = searchParams.get(`${getDefaultValueFromURL}`);
      const selectedOption = data.find(
        (location: any) => Number(location.id) === Number(selectedId)
      );

      if (selectedOption) {
        setSelectedLocationId(selectedOption.id);
      } else {
        setSelectedLocationId(null);
      }
    }
  }, [data, getDefaultValueFromURL, searchParams]);

  const handleChange = (selectedId: any) => {
    setSelectedLocationId(selectedId);
    if (typeof setValue === "function") {
      setValue(stateName, selectedId);
    }

    // التحقق مما إذا كانت setSearchParams دالة قبل استدعائها
    if (typeof setSearchParams === "function") {
      setSearchParams((params: any) => {
        params.set("srt", selectedId);
        return params;
      });
    }

    if (callBcFn) {
      callBcFn(selectedId);
    }

    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className={`${width}`}>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`selected-location flex outline-none round justify-between w-full px-2 items-center gap-1 ${
            light ? "bg-grey" : "bg-bg"
          } w-full h-[42px] cursor-pointer ${
            selectedLocationId ? "text-primary" : "text-secondary"
          }`}
        >
          <span
            className={`text-[0.9rem] text-secondary truncate ${
              selectedLocationId ? "opacity-100" : "opacity-50"
            }`}
          >
            {selectedLocationId
              ? options.find((option: any) => option.value === selectedLocationId)?.label
              : placeholder}
          </span>
          <ChevronsUpDown
            className={`transition-all text-[0.9rem] duration-200 ease-in-out ${
              selectedLocationId ? "opacity-100" : "opacity-50"
            } ${open ? "rotate-180" : "rotate-0"}`}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full max-w-full p-0">
        <Command className={`${light ? "bg-grey border-grey" : "bg-bg border-bg"}`}>
          <div
            className={`search-wrapper ${
              selectBox ? "h-0 opacity-0 pointer-events-none" : "h-12"
            } w-full shadow-sm shadow-slate-200 flex px-4 gap-5 items-center ${
              light ? "bg-grey justify-start" : "bg-bg justify-between"
            }`}
          >
            <FontAwesomeIcon
              className="text-xl text-secondary opacity-50"
              icon={faMagnifyingGlassLocation}
            />
            <CommandInput
              className={`outline-none text-sm font-normal text-secondary w-full
                placeholder:text-sm placeholder:font-normal placeholder:text-secondary placeholder:opacity-50 ${
                  light ? "bg-grey" : "bg-bg"
                }`}
              autoFocus={!light}
              placeholder={`${i18n.language === "ar" ? "البحث في" : "Search"} ${placeholder}`}
            />
          </div>
          <CommandList>
            <CommandEmpty>
              {i18n.language === "ar" ? "لا يوجد نتائج" : NotFoundMessage}
            </CommandEmpty>
            <CommandGroup>
              {options.map((option: any) => (
                <CommandItem
                  className={`cursor-pointer text-lg hover:bg-secondary aria-selected:bg-secondary/60
                    w-full truncate ${
                      light
                        ? "hover:text-grey aria-selected:text-grey"
                        : "hover:text-bg aria-selected:text-bg"
                    } ${
                    selectedLocationId === option.value
                      ? "bg-secondary text-bg"
                      : "pl-8 rtl:pl-0 rtl:pr-8"
                  }`}
                  key={option.value}
                  value={option.label}
                  onSelect={() => {
                    handleChange(option.value);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedLocationId === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

// "use client";

// import React, { useEffect, useState } from "react";
// import { Check, ChevronsUpDown } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
// } from "@/components/ui/command";
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
// import { useTranslation } from "react-i18next";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faMagnifyingGlassLocation } from "@fortawesome/free-solid-svg-icons";

// export default function ComboBoz({
//   width = "w-full",
//   setValue,
//   setSearchParams,
//   stateName,
//   placeholder,
//   data = [],
//   light,
//   NotFoundMessage = "No data found",
//   getDefaultValueFromURL,
//   searchParams,
//   selectBox,
//   isSuccess,
//   callBcFn,
// }: any) {
//   const [open, setOpen] = useState(false);
//   const [selectedLocationId, setSelectedLocationId] = useState<any>(null);
//   const [options, setOptions] = useState<any>([]);

//   const { i18n } = useTranslation();

//   // إعداد الخيارات بناءً على البيانات المدخلة
//   useEffect(() => {
//     if (Array.isArray(data)) {
//       setOptions(
//         data.map((item: any) => ({
//           value: item.id,
//           label: item.title,
//         }))
//       );
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   // إعادة تعيين الموقع المحدد عند نجاح العملية
//   useEffect(() => {
//     if (isSuccess) {
//       setSelectedLocationId(null);
//     }
//   }, [isSuccess]);

//   // تحديث الموقع المحدد بناءً على القيم الافتراضية من الـURL
//   useEffect(() => {
//     if (data && searchParams) {
//       const selectedId = searchParams.get(`${getDefaultValueFromURL}`);
//       const selectedOption = data.find(
//         (location: any) => Number(location.id) === Number(selectedId)
//       );

//       if (selectedOption) {
//         setSelectedLocationId(selectedOption.id);
//       } else {
//         setSelectedLocationId(null);
//       }
//     }
//   }, [data, getDefaultValueFromURL, searchParams]);

//   // دالة تغيير الموقع عند اختيار عنصر
//   const handleChange = (selectedId: any) => {
//     setSelectedLocationId(selectedId);
//     setValue(stateName, selectedId);

//     if (setSearchParams) {
//       setSearchParams((params: any) => {
//         params.set("srt", selectedId);
//         return params;
//       });
//     }

//     if (callBcFn) {
//       callBcFn(selectedId);
//     }

//     setOpen(false);
//   };

//   return (
//     <Popover open={open} onOpenChange={setOpen}>
//       <PopoverTrigger asChild className={`${width} `}>
//         <Button
//           variant="outline"
//           role="combobox"
//           aria-expanded={open}
//           className={`selected-location flex outline-none round justify-between w-full px-2 items-center gap-1 ${
//             light ? "bg-grey" : "bg-bg"
//           } w-full h-[42px] cursor-pointer ${
//             selectedLocationId ? "text-primary" : "text-secondary"
//           }`}
//         >
//           <span
//             className={`text-[0.9rem] text-secondary truncate ${
//               selectedLocationId ? "opacity-100" : "opacity-50"
//             }`}
//           >
//             {selectedLocationId
//               ? options.find((option: any) => option.value === selectedLocationId)?.label
//               : placeholder}
//           </span>
//           <ChevronsUpDown
//             className={`transition-all text-[0.9rem] duration-200 ease-in-out ${
//               selectedLocationId ? "opacity-100" : "opacity-50"
//             } ${open ? "rotate-180" : "rotate-0"}`}
//           />
//         </Button>
//       </PopoverTrigger>
//       <PopoverContent className="w-full max-w-full p-0">
//         <Command className={`${light ? "bg-grey border-grey" : "bg-bg border-bg"}`}>
//           <div
//             className={`search-wrapper ${
//               selectBox ? "h-0 opacity-0 pointer-events-none" : "h-12"
//             } w-full shadow-sm shadow-slate-200 flex px-4 gap-5 items-center ${
//               light ? "bg-grey justify-start" : "bg-bg justify-between"
//             }`}
//           >
//             <FontAwesomeIcon
//               className="text-xl text-secondary opacity-50"
//               icon={faMagnifyingGlassLocation}
//             />
//             <CommandInput
//               className={`outline-none text-sm font-normal text-secondary w-full
//                 placeholder:text-sm placeholder:font-normal placeholder:text-secondary placeholder:opacity-50 ${
//                   light ? "bg-grey" : "bg-bg"
//                 }`}
//               autoFocus={!light}
//               placeholder={`${i18n.language === "ar" ? "البحث في" : "Search"} ${placeholder}`}
//             />
//           </div>
//           <CommandList>
//             <CommandEmpty>
//               {i18n.language === "ar" ? "لا يوجد نتائج" : NotFoundMessage}
//             </CommandEmpty>
//             <CommandGroup>
//               {options.map((option: any) => (
//                 <CommandItem
//                   className={`cursor-pointer text-lg hover:bg-secondary aria-selected:bg-secondary/60
//                     w-full truncate ${
//                       light
//                         ? "hover:text-grey aria-selected:text-grey"
//                         : "hover:text-bg aria-selected:text-bg"
//                     } ${
//                     selectedLocationId === option.value
//                       ? "bg-secondary text-bg"
//                       : "pl-8 rtl:pl-0 rtl:pr-8"
//                   }`}
//                   key={option.value}
//                   value={option.label}
//                   onSelect={() => {
//                     handleChange(option.value);
//                   }}
//                 >
//                   <Check
//                     className={cn(
//                       "mr-2 h-4 w-4",
//                       selectedLocationId === option.value ? "opacity-100" : "opacity-0"
//                     )}
//                   />
//                   {option.label}
//                 </CommandItem>
//               ))}
//             </CommandGroup>
//           </CommandList>
//         </Command>
//       </PopoverContent>
//     </Popover>
//   );
// }
