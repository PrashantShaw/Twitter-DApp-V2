import Image from "next/image";
import NavbarActions from "./NavbarActions";

const Navbar = () => {
  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-stretch justify-start">
            <div className="flex shrink-0 items-center">
              <Image
                className="h-8 w-auto"
                src="/twitter.png"
                alt="Your Company"
              />
              <span className="text-white font-bold pl-4 text-lg hidden sm:block">
                TWDApp
              </span>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <NavbarActions />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
