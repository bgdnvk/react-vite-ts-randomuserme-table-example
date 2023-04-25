import RandomUserSDK from "randomuser-sdk-ts/src/main";
import { ApiUserResponse } from "randomuser-sdk-ts/src/types/ApiUserResponse";

export default async function getUsers(n: number): Promise<ApiUserResponse> {

    try {
        const sdk = new RandomUserSDK()
        const res = await sdk.getRandomUsers(n)
        return res;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    } 
}