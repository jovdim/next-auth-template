import { auth } from "@/auth";
import { userData } from "@/authentication/lib/types";
import { UserAccount } from "@/components/UserAccount";

export default async function page() {
  const session = await auth();
  // If no session or user is found, return early
  if (!session || !session.user) return <div>not found</div>;

  const { name, email, image } = session.user;

  // If any of the user fields are missing, return early
  if (!name || !email) return <div>not found2</div>;

  // Create a typed data object
  const data: userData = { name, email, image: image || undefined };

  return (
    <div className="flex h-screen items-start justify-end bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800 p-4">
      <UserAccount data={data} />
    </div>
  );
}
