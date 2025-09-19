// app/layout.tsx
import "./ui/global.css";

export const metadata = {
  title: 'App Usuários',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-100 text-gray-900">
        <main className="max-w-10xl mx-auto p-8">{children}</main>
      </body>
    </html>
  );
}
