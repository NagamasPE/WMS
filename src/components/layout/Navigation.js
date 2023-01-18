import { Link } from "react-router-dom";
import classes from "./Navigation.module.css";

function Navigation() {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>App Dashboard</div>
      <nav>
        <ul>
          <li>
            <Link to="/">MAIN</Link>
          </li>
          <li>
            <Link to="/Detail">DETAIL</Link>
          </li>
          <li>
            <Link to="/FullDetail">FULL DETAIL</Link>
          </li>
          <li>
            <Link to="/Input">INPUT</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navigation;
