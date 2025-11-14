"use client";

import { useForm, Controller, type Control } from "react-hook-form";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

type ProfileFormValues = {
  name: string;
  username: string;
  bio: string;
};

type AccountFormValues = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

type NotificationFormValues = {
  account: boolean;
  projects: boolean;
};

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-white/60">
          Controls
        </p>
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        <p className="mt-2 text-white/70">
          Manage your account profile, security, and notifications.
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-white/5 text-white">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <ProfileSettingsForm />
        </TabsContent>

        <TabsContent value="account">
          <AccountSettingsForm />
        </TabsContent>

        <TabsContent value="notifications">
          <NotificationSettings />
        </TabsContent>
      </Tabs>
      </div>
  );
}

function ProfileSettingsForm() {
  const form = useForm<ProfileFormValues>({
    defaultValues: {
      name: "Bhavesh P Dev",
      username: "bhaveshpdev",
      bio: "Building intelligent experiences across web and automation.",
    },
  });

  const onSubmit = form.handleSubmit(() => {
    toast.success("Profile updated");
  });

  return (
    <Card className="border-white/10 bg-white/5 text-white">
      <CardHeader>
        <CardTitle>Profile details</CardTitle>
        <CardDescription className="text-white/60">
          Control what visitors learn about you.
        </CardDescription>
      </CardHeader>
      <form onSubmit={onSubmit}>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="name">Name</Label>
              <Input id="name" {...form.register("name")} />
              </div>
              <div>
                <Label htmlFor="username">Username</Label>
              <Input id="username" {...form.register("username")} />
            </div>
          </div>
              <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea id="bio" rows={4} {...form.register("bio")} />
              </div>
        </CardContent>
        <CardFooter className="justify-end">
          <Button className="bg-white/10 text-white hover:bg-white/20">
            Save changes
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

function AccountSettingsForm() {
  const form = useForm<AccountFormValues>({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = form.handleSubmit((values) => {
    if (values.newPassword !== values.confirmPassword) {
      toast.error("New password and confirmation must match");
      return;
    }
    toast.success("Password updated");
    form.reset();
  });

  return (
    <Card className="border-white/10 bg-white/5 text-white">
      <CardHeader>
        <CardTitle>Security</CardTitle>
        <CardDescription className="text-white/60">
          Update your credentials regularly.
        </CardDescription>
      </CardHeader>
      <form onSubmit={onSubmit}>
        <CardContent className="space-y-4">
              <div>
            <Label htmlFor="currentPassword">Current password</Label>
            <Input
              id="currentPassword"
              type="password"
              {...form.register("currentPassword")}
            />
              </div>
              <div>
            <Label htmlFor="newPassword">New password</Label>
            <Input
              id="newPassword"
              type="password"
              {...form.register("newPassword")}
            />
          </div>
                <div>
            <Label htmlFor="confirmPassword">Confirm password</Label>
            <Input
              id="confirmPassword"
              type="password"
              {...form.register("confirmPassword")}
            />
          </div>
        </CardContent>
        <CardFooter className="justify-end">
          <Button className="bg-white/10 text-white hover:bg-white/20">
            Update password
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

function NotificationSettings() {
  const { control, handleSubmit } = useForm<NotificationFormValues>({
    defaultValues: {
      account: true,
      projects: false,
    },
  });

  const onSubmit = handleSubmit(() => {
    toast.success("Notification preferences saved");
  });

  return (
    <Card className="border-white/10 bg-white/5 text-white">
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription className="text-white/60">
          Choose how you stay in the loop.
        </CardDescription>
      </CardHeader>
      <form onSubmit={onSubmit}>
        <CardContent className="space-y-4">
          <NotificationSwitch
            control={control}
            name="account"
            title="Account updates"
            description="Receive email summaries about your account activity."
          />
          <NotificationSwitch
            control={control}
            name="projects"
            title="Project alerts"
            description="Get notified when project statuses change."
          />
        </CardContent>
        <CardFooter className="justify-end">
          <Button className="bg-white/10 text-white hover:bg-white/20">
            Save preferences
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

function NotificationSwitch({
  control,
  name,
  title,
  description,
}: {
  control: Control<NotificationFormValues>;
  name: keyof NotificationFormValues;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-white/10 px-4 py-3">
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-white/60">{description}</p>
      </div>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Switch checked={field.value} onCheckedChange={field.onChange} />
        )}
      />
    </div>
  );
}
