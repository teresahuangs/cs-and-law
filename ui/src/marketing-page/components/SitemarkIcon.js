import * as React from 'react';
import SvgIcon from '@mui/material/SvgIcon';

export default function ArtGuardIcon() {
  return (
    <SvgIcon sx={{ height: 24, width: 140, mr: 2 }}>
      <svg
        width={140}
        height={24}
        viewBox="0 0 140 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Shield Icon for ArtGuard AI */}
        <path
          fill="#4876EE"
          d="M18 4L28 12V20H8V12L18 4Z"
        />
        {/* Paintbrush Inside Shield */}
        <path
          fill="#00D3AB"
          d="M16 8H20V16H16Z"
        />
        <circle cx="18" cy="6" r="2" fill="#B4C0D3" />

        {/* "ArtGuard AI" Text */}
        <text x="35" y="16" fontFamily="Arial, sans-serif" fontSize="12" fontWeight="bold" fill="#4876EE">
          ArtGuard
        </text>
        <text x="110" y="16" fontFamily="Arial, sans-serif" fontSize="12" fontWeight="bold" fill="#00D3AB">
          AI
        </text>
      </svg>
    </SvgIcon>
  );
}


