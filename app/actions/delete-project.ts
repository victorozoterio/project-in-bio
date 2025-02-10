"use server";

import { auth } from "../lib/auth";
import { db, storage } from "../lib/firebase";

export async function deleteProject(
	profileId: string,
	projectId: string,
	imagePath: string,
) {
	const session = await auth();
	if (!session) return { success: false, error: "Usuário não autenticado" };

	try {
		const projectRef = db
			.collection("profiles")
			.doc(profileId)
			.collection("projects")
			.doc(projectId);

		const projectSnap = await projectRef.get();

		if (!projectSnap.exists) {
			return { success: false, error: "Projeto não encontrado" };
		}

		if (projectSnap.data()?.userId !== session.user?.id) {
			return { success: false, error: "Permissão negada" };
		}

		if (imagePath) {
			const storageRef = storage.file(imagePath);
			await storageRef.delete();
		}

		await projectRef.delete();

		return { success: true };
	} catch (error) {
		console.error("Erro ao excluir projeto:", error);
		return { success: false, error };
	}
}
