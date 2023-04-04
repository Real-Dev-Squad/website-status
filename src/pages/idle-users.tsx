import { FC, useState, useEffect } from "react";
import Head from "@/components/head";
import Section from "@/components/idleUsers/section";
import Layout from "@/components/Layout";
import { IdleUser } from "@/interfaces/idleUser.type";
import { useGetIdleStatusQuery } from "slices/apiSlice";

const IdleUsers: FC = () => {
	const [idleUsersList, setIdleUsersList] = useState<IdleUser[]>([]);

	const { data, isError, isLoading } = useGetIdleStatusQuery("IDLE");

	useEffect(() => {
		if (data?.allUserStatus) {
			const idleUsers = data.allUserStatus;
			setIdleUsersList(idleUsers);
		}
	}, [isLoading, data]);

	return (
		<Layout>
			<Head title="Idle Users | Status Real Dev Squad" />

			<div className="container">
				<Section
					heading="Idle users"
					content={idleUsersList}
					isLoading={isLoading}
					error={isError}
				/>
			</div>
		</Layout>
	);
};

export default IdleUsers;
