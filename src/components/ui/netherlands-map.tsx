"use client"

import { useState } from 'react'
import { MapPin } from 'lucide-react'

interface City {
  name: string
  nameNL: string
  lat: number
  lng: number
  count?: number
}

const dutchCities: City[] = [
  { name: 'Amsterdam', nameNL: 'Amsterdam', lat: 52.3676, lng: 4.9041, count: 1 },
  { name: 'Rotterdam', nameNL: 'Rotterdam', lat: 51.9244, lng: 4.4777 },
  { name: 'Den Haag', nameNL: 'Den Haag', lat: 52.0705, lng: 4.3007 },
  { name: 'Utrecht', nameNL: 'Utrecht', lat: 52.0907, lng: 5.1214 },
  { name: 'Eindhoven', nameNL: 'Eindhoven', lat: 51.4416, lng: 5.4697 },
  { name: 'Groningen', nameNL: 'Groningen', lat: 53.2194, lng: 6.5665 },
  { name: 'Tilburg', nameNL: 'Tilburg', lat: 51.5653, lng: 5.0913 },
  { name: 'Almere', nameNL: 'Almere', lat: 52.3508, lng: 5.2647 },
  { name: 'Breda', nameNL: 'Breda', lat: 51.5719, lng: 4.7683 },
  { name: 'Nijmegen', nameNL: 'Nijmegen', lat: 51.8426, lng: 5.8606 },
]

export function NetherlandsMap({ selectedCity, onCitySelect }: { selectedCity?: string, onCitySelect?: (city: string) => void }) {
  const [hoveredCity, setHoveredCity] = useState<string | null>(null)

  // Центр Нидерландов для карты
  const mapCenter = { lat: 52.1326, lng: 5.2913 }
  const mapZoom = 7

  return (
    <div className="w-full">
      {/* Кнопки городов */}
      <div className="flex flex-wrap gap-3 mb-6 justify-center">
        {dutchCities.map((city) => (
          <button
            key={city.name}
            onClick={() => onCitySelect?.(city.name)}
            onMouseEnter={() => setHoveredCity(city.name)}
            onMouseLeave={() => setHoveredCity(null)}
            className={`
              relative px-4 py-2 rounded-full font-medium transition-all duration-300
              flex items-center gap-2
              ${selectedCity === city.name
                ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/50'
                : hoveredCity === city.name
                ? 'bg-gray-700 text-white'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }
            `}
          >
            <MapPin className={`w-4 h-4 ${selectedCity === city.name ? 'text-white' : 'text-gray-400'}`} />
            <span>{city.nameNL}</span>
            {city.count && (
              <span className={`
                absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs flex items-center justify-center
                ${selectedCity === city.name ? 'bg-white text-orange-600' : 'bg-orange-500 text-white'}
              `}>
                {city.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Карта Нидерландов через Google Maps Embed */}
      <div className="relative w-full h-[400px] rounded-xl overflow-hidden border-2 border-gray-700 shadow-2xl">
        <iframe
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dS6a4ZZU7Du8eU&q=Netherlands&zoom=${mapZoom}&language=nl`}
        />
        
        {/* Overlay с информацией */}
        <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm rounded-lg p-4 border border-gray-700">
          <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-orange-400" />
            <span>Зоны доставки в Нидерландах</span>
          </h3>
          <p className="text-gray-300 text-sm">
            Выберите город для просмотра зон доставки
          </p>
        </div>
      </div>

      {/* Информация о выбранном городе */}
      {selectedCity && (
        <div className="mt-6 p-4 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-orange-500/30">
          <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-orange-400" />
            <span>Зоны доставки в {dutchCities.find(c => c.name === selectedCity)?.nameNL || selectedCity}</span>
          </h4>
          <p className="text-gray-300 text-sm">
            Мы предоставляем услуги в {dutchCities.find(c => c.name === selectedCity)?.nameNL || selectedCity} и прилегающих районах.
          </p>
        </div>
      )}
    </div>
  )
}

