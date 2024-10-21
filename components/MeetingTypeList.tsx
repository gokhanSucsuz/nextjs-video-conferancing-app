"use client";
import React, { useState } from "react";
import HomeCard from "./HomeCard";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useToast } from "@/hooks/use-toast";

const MeetingTypeList = () => {
	const router = useRouter();
	const [meetingState, setMeetingState] = useState<
		"isScheduleMeeting" | "isJoinMeeting" | "isInstantMeeting" | undefined
	>();
	const { toast } = useToast();
	const { user } = useUser();
	const client = useStreamVideoClient();
	const [values, setValues] = useState({
		dateTime: new Date(),
		description: "",
		link: ""
	});
	const [callDetails, setCallDetails] = useState<Call>();
	const createMeeting = async () => {
		if (!client || !user) return;

		try {
			if (!values.dateTime) {
				toast({
					title: "Please select a date and time"
				});
				return;
			}
			const id = crypto.randomUUID();
			const call = client.call("default", id);
			if (!call) throw new Error("Failed to create meeting");

			const startsAt =
				values.dateTime.toISOString() || new Date(Date.now()).toISOString();
			const description = values.description || "Instant meeting";
			await call.getOrCreate({
				data: {
					starts_at: startsAt,
					custom: {
						description
					}
				}
			});
			setCallDetails(call);
			if (!values.description) {
				router.push(`/meeting/${call.id}`);
			}
			toast({
				title: "Meeting created successfully"
			});
		} catch (error) {
			console.log(error);

			toast({
				title: "Failed to create meeting"
			});
		}
	};
	return (
		<section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
			<HomeCard
				img="/icons/add-meeting.svg"
				title="New Meeting"
				description="Start an instant meeting"
				color="bg-orange-1"
				handleClick={() => setMeetingState("isInstantMeeting")}
			/>
			<HomeCard
				img="/icons/schedule.svg"
				title="Schedule Meeting"
				description="Plan your meeting"
				color="bg-blue-1"
				handleClick={() => setMeetingState("isScheduleMeeting")}
			/>
			<HomeCard
				img="/icons/recordings.svg"
				title="View Recordings"
				description="Check out your recordings"
				color="bg-purple-1"
				handleClick={() => setMeetingState("isJoinMeeting")}
			/>
			<HomeCard
				img="/icons/join-meeting.svg"
				title="Join Meeting"
				description="via invitation link"
				color="bg-yellow-1"
				handleClick={() => setMeetingState("isJoinMeeting")}
			/>
			<MeetingModal
				isOpen={meetingState === "isInstantMeeting"}
				onClose={() => setMeetingState(undefined)}
				title="Start an instant meeting"
				className="text-center"
				buttonText="Start Meeting"
				handleClick={createMeeting}
			/>
		</section>
	);
};

export default MeetingTypeList;
