"use client";

import "ckeditor5-custom-build/build/translations/ar";
import { useState, useEffect } from "react";
import { memo } from "react";
import useDebounce from "@/Hooks/useDebounce";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const TextEditor = memo(function TextEditor({
  lng,
  setValue,
  stateName,
  watch,
  ServerErrors,
  required_err_msg,
}: any) {
  const defaultData = watch(stateName);
  const [data, setData] = useState(defaultData);
  const debouncedInputValue = useDebounce(data); // 500 milliseconds delay

  const [startTyping, setStartTyping] = useState(false);
  const [error, setError] = useState(false);
  const lang = lng;
  useEffect(() => {
    if (data === "" && startTyping) {
      setError(true);
    } else setError(false);
  }, [data, startTyping]);

  return (
    <div className="flex flex-col items-start text-lg justify-center gap-2 w-full">
      <CKEditor
        config={{
          language: lang,
          toolbar: {
            shouldNotGroupWhenFull: true,
          },
        }}
        editor={ClassicEditor}
        data={data}
        onChange={(event, editor) => {
          const data = editor.getData();
          setData(data);
          setValue(stateName, data);
          setStartTyping(true);
        }}
      />
      {error && <p className="pt-2 text-xs text-red-500">{required_err_msg}</p>}

      {
        //!--- server errors --------
        ServerErrors?.response?.data?.errors &&
          ServerErrors?.response?.data?.errors[stateName] && (
            <p className="pt-2 text-xs text-red-500">
              {ServerErrors?.response?.data?.errors &&
                ServerErrors?.response?.data?.errors[stateName][0]}
            </p>
          )
      }
    </div>
  );
});

export default TextEditor;
