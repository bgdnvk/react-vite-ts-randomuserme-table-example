import { ApiUserResponse } from "../types/ApiUserResponse"

export default async function getUsers(n: number): Promise<ApiUserResponse> {

    const numberUsers = n.toString()
    try {
        const res = await fetch(`https://randomuser.me/api/?results=${numberUsers}`);
        const data = await res.json();
        // console.log('data', data);
        return data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    } 
}