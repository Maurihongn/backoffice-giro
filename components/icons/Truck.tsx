import * as React from "react"
import { SVGProps } from "react"
const Truck = (props: SVGProps<SVGSVGElement>) => (
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
    className="lucide lucide-truck-icon lucide-truck"
    {...props}
  >
    <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2M15 18H9M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
    <circle cx={17} cy={18} r={2} />
    <circle cx={7} cy={18} r={2} />
  </svg>
)
export default Truck