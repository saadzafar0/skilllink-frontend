import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useMessaging } from '../../hooks/useMessaging';

const ChatList = ({ onSelectChat }) => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [availableUsers, setAvailableUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAllUsers, setShowAllUsers] = useState(false);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/v1/messages/conversations/${user?.userID}`);
        const data = await response.json();
        setConversations(data);
        // If no conversations, show available users by default
        if (data.length === 0) {
          setShowAllUsers(true);
        }
      } catch (error) {
        console.error('Error fetching conversations:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.userID) {
      fetchConversations();
    }
  }, [user?.userID]);

  useEffect(() => {
    const fetchAvailableUsers = async () => {
      if (!user?.accType) return;
      
      // If user is client, get freelancers. If freelancer, get clients
      const targetType = user.accType.toLowerCase() === 'client' ? 'Freelancer' : 'Client';
      
      try {
        const response = await fetch(`http://localhost:4000/api/v1/user/by-type/${targetType}?excludeUserId=${user.userID}`);
        const data = await response.json();
        // Log users with undefined IDs
        const usersWithUndefinedIds = data.filter(user => !user.userID);
        if (usersWithUndefinedIds.length > 0) {
          console.log('Users with undefined IDs:', usersWithUndefinedIds);
        }
        setAvailableUsers(data);
      } catch (error) {
        console.error('Error fetching available users:', error);
      }
    };

    if (user?.userID) {
      fetchAvailableUsers();
    }
  }, [user?.userID, user?.accType]);

  if (loading) {
    return (
      <div className="w-72 h-full bg-white border-r border-gray-200 flex items-center justify-center">
        <p className="text-gray-500">Loading users...</p>
      </div>
    );
  }

  const hasConversations = conversations.length > 0;
  const hasAvailableUsers = availableUsers.length > 0;

  return (
    <div className="w-72 h-full bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200 bg-gray-50 sticky top-0 z-10">
        <h2 className="text-xl font-semibold text-gray-900">Messages</h2>
        {hasConversations && (
          <button
            onClick={() => setShowAllUsers(prev => !prev)}
            className="mt-2 w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            {showAllUsers ? 'Show Conversations' : `Show All ${user?.accType === 'Client' ? 'Freelancers' : 'Clients'}`}
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto" style={{ scrollBehavior: 'smooth' }}>
        {showAllUsers || !hasConversations ? (
          // Show all available users
          !hasAvailableUsers ? (
            <div key="no-users-message" className="h-full flex items-center justify-center flex-col gap-2 p-4">
              <p className="text-gray-500">No {user?.accType === 'Client' ? 'freelancers' : 'clients'} available</p>
              <p className="text-sm text-gray-400">Check back later for new users</p>
            </div>
          ) : (
            <div key="available-users-container">
              {availableUsers
                .filter(user => user.userID)
                .map((availableUser) => (
                  <div
                    key={`available-user-${availableUser.userID}`}
                    className="flex items-center p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      onSelectChat(availableUser.userID, availableUser.name);
                    }}
                  >
                    <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-3">
                      {availableUser.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900">{availableUser.name}</h3>
                      <p className="text-xs text-gray-500">{availableUser.accType}</p>
                    </div>
                  </div>
                ))}
            </div>
          )
        ) : (
          // Show existing conversations
          <div key="conversations-container">
            {conversations.map((conversation) => (
              <div
                key={`conversation-${conversation.userID}`}
                className="flex items-center p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  onSelectChat(conversation.userID, conversation.name);
                }}
              >
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-3">
                  {conversation.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-900 truncate">
                    {conversation.name}
                  </h3>
                  <p className="text-xs text-gray-500 truncate">
                    {conversation.lastMessage}
                  </p>
                </div>
                {conversation.unreadCount > 0 && (
                  <div key={`unread-${conversation.userID}`} className="w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    {conversation.unreadCount}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatList; 