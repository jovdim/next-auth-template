import UserSetting from "@/authentication/components/auth/UserSetting";

export default function page() {
  return (
    <main className="flex max-h-fit bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
      <div className="ml-4 mr-2 hidden min-h-screen min-w-[260px] rounded-xl border-2 border-black bg-blue-200 lg:block"></div>
      <div className="m-2 space-y-4">
        <div className="min-w-screen flex h-[70px] items-center justify-end rounded-xl border-2 border-black bg-blue-200 pr-4">
          {" "}
          <UserSetting />
        </div>
        <div className="space-y-2">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <div className="h-[200px] min-w-[300px] rounded-xl border-2 border-black bg-blue-200"></div>
            <div className="h-[200px] min-w-[300px] rounded-xl border-2 border-black bg-blue-200"></div>
            <div className="h-[200px] min-w-[300px] rounded-xl border-2 border-black bg-blue-200"></div>
            <div className="h-[200px] min-w-[300px] rounded-xl border-2 border-black bg-blue-200"></div>
          </div>
          <div className="min-h-[440px] rounded-xl border-2 border-black bg-blue-200"></div>
        </div>
      </div>
    </main>
  );
}
