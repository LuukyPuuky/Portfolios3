"use client";

import Link from "next/link";
import React from "react";

interface CardStackProps {
  title?: string;
  subtitle?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  brandingTitle?: string;
  brandingImage?: string;
  fileColor?: string;
}

const CardStack: React.FC<CardStackProps> = ({
  title = "",
  subtitle = "",
  description = "",
  buttonText = "",
  buttonLink = "/",
  brandingTitle = "",
}) => {
  return (
    <div className="w-full max-w-8xl h-screen justify-center flex flex-col md:flex-row bg-primary p-6 md:p-10 mx-auto gap-8">
      {/* Left Side */}
      <div className="flex-1 flex flex-col gap-4 min-w-[300px]">
        <h1 className=" md:text-5xl text-4xl w-max">{title}</h1>
        <h2 className=" text-2xl">{subtitle}</h2>
        <p className="text-gray-300 text-base md:text-lg mb-6 leading-relaxed font-RobotoCondensed">
          {description}
        </p>
        <Link
          href={buttonLink}
          className="bg-black text-black cursor-pointer rounded-lg text-xl font-KronaOne flex justify-center items-center w-max px-10 py-3 mt-auto"
        >
          {buttonText}
        </Link>
      </div>

      {/* Right Side */}
      <div className="flex flex-col gap-4 basis-1/2 min-w-[320px]">
        <h1 className="md:text-5xl sm:text-4xl text-3xl font-KronaOne wrap-break-word min-w-[250px] md:min-w-[320px]">
          {brandingTitle}
        </h1>
        <div className="w-full flex justify-center items-center"></div>
      </div>
    </div>
  );
};

export default CardStack;
