import { fetchPost } from "../src/lib/public-data.server.ts";

async function test() {
  try {
    const res = await fetchPost("como-ganhar-dinheiro-online-em-mocambique");
    console.log("FETCH POST RESULT:", JSON.stringify(res, null, 2));
  } catch (err) {
    console.error("FETCH POST ERROR:", err);
  }
}

test();
