import React, { useState } from 'react';
import ChatList from '../../components/ChatList/ChatList';
import Messages from '../../components/Messages/Messages';

const MessagesPage = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [receiverName, setReceiverName] = useState('');

  const handleSelectChat = (userId, name) => {
    setSelectedChat(userId);
    setReceiverName(name);
  };

  return (
    <div className="fixed inset-0 bg-gray-100" style={{ top: '4rem' }}>
      <div className="flex h-full w-full">
        <div className="w-72 h-full flex-shrink-0">
          <ChatList onSelectChat={handleSelectChat} />
        </div>
        <div className="flex-1 h-full overflow-hidden">
          {selectedChat ? (
            <Messages receiverId={selectedChat} receiverName={receiverName} />
          ) : (
            <div key="select-conversation" className="h-full flex items-center justify-center bg-gray-50">
              <p className="text-gray-500 text-lg">Select a conversation to start chatting</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesPage; 