import AdminTable from "@/authentication/components/auth/AdminTable";
import db from "@/authentication/lib/db";

export default async function page() {
  const userData = await db.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
    },
  });

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
      <h1 className="py-6 text-center text-4xl font-bold text-white">
        Admin Center
      </h1>
      <AdminTable userData={userData} />
    </div>
  );
}
