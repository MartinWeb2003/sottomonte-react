import { cookies } from "next/headers";
import { createHmac } from "crypto";
import LoginForm from "./LoginForm";
import AdminView from "./AdminView";
import { getAllListingsAdmin } from "../../lib/queries";

async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  if (!token) return false;
  if (!process.env.ADMIN_PASSWORD || !process.env.ADMIN_SESSION_SECRET) return false;
  const expected = createHmac("sha256", process.env.ADMIN_SESSION_SECRET)
    .update(process.env.ADMIN_PASSWORD)
    .digest("hex");
  return token === expected;
}

export default async function AdminPage() {
  const authed = await isAuthenticated();

  if (!authed) {
    return (
      <main className="adm-root">
        <LoginForm />
      </main>
    );
  }

  const listings = await getAllListingsAdmin();

  return (
    <main className="adm-root">
      <AdminView initialListings={listings} />
    </main>
  );
}
