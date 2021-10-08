import { gql } from '@apollo/client'

const addSingleRoom = gql`
	mutation createRoom($name: String!) {
		createRoom(name: $name) {
			id
            name
		}
	}
`

const addSingleUser = gql`
	mutation addSingleUserMutation($name: String!, $roomId: ID!) {
		createUser(name: $name, roomId: $roomId) {
			id
			name
		}
	}
`

const addSingleMessage = gql`
	mutation addSingleMessageMutation($content: String, $senderId: ID!, $receiverId: ID!) {
		createMessage(content: $content, senderId: $senderId, receiverId: $receiverId ) {
			id
			content
            sender {
                id,
                name
            }
		}
	}
`

export { addSingleRoom, addSingleUser, addSingleMessage }