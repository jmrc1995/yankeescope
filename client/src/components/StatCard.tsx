interface StatCardProps {
  name: string;
  image?: string;
  statLines: string[];
  theme?: "blue" | "red" | "slate"; 
}

export default function StatCard({ name, image, statLines, theme = "blue" }: StatCardProps) {
  const bg = {
    red: "bg-red-600",
    blue: "bg-blue-600",
    slate: "bg-slate-600",
  }[theme];

  return (
    <div className={`${bg} text-white rounded-xl shadow-lg p-6 flex items-center gap-4`}>
      {image && (
        <img
          src={image}
          alt={name}
          className="w-16 h-16 rounded-full border-2 border-white object-cover"
        />
      )}
      <div>
        <h3 className="text-xl font-bold">{name}</h3>
        <ul className="text-sm mt-1 space-y-1">
          {statLines.map((line, i) => (
            <li key={i}>{line}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
