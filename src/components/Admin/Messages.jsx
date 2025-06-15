// src/components/Admin/Messages.jsx
import { useEffect, useState } from 'react';
import { db } from '../../firebase/config';
import { collection, getDocs, query, orderBy, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { format } from 'date-fns';

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const q = query(
          collection(db, 'messages'),
          orderBy('createdAt', 'desc')
        );
        const querySnapshot = await getDocs(q);
        const messagesData = [];
        querySnapshot.forEach((doc) => {
          messagesData.push({ id: doc.id, ...doc.data() });
        });
        setMessages(messagesData);
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, []);

  const deleteMessage = async (id) => {
    try {
      const docRef = doc(db, 'messages', id);
      await deleteDoc(docRef);
      setMessages(prev => prev.filter(msg => msg.id !== id));
      if (selectedMessage?.id === id) {
        setSelectedMessage(null);
      }
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  const markAsRead = async (id) => {
    try {
      const docRef = doc(db, 'messages', id);
      await updateDoc(docRef, { read: true });
      setMessages(prev => prev.map(msg =>
        msg.id === id ? { ...msg, read: true } : msg
      ));
      if (selectedMessage?.id === id) {
        setSelectedMessage(prev => ({ ...prev, read: true }));
      }
    } catch (error) {
      console.error("Error marking message as read:", error);
    }
  };

  const viewMessage = (message) => {
    setSelectedMessage(message);
    if (!message.read) {
      markAsRead(message.id);
    }
  };

  if (loading) return <div className="text-center py-8">Loading messages...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Messages</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 border-b">
              <h2 className="font-semibold">All Messages ({messages.length})</h2>
            </div>
            <div className="divide-y">
              {messages.map((message) => (
                <div
                  key={message.id}
                  onClick={() => viewMessage(message)}
                  className={`p-4 cursor-pointer hover:bg-gray-50 ${selectedMessage?.id === message.id ? 'bg-indigo-50' : ''
                    } ${!message.read ? 'font-semibold' : ''}`}
                >
                  <div className="flex justify-between items-start">
                    <h3 className="truncate">{message.name}</h3>
                    <span className="text-xs text-gray-500">
                      {message.createdAt?.toDate() ?
                        format(message.createdAt.toDate(), 'MMM d, yyyy') : ''}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">{message.email}</p>
                  <p className="text-sm text-gray-600 truncate mt-1">{message.message}</p>
                  {!message.read && (
                    <span className="inline-block mt-1 w-2 h-2 rounded-full bg-indigo-600"></span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          {selectedMessage ? (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold">{selectedMessage.name}</h2>
                  <p className="text-gray-600">{selectedMessage.email}</p>
                  {selectedMessage.phone && (
                    <p className="text-gray-600">Phone: {selectedMessage.phone}</p>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">
                    {selectedMessage.createdAt?.toDate() ?
                      format(selectedMessage.createdAt.toDate(), 'MMM d, yyyy h:mm a') : ''}
                  </p>
                  <span className={`inline-block px-2 py-1 text-xs rounded-full ${selectedMessage.read ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                    {selectedMessage.read ? 'Read' : 'Unread'}
                  </span>
                </div>
              </div>

              <div className="prose max-w-none">
                <p className="whitespace-pre-line">{selectedMessage.message}</p>
              </div>

              <div className="mt-6 pt-4 border-t">
                <a
                  href={`mailto:${selectedMessage.email}`}
                  className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 mr-2"
                >
                  Reply
                </a>
                <button
                  onClick={() => deleteMessage(selectedMessage.id)}
                  className="inline-block px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 mr-2"
                >
                  Delete
                </button>
                {!selectedMessage.read && (
                  <button
                    onClick={() => markAsRead(selectedMessage.id)}
                    className="inline-block px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                  >
                    Mark as Read
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-6 flex items-center justify-center h-64">
              <p className="text-gray-500">Select a message to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}