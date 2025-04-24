import React, { useState, useEffect, useRef } from 'react';
import { useMessaging } from '../../hooks/useMessaging';
import { useAuth } from '../../context/AuthContext';

const Messages = ({ receiverId, receiverName }) => {
  const { user } = useAuth();
  const { messages, sendNewMessage, markMessageAsRead, fetchMessages } = useMessaging(user?.userID);
  const [messageInput, setMessageInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (receiverId) {
      fetchMessages(receiverId);
    }
  }, [receiverId, fetchMessages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages.length]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (messageInput.trim() && receiverId) {
      sendNewMessage(receiverId, messageInput.trim());
      setMessageInput('');
      setTimeout(scrollToBottom, 100);
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-gray-50">
      {/* Chat Header - Fixed Position */}
      <div className="p-4 border-b border-gray-200 bg-white shadow-sm fixed top-0 right-0 left-72 z-10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
            {receiverName.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{receiverName}</h3>
            <p className="text-sm text-gray-500">Active now</p>
          </div>
        </div>
      </div>
      
      {/* Messages Container - Scrollable */}
      <div 
        className="flex-1 overflow-y-auto p-4 space-y-4 mt-16 mb-20" 
        style={{ 
          scrollBehavior: 'smooth',
          overflowAnchor: 'none' // Prevent automatic scrolling
        }}
      >
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <p className="text-gray-500">No messages yet. Start the conversation!</p>
          </div>
        ) : (
          messages.map((message, index) => (
            <div
              key={`${message.messageID || index}-${message.timestamp}`}
              className={`flex ${message.senderID === user?.userID ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                  message.senderID === user?.userID 
                    ? 'bg-blue-600 text-white rounded-br-none' 
                    : 'bg-white text-gray-900 rounded-bl-none shadow-sm'
                }`}
              >
                <p className="break-words whitespace-pre-wrap">{message.content}</p>
                <span className={`text-xs mt-1 block ${message.senderID === user?.userID ? 'text-blue-100' : 'text-gray-500'}`}>
                  {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input - Fixed Position */}
      <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 bg-white fixed bottom-0 right-0 left-72 z-10">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
          />
          <button 
            type="submit" 
            className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            disabled={!messageInput.trim()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Messages; 