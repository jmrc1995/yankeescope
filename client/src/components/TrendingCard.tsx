import React from "react";

interface TrendingCardProps {
  name: string;
  statLines: string[];
  color?: "blue" | "red" | "slate";
  image?: string;
}

export default function TrendingCard({ name, statLines, color = "blue", image }: TrendingCardProps) {
  const bgColor = {
    blue: "bg-blue-600",
    red: "bg-red-600",
    slate: "bg-slate-600",
  }[color];

  return (
    <div className={`${bgColor} text-white rounded-xl p-4 flex items-center gap-4 shadow-md`}>
      {image && <img src={image} alt={name} className="w-16 h-16 rounded-full border border-white" />}
      <div>
        <h4 className="text-lg font-bold">{name}</h4>
        <ul className="text-sm mt-1 space-y-1">
          {statLines.map((line, i) => (
            <li key={i}>{line}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
