export class OAuth2Token{


constructor(private  access_token:string,
    public token_type:string,
    private refresh_token:string,
    public expires_in:number,
    public scope:string,
    public  expirationDate ?:Date){}

    get accessToken(){
    return this.access_token;
    }

    get refreshToken(){
        return this.refresh_token;
    }
}