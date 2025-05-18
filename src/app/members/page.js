import { dbQuery } from "@/lib/db";

const Members = async () => {
	const query = "select * from member";

	const members = await dbQuery(query);

	return (
		<div>
			<ul>
				{members.map((member) => {
					return (
						<li
							key={member.member_id}
						>{`${member.member_id} ${member.user_name} ${member.clerkId} `}</li>
					);
				})}
			</ul>
		</div>
	);
};

export default Members;
