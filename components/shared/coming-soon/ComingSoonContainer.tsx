"use client";

import ComingSoon from "./ComingSoon";

import { format } from "date-fns";
import { fullDateFn } from "@lib/helpers";
import { memo, useEffect, useState } from "react";

export interface ComingSoonContainerProps {
  minHeight?: string;
  finishDate?: Date;
}

export interface TimeLeft {
  date: string;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const ComingSoonContainer = ({ minHeight = "var(--contentHeight)", finishDate = new Date("2026-05-13") }: ComingSoonContainerProps) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ date: "", days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    let timer: any;

    if (finishDate instanceof Date) {
      timer = setInterval(() => {
        setTimeLeft(calcTimeLeftFn());
      }, 1000);
    }

    return () => clearInterval(timer);
  }, []);

  const calcTimeLeftFn = (): TimeLeft => {
    const diffInSeconds = Math.round((new Date(finishDate).getTime() - new Date().getTime()) / 1000);

    return {
      seconds: diffInSeconds % 60,
      date: format(finishDate, "ccc, do MMMM yyy"),
      days: Math.floor(diffInSeconds / (3600 * 24)),
      minutes: Math.floor((diffInSeconds % 3600) / 60),
      hours: Math.floor((diffInSeconds % (3600 * 24)) / 3600),
    };
  };

  return <ComingSoon timeLeft={timeLeft} minHeight={minHeight} />;
};

export default memo(ComingSoonContainer);
