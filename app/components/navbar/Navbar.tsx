import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import { ModifiedUser } from "@/app/types";

interface NavbarProps {
  currentUser: ModifiedUser | null;
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
