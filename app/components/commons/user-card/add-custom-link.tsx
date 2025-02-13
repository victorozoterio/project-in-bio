"use client";

import { Plus } from "lucide-react";
import Modal from "../../ui/modal";
import { startTransition, useState } from "react";
import TextInput from "../../ui/text-input";
import Button from "../../ui/button";
import { useParams, useRouter } from "next/navigation";
import addCustomLinks from "@/app/actions/add-custom-links";

export default function AddCustomLink({
	link1 = { title: "", url: "" },
	link2 = { title: "", url: "" },
	link3 = { title: "", url: "" },
}: {
	link1?: { title: string; url: string };
	link2?: { title: string; url: string };
	link3?: { title: string; url: string };
}) {
	const router = useRouter();
	const { profileId } = useParams();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isSavingCustomLinks, setIsSavingCustomLinks] = useState(false);

	const [link1State, setLink1State] = useState(link1);
	const [link2State, setLink2State] = useState(link2);
	const [link3State, setLink3State] = useState(link3);

	const handleSaveCustomLinks = async () => {
		setIsSavingCustomLinks(true);
		if (!profileId) return;

		await addCustomLinks({
			profileId: profileId as string,
			link1: link1State,
			link2: link2State,
			link3: link3State,
		});

		startTransition(() => {
			setIsModalOpen(false);
			setIsSavingCustomLinks(false);
			router.refresh();
		});
	};

	return (
		<>
			<button
				onClick={() => setIsModalOpen(true)}
				className="p-3 rounded-xl bg-[#1E1E1E] hover:bg-[#2E2E2E]"
			>
				<Plus />
			</button>
			<Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
				<div className="bg-background-primary p-8 rounded-[20px] flex flex-col justify-between gap-10 w-[514px]">
					<p className="text-white font-bold text-xl">
						Adicionar links personalizados
					</p>
					<div className="flex flex-col gap-4">
						<div className="flex items-center gap-2">
							<div className="flex flex-col w-full">
								<p>Título do link</p>
								<TextInput
									placeholder="Digite o título"
									value={link1State.title}
									onChange={(e) =>
										setLink1State({ ...link1State, title: e.target.value })
									}
								/>
							</div>
							<div className="flex flex-col w-full">
								<p className="font-bold">Link</p>
								<TextInput
									placeholder="Inserir URL"
									value={link1State.url}
									onChange={(e) =>
										setLink1State({ ...link1State, url: e.target.value })
									}
								/>
							</div>
						</div>

						<div className="flex items-center gap-2">
							<div className="flex flex-col w-full">
								<p>Título do link</p>
								<TextInput
									placeholder="Digite o título"
									value={link2State.title}
									onChange={(e) =>
										setLink2State({ ...link2State, title: e.target.value })
									}
								/>
							</div>
							<div className="flex flex-col w-full">
								<p className="font-bold">Link</p>
								<TextInput
									placeholder="Inserir URL"
									value={link2State.url}
									onChange={(e) =>
										setLink2State({ ...link2State, url: e.target.value })
									}
								/>
							</div>
						</div>

						<div className="flex items-center gap-2">
							<div className="flex flex-col w-full">
								<p>Título do link</p>
								<TextInput
									placeholder="Digite o título"
									value={link3State.title}
									onChange={(e) =>
										setLink3State({ ...link3State, title: e.target.value })
									}
								/>
							</div>
							<div className="flex flex-col w-full">
								<p className="font-bold">Link</p>
								<TextInput
									placeholder="Inserir URL"
									value={link3State.url}
									onChange={(e) =>
										setLink3State({ ...link3State, url: e.target.value })
									}
								/>
							</div>
						</div>
					</div>
					<div className="flex gap-4 justify-end">
						<button
							onClick={() => setIsModalOpen(false)}
							className="font-bold text-white"
						>
							Voltar
						</button>
						<Button
							onClick={handleSaveCustomLinks}
							disabled={isSavingCustomLinks}
						>
							Salvar
						</Button>
					</div>
				</div>
			</Modal>
		</>
	);
}
