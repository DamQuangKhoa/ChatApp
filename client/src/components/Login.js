import { useMutation, useQuery } from "@apollo/client";
import { useState} from "react";
import { useHistory } from "react-router-dom";
import { addSingleRoom, addSingleUser } from "../graphql-client/mutations";
import { getRooms } from "../graphql-client/queries";


const Login = () => {
    const {loading, error, data} = useQuery(getRooms);
    const [addRoom, roomMutaion] = useMutation(addSingleRoom, {
        onCompleted(data){
            localStorage.setItem('roomId', data.createRoom.id);
        }
    })
    const [addUser, userMutation] = useMutation(addSingleUser, {
        onCompleted(data){
            localStorage.setItem('userId', data.createUser.id);
        }
    } )

    const [input, setInput] = useState({
        name: "",
        roomName: "",
    });
    const history = useHistory();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const {name, roomName} = input;
        const room = data.rooms.find(room => room.name === roomName);
        if(room){
            const user = room.users.find(user => user.name === name)
            if(!user){
                await addUser({
                    variables: {
                        name: name, 
                        roomId: room.id
                    }
                })
                const userId = localStorage.getItem('userId');
                history.push(`/chat/${room.id}/${userId}`)
            } else {
                alert("Username is duplicate");
                return;
            }
        }
        else {
            await addRoom({
                variables: {name: roomName}
            })
            const roomId = localStorage.getItem('roomId');
            await addUser({
                variables: {
                    name: name, 
                    roomId: roomId
                }
            })
            const userId = localStorage.getItem('userId');
            history.push(`/chat/${roomId}/${userId}`)
        }
    };
        if (loading) return <p>Loading room details...</p>
        if (error) {
            return <p>Error loading room details!</p>
        }
    return (
        <div className="d-flex justify-content-center pt-5 pb-5 h-100">
        <form
            onSubmit={onSubmit}
            className="d-flex flex-column justify-content-between"
        >
            <div className="d-flex flex-column justify-content-between ">
            <input
                type="text"
                placeholder="Username"
                name="name"
                className="bg-light m-3 p-3 rounded"
                onChange={handleChange}
            />
            <input
                type="text"
                placeholder="RoomID"
                name="roomName"
                className="bg-light m-3 p-3 rounded"
                onChange={handleChange}
            />
            </div>
            <button type="submit" className="bg-success text-white p-3 rounded-pill">
            JOIN
            </button>
        </form>
        </div>
    );
};

export default Login;