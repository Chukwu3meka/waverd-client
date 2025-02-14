import dynamic from "next/dynamic";
import { SOCIAL_ACCOUNTS } from "@lib/constants";

const MdFacebook = dynamic(() => import("react-icons/md").then((x) => x.MdFacebook));
const TbPhoneCall = dynamic(() => import("react-icons/tb").then((x) => x.TbPhoneCall));
const TiSocialTwitter = dynamic(() => import("react-icons/ti").then((x) => x.TiSocialTwitter));
const TiSocialLinkedin = dynamic(() => import("react-icons/ti").then((x) => x.TiSocialLinkedin));
const TiSocialInstagram = dynamic(() => import("react-icons/ti").then((x) => x.TiSocialInstagram));
const MdOutlineWhatsapp = dynamic(() => import("react-icons/md").then((x) => x.MdOutlineWhatsapp));
const VscGithubInverted = dynamic(() => import("react-icons/vsc").then((x) => x.VscGithubInverted));

const SocialIcons = ({ filterParams, fontSize = "18px" }: { fontSize?: string; filterParams: string[] }) => (
  <div className="flex gap-2.5 ">
    {SOCIAL_ACCOUNTS.filter((acc) => filterParams.includes(acc.id)).map(({ title, id, href }) => (
      <a key={id} href={href} target="_blank" rel="noopener noreferrer" aria-label={title.toLowerCase()}>
        {title === "Whatsapp" ? (
          <MdOutlineWhatsapp fontSize={fontSize} />
        ) : title === "Twitter" ? (
          <TiSocialTwitter fontSize={fontSize} />
        ) : title === "Instagram" ? (
          <TiSocialInstagram fontSize={fontSize} />
        ) : title === "Facebook" ? (
          <MdFacebook fontSize={fontSize} />
        ) : title === "LinkedIn" ? (
          <TiSocialLinkedin fontSize={fontSize} />
        ) : title === "Github" ? (
          <VscGithubInverted fontSize={fontSize} />
        ) : title === "Phone" ? (
          <TbPhoneCall fontSize={fontSize} />
        ) : (
          <></>
        )}
      </a>
    ))}
  </div>
);

export default SocialIcons;
