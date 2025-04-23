import { useEffect, useState } from 'react';
import { useSocket } from '../context/SocketContext';

export const useMessaging = (userID) => {
  const { socket, joinRoom, sendMessage, markAsRead } = useSocket();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState(null);

  const fetchMessages = async (receiverID) => {
    try {
      const response = await fetch(`http://localhost:4000/api/v1/messages/${userID}/${receiverID}`);
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => {
    if (socket && userID) {
      joinRoom(userID);

      // Listen for new messages
      socket.on('receive_message', (message) => {
        setNewMessage(message);
        setMessages(prev => [...prev, message]);
      });

      return () => {
        socket.off('receive_message');
      };
    }
  }, [socket, userID, joinRoom]);

  const sendNewMessage = (receiverID, content) => {
    if (socket) {
      const messageData = {
        senderID: userID,
        receiverID,
        content
      };
      sendMessage(messageData);
      // Fetch messages after sending to ensure we have the latest
      fetchMessages(receiverID);
    }
  };

  const markMessageAsRead = (messageID) => {
    if (socket) {
      markAsRead(messageID);
    }
  };

  return {
    messages,
    newMessage,
    sendNewMessage,
    markMessageAsRead,
    fetchMessages
  };
}; 