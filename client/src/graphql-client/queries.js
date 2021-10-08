import {gql} from '@apollo/client';

const getRooms = gql`
    query getRoomQuery {
        rooms {
            id,
            name,
            users {
                id, 
                name
            }
        }
    }
`

const getRoomById = gql`
    query getRoomByIdQuery($id: ID!) {
        room(id: $id) {
            id,
            name,
            users {
                id,
                name
            },
            messages {
                id,
                content,
                sender {
                    id,
                    name
                } 
            }
        }
        
    }
`
const getRoomByName = gql`
    query getRoomByNameQuery($name: String!) {
        roomByName(name: $name) {
            id,
            name,
            users {
                id,
                name
            },
            messages {
                id,
                content,
                sender {
                    id,
                    name
                } 
            }
        }
        
    }
`

export { getRooms, getRoomById, getRoomByName}