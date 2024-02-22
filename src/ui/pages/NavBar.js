import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className={"navbar"}>
      <ul className={"navbar_ul"}>
        <li>
          <NavLink to={"/"}>main</NavLink>
        </li>
        <li>
          <NavLink to={"/map"}>map</NavLink>
        </li>
        <li>
          <NavLink to={"/favorite"}>즐겨찾기</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
