import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  result?: object | null;
}

export default function ConsoleLayout({ children, result }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col w-full">
      {/* Main content */}
      <main className="flex-1">
        <div className="w-[1000px] mx-auto p-4">
          {children}
        </div>
      </main>

      {/* Result */}
      <div className="w-full bg-gray-900 text-green-500 p-4 font-mono text-sm min-h-[200px] overflow-y-auto">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-gray-500">❯</span>
            <span>Result:</span>
          </div>
          <pre>
            {result ? JSON.stringify(result, null, 2) : 'No data'}
          </pre>
        </div>
    </div>
  );
}