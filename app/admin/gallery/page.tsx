import { AdminShell } from "@/components/admin/AdminShell";
import { GalleryManager } from "@/components/admin/GalleryManager";
import { getGallery } from "@/lib/cms";

export const dynamic = "force-dynamic";

export default async function AdminGalleryPage() {
  const photos = await getGallery();
  return (
    <AdminShell>
      <p className="admin-kicker">Media</p>
      <h1>Gallery</h1>
      <p className="admin-lead">
        Photographs on the Nigeria and Canada gallery walls. Filter by society, then add, edit, or remove pictures.
      </p>
      <GalleryManager photos={photos} />
    </AdminShell>
  );
}
