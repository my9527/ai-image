"use client";
// import Image from "next/image";

import Image from "next/image";
import { useCallback, useState } from "react";


export default function Home() {


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [_file, setFile] = useState<any>();
    // function handleChange(e) {
    //     console.log(e.target.files);
    //     setFile(URL.createObjectURL(e.target.files[0]));
    // }

  const uploadFile = useCallback(async (_file: File)=>{

    const formData = new FormData();
    formData.append("file", _file);
    fetch("http://localhost:3000/api/upload", {
      method: "POST",
      body: formData
    }).then((res)=>console.log(res))

  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFile = useCallback((e: any) => {
    const file = e.target.files[0];
    setFile(URL.createObjectURL(file));

    uploadFile(file);


    // const reader = new FileReader();
    // reader.onloadend = () => {
    //   setFile(reader.result);
    // };
    // reader.readAsDataURL(file);
  }, []);



  return (
    <div className="h-screen flex justify-center items-center px-[12px] flex-col gap-10">
      <div className={`max-w-md mx-auto border-2 border-gray-200 border-dashed p-[12px] h-[244px] w-full text-center flex justify-center items-center after:flex after:items-center after:justify-center after:w-0 after:text-gray-400 ${!_file && "after:content-['No_File_Selected'] after:w-full"}`}>
          {
            _file && <Image src={_file} alt="image" width={220} height={220} className="object-contain" /> 
          }
      </div>
      <div className="font-[sans-serif] max-w-md mx-auto">
        <input
        onChange={handleFile}
          type="file"
          className="w-full text-gray-400 font-semibold text-sm bg-white border file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-gray-500 rounded"
        />
        <p className="text-xs text-gray-400 mt-2 text-center">
          PNG, JPG SVG, WEBP, and GIF are Allowed.
        </p>
      </div>
    </div>
  );
}
