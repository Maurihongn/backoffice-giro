import * as React from "react";
import { SVGProps } from "react";
const UserRoundCog = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    width="1em"
      height="1em"
      viewBox="0 0 24 24"
    className="lucide lucide-user-round-cog-icon lucide-user-round-cog"
    {...props}
  >
    <path d="m14.305 19.53.923-.382M15.228 16.852l-.923-.383M16.852 15.228l-.383-.923M16.852 20.772l-.383.924M19.148 15.228l.383-.923M19.53 21.696l-.382-.924M2 21a8 8 0 0 1 10.434-7.62M20.772 16.852l.924-.383M20.772 19.148l.924.383" />
    <circle cx={10} cy={8} r={5} />
    <circle cx={18} cy={18} r={3} />
  </svg>
);
export default UserRoundCog;
