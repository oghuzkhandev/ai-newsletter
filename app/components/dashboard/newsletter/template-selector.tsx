"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

const templates = [
  { id: "minimal", name: "Minimal", color: "from-blue-500 to-purple-500" },
  { id: "magazine", name: "Magazine", color: "from-red-500 to-orange-500" },
  { id: "cards", name: "Card Layout", color: "from-green-500 to-cyan-500" },
];

export default function TemplateSelector({ onSelect } : any) {
  return (
    <div className="grid grid-cols-3 gap-6">
      {templates.map((t) => (
        <motion.div
          key={t.id}
          whileHover={{ scale: 1.05 }}
          onClick={() => onSelect(t.id)}
          className="cursor-pointer"
        >
          <Card
            className={`p-5 border shadow-lg rounded-xl 
              bg-linear-to-r ${t.color} text-white font-semibold 
              h-32 flex items-center justify-center text-xl`}
          >
            {t.name}
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
