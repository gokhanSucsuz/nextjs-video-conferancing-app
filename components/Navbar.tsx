import Image from "next/image";
import Link from "next/link";
import React from "react";
import MobileNav from "./MobileNav";
import { UserButton } from "@clerk/nextjs";

const Navbar = () => {
	return (
		<nav className="flex-between fixed z-50 w-full bg-dark-1 px-6 py-4 lg:px-10">
			<Link href="/" className="flex items-center gap-1">
				<Image
					src="/icons/logo.svg"
					alt="logo"
					width={32}
					height={32}
					className="max-sm:size-10"
				/>
				<p className="text-[26px] font-extraBold text-white max-sm:hidden">
					VCA
				</p>
			</Link>

			<div className="flex-between items-center gap-5">
				<UserButton />
				<MobileNav />
			</div>
		</nav>
	);
};

export default Navbar;
