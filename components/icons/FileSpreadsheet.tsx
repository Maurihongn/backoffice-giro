import * as React from "react"
import { SVGProps } from "react"
const FileSpreadsheet = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"

    fill="none"
    stroke="currentColor"
    width="1em"
      height="1em"
      viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    className="lucide lucide-file-spreadsheet-icon lucide-file-spreadsheet"
    {...props}
  >
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
    <path d="M14 2v4a2 2 0 0 0 2 2h4M8 13h2M14 13h2M8 17h2M14 17h2" />
  </svg>
)
export default FileSpreadsheet