import styles from "../../../styles";
import HamburgerMenu from "./HamburgerMenu/HamburgerMenu";
import ThemeSwitcher from "../../ThemeSwitcher/ThemeSwitcher";
import { useState } from "react";

const Navbar = ({ toggleMenu, isMenuOpen }) => {
	const [AboutMenu, setAboutMenu] = useState(false);
	const [GenresMenu, setGenresMenu] = useState(false);

	const handleAboutMenu = () => {
		setAboutMenu(!AboutMenu);
		setGenresMenu(false);
	};

	const handleGenresMenu = () => {
		setGenresMenu(!GenresMenu);
		setAboutMenu(false);
	};

	return (
		<nav aria-label="Main" className="w-auto lg:w-full">
			<HamburgerMenu toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />

			<ul
				className={`transition-visibility z-40 flex translate-x-[150%] flex-col items-start gap-4 p-10 pt-24 text-[0.875rem] text-medium-gray dark:text-white lg:flex-row lg:items-center lg:gap-10 lg:p-0 max-lg:invisible max-lg:dark:bg-gray-800 ${isMenuOpen ? "!visible !translate-x-0 max-lg:overflow-y-auto" : ""
					} ${styles.navmobile} ${styles.navdesktop}`}
				id="navbar-menu"
			>
				<li className="relative">
					<button
						type="button"
						className={`${styles.transition} icon-menu flex gap-2 tracking-wide hover:text-almost-black  dark:hover:text-gray-400`}
						aria-haspopup="true"
						aria-expanded={GenresMenu}
						aria-controls="Genres-menu"
						onClick={handleGenresMenu}
					>
						Film Genres
					</button>

					<ul
						id="Genres-menu"
						className={`${styles.submenumobile} ${styles.submenudesktop} ${GenresMenu
							? "!visible p-4 pb-0 lg:!translate-y-[3rem] lg:!opacity-100 max-lg:max-h-max"
							: ""
							} transition-visibility invisible flex w-max flex-col gap-4 rounded-md leading-none lg:right-0 lg:-translate-y-[40%] lg:bg-white/95 lg:opacity-0 lg:dark:bg-gray-800/95`}
					>
						{/* START Genres Sub-menu */}
						{[["Animation"], ["Comedy"], ["Drama"], ["Horror"]].map(([className, text], index) => (
							<li key={`Genres-${index}`}>
								<a
									href="#"
									className={`${className} ${styles.transition} flex gap-4 hover:text-almost-black dark:hover:text-gray-400`}
								>
									{text}
								</a>
							</li>
						))}
					</ul>
				</li>
				<li className="relative">
					<button
						type="button"
						className={`${styles.transition} icon-menu flex gap-2  hover:text-almost-black dark:hover:text-gray-400`}
						aria-haspopup="true"
						aria-expanded={AboutMenu}
						aria-controls="About-menu"
						onClick={handleAboutMenu}
					>
						About
					</button>
					{/* START About sub-menu */}
					<ul
						id="About-menu"
						className={`${styles.submenumobile} ${styles.submenudesktop} ${AboutMenu
							? "!visible p-4 pb-0 lg:!translate-y-[3rem] lg:!opacity-100 max-lg:max-h-max"
							: ""
							} transition-visibility invisible flex w-max flex-col gap-4 rounded-md leading-none lg:left-0 lg:-translate-y-[40%] lg:bg-white/95 lg:opacity-0 lg:dark:bg-gray-800/95`}
					>
						{[["React + Vite.js"], ["Tailwind CSS"], ["Internet Archive API"]].map(([text], index) => (
							<li key={`About-${index}`}>
								<a
									href="#"
									className={`${styles.transition} block hover:text-almost-black dark:hover:text-gray-400`}
								>
									{text}
								</a>
							</li>
						))}
						{/* END About Sub-menu */}
					</ul>
				</li>
				<li className="pt-4 md:mr-[0.1875rem] md:pt-0 lg:ml-auto">
					<ThemeSwitcher />
				</li>
				{/*<li>
          <a
            href="#"
            className={`${styles.transition} block rounded-xl border border-almost-black px-[1.3125rem] py-[0.625rem] hover:bg-almost-black hover:text-white dark:border-white dark:hover:bg-white dark:hover:text-gray-800`}
          >
            Watch Now
          </a>
				</li> */}
			</ul>
		</nav>
	);
};

export default Navbar;
