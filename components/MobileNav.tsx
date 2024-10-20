"use client";
import React from "react";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger
} from "./ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { sidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";

const MobileNav = () => {
	const pathname = usePathname();
	return (
		<section className="w-full max-w-[264px] flex">
			<Sheet>
				<SheetTrigger asChild>
					<Image
						src={"/icons/hamburger.svg"}
						alt="hamburger menu"
						width={36}
						height={36}
						className="cursor-pointer sm:hidden"
					/>
				</SheetTrigger>
				<SheetContent side={"left"} className="border-none bg-dark-1">
					<SheetHeader>
						<SheetTitle className="text-white text-center p-6">
							Mobile Menu
						</SheetTitle>
					</SheetHeader>
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
					<div className="flex h-[calc(100vh-72px)] flex-col jbestify-between overflow-y-auto p-6">
						<SheetClose asChild>
							<section className="flex h-full flex-col gap-6 pt-16 text-white">
								{sidebarLinks.map(link => {
									const isActive = pathname === link.route;
									return (
										<SheetClose asChild key={link.label}>
											<Link
												href={link.route}
												key={link.label}
												className={`flex gap-4 items-center p-4 rounded-lg w-full max-w-60 ${isActive &&
													"bg-blue-1"}`}
											>
												<Image
													src={link.imgUrl}
													alt={link.label}
													className="h-6 w-6"
													width={20}
													height={20}
												/>
												<p className="font-semibold">
													{link.label}
												</p>
											</Link>
										</SheetClose>
									);
								})}
							</section>
						</SheetClose>
					</div>
				</SheetContent>
			</Sheet>
		</section>
	);
};
export default MobileNav;
