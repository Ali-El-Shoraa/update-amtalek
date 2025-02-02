"use client";

import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Check, X } from "lucide-react";
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
import { faChevronDown, faMagnifyingGlassLocation } from "@fortawesome/free-solid-svg-icons";
import { useSearchParams } from "next/navigation";

export default function ComboBoxSelect({
  width = "w-full",
  setValue,
  stateName,
  placeholder,
  data = [],
  light,
  NotFoundMessage = "No data found",
  getDefaultValueFromURL,
  selectBox,
  isSuccess,
  callBcFn,
}: any) {
  const [open, setOpen] = useState(false);
  const [selectedLocationId, setSelectedLocationId] = useState<any>(null);
  const { i18n } = useTranslation();

  // استخدم `useSearchParams` من Next.js
  const searchParams = useSearchParams();
  const setSearchParams = (updatedParams: URLSearchParams) => {
    updatedParams.set("page", "1");
    const newUrl = `${window.location.pathname}?${updatedParams.toString()}`;
    window.history.replaceState(null, "", newUrl);
  };

  // تحسين أداء تحويل الخيارات باستخدام useMemo
  const options = useMemo(
    () =>
      Array.isArray(data)
        ? data.map((item: any) => ({
            value: item.id,
            label: item.title,
          }))
        : [],
    [data]
  );

  // التحقق من قيمة `title` في الـ URL
  useEffect(() => {
    const title = searchParams.get(getDefaultValueFromURL);
    if (title) {
      const matchingOption = options.find((option: any) => option.label === title);
      if (matchingOption) {
        setSelectedLocationId(matchingOption.value);
      }
    }
  }, [options, searchParams, getDefaultValueFromURL]);

  useEffect(() => {
    if (isSuccess) {
      setSelectedLocationId(null);
    }
  }, [isSuccess]);

  const toggleSelection = useCallback(
    (selectedId: any) => {
      const newSelectedId = selectedLocationId === selectedId ? null : selectedId;
      setSelectedLocationId(newSelectedId);

      const selectedOption = options.find((option: any) => option.value === newSelectedId);

      if (typeof setValue === "function") {
        setValue(stateName, newSelectedId);
      }

      const updatedParams = new URLSearchParams(searchParams.toString());
      if (selectedOption) {
        updatedParams.set(getDefaultValueFromURL, selectedOption.label); // استخدم label بدلاً من id
      } else {
        updatedParams.delete(getDefaultValueFromURL);
      }
      setSearchParams(updatedParams);

      if (callBcFn) {
        callBcFn(newSelectedId);
      }
      setOpen(false);
    },
    [
      selectedLocationId,
      setValue,
      stateName,
      searchParams,
      getDefaultValueFromURL,
      callBcFn,
      options,
    ]
  );

  const clearSelection = useCallback(() => {
    setSelectedLocationId(null);
    if (typeof setValue === "function") {
      setValue(stateName, null);
    }
    const updatedParams = new URLSearchParams(searchParams.toString());
    updatedParams.delete(getDefaultValueFromURL);
    setSearchParams(updatedParams);

    if (callBcFn) {
      callBcFn(null);
    }
  }, [setValue, stateName, searchParams, getDefaultValueFromURL, callBcFn]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className={`${width}`}>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`selected-location flex outline-none rounded justify-between w-full px-2 items-center gap-1 ${
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

          {selectedLocationId ? (
            <X
              onClick={(e) => {
                e.stopPropagation();
                clearSelection();
              }}
              className="text-secondary cursor-pointer"
            />
          ) : (
            <FontAwesomeIcon
              className={`transition-all text-[0.9rem] duration-200 ease-in-out ${
                selectedLocationId ? "opacity-100" : "opacity-50"
              } ${open ? "rotate-180" : "rotate-0"}`}
              icon={faChevronDown}
            />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="PopoverContent p-0">
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
                      : "pl-5 rtl:pl-0 rtl:pr-5"
                  }`}
                  key={option.value}
                  value={option.label}
                  onSelect={() => toggleSelection(option.value)}
                >
                  <Check
                    className={cn(
                      "mr-2 rtl:mr-0 rtl:ml-2 h-4 w-4",
                      selectedLocationId === option.value ? "flex" : "hidden"
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
