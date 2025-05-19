import * as React from "react"
import { SVGProps } from "react"
const CircleDollarSign = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
  
    fill="none"
    width="1em"
      height="1em"
      viewBox="0 0 24 24"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    className="lucide lucide-circle-dollar-sign-icon lucide-circle-dollar-sign"
    {...props}
  >
    <circle cx={12} cy={12} r={10} />
    <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8M12 18V6" />
  </svg>
)
export default CircleDollarSign