import { usePWA } from './hooks/usePWA';

export default function App() {
  const { isInstallable, installApp, isOnline } = usePWA();

  return (
    <h1>Hello, recipe finder</h1>  );
}