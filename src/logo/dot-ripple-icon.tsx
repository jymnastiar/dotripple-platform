import * as React from "react";
import { JSX } from "react/jsx-runtime";
const DotRippleIcon = (
  props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>,
) => (
  <svg
    width="100%"
    viewBox="244 244 192 192"
    role="img"
    style={{}}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <title
      style={{
        fill: "rgb(0, 0, 0)",
        stroke: "none",
        color: "rgb(255, 255, 255)",
        strokeWidth: 1,
        strokeLinecap: "butt",
        strokeLinejoin: "miter",
        opacity: 1,
        fontFamily: "&quot",
        fontSize: 16,
        fontWeight: 400,
        textAnchor: "start",
        dominantBaseline: "auto",
      }}
    >
      {"Logo lingkaran konsentris dengan dot tengah"}
    </title>
    <desc
      style={{
        fill: "rgb(0, 0, 0)",
        stroke: "none",
        color: "rgb(255, 255, 255)",
        strokeWidth: 1,
        strokeLinecap: "butt",
        strokeLinejoin: "miter",
        opacity: 1,
        fontFamily: "&quot",
        fontSize: 16,
        fontWeight: 400,
        textAnchor: "start",
        dominantBaseline: "auto",
      }}
    >
      {
        "Dua lingkaran konsentris terpotong acak dengan dot di tengah, warna sky blue"
      }
    </desc>
    <g
      transform="translate(340, 340)"
      style={{
        fill: "rgb(0, 0, 0)",
        stroke: "none",
        color: "rgb(255, 255, 255)",
        strokeWidth: 1,
        strokeLinecap: "butt",
        strokeLinejoin: "miter",
        opacity: 1,
        fontFamily: "&quot",
        fontSize: 16,
        fontWeight: 400,
        textAnchor: "start",
        dominantBaseline: "auto",
      }}
    >
      <circle
        cx={0}
        cy={0}
        r={87}
        fill="none"
        stroke="var(--ring-outer)"
        strokeWidth={18}
        strokeLinecap="round"
        strokeDasharray="473 75"
        strokeDashoffset={30}
        style={{
          fill: "none",
          stroke: "rgb(144, 211, 245)",
          color: "rgb(255, 255, 255)",
          strokeWidth: 18,
          strokeDasharray: "473px, 75px",
          strokeLinecap: "round",
          strokeLinejoin: "miter",
          opacity: 1,
          fontFamily: "&quot",
          fontSize: 16,
          fontWeight: 400,
          textAnchor: "start",
          dominantBaseline: "auto",
        }}
      />
      <circle
        cx={0}
        cy={0}
        r={51}
        fill="none"
        stroke="var(--ring-inner)"
        strokeWidth={18}
        strokeLinecap="round"
        strokeDasharray="277 44"
        strokeDashoffset={-105}
        style={{
          fill: "none",
          stroke: "rgb(85, 184, 240)",
          color: "rgb(255, 255, 255)",
          strokeWidth: 18,
          strokeDasharray: "277px, 44px",
          strokeLinecap: "round",
          strokeLinejoin: "miter",
          opacity: 1,
          fontFamily: "&quot",
          fontSize: 16,
          fontWeight: 400,
          textAnchor: "start",
          dominantBaseline: "auto",
        }}
      />
      <circle
        cx={0}
        cy={0}
        r={24}
        fill="var(--dot-color)"
        style={{
          fill: "rgb(46, 154, 216)",
          stroke: "none",
          color: "rgb(255, 255, 255)",
          strokeWidth: 1,
          strokeLinecap: "butt",
          strokeLinejoin: "miter",
          opacity: 1,
          fontFamily: "&quot",
          fontSize: 16,
          fontWeight: 400,
          textAnchor: "start",
          dominantBaseline: "auto",
        }}
      />
    </g>
  </svg>
);
export default DotRippleIcon;
