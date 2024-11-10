"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAccount, useDisconnect } from "wagmi";
import { shortedAccountAddress } from "@/lib/utils";
import { Check, Unplug, User } from "lucide-react";

const UserAvatarMenu = () => {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <div>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src="" />
            <AvatarFallback className="font-bold">0x</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="flex gap-2 items-center">
            <User className="h-[1.25rem] w-[1.25rem]" /> My Account
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {isConnected && address ? (
            <DropdownMenuItem className="uppercase">
              <Check className="text-green-600" />
              <p>{shortedAccountAddress(address)}</p>
            </DropdownMenuItem>
          ) : null}
          <DropdownMenuItem
            onClick={() => {
              disconnect();
            }}
          >
            <Unplug className="text-red-600" /> Disconnect
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserAvatarMenu;
