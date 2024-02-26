import React, { useEffect, useState } from 'react';
import aboutImage from "../../../assets/images/image-about-banner.png";

const About = () => {
	return (
		<div className="relative py-12">
			<div className="items-center flex flex-wrap">
				<div className="w-full md:w-5/12 p-3 ml-auto mr-auto">
					<img alt="..." className="max-w-full rounded-lg shadow-lg" src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
				</div>
				<div className="w-full md:w-5/12 ml-auto mr-auto px-4 dark:text-white">
					<div className="md:pr-12">
						<img src={aboutImage} alt="About" className="md:max-w-sm my-8 dark:filter-dark dark:mix-blend-screen" />
						<h3 className="text-3xl">About <strong>Cinema Archive</strong></h3>
						<p className="mt-4 text-lg leading-relaxed text-blueGray-500">
							This project is built using:
						</p>
						<ul className="list-none mt-6">
							<li className="py-2">
								<div className="flex items-center">
									<div>
										<span className="inline-block p-2 rounded-full bg-purple-700 ml-1 mr-3"></span>
									</div>
									<div>
										<h4 className="text-blueGray-500">
											<strong>React + Vite.JS</strong> for frontend development
										</h4>
									</div>
								</div>
							</li>
							<li className="py-2">
								<div className="flex items-center">
									<div>
										<span className="inline-block p-2 bg-indigo-500 ml-1 mr-3"></span>
									</div>
									<div>
										<h4 className="text-blueGray-500">
											<strong>Tailwind CSS</strong> for styling and layout
										</h4>
									</div>
								</div>
							</li>
							<li className="py-2">
								<div className="flex items-center">
									<div>
										<span className="inline-block border-l-[10px] border-l-transparent border-b-[17px] border-b-yellow-500 border-r-[10px] border-r-transparent mr-3"></span>
									</div>
									<div>
										<h4 className="text-blueGray-500">
											<strong>Internet Archive API</strong> for movie data
										</h4>
									</div>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default About;
