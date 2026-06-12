import * as React from "react";

export interface DotRippleIconProps extends React.SVGProps<SVGSVGElement> {
  variant?: "default" | "gray";
}

const DotRippleIcon = ({ variant = "default", ...props }: DotRippleIconProps) => (
  <svg
    width="100%"
    viewBox="244 244 192 192"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g transform="translate(340, 340)">
      <circle
        cx={0}
        cy={0}
        r={87}
        fill="none"
        stroke={variant === "gray" ? "currentColor" : "rgb(144, 211, 245)"}
        strokeWidth={18}
        strokeLinecap="round"
        strokeDasharray="473 75"
        strokeDashoffset={30}
      />
      <circle
        cx={0}
        cy={0}
        r={51}
        fill="none"
        stroke={variant === "gray" ? "currentColor" : "rgb(85, 184, 240)"}
        strokeWidth={18}
        strokeLinecap="round"
        strokeDasharray="277 44"
        strokeDashoffset={-105}
      />
      <circle
        cx={0}
        cy={0}
        r={24}
        fill={variant === "gray" ? "currentColor" : "rgb(46, 154, 216)"}
      />
    </g>
  </svg>
);
export default DotRippleIcon;
