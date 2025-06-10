// This will be the shared layout for all awareness pages
export default function AwarenessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">{children}</div>
  );
}
