export async function login(){
    
    try {
            let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            console.log(email, password);
            if(!emailRegex.test(email)){
                error(t("errors.invalidEmail"));
                return;
            }

            const response = await authService.login({email, password});
            if(response.statusCode && response.statusCode !== 200) {
                error(t("errors.invalidCredentials"));
                return;
            }else{
                success(t("success.login"));
                setCookie(null, "accessToken", response.access_token, {
                    maxAge: 24 * 60 * 60, // 30 days
                    path: "/",
                });
                document.location.href = "/";
            }
        } catch (err) {
            console.log(err);
            error(t("errors.internal"));
        } finally {
        }
}