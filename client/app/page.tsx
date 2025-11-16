import { getProfile, getPortfolioItems } from "@/lib/api";

type PortfolioItem = {
  id: string | number;
  title?: string;
  shortDescription?: string;
};

export default async function HomePage() {
  const profile = await getProfile("id");
  const portfolio = await getPortfolioItems();

  const profileData = profile?.data;
  const items = (portfolio?.data ?? []) as PortfolioItem[];

  return (
    <main className="min-h-screen p-8">
      <section className="mb-12">
        <h1 className="text-4xl font-bold">
          {profileData?.brandName ?? "showfolio"}
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          {profileData?.tagline ?? "Studio tagline goes here"}
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Portfolio</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {items.map((item: PortfolioItem) => (
            <div key={item.id} className="border rounded-lg p-4">
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {item.shortDescription}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
