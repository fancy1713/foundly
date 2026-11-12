import { memo } from "react";

type FormProgressRailProps = {
  currentStep: number;
  totalSteps: number;
};

const FormProgressRail = ({ currentStep, totalSteps }: FormProgressRailProps) => {
  return (
    <div className="absolute left-0 top-0 hidden h-full w-16 justify-center lg:flex">
      <div className="relative mt-1 h-[390px] w-6">
        <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[#9c9c9c]" />
        {Array.from({ length: totalSteps }, (_, index) => {
          const isActive = index === currentStep;
          const top = totalSteps === 1 ? 0 : (index / (totalSteps - 1)) * 100;

          return (
            <span
              aria-current={isActive ? "step" : undefined}
              className={`absolute left-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#1f6f84] bg-[#eeeeee] p-1 ${
                isActive ? "shadow-[0_0_0_3px_rgba(31,111,132,0.18)]" : ""
              }`}
              key={index}
              style={{ top: `${top}%` }}
            >
              <span
                className={`block h-full w-full rounded-full ${
                  isActive ? "bg-[#1f6f84]" : "bg-transparent"
                }`}
              />
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default memo(FormProgressRail);
