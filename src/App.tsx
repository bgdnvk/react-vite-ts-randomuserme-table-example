import { useEffect, useState } from 'react'
import { CSVLink } from 'react-csv'
import './App.css'
//types
//this type is from my own package hehe
import { User } from 'randomuser-sdk-ts/src/types/User'
import { SortUser } from './lib/types/SortUser'
import { FilterUser } from './lib/types/FilterUser'
//utils
import getUsers from './lib/data/users'
import filterUsers from './lib/utils/filter'

function App() {

  const [users, setUsers] = useState<User[]>([])
  //hashmap to properly store the csv data so it's easier to check, insert, delete, etc
  const csvHashMap: Map<string, User> = new Map()
  const [csvData, setCsvData] = useState<Map<string, User>>(csvHashMap)
  //once you work with the data and stringify it you put it here, looks like types aren't working well enough
  const [csvString, setCsvString] = useState<any>([])

  //states for the search and sort bar
  const [filter, setFilter] = useState<FilterUser>({ name: '', gender: '', email: '' });
  const [sort, setSortBy] = useState<SortUser>({ name: null, gender: null, email: null, sort: null });

  useEffect(() => {
   getUsers(10).then((data) => setUsers(data.results))
  }, [])

  //get the filtered users from the search bar and sort buttons
  const filteredUsers = filterUsers(users, filter, sort)

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, user: User) => {
    const checked = event.target.checked
    if(checked) {
      setCsvData(csvData.set(user.id.value, user))
    } else {
      csvData.delete(user.id.value)
      const newData: Map<string, User> = csvData 
      setCsvData(newData)
    }
    const obj = Object.fromEntries(csvData)
    const csvJson = JSON.stringify(obj)
    setCsvString(csvJson)
  }

  return (
    <>
      <h2>search</h2>
      <div>
        <label htmlFor="nameFilter">Name: </label>
        <input
          id="nameFilter"
          type="text"
          value={filter.name}
          onChange={(e) => setFilter({ ...filter, name: e.target.value })}
        />
      </div>

      <div>
        <label htmlFor="emailFilter">Email: </label>
        <input
          id="emailFilter"
          type="text"
          value={filter.email}
          onChange={(e) => setFilter({ ...filter, email: e.target.value })}
        />
      </div>


      <div>
        <div>
          <label>Gender:</label>
          <label>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={filter.gender === "male"}
              onChange={(e) => setFilter({ ...filter, gender: e.target.value })}
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="female"
              checked={filter.gender === "female"}
              onChange={(e) => setFilter({ ...filter, gender: e.target.value })}
            />
            Female
          </label>
          <label>
            <input
            type='radio'
            name='gender'
            value=''
            checked={filter.gender === ''}
            onChange={(e) => setFilter({...filter, gender: e.target.value})}
            />
            all
          </label>
        </div>
      </div>
      
      <h2>sort by</h2>
      {filteredUsers.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <table>
          <tbody>
            <tr>
              <th>pic</th>
              <th>
                <button onClick={() => setSortBy({...sort, name: !sort.name, sort:'name'})}>name</button>
              </th>
              <th>
                <button onClick={() => setSortBy({...sort, gender: !sort.gender, sort:'gender'})}>gender</button>
                </th>
              <th>
                <button onClick={() => setSortBy({...sort, email: !sort.email, sort: 'email'})}>email</button>
              </th>
              <th>
                add to csv
              </th>
            </tr>
          </tbody>
          {filteredUsers.map((user: User) => {
            //the api returns null id values sometimes
            if(user.id.value === null) {
              user.id.value = crypto.randomUUID() 
            }

            return (
              <tbody key={user.id.value}>
                <tr >
                  <td>
                    <img src={user.picture.thumbnail} alt={`picture of ${user.name.first}`} />
                  </td>
                  <td>
                    Name: {user.name.first} {user.name.last}
                  </td>
                  <td>
                    gender: {user.gender}
                  </td>
                  <td>Email: {user.email}</td>
                  <td>
                    <label>
                      <input type="checkbox" name="csvcheck" onChange={(e) => handleCheckboxChange(e, user)}/>
                      include data in csv
                    </label>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      )}
      <CSVLink data={csvString} filename='csv-react.csv'>download data</CSVLink>
    </>
  )
}

export default App
