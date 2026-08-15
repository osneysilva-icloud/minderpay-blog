import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-CRIS042E.mjs";
import { b as require_jsx_runtime, x as require_react } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { g as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as PostEditorForm } from "./PostEditorForm-upHeRKq3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/posts.new-CWp9j4gN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function NewPostView() {
	const navigate = useNavigate();
	const [loading, setLoading] = (0, import_react.useState)(false);
	const handleSave = async (payload) => {
		setLoading(true);
		try {
			const { data: sessionData } = await supabase.auth.getSession();
			sessionData?.session?.user?.id;
			const { data: author } = await supabase.from("authors").select("id").limit(1).maybeSingle();
			const { _tag_ids, ...postData } = payload;
			const finalPayload = {
				...postData,
				author_id: postData.author_id || author?.id || null
			};
			const { data: newPost, error } = await supabase.from("posts").insert(finalPayload).select("id").single();
			if (error) throw error;
			if (_tag_ids && Array.isArray(_tag_ids) && _tag_ids.length > 0 && newPost?.id) {
				const tagInserts = _tag_ids.map((tag_id) => ({
					post_id: newPost.id,
					tag_id
				}));
				await supabase.from("post_tags").insert(tagInserts);
			}
			toast.success("Artigo criado com sucesso!");
			navigate({ to: "/admin/posts/" });
		} catch (err) {
			toast.error(err.message || "Erro ao criar o artigo.");
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PostEditorForm, {
			onSave: handleSave,
			loading
		})
	});
}
//#endregion
export { NewPostView as component };
