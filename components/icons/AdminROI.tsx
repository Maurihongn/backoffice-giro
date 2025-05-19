import * as React from "react";
import { SVGProps } from "react";
const AdminROI = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {/* Escudo */}
    <path 
      d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" 
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    
    {/* Texto ROI centrado dentro del escudo - más grande y más arriba */}
    <text
      x="12"
      y="11"
      fontSize="5.5"
      fontWeight="bold"
      fontFamily="sans-serif"
      textAnchor="middle"
      dominantBaseline="middle"
    >
      ROI
    </text>
  </svg>
);
export default AdminROI;