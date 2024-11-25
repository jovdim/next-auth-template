import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import Logout from "@/authentication/action/authAction/logout";
import { userData } from "@/authentication/lib/types";
import UpdatePasswordUseForm from "@/authentication/components/auth/authForm/UpdatePasswordUseForm";
import Image from "next/image";
import { Label } from "./ui/label";

export function UserAccount({ data }: { data: userData }) {
  const image = "/profile-placeholder.svg"; //default images
  return (
    <Dialog>
      <DialogTrigger>
        <Avatar>
          <AvatarImage
            className="size-16 rounded-full border-4"
            src={data.image === "null" ? image : data.image}
            alt="profile icon"
          />
          <AvatarFallback>
            <Image
              width={16}
              height={16}
              src={image}
              alt="profile icon"
              className="size-16 rounded-full border-4"
            />
          </AvatarFallback>
        </Avatar>
      </DialogTrigger>
      <DialogContent className="overflow-scroll pt-8">
        <Tabs defaultValue="profile">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>
          <TabsContent value="profile">
            <Card>
              <CardHeader className="flex items-center justify-center"></CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col items-center justify-center">
                  <Avatar>
                    <AvatarImage
                      className="size-24 rounded-full"
                      src={data.image === "null" ? image : data.image}
                      alt="profile icon"
                    />
                    <AvatarFallback>
                      <Image
                        width={16}
                        height={16}
                        src={image}
                        alt="profile icon"
                        className="size-16 rounded-full border-4"
                      />
                    </AvatarFallback>
                  </Avatar>
                  <Label className="py-2 text-center text-sm font-bold">
                    Profile
                  </Label>
                </div>
                <div className="max-w-full space-y-6 overflow-scroll">
                  <div className="rounded-md border-b-2 border-b-black/30 pb-2 pl-4">
                    <span>
                      <strong>Name:</strong>
                    </span>
                    <p className="w-[10px]">{data.name}</p>
                  </div>
                  <div className="w-full overflow-scroll rounded-md border-b-2 border-b-black/30 pb-2 pl-4">
                    <span>
                      <strong>email:</strong>
                    </span>
                    <p className="w-[10px]">{data.email}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-center">
                <form
                  action={async () => {
                    "use server";
                    await Logout();
                  }}
                >
                  <Button type="submit" className="my-8 p-6 text-lg">
                    Logout
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>
                  Change your password here. After saving, you&apos;ll be logged
                  out.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <UpdatePasswordUseForm />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
