import { useState } from 'react';

type Feature = { id: string; title: string; desc: string; enabled: boolean };

const initial: Feature[] = [
  { id: 'feature.killSwitch', title: 'Kill‑Switch', desc: 'Блокировать трафик вне туннеля', enabled: true },
  { id: 'feature.splitTunneling', title: 'Split‑Tunneling', desc: 'Исключения по приложениям/сетям', enabled: false },
  { id: 'feature.dns', title: 'DNS (DoH/DoT)', desc: 'Безопасные резолверы', enabled: true },
  { id: 'feature.obfuscation', title: 'Обфускация', desc: 'Стелс‑режим/обёртки', enabled: false },
  { id: 'feature.logs', title: 'Логи', desc: 'Уровень и экспорт', enabled: false }
];

export default function FeaturesPanel(){
  const [features, setFeatures] = useState(initial);
  const toggle = (id:string) => setFeatures(fs => fs.map(f => f.id===id? {...f, enabled: !f.enabled}: f));
  return (
    <div className="grid gap-4">
      <h2 className="text-lg font-semibold">Функции</h2>
      {features.map(f => (
        <div key={f.id} className="flex items-start justify-between gap-3 p-4 border border-line rounded-xl">
          <div>
            <div className="font-medium">{f.title}</div>
            <div className="text-sm text-gray-500">{f.desc}</div>
          </div>
          <label className="inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only" checked={f.enabled} onChange={()=>toggle(f.id)} />
            <span className={`w-12 h-7 flex items-center bg-gray-300 rounded-full p-1 transition ${f.enabled?'bg-primary':''}`}>
              <span className={`bg-white w-5 h-5 rounded-full shadow transform transition ${f.enabled?'translate-x-5':''}`}></span>
            </span>
          </label>
        </div>
      ))}
    </div>
  );
}
