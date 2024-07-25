// import NextAuth from 'next-auth';
// import { authConfig } from './auth.config';

// export default NextAuth(authConfig).auth;

// export const config = {
//   // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
//   matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
// };

import { NextRequest, NextResponse } from "next/server";

const AUTH_PAGES = ["/blog", "/dashboard"];

export default function middleware(request: NextRequest) {
  const { nextUrl, cookies } = request;
  const { origin, pathname } = nextUrl;
  const accessToken = cookies.get("testing");
  const LOGIN_PAGE = '/login';

  // 로그인이 필요 없는 페이지
  // if (AUTH_PAGES.some((page) => pathname.startsWith(page))) {
  //   // 로그인 되어 있는 경우 메인 페이지로 리다이렉트
  //   if (accessToken) {
  //     return NextResponse.redirect("/");
  //   } else {
  //     // 로그인이 필요 없는 페이지는 그냥 다음 요청으로 진행
  //     return NextResponse.next();
  //   }
  // }

  if(AUTH_PAGES.some((page) => pathname.startsWith(page))){
    console.log("==== pathname ===" + pathname)
    // 여기 오면 이제 로그인 체크를 해야하는 거임
    if(accessToken){
      return NextResponse.next();
    }else{
      const loginUrl = new URL(LOGIN_PAGE, request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 로그인 되어 있는 경우 요청 페이지로 진행
  return NextResponse.next();
}

export const config = {
  matcher: '/:path*', // 모든 경로에 대해 미들웨어를 적용
};
