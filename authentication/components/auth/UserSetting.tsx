import { auth } from "@/auth";
import { userData } from "@/authentication/lib/types";
import { UserAccount } from "@/components/UserAccount";
import { redirect } from "next/navigation";

export default async function UserSetting() {
  const session = await auth();
  if (!session) {
    return redirect("/404");
  }

  const data: userData = {
    name: session.user?.name || "",
    email: session.user?.email || "",
    image: session.user?.image || "",
  };

  return <UserAccount data={data} />;
}
