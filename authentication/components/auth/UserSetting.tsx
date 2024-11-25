import { auth } from "@/auth";
import { userData } from "@/authentication/lib/types";
import { UserAccount } from "@/components/UserAccount";

export default async function UserSetting() {
  const session = await auth();
  // If no session or user is found, return early
  if (!session || !session.user) return <div>not found</div>;

  const { name, email, image } = session.user;

  // If any of the user fields are missing, return early
  if (!name || !email) return <div>not found2</div>;

  // Create a typed data object
  const data: userData = { name, email, image: image || undefined };

  return (
  
      <UserAccount data={data} />
 
  );
}
