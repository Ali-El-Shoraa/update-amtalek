"use client";
import { faCircleXmark, faCloudArrowUp, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React from "react";
import { useState, useRef, useEffect } from "react";

function DragDropArea({ setValue, t }: any) {
  const [validImages, setValidImages] = useState<any>([]);
  const [rejectedImages, setRejectedImages] = useState<any>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<any>(null);
  const [timer, setTimer] = useState(2);
  const [submit, setSubmit] = useState(2);
  function triggerFileInput() {
    fileInputRef.current.click();
  }
  useEffect(() => {
    const sliders: any = [];
    validImages.map((img: any) => sliders.push(img.file));
    setValue("sliders", sliders);
  }, [setValue, validImages]);

  function handleSelectFiles(e: any) {
    const files = e.target.files;
    //! case: if the user clicks the input then closes the window without selecting any files
    if (files.length === 0) {
      return;
    }
    validate(files);
  }
  function validate(files: any) {
    for (const file of files) {
      //! case: if the image size exceeded the limit add it to the rejected images
      if (file.size > 1000000) {
        if (!rejectedImages.some((img: any) => img?.name === file?.name)) {
          setRejectedImages((prev: any) => [...prev, { name: file.name, size: file.size }]);
          setTimeout(() => {
            setRejectedImages([]);
          }, 5000);
        }
        continue;
      }
      //! case: if the file type is image only and  the item hasn't been already chosen
      if (
        file.type.split("/")[0] === "image" &&
        !validImages.some((img: any) => img?.name === file?.name)
      ) {
        setValidImages((prev: any) => [
          ...prev,
          { file: file, name: file.name, url: URL.createObjectURL(file) },
        ]);
      }
    }
  }

  function handleDeleteImg(index: any) {
    setValidImages((prev: any) => prev.filter((_: any, i: number) => i !== index));
  }

  function onDragOver(e: any) {
    e.preventDefault();
    setIsDragging(true);
    e.dataTransfer.dropEffect = "copy";
  }
  function onDragLeave(e: any) {
    e.preventDefault();
    setIsDragging(false);
  }
  function onDrop(e: any) {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    validate(files);
  }
  return (
    <div className=" w-full h-fit  p-10 asm:px-4  bg-grey border-2 border-dashed  border-secondary round overflow-hidden ">
      {/**
       * //! --- draggable__area ---
       */}
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className="draggable__area flex flex-col items-center justify-center w-full  min-h-[220px]"
      >
        <FontAwesomeIcon className="text-6xl mb-6" icon={faCloudArrowUp} />
        {isDragging ? (
          <h3 className="text-lg"> {t("DragDropArea.title_while_dragging")}</h3>
        ) : (
          <>
            <h3 className="text-lg text-center">{t("DragDropArea.title")}</h3>
            <h4 className="my-5 text-lg font-medium">{t("DragDropArea.or")}</h4>
            <button
              onClick={triggerFileInput}
              className="relative bg-secondary/20 px-3 py-1 text-lg round group"
              type="button"
            >
              <span className="group-hover:opacity-0 duration-200">{t("DragDropArea.Browse")}</span>
              <FontAwesomeIcon
                className="absolute top-1/2 -translate-y-1/2 right-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 duration-200"
                icon={faPlus}
              />
            </button>
          </>
        )}
        <input
          className="hidden"
          type="file"
          id="sliders"
          accept="image/jpg, image/jpeg, image/png, image/webp"
          name="sliders"
          multiple
          //capture
          ref={fileInputRef}
          onChange={handleSelectFiles}
        />
      </div>
      {/**
       * //! --- validImages ---
       */}
      <div className="w-full h-3 bg-primary my-5 rounded-3xl"></div>
      {validImages?.length > 0 && (
        <div className="images__preview grid grid-cols-3  w-full mt-10 justify-items-center gap-10 amd:grid-cols-2 asm:grid-cols-1">
          {validImages.map((img: any, i: number) => (
            <div key={i} className="w-full h-fit relative group ">
              <Image
                className="w-full aspect-square object-cover round max-w-[85%] ss:max-w-full max-h-[160px] group-hover:blur-[2px] ss:!w-full duration-200 cursor-"
                src={img.url}
                alt={img.name}
                width={1000}
                height={1000}
              />
              <FontAwesomeIcon
                className="absolute top-3 ss:-top-7 right-1 cursor-pointer text-2xl"
                icon={faCircleXmark}
                onClick={() => handleDeleteImg(i)}
              />
            </div>
          ))}
        </div>
      )}
      {/**
       * //! --- rejectedImages ---
       */}
      {rejectedImages?.length > 0 && (
        <div className="rejected__images flex flex-col items-start gap-5 w-full mt-10">
          <p className="text-red-500 w-full text-center">
            {t("DragDropArea.rejectedImages.max_size_err_msg")}
          </p>
          {rejectedImages?.map((img: any, i: number) => (
            <div className="w-full flex justify-between gap-5 asm:gap-2 " key={i}>
              <p className="truncate w-1/2 ">{img.name}</p>
              <span className="text-red- min-w-fit">
                {t("DragDropArea.rejectedImages.size_txt")} {(img.size / 1000000).toFixed(1)}{" "}
                {t("DragDropArea.rejectedImages.size_unit")}
              </span>{" "}
              <span className="text-red-500">{t("DragDropArea.rejectedImages.Canceled")}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DragDropArea;
