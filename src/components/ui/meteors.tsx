import { cn } from "@/lib/utils";
import React, { useState, useEffect } from "react";

// Детерминированная функция для генерации "случайных" значений на основе индекса
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export const Meteors = ({
  number,
  className,
}: {
  number?: number;
  className?: string;
}) => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const meteors = new Array(number || 20).fill(true);
  
  // Если компонент еще не смонтирован на клиенте, возвращаем пустой контент
  // чтобы избежать несоответствия гидратации
  if (!mounted) {
    return null;
  }

  return (
    <>
      {meteors.map((el, idx) => {
        // Используем детерминированную генерацию на основе индекса
        // для обеспечения одинаковых значений на сервере и клиенте
        const seed = idx * 7919; // Простое число для лучшего распределения
        const leftValue = Math.floor(seededRandom(seed) * (400 - -400) + -400);
        const delayValue = seededRandom(seed + 1) * (0.8 - 0.2) + 0.2;
        const durationValue = Math.floor(seededRandom(seed + 2) * (10 - 2) + 2);
        
        return (
          <span
            key={"meteor" + idx}
            className={cn(
              "animate-meteor-effect absolute top-1/2 left-1/2 h-0.5 w-0.5 rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10] rotate-[215deg]",
              "before:content-[''] before:absolute before:top-1/2 before:transform before:-translate-y-[50%] before:w-[50px] before:h-[1px] before:bg-gradient-to-r before:from-[#64748b] before:to-transparent",
              className
            )}
            style={{
              top: 0,
              left: leftValue + "px",
              animationDelay: delayValue + "s",
              animationDuration: durationValue + "s",
            }}
          ></span>
        );
      })}
    </>
  );
};
