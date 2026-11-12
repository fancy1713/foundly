import { memo } from "react";

const UnibiLogo = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="relative h-12 w-10">
        <span className="absolute left-0 top-0 h-0 w-0 border-b-[16px] border-l-[16px] border-t-[16px] border-b-transparent border-l-[#ed1c24] border-t-transparent" />
        <span className="absolute bottom-0 left-0 h-8 w-5 bg-[#0f9b98]" />
        <span className="absolute bottom-2 left-5 h-8 w-5 bg-[#13708d]" />
      </div>
      <div className="leading-none">
        <p className="m-0 text-[22px] font-bold tracking-wide text-[#079b9a]">
          UNIBI
        </p>
        <p className="m-0 max-w-28 text-[7px] font-semibold leading-tight text-[#0f6f79]">
          Universitas Informatika dan Bisnis Indonesia
        </p>
      </div>
    </div>
  );
};

export default memo(UnibiLogo);
