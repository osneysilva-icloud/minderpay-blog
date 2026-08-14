/**
 * Wrapper leve para autenticação social via Supabase OAuth, exposto com a
 * mesma forma esperada de um eventual SDK "lovable". Mantido localmente
 * porque o pacote do SDK ainda não está disponível neste projeto.
 */
import { supabase } from "@/integrations/supabase/client";

type OAuthProvider = "google";

async function signInWithOAuth(
  provider: OAuthProvider,
  options: { redirect_uri: string },
): Promise<void> {
  const { error } = await supabase.auth.signInWithOAuth({
    provider,
    options: { redirectTo: options.redirect_uri },
  });
  if (error) throw error;
}

export const lovable = {
  auth: {
    signInWithOAuth,
  },
};
