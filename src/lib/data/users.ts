//import the sdk
import RandomUserSDK from "randomuser-sdk-ts/src/main";
import { ApiUserResponse } from "randomuser-sdk-ts/src/types/ApiUserResponse";

export default async function getUsers(n: number): Promise<ApiUserResponse> {
    try {
        //initiatiate the class
        const sdk = new RandomUserSDK()
        //get the data using the sdk
        const res = await sdk.getRandomUsers(n)
        //return the data or do something with it (you get a JSON back)
        return res
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    } 
}