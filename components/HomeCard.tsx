import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

type HomeCardProps = {
	img: string;
	title: string;
	description: string;
	color: string;
	handleClick: () => void;
};

const HomeCard = ({
	img,
	title,
	description,
	color,
	handleClick
}: HomeCardProps) => {
	return (
		<div
			className={cn(
				"px-4 py-5 flex flex-col w-full xl:max-w-[270px] rounded-[14px] cursor-pointer min-h-[260px] justify-between",
				color
			)}
			onClick={handleClick}
		>
			<div className="flex glassmorphism size-12 rounded-[10px] bg-transparent-1 justify-center items-center">
				<Image src={img} alt={title} width={27} height={27} />
			</div>
			<div className="flex flex-col gap-2">
				<h1 className="text-2xl font-bold">
					{title}
				</h1>
				<p className="text-lg font-normal">
					{description}
				</p>
			</div>
		</div>
	);
};

export default HomeCard;
