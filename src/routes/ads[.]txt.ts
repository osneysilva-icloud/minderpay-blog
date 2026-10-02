import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/ads.txt")({
  server: {
    handlers: {
      GET: async () => {
        const content = "google.com, pub-4050091800984606, DIRECT, f08c47fec0942fa0\n";
        return new Response(content, {
          status: 200,
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "public, max-age=86400",
          },
        });
      },
    },
  },
});
