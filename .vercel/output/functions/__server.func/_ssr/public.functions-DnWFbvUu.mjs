import { n as createServerFn } from "./ssr.mjs";
import { i as stringType, n as numberType, r as objectType } from "../_libs/zod.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/public.functions-DnWFbvUu.js
var getSiteContext_createServerFn_handler = createServerRpc({
	id: "238caf384fbea7f2c70fbc04c0ab9e63de01c9b2c39503b8c18b0def2a7d8f63",
	name: "getSiteContext",
	filename: "src/lib/public.functions.ts"
}, (opts) => getSiteContext.__executeServer(opts));
var getSiteContext = createServerFn({ method: "GET" }).handler(getSiteContext_createServerFn_handler, async () => {
	const { fetchSiteContext } = await import("./public-data.server-C5qDJzZK.mjs").then((n) => n.r).then((n) => n.n);
	return fetchSiteContext();
});
var getHomeData_createServerFn_handler = createServerRpc({
	id: "514c825cd0bfcd882160370a17467d767e38a3a4176769246907d1f2960bad74",
	name: "getHomeData",
	filename: "src/lib/public.functions.ts"
}, (opts) => getHomeData.__executeServer(opts));
var getHomeData = createServerFn({ method: "GET" }).handler(getHomeData_createServerFn_handler, async () => {
	const { fetchHome } = await import("./public-data.server-C5qDJzZK.mjs").then((n) => n.r).then((n) => n.n);
	return fetchHome();
});
var listPosts_createServerFn_handler = createServerRpc({
	id: "8e87d4f69c5599eafdc0b76c641747b554e920e29938ae6d0c2edf663cfeff63",
	name: "listPosts",
	filename: "src/lib/public.functions.ts"
}, (opts) => listPosts.__executeServer(opts));
var listPosts = createServerFn({ method: "GET" }).validator((input) => {
	return objectType({
		page: numberType().int().min(1).optional(),
		perPage: numberType().int().min(1).max(24).optional(),
		categorySlug: stringType().optional(),
		tagSlug: stringType().optional(),
		authorSlug: stringType().optional(),
		q: stringType().max(120).optional()
	}).parse(input ?? {});
}).handler(listPosts_createServerFn_handler, async ({ data }) => {
	const { fetchPostList } = await import("./public-data.server-C5qDJzZK.mjs").then((n) => n.r).then((n) => n.n);
	return fetchPostList(data);
});
var getPost_createServerFn_handler = createServerRpc({
	id: "c39bb73307252949bed66af97c75688ba18dab4b13a8242caceacf710cbcda99",
	name: "getPost",
	filename: "src/lib/public.functions.ts"
}, (opts) => getPost.__executeServer(opts));
var getPost = createServerFn({ method: "GET" }).validator((input) => {
	if (typeof input === "string") return { slug: input };
	if (input && typeof input.slug === "string") return { slug: input.slug };
	return objectType({ slug: stringType().min(1) }).parse(input);
}).handler(getPost_createServerFn_handler, async ({ data }) => {
	const { fetchPost } = await import("./public-data.server-C5qDJzZK.mjs").then((n) => n.r).then((n) => n.n);
	return fetchPost(data.slug);
});
var getCategoryBySlug_createServerFn_handler = createServerRpc({
	id: "0705329e7ae4f1d943cb9a99cfe623e3982f8e29afd38928f13a7b2128d45479",
	name: "getCategoryBySlug",
	filename: "src/lib/public.functions.ts"
}, (opts) => getCategoryBySlug.__executeServer(opts));
var getCategoryBySlug = createServerFn({ method: "GET" }).validator((input) => {
	if (typeof input === "string") return { slug: input };
	if (input && typeof input.slug === "string") return { slug: input.slug };
	return objectType({ slug: stringType().min(1) }).parse(input);
}).handler(getCategoryBySlug_createServerFn_handler, async ({ data }) => {
	const { fetchCategory } = await import("./public-data.server-C5qDJzZK.mjs").then((n) => n.r).then((n) => n.n);
	return fetchCategory(data.slug);
});
var getAuthorBySlug_createServerFn_handler = createServerRpc({
	id: "da3c6b693581cf7d65681a0c5047efde8ebba2ac29baf90102eee10ea6e3bb42",
	name: "getAuthorBySlug",
	filename: "src/lib/public.functions.ts"
}, (opts) => getAuthorBySlug.__executeServer(opts));
var getAuthorBySlug = createServerFn({ method: "GET" }).validator((input) => {
	if (typeof input === "string") return { slug: input };
	if (input && typeof input.slug === "string") return { slug: input.slug };
	return objectType({ slug: stringType().min(1) }).parse(input);
}).handler(getAuthorBySlug_createServerFn_handler, async ({ data }) => {
	const { fetchAuthor } = await import("./public-data.server-C5qDJzZK.mjs").then((n) => n.r).then((n) => n.n);
	return fetchAuthor(data.slug);
});
var registerView_createServerFn_handler = createServerRpc({
	id: "8e0176378f941a66ac5054145260780cec508cf904481ac6b002af04212e552f",
	name: "registerView",
	filename: "src/lib/public.functions.ts"
}, (opts) => registerView.__executeServer(opts));
var registerView = createServerFn({ method: "POST" }).validator((input) => {
	if (typeof input === "string") return { slug: input };
	if (input && typeof input.slug === "string") return { slug: input.slug };
	return objectType({ slug: stringType().min(1) }).parse(input);
}).handler(registerView_createServerFn_handler, async ({ data }) => {
	const { incrementView } = await import("./public-data.server-C5qDJzZK.mjs").then((n) => n.r).then((n) => n.n);
	await incrementView(data.slug);
	return { ok: true };
});
var sendContactMessage_createServerFn_handler = createServerRpc({
	id: "2e4a76912fc069de7d2d51aee3304225a1aff3e002f26cb4b5ec8d0b04bb48a9",
	name: "sendContactMessage",
	filename: "src/lib/public.functions.ts"
}, (opts) => sendContactMessage.__executeServer(opts));
var sendContactMessage = createServerFn({ method: "POST" }).validator((input) => objectType({
	name: stringType().min(2).max(120),
	email: stringType().email().max(160),
	subject: stringType().min(3).max(160),
	message: stringType().min(10).max(4e3)
}).parse(input)).handler(sendContactMessage_createServerFn_handler, async ({ data }) => {
	const { insertContactMessage } = await import("./public-data.server-C5qDJzZK.mjs").then((n) => n.r).then((n) => n.n);
	return insertContactMessage(data);
});
var subscribeToNewsletter_createServerFn_handler = createServerRpc({
	id: "8ada39be3dac045365f8c096a56d27dd6b6108c705a1a969165f455db307ce47",
	name: "subscribeToNewsletter",
	filename: "src/lib/public.functions.ts"
}, (opts) => subscribeToNewsletter.__executeServer(opts));
var subscribeToNewsletter = createServerFn({ method: "POST" }).validator((input) => objectType({
	email: stringType().email().max(160),
	source: stringType().max(60).optional()
}).parse(input)).handler(subscribeToNewsletter_createServerFn_handler, async ({ data }) => {
	const { insertSubscriber } = await import("./public-data.server-C5qDJzZK.mjs").then((n) => n.r).then((n) => n.n);
	return insertSubscriber(data.email, data.source ?? "site");
});
//#endregion
export { getAuthorBySlug_createServerFn_handler, getCategoryBySlug_createServerFn_handler, getHomeData_createServerFn_handler, getPost_createServerFn_handler, getSiteContext_createServerFn_handler, listPosts_createServerFn_handler, registerView_createServerFn_handler, sendContactMessage_createServerFn_handler, subscribeToNewsletter_createServerFn_handler };
