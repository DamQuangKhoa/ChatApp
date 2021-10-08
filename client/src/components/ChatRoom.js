import { useMutation, useQuery } from "@apollo/client";
import { useState, useEffect, useRef } from "react";
import { addSingleMessage } from "../graphql-client/mutations";
import { getRoomById} from "../graphql-client/queries";
import Message from "./Message";

const ChatRoom = ({ userId, roomId }) => {
    const [input, setInput] = useState("");
    
    const {loading, error, data} = useQuery(getRoomById, {
        variables: {
			id: roomId
		},
		skip: roomId === null,
        pollInterval: 500,

    }); 
    const [addMessage, messageMutaion] = useMutation(addSingleMessage);
    
    const sendMessage = () => {
        if (input !== "") {
            addMessage({
                variables: {
                    content: input,
                    senderId: userId,
                    receiverId: roomId
                },
                refetchQueries: [{ query: getRoomById,
                    variables: {
                        id: roomId
                    },
                    skip: roomId === null
                }]

            })
        setInput("");
        } else alert("Please enter value");
    };

        const lastMessage = useRef(null);
        const scrollToBottom = () => {
            if(lastMessage.current){
                lastMessage.current.scrollIntoView({ behavior: "smooth" });
            }
        };
        useEffect(scrollToBottom, [data]);

        if (loading) return <p>Loading room details...</p>
        if (error) {
            return <p>Error loading room details!</p>
        }
    return (
    <div className="container-fluid h-100">
            <div className="row justify-content-center h-100">
                <div className="col-md-8 col-xl-6 chat">
                    <div className="card">
                            <div className="card-header msg_head">
                                <div className="d-flex bd-highlight">
                                    <div className="user_info">
                                        <span>Room {data.room.name}</span>
                                        <p>1767 Messages</p>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body msg_card_body">
                            {data.room && data.room.messages.map(message => (
                                <Message
                                    key={message.id}
                                    message={message.content}
                                    username={message.sender.name}
                                    currentUser={message.sender.id === userId}
                                />
                            ))}
                            <div ref={lastMessage} />
                            </div>  
                            <div className="card-footer">
                                <div className="input-group">
                                    <textarea
                                        onChange={(e) => setInput(e.target.value)}
                                        value={input}
                                        className="form-control type_msg" placeholder="Type your message..."></textarea>
                                    <div onClick={sendMessage} className="input-group-append text-center">
                                        <span className="input-group-text send_btn ">
                                        <i className="fas fa-location-arrow"></i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
    </div>
    );
};

export default ChatRoom;