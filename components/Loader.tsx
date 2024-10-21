import Image from "next/image";
import React from "react";

const Loader = () => {
	return <div className="flex justify-center items-center w-full h-screen">
			<Image src="/icons/loading-circle.svg" alt="loading" width={64} height={64} />
		</div>;
};

export default Loader;
