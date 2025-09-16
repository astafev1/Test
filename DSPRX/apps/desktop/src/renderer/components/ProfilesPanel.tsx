import { useEffect, useState } from 'react';

type Profile = { id: string; name: string; protocol: string; endpoint: string };

export default function ProfilesPanel(){
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [selected, setSelected] = useState<string | null>(null);

  const refresh = async () => {
    const list = await window.dsprx.listProfiles();
    setProfiles(list);
    if (!selected && list[0]) setSelected(list[0].id);
  };

  useEffect(() => { refresh(); }, []);

  const onImport = async () => { await window.dsprx.importProfile(); await refresh(); };
  const onExport = async () => { if (selected) await window.dsprx.exportProfile(selected); };
  const onApply = async () => { if (selected) await window.dsprx.applyProfile(selected); };

  return (
    <div className="grid gap-3">
      <h2 className="text-lg font-semibold">Профили</h2>
      <div className="rounded-xl border border-line divide-y">
        {profiles.length===0 && <div className="p-4 text-sm text-gray-500">Нет профилей. Импортируйте .dsprx.json</div>}
        {profiles.map(p => (
          <button key={p.id} onClick={()=>setSelected(p.id)} className={`w-full text-left p-4 hover:bg-[#F7FAFF] ${selected===p.id?'bg-[#F7FAFF]':''}`}>
            <div className="font-medium">{p.name}</div>
            <div className="text-xs text-gray-500">{p.protocol} · {p.endpoint}</div>
          </button>
        ))}
      </div>
      <div className="flex gap-2">
        <button onClick={onImport} className="px-3 py-2 rounded-lg bg-primary text-white font-semibold">Импорт</button>
        <button onClick={onExport} className="px-3 py-2 rounded-lg border border-line">Экспорт</button>
        <button onClick={onApply} className="ml-auto px-3 py-2 rounded-lg border border-line">Применить</button>
      </div>
    </div>
  );
}
