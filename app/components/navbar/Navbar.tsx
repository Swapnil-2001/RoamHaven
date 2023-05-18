import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";

const Navbar: React.FC = (): JSX.Element => {
  return (
    <div className="fixed z-10 w-full border-b-2 bg-white py-4">
      <Container>
        <Logo />
        <Search />
        <UserMenu />
      </Container>
    </div>
  );
};

export default Navbar;
