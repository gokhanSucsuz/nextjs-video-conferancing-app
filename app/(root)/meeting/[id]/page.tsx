"use client";
import Loader from "@/components/Loader";
import MeetingRoom from "@/components/MeetingRoom";
import MeetingSetup from "@/components/MeetingSetup";
import { useGetCallById } from "@/hooks/useGetCallById";
import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import { useState, useEffect } from "react";

const Meeting = ({ params }: { params: Promise<{ id: string }> }) => {
	const { isLoaded } = useUser();
	const [isSetupComplete, setIsSetupComplete] = useState(false);
	const [id, setId] = useState<string | null>(null);

	useEffect(
		() => {
			const fetchParams = async () => {
				const resolvedParams = await params; // params'ı çözümle
				setId(resolvedParams.id); // id'yi state'e ata
			};
			fetchParams();
		},
		[params]
	);

	const { call, isCallLoading } = useGetCallById(id!); // id'yi zorla açıyoruz

	if (!isLoaded || isCallLoading || !id) return <Loader />;
	return (
		<main className="h-screen w-full">
			<StreamCall call={call}>
				<StreamTheme as="main">
					{!isSetupComplete
						? <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
						: <MeetingRoom />}
				</StreamTheme>
			</StreamCall>
		</main>
	);
};

export default Meeting;
