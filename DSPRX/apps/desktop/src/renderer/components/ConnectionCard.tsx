import { useEffect, useState } from 'react';

export default function ConnectionCard() {
  const [state, setState] = useState<'disconnected'|'connecting'|'connected'|'error'>('disconnected');
  const [latency, setLatency] = useState<number|null>(null);
  const [firstProfileId, setFirstProfileId] = useState<string|undefined>();

  useEffect(() => { (async () => {
    const list = await window.dsprx.listProfiles();
    setFirstProfileId(list[0]?.id);
  })(); }, []);

  const onConnect = async () => {
    try {
      setState('connecting');
      await window.dsprx.connect(firstProfileId);
      await new Promise(r => setTimeout(r, 400));
      setLatency(28);
      setState('connected');
    } catch {
      setState('error');
    }
  };

  const onDisconnect = async () => {
    await window.dsprx.disconnect();
    setState('disconnected');
    setLatency(null);
  };

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-gray-500">Статус</div>
          <div className={`text-lg font-semibold ${state==='connected'?'text-green-600': state==='connecting'?'text-primary':'text-ink'}`}>{
            state==='connected'?'Подключено': state==='connecting'?'Подключение…': state==='error'?'Ошибка':'Отключено'
          }</div>
        </div>
        <div className="text-sm text-gray-500">Задержка</div>
        <div className="text-lg font-semibold">{latency ?? '—'} ms</div>
      </div>

      <div className="rounded-xl bg-[#F7FAFF] border border-line p-6 flex items-center justify-between">
        <div>
          <div className="text-sm text-gray-500">Сервер</div>
          <div className="font-medium">Выберите профиль в панели справа</div>
        </div>
        <button
          onClick={state==='connected'? onDisconnect : onConnect}
          className={`px-5 py-3 rounded-xl font-semibold text-white ${state==='connected'?'bg-red-500':'bg-primary hover:bg-primaryDark'}`}
        >
          {state==='connected'?'Disconnect':'Connect'}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Stat label="Протокол" value="WireGuard"/>
        <Stat label="Входящий" value="72 Mbps"/>
        <Stat label="Исходящий" value="64 Mbps"/>
      </div>
    </div>
  );
}

function Stat({label, value}:{label:string, value:string}){
  return (
    <div className="rounded-xl border border-line p-4 text-center">
      <div className="text-xs text-gray-500">{label}</div>
      <div className="text-base font-semibold">{value}</div>
    </div>
  );
}
