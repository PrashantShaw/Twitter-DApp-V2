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
import { FormEvent, useCallback, useState } from "react";
import toast from "react-hot-toast";

const RegisterButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { registerUser, isRegisteringUser } = useProfile();

  const handleRegisterUser = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = e.currentTarget;
      const formData = new FormData(form);
      const parsedFormData = Object.fromEntries(formData.entries()) as {
        displayname: string;
        bio: string;
      };

      if (
        parsedFormData.displayname.toString().length < 3 ||
        parsedFormData.bio.toString().length < 3
      ) {
        toast.error("Invalid Inputs: minimum 3 characters required!", {
          position: "bottom-right",
          duration: 5000,
        });
        return;
      }

      (async () => {
        await registerUser(parsedFormData.displayname, parsedFormData.bio);
        setIsOpen(false);
      })().catch(() => {});
    },
    [registerUser]
  );

  return (
    <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
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
            <Button
              type="submit"
              disabled={isRegisteringUser}
              className="w-[8rem]"
            >
              {isRegisteringUser ? "Registering..." : "Submit"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterButton;
