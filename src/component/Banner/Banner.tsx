import React from "react";

interface Props {
  image: string;
  title: string;
  desc: string;
}

const Banner: React.FC<Props> = ({ image, title, desc }: Props) => {
  return (
    <div className="overflow-hidden mb-[40px] h-[210px] relative text-white">
      <img
        src={image}
        alt="image"
        className="rounded-[20px]  h-full p-2 w-full"
      />
      <div className="absolute top-10 left-12 ">
        <h1 className="font-bold text-[24px]">{title}</h1>
        <h2 className="text-[20px] font-[600] pb-4">{desc}</h2>
        <button className="px-10 py-2 bg-[#f51167] rounded-[10px] text-[14px] font-[600]">
          SHOP NOW
        </button>
      </div>
      <div className="absolute top-[27px] right-[26px]">
        <p className="text-[14px] font-bold px-2 rounded-[2px] bg-[#50e550]">
          New
        </p>
      </div>
    </div>
  );
};

export default Banner;
