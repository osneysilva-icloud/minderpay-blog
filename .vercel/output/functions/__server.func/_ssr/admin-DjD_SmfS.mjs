import { t as supabase } from "./client-oP-Vwcq3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-DjD_SmfS.js
/** Utilitários e tipos partilhados pelo painel de administração. */
var POST_STATUS_LABELS = {
	draft: "Rascunho",
	published: "Publicado",
	scheduled: "Agendado",
	archived: "Arquivado"
};
function formatDateTime(value) {
	if (!value) return "—";
	return new Date(value).toLocaleString("pt-PT", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit"
	});
}
function slugify(text) {
	if (!text) return "";
	return text.toString().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-").replace(/-+/g, "-");
}
function bytesToSize(bytes) {
	if (!bytes) return "—";
	const units = [
		"B",
		"KB",
		"MB",
		"GB"
	];
	let value = bytes;
	let i = 0;
	while (value >= 1024 && i < units.length - 1) {
		value /= 1024;
		i += 1;
	}
	return `${value.toFixed(value >= 10 || i === 0 ? 0 : 1)} ${units[i]}`;
}
var ALLOWED_MIME = /* @__PURE__ */ new Set([
	"image/jpeg",
	"image/png",
	"image/webp",
	"image/avif",
	"image/gif",
	"image/svg+xml"
]);
var MAX_SIZE_BYTES = 5242880;
var MAX_WIDTH = 1600;
var MediaUploadError = class extends Error {};
function readImageDimensions(file) {
	return new Promise((resolve, reject) => {
		const url = URL.createObjectURL(file);
		const img = new Image();
		img.onload = () => {
			resolve({
				width: img.naturalWidth,
				height: img.naturalHeight
			});
			URL.revokeObjectURL(url);
		};
		img.onerror = () => {
			URL.revokeObjectURL(url);
			reject(new MediaUploadError("Não foi possível ler a imagem."));
		};
		img.src = url;
	});
}
async function maybeResizeToWebp(file, width, height) {
	if (!(typeof document !== "undefined" && file.type !== "image/svg+xml" && file.type !== "image/gif") || width <= MAX_WIDTH) return {
		blob: file,
		name: file.name,
		type: file.type,
		width,
		height
	};
	const scale = MAX_WIDTH / width;
	const targetWidth = MAX_WIDTH;
	const targetHeight = Math.round(height * scale);
	const bitmap = await createImageBitmap(file);
	const canvas = document.createElement("canvas");
	canvas.width = targetWidth;
	canvas.height = targetHeight;
	const ctx = canvas.getContext("2d");
	if (!ctx) return {
		blob: file,
		name: file.name,
		type: file.type,
		width,
		height
	};
	ctx.drawImage(bitmap, 0, 0, targetWidth, targetHeight);
	const blob = await new Promise((resolve) => canvas.toBlob((result) => resolve(result), "image/webp", .85));
	if (!blob) return {
		blob: file,
		name: file.name,
		type: file.type,
		width,
		height
	};
	return {
		blob,
		name: file.name.replace(/\.[a-zA-Z0-9]+$/, "") + ".webp",
		type: "image/webp",
		width: targetWidth,
		height: targetHeight
	};
}
async function uploadMediaFile({ file, altText, description, uploadedBy }) {
	if (!ALLOWED_MIME.has(file.type)) throw new MediaUploadError("Formato de imagem não suportado.");
	if (file.size > MAX_SIZE_BYTES) throw new MediaUploadError("A imagem excede o limite de 5 MB.");
	let width = 0;
	let height = 0;
	if (file.type !== "image/svg+xml") {
		const dims = await readImageDimensions(file);
		width = dims.width;
		height = dims.height;
	}
	const resized = await maybeResizeToWebp(file, width, height);
	const safeName = resized.name.replace(/[^a-zA-Z0-9.\-_]/g, "-").toLowerCase();
	const storagePath = `${crypto.randomUUID()}-${safeName}`;
	const { error: uploadError } = await supabase.storage.from("media").upload(storagePath, resized.blob, {
		contentType: resized.type,
		upsert: false
	});
	if (uploadError) throw new MediaUploadError(uploadError.message);
	const { data: { publicUrl } } = supabase.storage.from("media").getPublicUrl(storagePath);
	const { data, error } = await supabase.from("media").insert({
		file_name: file.name,
		storage_path: storagePath,
		public_url: publicUrl,
		alt_text: altText ?? null,
		description: description ?? null,
		mime_type: resized.type,
		size_bytes: resized.blob.size,
		width: resized.width || null,
		height: resized.height || null,
		uploaded_by: uploadedBy ?? null
	}).select().single();
	if (error) {
		await supabase.storage.from("media").remove([storagePath]);
		throw new MediaUploadError(error.message);
	}
	return data;
}
async function deleteMediaFile(media) {
	const { error: storageError } = await supabase.storage.from("media").remove([media.storage_path]);
	if (storageError) throw new Error(storageError.message);
	const { error } = await supabase.from("media").delete().eq("id", media.id);
	if (error) throw new Error(error.message);
}
//#endregion
export { slugify as a, formatDateTime as i, bytesToSize as n, uploadMediaFile as o, deleteMediaFile as r, POST_STATUS_LABELS as t };
