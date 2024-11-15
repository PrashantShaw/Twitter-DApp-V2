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
import { Check, Diff, Unplug, User } from "lucide-react";
import useConnectToWallet from "@/hooks/useConnectToWallet";

const UserAvatarMenu = () => {
  const { addresses, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { connectToWallet } = useConnectToWallet();

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
          {isConnected && addresses?.length ? (
            <>
              {addresses.map((address, idx) => (
                <DropdownMenuItem
                  key={address}
                  className="uppercase pointer-events-none"
                >
                  {idx === 0 ? (
                    <Check className="text-green-600" />
                  ) : (
                    <div className="w-4"></div>
                  )}
                  <p>{shortedAccountAddress(address)}</p>
                </DropdownMenuItem>
              ))}
            </>
          ) : null}
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={connectToWallet}>
            <Diff className="text-violet-600" /> Add/Remove Account
          </DropdownMenuItem>
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
