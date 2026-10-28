import { AdminShell } from "@/components/admin/AdminShell";
import { HeroEditor } from "@/components/admin/HeroEditor";
import { getAllHeroes } from "@/lib/cms";

export const dynamic = "force-dynamic";

export default async function AdminHeroesPage() {
  const heroes = await getAllHeroes();
  return (
    <AdminShell>
      <p className="admin-kicker">Media</p>
      <h1>Page images</h1>
      <p className="admin-lead">Home heroes plus About and Programs banners for Nigeria and Canada.</p>
      <HeroEditor heroes={heroes} />
    </AdminShell>
  );
}
