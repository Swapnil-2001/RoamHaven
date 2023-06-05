import Container from "../Container";
import Categories from "./Categories";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import { ModifiedUser } from "@/app/types";

interface NavbarProps {
  currentUser: ModifiedUser | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }): JSX.Element => {
  return (
    <div className="fixed z-10 w-full bg-white shadow-md">
      <div className="border-b-[1px] py-4">
        <Container>
          <Logo />
          <Search />
          <UserMenu currentUser={currentUser} />
        </Container>
      </div>
      <Categories />
    </div>
  );
};

export default Navbar;
