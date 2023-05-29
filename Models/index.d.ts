export interface CustomerDTO {
    Customer_ID: number;
    Nev: string;
    Telefonszam: string;
    Address : string;
    IG_Number : string;
    Email : string;
    Passwd : string;
}
export interface VehicleDTO {
    Vehicle_ID : number;
    Tipus : string;
    Gyarto : string;
    Rendszam : string;
    AlvazSzam : string;
    Beszerzes : string;
    Kolcsonzse_Dij : string;
    Futott : string;
    status : string;
    The : CustomerDTO;
    Selejt: boolean;
}
export interface LisenseDTO{
    Licens_ID : number;
    Vehicle_ID : number;
    Customer_ID : number;
    Start_Time : string;
    Start_Km : string;
}
export interface LoginDTO {
    email: string;
    password: string;
}

export interface AccessTokenDTO {
    accessToken: string;
    userid: Number;
}
export interface RegisterDTO {
    Nev: string;
    Telefonszam: string;
    Address : string;
    IG_Number : string;
    Email: string;
    Passwd: string;

}