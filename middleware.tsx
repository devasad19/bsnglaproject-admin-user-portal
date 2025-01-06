import { NextRequest,NextResponse  } from "next/server";


export const middleware = (request: NextRequest)=>{
  const envConfig = process.env.NEXT_PUBLIC_MODE;
    const token = request.cookies.get('token')?.value;
    const user= request.cookies.get("user");
    let userInfo;
    let redirectUrl;
    if (user) {
      userInfo = JSON?.parse(user?.value || '{}');
    }

    if(envConfig == 'dev'){
      redirectUrl = new URL('http://localhost:3000/signin', request.url);
    }else{
      redirectUrl = new URL('https://service.bangla.gov.bd/signin', request.url);
    }
    // console.log('middleware',{userInfo,token,envConfig});
    
    const { pathname } = request.nextUrl;
    // console.log('middleware',{pathname});
    
    if ((!token || !userInfo) && (pathname.startsWith('/admin') || pathname.startsWith('/user'))) {
        return NextResponse.redirect(redirectUrl);
    }
    if ((!token && userInfo?.type == 'system_user') && (pathname.startsWith('/admin') || pathname.startsWith('/user'))) {
        return NextResponse.redirect(redirectUrl);
    }
    if((!token && userInfo?.type == 'citizen') && pathname.startsWith('/admin')){
        return NextResponse.redirect(redirectUrl);
    }
    if((token && userInfo?.type == 'system_user') && pathname.startsWith('/user')){
        return NextResponse.redirect(redirectUrl);
    }
    if((token && userInfo?.type == 'citizen') && pathname.startsWith('/admin')){
      return NextResponse.redirect(redirectUrl);
  }
    return NextResponse.next();
}
export const config = {
    matcher: ['/admin/:path*', '/user/:path*']
  };