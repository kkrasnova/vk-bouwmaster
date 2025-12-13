"use client"

export default function TestBlue() {
  return (
    <div className="min-h-screen bg-black p-20">
      <h1 className="text-white text-4xl mb-10 text-center">Тест синего градиента</h1>
      
      <div className="mb-8 p-8 rounded-2xl bg-gradient-to-br from-black via-blue-950 to-slate-950">
        <h2 className="text-2xl text-white mb-2">Синий градиент №1</h2>
        <p className="text-cyan-300">Black → Blue-950 → Slate-950</p>
      </div>

      <div className="relative mb-8 p-8 rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-blue-950 to-slate-950"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 via-cyan-900/10 to-transparent opacity-60"></div>
        <div className="relative">
          <h2 className="text-2xl text-white mb-2">Синий градиент №2 (с оверлеями)</h2>
          <p className="text-cyan-300">С дополнительными синими слоями</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="h-32 bg-black rounded-lg border border-cyan-500 flex items-center justify-center">
          <span className="text-white">Black</span>
        </div>
        <div className="h-32 bg-blue-950 rounded-lg border border-cyan-500 flex items-center justify-center">
          <span className="text-white">Blue-950</span>
        </div>
        <div className="h-32 bg-cyan-500 rounded-lg border border-cyan-300 flex items-center justify-center">
          <span className="text-black">Cyan-500</span>
        </div>
      </div>

      <div className="text-center">
        <a href="/" className="text-cyan-400 hover:text-cyan-300 underline text-xl">
          ← Вернуться на главную
        </a>
      </div>
    </div>
  )
}

