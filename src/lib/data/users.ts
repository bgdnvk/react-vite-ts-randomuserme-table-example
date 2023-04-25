import RandomUserSDK from "randomuser-sdk-ts/src/main";
import { ApiUserResponse } from "randomuser-sdk-ts/src/types/ApiUserResponse";
// import { ApiUserResponse } from "../types/ApiUserResponse"


export default async function getUsers(n: number): Promise<ApiUserResponse> {

    try {

        const sdk = new RandomUserSDK()
        const res = await sdk.getRandomUsers(n)
        // const res = await fetch(`https://randomuser.me/api/?results=${numberUsers}`);
        // const data = await res.json();
        // console.log('data', data);
        return res;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    } 
}