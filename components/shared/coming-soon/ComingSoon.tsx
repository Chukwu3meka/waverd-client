import { ComingSoonContainerProps, TimeLeft } from "./ComingSoonContainer";

export interface ComingSoonProps extends ComingSoonContainerProps {
  minHeight: string;
  timeLeft: TimeLeft;
}

const ComingSoon = ({ timeLeft, minHeight }: ComingSoonProps) => (
  <div className="flex flex-col gap-[5vh] p-10 justify-center" style={{ minHeight }}>
    <div className="text-right">
      <p className="">Coming soon...</p>
      <p className="text-3xl">{timeLeft.date}</p>
    </div>

    <section className="grid grid-cols-4 text-center">
      <span>
        <p className="text-6xl">{timeLeft.days}</p>
        <p className="font-extrabold">days</p>
      </span>
      <span>
        <p className="text-6xl">{timeLeft.hours}</p>
        <p className="font-extrabold">hours</p>
      </span>
      <span>
        <p className="text-6xl">{timeLeft.minutes}</p>
        <p className="font-extrabold">minutes</p>
      </span>
      <span>
        <p className="text-6xl">{timeLeft.seconds}</p>
        <p className="font-extrabold">seconds</p>
      </span>
    </section>

    <p className="text-justify">
      We apologize for the inconvenience, the page you're trying to access is not available at this time. We're currently working on making some improvements and updates
      to the page, so please bear with us while we make it better. Rest assured, we're doing everything we can to get the page up and running as soon as possible. We
      appreciate your patience and understanding while we work through this process. In the meantime, feel free to explore other parts of our website. Thank you for your
      understanding and support!
    </p>
  </div>
);

export default ComingSoon;
