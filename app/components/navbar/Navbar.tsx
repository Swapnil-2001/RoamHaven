import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";

const Navbar: React.FC = (): JSX.Element => {
  return (
    <div className="fixed z-10 w-full border-b-[1px] bg-white py-4 shadow-md">
      <Container>
        <Logo />
        <Search />
        <UserMenu />
      </Container>
    </div>
  );
};

export default Navbar;
