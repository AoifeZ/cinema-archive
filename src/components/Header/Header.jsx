import Navbar from "./Navbar/Navbar";
import styles from "../../styles";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.classList.toggle("lock-scroll");
  };

  return (
    <header
      className={`${styles.container} flex items-center justify-between py-[2rem]`}
    >
			<h1 className="mr-5 text-[1.2rem] font-[900] leading-none tracking-[-0.013em] text-almost-black transition duration-300 ease-in-out dark:text-white md:max-w-[8ch] md:text-[1.2rem]"><a href="#" className="mr-[3.875rem]">
      Cinema Archive 
      </a></h1>

      <Navbar toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
    </header>
  );
};

export default Header;
