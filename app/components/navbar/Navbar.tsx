import { User } from "@prisma/client";

import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";

interface NavbarProps {
  currentUser: User | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }): JSX.Element => {
  return (
    <div className="fixed z-10 w-full border-b-[1px] bg-white py-4 shadow-md">
      <Container>
        <Logo />
        <Search />
        <UserMenu currentUser={currentUser} />
      </Container>
    </div>
  );
};

export default Navbar;
