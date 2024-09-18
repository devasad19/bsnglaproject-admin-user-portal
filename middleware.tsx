import { NextRequest,NextResponse  } from "next/server";


export const middleware = (request: NextRequest)=>{
    const token = request.cookies.get('token')?.value;
    const user= request.cookies.get("user");
    let userInfo;
    if (user) {
      userInfo = JSON?.parse(user?.value || '{}');
    }
    // console.log('middleware',{userInfo,token});
    
    const { pathname } = request.nextUrl;
    // if ((!token || !userInfo) && (pathname.startsWith('/admin') || pathname.startsWith('/user'))) {
    //     return NextResponse.redirect(new URL('http://localhost:3001/signin', request.url));
    // }
    // if ((!token && userInfo.role) && (pathname.startsWith('/admin') || pathname.startsWith('/user'))) {
    //     return NextResponse.redirect(new URL('http://localhost:3001/signin', request.url));
    // }
    // if((!token && userInfo.role == 'user') && pathname.startsWith('/admin')){
    //     return NextResponse.redirect(new URL('http://localhost:3001/signin', request.url));
    // }
    return NextResponse.next();
}
export const config = {
    // matcher: ['/admin/:path*', '/user/:path*']
  };