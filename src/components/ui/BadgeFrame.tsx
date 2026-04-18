"use client";

import { Badge } from "@/lib/badges";

interface BadgeFrameProps {
  badge: Badge;
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  /**
   * Optional override for the frame's hero color.
   * Useful when a badge belongs to a specific world (Canvas orange, Story purple)
   * and should use that color instead of the rarity default.
   */
  accentColor?: string;
}

// Rarity-to-color mapping. Used for the frame ring, accent glow, and pill.
const RARITY_TOKENS: Record<string, { ring: string; pill: string; pillText: string; label: string }> = {
  common: {
    ring: "#2E8CE6",
    pill: "rgba(46,140,230,0.18)",
    pillText: "#2E8CE6",
    label: "COMMON",
  },
  rare: {
    ring: "#7B52EE",
    pill: "rgba(123,82,238,0.18)",
    pillText: "#7B52EE",
    label: "RARE",
  },
  legendary: {
    ring: "#FFD700",
    pill: "rgba(255,215,0,0.18)",
    pillText: "#C9A227",
    label: "LEGENDARY",
  },
};

// Size presets — kept consistent between reveal modal and profile grid
const SIZE_TOKENS = {
  sm: {
    outerPx: 72,         // profile grid tile
    charScale: 0.72,     // Quacky fills 72% of the inner area
    ringWidth: 2.5,
    textSize: 9,
    pillSize: 6,
    showText: false,     // too small for text
  },
  md: {
    outerPx: 120,
    charScale: 0.78,
    ringWidth: 3,
    textSize: 11,
    pillSize: 8,
    showText: true,
  },
  lg: {
    outerPx: 180,        // badge reveal modal default
    charScale: 0.82,
    ringWidth: 4,
    textSize: 13,
    pillSize: 9,
    showText: true,
  },
  xl: {
    outerPx: 240,        // parent-share card
    charScale: 0.82,
    ringWidth: 5,
    textSize: 15,
    pillSize: 11,
    showText: true,
  },
};

export function BadgeFrame({
  badge,
  size = "md",
  showText,
  accentColor,
}: BadgeFrameProps) {
  const rarity = badge.rarity || "common";
  const tokens = RARITY_TOKENS[rarity] || RARITY_TOKENS.common;
  const sz = SIZE_TOKENS[size];

  // If caller passed an accent color, use that instead of the rarity ring
  const ringColor = accentColor || tokens.ring;
  const pillBg = accentColor
    ? `${accentColor}2e`
    : tokens.pill;
  const pillTextColor = accentColor || tokens.pillText;

  const shouldShowText = showText !== undefined ? showText : sz.showText;

  // Has Quacky PNG?
  const artSrc = badge.artUrl;
  const hasArt = !!artSrc;

  // Inner circle diameter and character art size within it
  const innerDiameter = sz.outerPx * 0.88;
  const charSize = innerDiameter * sz.charScale;

  return (
    <div
      className="inline-flex flex-col items-center gap-2"
      style={{ width: sz.outerPx + 24 }}
    >
      {/* Circular frame */}
      <div
        className="relative flex items-center justify-center"
        style={{
          width: sz.outerPx,
          height: sz.outerPx,
        }}
      >
        {/* Outer ring (rarity color) */}
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 w-full h-full"
          aria-hidden="true"
        >
          {/* Outer rim */}
          <circle
            cx="50"
            cy="50"
            r={48 - sz.ringWidth / 2}
            fill="none"
            stroke={ringColor}
            strokeWidth={sz.ringWidth}
          />
          {/* Inner plate fill */}
          <circle
            cx="50"
            cy="50"
            r={48 - sz.ringWidth - 1}
            fill="#0F1E2E"
          />
          {/* Decorative inner ring for rare + legendary */}
          {(rarity === "rare" || rarity === "legendary") && (
            <circle
              cx="50"
              cy="50"
              r={48 - sz.ringWidth - 3}
              fill="none"
              stroke={ringColor}
              strokeWidth="0.6"
              opacity="0.5"
            />
          )}
          {/* Legendary orbital accents: 4 small dots at cardinal points */}
          {rarity === "legendary" && (
            <>
              <circle cx="50" cy="4" r="2.5" fill={ringColor} />
              <circle cx="96" cy="50" r="2.5" fill={ringColor} />
              <circle cx="50" cy="96" r="2.5" fill={ringColor} />
              <circle cx="4" cy="50" r="2.5" fill={ringColor} />
            </>
          )}
        </svg>

        {/* Character art (Quacky PNG) — positioned inside the frame */}
        <div
          className="relative flex items-end justify-center overflow-hidden"
          style={{
            width: innerDiameter,
            height: innerDiameter,
            borderRadius: "50%",
          }}
        >
          {hasArt ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={artSrc!}
              alt={badge.name}
              style={{
                width: charSize,
                height: charSize,
                objectFit: "contain",
                marginBottom: -innerDiameter * 0.04,
              }}
              draggable={false}
            />
          ) : (
            // Fallback: emoji (for Waves 2-3 badges without PNG yet)
            <span
              style={{
                fontSize: charSize * 0.6,
                lineHeight: 1,
                marginBottom: innerDiameter * 0.15,
              }}
              aria-hidden="true"
            >
              {badge.emoji}
            </span>
          )}
        </div>
      </div>

      {/* Badge name + rarity pill */}
      {shouldShowText && (
        <div className="flex flex-col items-center gap-1 w-full">
          <p
            className="font-black uppercase tracking-wide text-center leading-tight text-foreground"
            style={{
              fontSize: sz.textSize,
              maxWidth: sz.outerPx + 20,
            }}
          >
            {badge.name}
          </p>
          <div
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full"
            style={{
              backgroundColor: pillBg,
            }}
          >
            <span
              className="rounded-full"
              style={{
                width: sz.pillSize * 0.45,
                height: sz.pillSize * 0.45,
                backgroundColor: pillTextColor,
              }}
              aria-hidden="true"
            />
            <span
              className="font-black tracking-wider"
              style={{
                fontSize: sz.pillSize,
                color: pillTextColor,
                letterSpacing: "0.1em",
              }}
            >
              {tokens.label}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
