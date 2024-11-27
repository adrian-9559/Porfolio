import { Head } from "@/layouts/head";
import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen radial-gradient font text-lg">
      <Head />
      <main className="mb-12 m-4">
        <Navbar />
        {children}
      </main>
      <footer className="py-3 sticky m-2 w-auto mb-20 xl:mb-2">
        <Footer />
      </footer>
    </div>
  );
}
