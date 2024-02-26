import internetarchive from "../../assets/images/internet-archive.png";
import github from "../../assets/images/github.png";
import mockupDesktop from "../../assets/images/image-hero-desktop.png";
import mockupMobile from "../../assets/images/image-hero-mobile.png";
import styles from "../../styles";

const Hero = () => {
	const pixelPerfectLink = `leading-none pl-[1.9375rem] pr-[1.6875rem] pt-[1.1875rem] pb-[1rem] w-max tracking-[-0.01em] font-[700] `;
	return (
		<hero
			id="hero"
			className={`${styles.containerSm} mt-[2.8125rem] flex flex-col gap-4  md:flex-row-reverse`}
		>
			<div className="flex-1">
				<picture>
					<source
						media="(min-width: 48rem)"
						srcSet={mockupDesktop}
						type="image/png"
					/>
					<img
						src={mockupMobile}
						alt=""
						aria-hidden="true"
						width={480}
						height={640}
						className="dark:filter-dark ml-auto block dark:mix-blend-screen max-md:mx-auto"
					/>
				</picture>
			</div>
			<div className="my-[0.4375rem] flex flex-1 flex-col justify-center gap-[3.0625rem] text-center text-normal md:my-[1.5625rem] md:mx-[2.1875rem] md:text-left lg:my-[6.4375rem]">		
				<h1 className="text-[1.7rem] font-[700] leading-none tracking-[-0.013em] text-almost-black transition duration-300 ease-in-out dark:text-white md:max-w-[10.8ch] md:text-[4.4rem]"><span className="text-[1.7rem] font-[100] leading-[1.5em] md:text-[4rem]">Discover </span>Cinema Archive</h1>
				<p className="max-w-[43ch] leading-[1.6] tracking-[0.01em] text-medium-gray transition duration-300 ease-in-out dark:text-almost-white md:text-normal max-md:mx-auto">
					Watch a curated selection of classic films from the <strong>Internet Archive</strong>.
				</p>
				{/* <a href="#" className={`${styles.transition} ${pixelPerfectLink} block rounded-2xl border-2 border-almost-black bg-almost-black p-3 text-white hover:bg-transparent hover:text-almost-black dark:border-white dark:bg-white dark:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-white max-md:mx-auto`}>Learn more</a> */}
				<div>
					<ul className="flex flex-wrap items-center gap-[2.5625rem] max-md:justify-center">
						<li>
							<a href="#" className="block">
								<img
									src={internetarchive}
									alt="Internet Archive"
									width={140}
									height={80}
									className="transition duration-300 ease-in-out md:filter-none"
								/>
							</a>
						</li>
						<li>
							<a href="#" className="block">
								<img
									src={github}
									alt="github"
									width={120}
									height={80}
									className="transition duration-300 ease-in-out md:filter-none"
								/>
							</a>
						</li>
					</ul>
				</div>
			</div>
		</hero>
	);
};

export default Hero;