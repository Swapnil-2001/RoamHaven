interface MenuItemProps {
  handleMenuItemClick: () => void;
  menuItemlabel: string;
}

const MenuItem: React.FC<MenuItemProps> = ({
  handleMenuItemClick,
  menuItemlabel,
}): JSX.Element => {
  return (
    <div
      onClick={handleMenuItemClick}
      className="px-4 py-3 text-center font-semibold transition hover:bg-neutral-100"
    >
      {menuItemlabel}
    </div>
  );
};

export default MenuItem;
