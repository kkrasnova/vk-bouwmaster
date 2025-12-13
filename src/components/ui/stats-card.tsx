"use client"

import React, { cloneElement, isValidElement } from "react"
import { cn } from "@/lib/utils"

interface StatsCardProps {
  value: string
  label: string
  description?: string
  delay?: string
  className?: string
  icon?: React.ReactNode
  variant?: "gradient-1" | "gradient-2" | "gradient-3" | "gradient-4"
  size?: "sm" | "md" | "lg"
}

export function StatsCard({
  value,
  label,
  description,
  delay = "0s",
  className,
  icon,
  variant = "gradient-1",
  size = "md"
}: StatsCardProps) {
  const [isVisible, setIsVisible] = React.useState(false)
  const [count, setCount] = React.useState(0)
  const [meshAnimKey, setMeshAnimKey] = React.useState(0)
  const [meshVisible, setMeshVisible] = React.useState(true)
  const cardRef = React.useRef<HTMLDivElement>(null)

  const numericValue = React.useMemo(() => {
    const match = value.match(/\d+/)
    return match ? parseInt(match[0]) : 0
  }, [value])

  const suffix = React.useMemo(() => {
    return value.replace(/\d+/, "")
  }, [value])

  const isSpecialValue = React.useMemo(() => {
    return value.includes("/") || !/^\d/.test(value);
  }, [value]);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true)
          }, parseFloat(delay) * 1000)
        }
      },
      { threshold: 0.2, rootMargin: '-50px' }
    )

    const currentRef = cardRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [delay])

  React.useEffect(() => {
    if (!isVisible) return

    let timer: NodeJS.Timeout
    const duration = 2000 // 2 seconds
    const steps = 60
    const increment = numericValue / steps
    let current = 0

    setCount(0)
    timer = setInterval(() => {
      current += increment
      if (current >= numericValue) {
        setCount(numericValue)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => {
      clearInterval(timer)
    }
  }, [isVisible, numericValue])

  const gradientClasses = {
    "gradient-1": "from-cyan-500 via-blue-500 to-cyan-600",
    "gradient-2": "from-cyan-500 via-blue-500 to-cyan-600",
    "gradient-3": "from-cyan-500 via-blue-500 to-cyan-600",
    "gradient-4": "from-cyan-500 via-blue-500 to-cyan-600"
  }

  const sizeClasses = React.useMemo(() => {
    if (size === "sm") {
      return {
        padding: "p-1 sm:p-2",
        valueText: "text-base xs:text-lg sm:text-xl md:text-2xl",
        labelText: "text-[9px] xs:text-[10px] sm:text-xs md:text-sm",
        descText: "text-[8px] xs:text-[9px] sm:text-[10px] md:text-xs",
        iconText: "text-xs xs:text-sm sm:text-base md:text-lg",
      }
    }
    if (size === "lg") {
      return {
        padding: "p-3 sm:p-4 md:p-6",
        valueText: "text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl",
        labelText: "text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl",
        descText: "text-xs xs:text-sm sm:text-base md:text-lg",
        iconText: "text-base xs:text-lg sm:text-xl md:text-2xl",
      }
    }
    return {
      padding: "p-2 sm:p-3 md:p-5",
      valueText: "text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl",
      labelText: "text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl",
      descText: "text-[10px] xs:text-xs sm:text-sm md:text-base",
      iconText: "text-sm xs:text-sm sm:text-base md:text-base",
    }
  }, [size])

  return (
    <div
      ref={cardRef}
      className={cn(
        "stats-card group relative",
        "bg-gradient-to-br",
        gradientClasses[variant],
        "rounded-xl p-0.5",
        "transform transition-all duration-700 ease-out",
        "hover:scale-110 hover:shadow-2xl hover:shadow-cyan-500/50",
        "hover:rotate-1",
        isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-20 scale-95",
        className
      )}
      style={{
        animation: isVisible ? 'cardPulse 3s ease-in-out infinite' : 'none'
      }}
    >
      <div className={cn(
        "relative h-full rounded-xl overflow-hidden flex flex-col items-center justify-center z-10",
        sizeClasses.padding
      )}>
        {icon && (
          <div className="mb-0.5 sm:mb-1 group-hover:scale-105 transition-transform duration-500">
            {isValidElement(icon)
              ? cloneElement(icon, {
                  className: ((icon.props as any)?.className ? (icon.props as any).className+" " : "") + "text-white",
                  style: { 
                    ...((icon.props as any)?.style && typeof (icon.props as any).style === 'object' ? (icon.props as any).style : {}), 
                    textShadow: '0 0 4px rgba(255,255,255,0.3), 0 0 8px rgba(100,200,255,0.2)',
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))'
                  }
                } as any)
              : <span 
                  className={cn(sizeClasses.iconText, "text-white")} 
                  style={{ 
                    textShadow: '0 0 4px rgba(255,255,255,0.3), 0 0 8px rgba(100,200,255,0.2)',
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))'
                  }}
                >
                  {icon}
                </span>
            }
          </div>
        )}
        
        <div className={cn("mb-0.5 sm:mb-1 font-extrabold text-transparent tiffany-gradient-text flex items-baseline justify-center select-none group-hover:scale-110 transition-transform duration-300", sizeClasses.valueText)} 
          style={{
            textShadow: '0 0 10px rgba(0,0,0,0.9), 0 0 20px rgba(0,0,0,0.7), 0 0 30px rgba(100,200,255,0.5), 0 2px 4px rgba(0,0,0,1)',
            WebkitTextStroke: '1px rgba(0,0,0,0.3)'
          }}
        >
          <span className="relative z-20">{isSpecialValue ? value : count + suffix}</span>
        </div>
        
        <div className={cn("font-bold text-transparent tiffany-gradient-text mb-1 text-center break-words max-w-full relative z-20 group-hover:scale-105 transition-transform duration-300", sizeClasses.labelText)}
          style={{
            textShadow: '0 0 8px rgba(0,0,0,0.9), 0 0 15px rgba(0,0,0,0.7), 0 2px 4px rgba(0,0,0,1), 0 0 20px rgba(100,200,255,0.4)',
            WebkitTextStroke: '0.5px rgba(0,0,0,0.3)'
          }}
        >
          {label}
        </div>
        
        {description && (
          <div className={cn("text-transparent tiffany-gradient-text text-center break-words max-w-full relative z-20", sizeClasses.descText)}
            style={{
              textShadow: '0 0 6px rgba(0,0,0,0.9), 0 0 12px rgba(0,0,0,0.7), 0 2px 3px rgba(0,0,0,1)',
              WebkitTextStroke: '0.3px rgba(0,0,0,0.2)'
            }}
          >
            {description}
          </div>
        )}
      </div>

      <div
        className={cn(
          "absolute inset-0",
          "bg-gradient-to-br from-black via-blue-950 to-slate-950",
          "opacity-95"
        )}
      />
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 via-cyan-900/10 to-transparent opacity-60" />
      <div className={cn(
        "absolute inset-0 bg-gradient-to-br",
        gradientClasses[variant],
        "opacity-[0.08] group-hover:opacity-[0.15]",
        "transition-opacity duration-700"
      )} />
      <div className={cn(
        "absolute inset-0 bg-gradient-to-tl from-cyan-950/40 via-blue-950/20 to-transparent",
        "opacity-50 group-hover:opacity-70",
        "transition-opacity duration-700"
      )} />
      <div className={cn(
        "absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700",
        "bg-radial-gradient bg-gradient-to-r",
        gradientClasses[variant],
        "blur-3xl"
      )} />
      <div className={cn(
        "absolute -top-6 -right-6 w-20 h-20", // Меньше декоративные "пузырьки"
        "bg-gradient-to-br",
        gradientClasses[variant],
        "rounded-full blur-3xl",
        isVisible ? "opacity-10" : "opacity-0",
        "group-hover:opacity-20 group-hover:scale-105",
        "transition-all duration-700"
      )} />
      <div className={cn(
        "absolute -bottom-6 -left-6 w-20 h-20",
        "bg-gradient-to-tl",
        gradientClasses[variant],
        "rounded-full blur-3xl",
        isVisible ? "opacity-10" : "opacity-0",
        "group-hover:opacity-20 group-hover:scale-105",
        "transition-all duration-700"
      )} style={{ transitionDelay: '0.2s' }} />
      <div className={cn(
        "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12",
        "bg-gradient-to-r",
        gradientClasses[variant],
        "rounded-full blur-2xl",
        isVisible ? "opacity-6" : "opacity-0",
        "group-hover:opacity-15 group-hover:scale-105",
        "transition-all duration-700"
      )} style={{ transitionDelay: '0.1s' }} />
      <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className={cn(
              "absolute w-2 h-2 rounded-full",
              "bg-gradient-to-br",
              gradientClasses[variant],
              isVisible ? "opacity-30 animate-float" : "opacity-0"
            )}
            style={{
              left: `${20 + i * 30}%`,
              top: `${30 + i * 20}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i}s`,
              transitionDelay: `${0.3 + i * 0.1}s`
            }}
          />
        ))}
      </div>
    </div>
  )
}

