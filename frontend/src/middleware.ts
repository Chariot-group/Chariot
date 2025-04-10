import createMiddleware from "next-intl/middleware";
import { locales } from "./i18n/locales.generated"; // Assure-toi que ce fichier est bien généré
import { NextRequest } from "next/server";

export default function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/auth/login")) {
    return;
  }
  const intlMiddleware = createMiddleware({
    locales,
    defaultLocale: "fr", // Remplace par ta locale par défaut
  });

  return intlMiddleware(req);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"], // Ignore les fichiers statiques
};
