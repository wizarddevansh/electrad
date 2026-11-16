import React from "react";

interface ElectradLogoProps {
  className?: string;
  size?: number;
  withBackground?: boolean;
}

export function ElectradLogo({
  className = "h-7 w-7",
  size,
  withBackground = false,
}: ElectradLogoProps) {
  const style = size ? { width: size, height: size } : undefined;

  return (
    <svg
      viewBox={withBackground ? "0 0 1024 1024" : "240 280 540 470"}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 select-none ${className}`}
      style={style}
      aria-label="Electrad Logo"
    >
      {withBackground && (
        <rect width="1024" height="1024" rx="128" fill="#0A110E" />
      )}

      {/* Top Architectural Arm - Crisp Off-White */}
      <polygon
        points="362,307 746,307 670,383 380,383 274,489 274,395"
        fill="#F4F7F5"
      />

      {/* Middle Dynamic Energy-Flow Arm - Emerald Green */}
      <polygon
        points="361,471 662,471 577,552 380,552 274,638 274,552"
        fill="#10B981"
      />

      {/* Bottom Architectural Base - Crisp Off-White */}
      <polygon
        points="274,639 746,639 657,728 274,728"
        fill="#F4F7F5"
      />
    </svg>
  );
}
