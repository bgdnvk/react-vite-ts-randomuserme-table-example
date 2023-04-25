import { User } from "randomuser-sdk-ts/src/types/User";
import { FilterUser } from "../types/FilterUser";
import { SortUser } from "../types/SortUser";

//return filtered data from the search components
export default function filterUsers(users: User[], filter: FilterUser, sort: SortUser): User[] {

    const searchUsers: User[] = users.filter((user) => {
        const nameMatch = `${user.name.first} ${user.name.last}`.toLowerCase().includes(filter.name.toLowerCase().trim());

        function checkGender(userGender: string, filterGender: string): boolean{
            const parsedFilterGender = filterGender.toLowerCase().trim()
            const parsedUserGender = userGender.toLowerCase().trim()
            if(parsedFilterGender === parsedUserGender || parsedFilterGender === '') {
                return true
            } else {
                return false
            }
        }

        const genderMatch = checkGender(user.gender, filter.gender)
        const emailMatch = user.email.toLowerCase().includes(filter.email.toLowerCase().trim());

        return nameMatch && genderMatch && emailMatch;
    })

    //handle sorting users
    if(sort.name !== null || sort.gender !== null || sort.email !== null) {
        console.log('sort pressed')
        //switch with different cases: name, email and gender
        switch(sort!== null) {
        //sort by NAME
        case sort.sort === 'name':
            if(sort.name) {
                console.log('sort name true')
                return [...searchUsers].sort((a, b) => {
                const nameA = `${a.name.first} ${a.name.last}`.toLowerCase()
                const nameB = `${b.name.first} ${b.name.last}`.toLowerCase()
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
                return 0;
            })
            }
            if(!sort.name) {
            console.log('sort name false')
            return [...searchUsers].sort((a, b) => {
                const nameA = `${a.name.first} ${a.name.last}`.toLowerCase()
                const nameB = `${b.name.first} ${b.name.last}`.toLowerCase()
                if (nameA > nameB) {
                    return -1;
                }
                if (nameA < nameB) {
                    return 1;
                }
                return 0;
            })
            }
            break

        //sort by EMAIL
        case sort.sort === 'email': 
            if(sort.email) {
            return [...searchUsers].sort((a, b) => {
                const nameA = `${a.email}`.toLowerCase()
                const nameB = `${b.email}`.toLowerCase()
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
                return 0;
            })
            }
            if(!sort.email) {
            return [...searchUsers].sort((a, b) => {
                const nameA = `${a.email}`.toLowerCase()
                const nameB = `${b.email}`.toLowerCase()
                if (nameA > nameB) {
                    return -1;
                }
                if (nameA < nameB) {
                    return 1;
                }
                    return 0;
            })}
            break

            //sort by GENDER
            case sort.sort === 'gender':
            if(sort.gender) {
                return [...searchUsers].sort((a,b) => {
                    const genderA = `${a.gender}`
                    const genderB = `${b.gender}`
                    if(genderA > genderB) {
                        return -1
                    }
                    if(genderA < genderB) {
                        return 1
                    }
                    return 0
                })
            }
            if(!sort.gender) {
                return [...searchUsers].sort((a,b) => {
                    const genderA = `${a.gender}`
                    const genderB = `${b.gender}`
                    if(genderA < genderB) {
                        return -1
                    }
                    if(genderA > genderB) {
                        return 1
                    }
                    return 0
                })
            }
            break
        }
    }
    //return arr of all the filtered users through search
    return searchUsers 
}