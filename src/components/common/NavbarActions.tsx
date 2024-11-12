"use client";
import { useAccount } from "wagmi";
import SwitchChainButton from "./SwitchChainButton";
import UserAvatarMenu from "./UserAvatarMenu";
import { ConnectorButton } from "./ConnectorButton";

const NavbarActions = () => {
  const { isConnected } = useAccount();

  return (
    <div className="flex items-center">
      {isConnected ? (
        <>
          <SwitchChainButton />
          <div className="relative ml-3">
            <UserAvatarMenu />
          </div>
        </>
      ) : (
        <ConnectorButton
          name="MetaMask"
          label="Connect Wallet"
          iconUrl="/metamask-icon.webp"
        />
      )}
    </div>
  );
};

export default NavbarActions;
