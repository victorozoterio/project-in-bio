"use client";

import { deleteProject } from "@/app/actions/delete-project";
import { increaseProjectVisits } from "@/app/actions/increase-project-visits";
import { formatUrl } from "@/app/lib/utils";
import { ProjectData } from "@/app/server/get-profile-data";
import { Trash2 } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState, startTransition } from "react";

export default function ProjectCard({
	project,
	isOwner,
	img,
	name,
	description,
}: {
	project?: ProjectData;
	isOwner?: boolean;
	img: string;
	name?: string;
	description?: string;
}) {
	const router = useRouter();
	const { profileId } = useParams();
	const formattedUrl = formatUrl(project?.projectUrl || "");
	const [isDeleting, setIsDeleting] = useState(false);

	async function handleClick() {
		if (!profileId || !project?.id || isOwner) return;

		await increaseProjectVisits(profileId as string, project?.id);
	}

	async function handleDeleteProject() {
		if (!profileId || !project?.id || !project.imagePath) return;

		setIsDeleting(true);

		const result = await deleteProject(
			profileId as string,
			project.id,
			project.imagePath,
		);

		if (result.success) {
			startTransition(() => {
				router.refresh();
			});
		} else {
			alert("Erro ao excluir o projeto: " + result.error);
			setIsDeleting(false);
		}
	}

	return (
		<div className="relative w-[340px] h-[132px] flex gap-5 bg-background-secondary p-3 rounded-[20px] border border-transparent hover:border-border-secondary">
			{isOwner && (
				<button
					onClick={handleDeleteProject}
					className="absolute top-3 right-3 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition"
					disabled={isDeleting}
				>
					<Trash2 className="size-5" />
				</button>
			)}

			<Link
				href={formattedUrl}
				target="_blank"
				onClick={handleClick}
				className="flex gap-5"
			>
				<div className="size-24 rounded-md overflow-hidden flex-shrink-0">
					<img src={img} alt="Projeto" className="object-cover w-full h-full" />
				</div>
				<div className="flex flex-col gap-2">
					{isOwner && (
						<span className="uppercase text-xs font-bold text-accent-green">
							{project?.totalVisits || 0} Cliques
						</span>
					)}
					<div className="flex flex-col">
						<span className="text-white font-bold">
							{name || project?.projectName}
						</span>
						<span className="text-content-body text-sm">
							{description || project?.projectDescription}
						</span>
					</div>
				</div>
			</Link>
		</div>
	);
}
