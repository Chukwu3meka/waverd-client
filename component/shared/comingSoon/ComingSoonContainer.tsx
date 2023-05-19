import { useEffect, useState } from "react";

import { ComingSoon } from ".";
import { fullDateFn } from "@utils/handlers";

import { ComingSoonContainer, TimeLeft } from "@interface/components/shared/comingSoonInterface";

export default ({ header = false, minHeight, finishDate = new Date("August 15 2023") }: ComingSoonContainer) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ date: "", days: 0, hours: 0, minutes: 0, seconds: 0 });

  minHeight = header ? "var(--visibleScreen)" : "calc(var(--visibleScreen) - var(--headerHeight))";

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calcTimeLeftFn());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const calcTimeLeftFn = (): TimeLeft => {
    const diffInSeconds = Math.round((finishDate.getTime() - new Date().getTime()) / 1000);

    return {
      date: fullDateFn(finishDate),
      days: Math.floor(diffInSeconds / (3600 * 24)),
      hours: Math.floor((diffInSeconds % (3600 * 24)) / 3600),
      minutes: Math.floor((diffInSeconds % 3600) / 60),
      seconds: diffInSeconds % 60,
    };
  };

  return <ComingSoon timeLeft={timeLeft} header={header} minHeight={minHeight} />;
};