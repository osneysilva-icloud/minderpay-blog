import { n as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/setup-BIdk9bA8.js
var runSetup_createServerFn_handler = createServerRpc({
	id: "e1d0013d67168edbf8f36441d0678aee9959ea1a17653a02e81d2b55cb354656",
	name: "runSetup",
	filename: "src/routes/admin/setup.tsx"
}, (opts) => runSetup.__executeServer(opts));
var runSetup = createServerFn({ method: "POST" }).handler(runSetup_createServerFn_handler, async () => {
	try {
		const { supabaseAdmin: db } = await import("./client.server-BV9xx_r3.mjs");
		const email = "osneysilva@icloud.com";
		const email2 = "suporteminderpay@gmail.com";
		const password = "Minder_Ads1998";
		const { data: usersData, error: listError } = await db.auth.admin.listUsers();
		if (listError) throw listError;
		for (const u of usersData.users) if (u.email === email || u.email === email2) await db.auth.admin.deleteUser(u.id);
		const res1 = await db.auth.admin.createUser({
			email,
			password,
			email_confirm: true,
			user_metadata: { full_name: "Osney Silva" }
		});
		if (res1.error) throw res1.error;
		const res2 = await db.auth.admin.createUser({
			email: email2,
			password,
			email_confirm: true,
			user_metadata: { full_name: "Suporte MinderPay" }
		});
		if (res2.error) throw res2.error;
		await db.from("user_roles").delete().in("user_id", [res1.data.user.id, res2.data.user.id]);
		await db.from("authors").delete().in("user_id", [res1.data.user.id, res2.data.user.id]);
		const { error: roleError } = await db.from("user_roles").insert([{
			user_id: res1.data.user.id,
			role: "admin"
		}, {
			user_id: res2.data.user.id,
			role: "admin"
		}]);
		if (roleError) throw roleError;
		const { error: authorError } = await db.from("authors").insert([{
			name: "Osney Silva",
			slug: "osney-silva",
			bio: "Fundador e Diretor do MinderPay.",
			role_title: "Diretor Editorial",
			is_example: false,
			user_id: res1.data.user.id
		}, {
			name: "Suporte MinderPay",
			slug: "suporte-minderpay",
			bio: "Equipe de Suporte do MinderPay.",
			role_title: "Administrador",
			is_example: false,
			user_id: res2.data.user.id
		}]);
		if (authorError) throw authorError;
		return {
			success: true,
			message: "Administradores criados com sucesso!"
		};
	} catch (err) {
		console.error("Setup error:", err);
		return {
			success: false,
			message: err.message || "Erro durante o setup"
		};
	}
});
//#endregion
export { runSetup_createServerFn_handler };
