import { FC, SyntheticEvent } from "react";
import { Menu } from "semantic-ui-react";

interface INavigationMenuProps {
  handleItemClick: (e: SyntheticEvent, data: any) => void;
  activeItem: string;
}

const NavigationMenu: FC<INavigationMenuProps> = ({
  activeItem,
  handleItemClick,
}) => {
  return (
    <Menu pointing fixed="top" color="teal" borderless size="large">
      <Menu.Item
        name="home"
        active={activeItem === "home"}
        onClick={handleItemClick}
      />
      <Menu.Item
        name="results"
        active={activeItem === "results"}
        onClick={handleItemClick}
      />
      <Menu.Item
        name="add new scan"
        active={activeItem === "add new scan"}
        onClick={handleItemClick}
      />
    </Menu>
  );
};

export default NavigationMenu;
