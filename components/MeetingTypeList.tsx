"use client";
import React, { useState } from "react";
import HomeCard from "./HomeCard";
import { useRouter } from "next/navigation";

const MeetingTypeList = () => {
	const router = useRouter();
	const [meetingState, setMeetingState] = useState<
		"isScheduleMeeting" | "isJoinMeeting" | "isInstantMeeting" | undefined
	>();
	return (
		<section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
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
		</section>
	);
};

export default MeetingTypeList;
