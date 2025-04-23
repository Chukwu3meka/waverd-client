import dynamic from "next/dynamic";

const ComingSoon = dynamic(() => import("@components/shared/coming-soon/ComingSoonContainer"));

const ResetPage = () => <ComingSoon finishDate={new Date("2025-04-10")} />;
export default ResetPage;
