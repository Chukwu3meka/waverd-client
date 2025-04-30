import { jwtDecode } from "jwt-decode";
import { NextResponse } from "next/server";
import { INIT_PROFILE } from "@lib/constants";
import type { NextRequest } from "next/server";
import { setServiceCookie } from "@services/axios/service";

const goToLogin = async (destination: string, url: any) => {
  // return Response.redirect(new URL(`/accounts/signin?target=${destination}`, url));
  return NextResponse.redirect(new URL(`/accounts/signin?target=${destination}`, url));
};

const getSessionProfile = (): Promise<Profile> => {
  return import("@services/axios/accounts.service").then((mod) =>
    new mod.default().getProfile().then(({ data, success }) => {
      if (success) return data;
      return INIT_PROFILE;
    })
  );
};

export async function middleware(request: NextRequest) {
  const url = request.nextUrl,
    response = NextResponse.next(),
    destination = new URL(url).pathname,
    cookies = request.cookies.get("SSID");

  try {
    // ? Delete Wave Research SSID if it does not have a value
    if (cookies && !cookies.value) {
      request.cookies.delete(["SSID"]);
    } else {
      setServiceCookie(request.cookies);
    }
  } catch (err) {
    return goToLogin(destination, url);
  }

  const hasAuthRoute = privateRoutes.some((route: string) => destination.startsWith(route)); // Check if destination is a private route, i.e requires authentication

  if (hasAuthRoute) {
    const ssidCookie = cookies && cookies.value;
    if (!cookies || !ssidCookie) return goToLogin(destination, url);

    const decoded: any = jwtDecode(ssidCookie);
    if (!decoded || !decoded.session) return goToLogin(destination, url);

    if (destination.startsWith("/console/")) {
      const role = (await getSessionProfile()).role;
      if (!["moderator"].includes(role)) return goToLogin(destination, url);

      // const url = request.nextUrl;
      // const { device } = userAgent(request);
      // const viewport = device.type === "mobile" ? "mobile" : "desktop";

      // console.log({ viewport, device, a: device.type });

      // url.searchParams.set("viewport", viewport);
      // return NextResponse.rewrite(url);
    }
  }

  return response;
}

// ? Routes that require authentication
const privateRoutes = ["/console", "/games"];

export const config = {
  // ? Use this else middleware will apply to even files in /public, etc
  matcher: ["/", "/info/:path*", "/accounts/:path*", "/apihub/:path*", "/console/:path*", "/games/:path*"],
};
