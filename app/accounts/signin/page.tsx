import dynamic from "next/dynamic";

const ComingSoon = dynamic(() => import("@components/shared/coming-soon/ComingSoonContainer"));

const page = () => <ComingSoon finishDate={new Date("2025-04-01")} />;

export default page;
