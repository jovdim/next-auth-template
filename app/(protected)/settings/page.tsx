import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { UserAccount } from "@/components/UserAccount";

type Session = {
  user: {
    name: string;
    email: string;
    image: string;
  } | null;
};

type userData = {
  name: string;
  email: string;
  image: string;
};

export default async function page() {
  const session = await auth();

  // If no session or user is found, return early
  if (!session || !session.user) return;

  const { name, email, image } = session.user;

  // If any of the user fields are missing, return early
  if (!name || !email || !image) return;

  // Create a typed data object
  const data: userData = { name, email, image };

  return (
    <div>
      <UserAccount data={data} />
    </div>
  );
}
