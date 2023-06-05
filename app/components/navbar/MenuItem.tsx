import { IconType } from "react-icons";

interface MenuItemProps {
  handleMenuItemClick: () => void;
  menuItemlabel: string;
  icon?: IconType;
  isLogout?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({
  handleMenuItemClick,
  menuItemlabel,
  icon: Icon,
  isLogout,
}): JSX.Element => {
  return (
    <div
      onClick={handleMenuItemClick}
      className={`flex justify-center px-4 py-3 text-center font-semibold transition ${
        isLogout
          ? "text-rose-500 hover:bg-rose-500 hover:text-white"
          : "hover:bg-neutral-100"
      }`}
    >
      {menuItemlabel}
      {Icon && <Icon size={20} className="my-auto ml-2 text-indigo-500" />}
    </div>
  );
};

export default MenuItem;
