"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useProfile } from "@/hooks/useProfile";
import { FormEvent, useCallback } from "react";

const RegisterButton = () => {
  const { userProfile, isPending, error, isRegistered, registerUser } =
    useProfile();
  console.log(
    "RegisterButton ::::",
    userProfile,
    isPending,
    error,
    isRegistered
  );
  const handleRegisterUser = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const parsedFormData = Object.fromEntries(formData.entries());

    console.log("Register form data :: ", parsedFormData);

    // TODO: validate the form data and call registerUser function here
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Register</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Register</DialogTitle>
          <DialogDescription>
            Register yourself just by adding an display name and your bio.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleRegisterUser}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="displayname" className="text-right">
                Display Name
              </Label>
              <Input
                id="displayname"
                name="displayname"
                placeholder="johnDoe004"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="bio" className="text-right">
                Your Bio
              </Label>
              <Input
                id="bio"
                name="bio"
                placeholder="Senio Software Engineer"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterButton;
