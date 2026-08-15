import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-oP-Vwcq3.mjs";
import { b as require_jsx_runtime, x as require_react } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { g as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Route$1 } from "./router-DaAGHLTK.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as PostEditorForm } from "./PostEditorForm-D3SiL84j.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/posts._id-A4sBiayi.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function EditPostView() {
	const navigate = useNavigate();
	const initialData = Route$1.useLoaderData();
	const [loading, setLoading] = (0, import_react.useState)(false);
	const handleSave = async (payload) => {
		setLoading(true);
		try {
			const { _tag_ids, ...postData } = payload;
			const { data: slugCheck } = await supabase.from("posts").select("id").eq("slug", postData.slug).neq("id", initialData.id).maybeSingle();
			if (slugCheck) {
				toast.error("Este slug de URL já está a ser utilizado por outro artigo.");
				setLoading(false);
				return;
			}
			const isStatusChangedToPublished = postData.status === "published" && initialData.status !== "published";
			const updatedPayload = {
				...postData,
				updated_at: (/* @__PURE__ */ new Date()).toISOString(),
				published_at: isStatusChangedToPublished ? initialData.published_at || (/* @__PURE__ */ new Date()).toISOString() : postData.status === "published" ? initialData.published_at : postData.published_at
			};
			const { error } = await supabase.from("posts").update(updatedPayload).eq("id", initialData.id);
			if (error) throw error;
			if (Array.isArray(_tag_ids)) {
				await supabase.from("post_tags").delete().eq("post_id", initialData.id);
				if (_tag_ids.length > 0) {
					const tagInserts = _tag_ids.map((tag_id) => ({
						post_id: initialData.id,
						tag_id
					}));
					await supabase.from("post_tags").insert(tagInserts);
				}
			}
			toast.success("Artigo atualizado com sucesso!");
			navigate({ to: "/admin/posts/" });
		} catch (err) {
			toast.error(err.message || "Erro ao atualizar o artigo.");
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PostEditorForm, {
			postId: initialData.id,
			initialData,
			onSave: handleSave,
			loading
		})
	});
}
//#endregion
export { EditPostView as component };
