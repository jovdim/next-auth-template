import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
            <img src={image} alt="sss" className="size-12" />
          </AvatarFallback>
        </Avatar>
      </DialogTrigger>
      <DialogContent className="pt-8">
        <Tabs defaultValue="profile">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>
          <TabsContent value="profile">
            <Card>
              <CardHeader className="flex items-center justify-center"></CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-center">
                  <Avatar>
                    <AvatarImage
                      className="size-24 rounded-full"
                      src={data.image === "null" ? image : data.image}
                      alt="profile icon"
                    />
                    <AvatarFallback>
                      <img src="image" alt="sss" className="size-12" />
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="space-y-6 text-lg">
                  <div className="rounded-md border-b-2 border-b-black/30 pb-2 pl-4">
                    <span>
                      <strong>Name:</strong>
                    </span>
                    <p>{data.name}</p>
                  </div>
                  <div className="rounded-md border-b-2 border-b-black/30 pb-2 pl-4">
                    <span>
                      <strong>email:</strong>
                    </span>
                    <p>{data.email}</p>
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
                <CardTitle>Email</CardTitle>
                <CardDescription>
                  Make changes to your account here. Click save when you&apos;re
                  done.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="name"
                    type="email"
                    defaultValue={data.email}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save changes</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>
                  Change your password here. After saving, you&apos;ll be logged
                  out.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="current">Current password</Label>
                  <Input id="current" type="password" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="new">New password</Label>
                  <Input id="new" type="password" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="confirmpassword">confirm password</Label>
                  <Input id="confirmpassword" type="password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save password</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
