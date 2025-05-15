import { useState, useEffect } from 'react';
import { Search, MessageSquare } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import ChatWindow from './ChatWindow';

interface ChatUser {
  id: string;
  name: string;
  role: string;
  profileImage?: string;
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount?: number;
}

const ChatList = () => {
  const [users, setUsers] = useState<ChatUser[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<ChatUser | null>(null);
  const { user } = useAuthStore();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    // In a real app, fetch users from API
    const mockUsers: ChatUser[] = [
      {
        id: '1',
        name: 'Dr. Sarah Johnson',
        role: 'doctor',
        profileImage: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=150',
        lastMessage: 'Patient test results are ready',
        lastMessageTime: '10:30 AM',
        unreadCount: 2
      },
      {
        id: '2',
        name: 'Nurse Smith',
        role: 'nurse',
        profileImage: 'https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=150',
        lastMessage: 'Room 302 needs assistance',
        lastMessageTime: '09:45 AM',
        unreadCount: 1
      }
    ];
    setUsers(mockUsers);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="fixed bottom-4 right-4 w-80 bg-white rounded-lg shadow-lg">
        <div className="p-4 border-b">
          <div className="relative">
            <input
              type="text"
              placeholder="Search staff..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div className="divide-y max-h-96 overflow-y-auto">
          {filteredUsers.map((user) => (
            <button
              key={user.id}
              className="w-full p-4 hover:bg-gray-50 flex items-center space-x-3 text-left"
              onClick={() => setSelectedUser(user)}
            >
              <div className="relative flex-shrink-0">
                <img
                  src={user.profileImage}
                  alt={user.name}
                  className="h-10 w-10 rounded-full object-cover"
                />
                {user.unreadCount && user.unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {user.unreadCount}
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate">{user.name}</p>
                {user.lastMessage && (
                  <p className="text-sm text-gray-500 truncate">{user.lastMessage}</p>
                )}
              </div>
              {user.lastMessageTime && (
                <span className="text-xs text-gray-400">{user.lastMessageTime}</span>
              )}
            </button>
          ))}
        </div>

        <button
          className="w-full p-4 text-primary-600 hover:bg-gray-50 flex items-center justify-center space-x-2"
          onClick={() => setSelectedUser(null)}
        >
          <MessageSquare size={20} />
          <span>New Message</span>
        </button>
      </div>

      {selectedUser && (
        <ChatWindow
          receiverId={selectedUser.id}
          receiverName={selectedUser.name}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </>
  );
};

export default ChatList;