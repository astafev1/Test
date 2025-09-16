import Logo from './components/Logo';
import ConnectionCard from './components/ConnectionCard';
import FeaturesPanel from './components/FeaturesPanel';
import ProfilesPanel from './components/ProfilesPanel';

export default function App() {
  return (
    <div className="min-h-screen bg-white text-ink">
      <header className="px-6 py-4 border-b border-line flex items-center gap-3">
        <Logo />
        <h1 className="text-xl font-semibold">DSPRX</h1>
      </header>
      <main className="p-6 grid gap-6 md:grid-cols-3">
        <section className="md:col-span-2 rounded-2xl border border-line p-6">
          <ConnectionCard />
        </section>
        <section className="rounded-2xl border border-line p-6 grid gap-6">
          <FeaturesPanel />
          <ProfilesPanel />
        </section>
      </main>
    </div>
  );
}
