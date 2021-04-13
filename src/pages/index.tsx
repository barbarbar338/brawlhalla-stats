import { FC, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { Layout } from "../components/Layout";
import { useCredentials } from "../libs/useCredentials";

export const IndexPage: FC = () => {
	const [credentials, setCredentials] = useCredentials();
	const [id, setId] = useState("");
	const [checkID, setCheckID] = useState("");
	const [checkName, setCheckName] = useState("");
	const [redirect, setRedirect] = useState(false);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (credentials?.bhid) setRedirect(true);
	}, [credentials]);

	const onCheck = async () => {
		if (loading) return;
		if (!id) return toast.error("Specify a Brawlhalla user ID");
		if (isNaN(parseInt(id))) return toast.error("ID must be a number");
		setLoading(true);
		const res = await fetch(
			`https://brawlhalla-api.bariscodes.me/v1/stats/id?brawlhalla_id=${id}`,
		);
		const body = await res.json();
		setCheckID(body.data.brawlhalla_id);
		setCheckName(body.data.name);
		toast.success(
			`Confirm that you are ${body.data.name}, ${body.data.brawlhalla_id}`,
		);
		setLoading(false);
	};

	const onConfirmSuccess = () => {
		setCredentials({
			bhid: checkID,
		});
		toast.success("Confirmation successful");
		setRedirect(true);
	};

	const onConfirmFail = () => {
		setId("");
		setCheckID("");
		setCheckName("");
		toast.error("Confirmation failed");
	};

	return redirect ? (
		<Redirect to="/stats" />
	) : (
		<Layout>
			<div className="items-centered">
				<form className="m-4 flex">
					<input
						className="p-4 mr-0 text-gray-800 border-gray-200 bg-white focus:outline-none rounded"
						placeholder="Your Brawlhalla ID"
						value={id}
						onChange={(e) => setId(e.target.value)}
					/>
					<button
						className="px-8 bg-blue-400 text-gray-800 p-4 uppercase focus:outline-none rounded"
						onClick={onCheck}
					>
						Check
					</button>
				</form>
				{checkID && (
					<div>
						<p>
							Confirm that you are {checkName}, {checkID}
						</p>
						<section className="container mx-auto px-6 my-1 flex flex-wrap -m-4">
							<button
								className="p-2 md:w-40 focus:outline-none"
								onClick={onConfirmSuccess}
							>
								<div className="flex items-center p-4 bg-blue-200 rounded-lg shadow-xs cursor-pointer hover:bg-blue-500 hover:text-gray-100">
									<div>
										<p className=" text-xs font-medium ml-2 ">
											Yes, I am!
										</p>
									</div>
								</div>
							</button>
							<button
								className="p-2 md:w-40 focus:outline-none"
								onClick={onConfirmFail}
							>
								<div className="flex items-center p-4 bg-gray-200 rounded-lg shadow-xs cursor-pointer hover:bg-gray-500 hover:text-gray-100">
									<div>
										<p className="text-xs font-medium ml-2 ">
											No, I am not.
										</p>
									</div>
								</div>
							</button>
						</section>
					</div>
				)}
			</div>
		</Layout>
	);
};
