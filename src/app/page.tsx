import Link from "next/link";

export default function Home() {
  return (
    <main className="no-scrollbar flex min-h-screen flex-col items-center justify-between p-24">
      <Link href="/productos/porta-tablet">Producto 1</Link>
    </main>
  );
}
