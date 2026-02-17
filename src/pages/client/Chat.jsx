import React, { useState, useRef, useEffect } from 'react';
import { Send, MapPin, Feather, MessageCircle, Bot } from 'lucide-react';

const QuickChip = ({ label, onClick }) => (
    <button
        onClick={() => onClick(label)}
        className="bg-emerald-50 text-emerald-700 text-xs font-bold px-4 py-2 rounded-full border border-emerald-100 whitespace-nowrap active:scale-95 transition-transform"
    >
        {label}
    </button>
);

const ChatBubble = ({ message, isUser }) => (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
        {!isUser && (
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-2 border border-gray-200">
                <Bot size={16} className="text-gray-500" />
            </div>
        )}
        <div
            className={`max-w-[80%] p-4 rounded-2xl shadow-sm text-sm leading-relaxed ${isUser
                ? 'bg-emerald-500 text-white rounded-tr-none'
                : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
                }`}
        >
            {message}
        </div>
    </div>
);

const Chat = () => {
    const [messages, setMessages] = useState([
        { id: 1, text: "Habari! Mimi ni msaidizi wako wa Kuku Clinic. Ninaweza kukusaidia aje leo?", isUser: false },
    ]);
    const [inputText, setInputText] = useState("");
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = (text = inputText) => {
        if (!text.trim()) return;

        // User Message
        const newMsg = { id: Date.now(), text: text, isUser: true };
        setMessages((prev) => [...prev, newMsg]);
        setInputText("");

        // Simulated AI Response (Echo)
        setTimeout(() => {
            const aiMsg = {
                id: Date.now() + 1,
                text: `Asante, nimepokea swali lako kuhusu: "${text}". Hivi karibuni nitaunganishwa na akili bandia kujibu kwa ufasaha zaidi!`,
                isUser: false
            };
            setMessages((prev) => [...prev, aiMsg]);
        }, 1000);
    };

    return (
        <div className="flex flex-col h-screen bg-gray-50 pb-20 pt-safe"> {/* padding bottom for bottom nav */}
            {/* Header */}
            <div className="bg-white px-4 py-3 border-b border-gray-100 flex items-center shadow-sm z-10 sticky top-0">
                <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center mr-3">
                    <Feather className="text-emerald-600" size={24} />
                </div>
                <div>
                    <h1 className="font-bold text-gray-900 text-lg">Kuku Clinic Chat</h1>
                    <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                        <span className="text-xs text-gray-500 font-medium">AI Assistant Online</span>
                    </div>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 scrollbar-hide">
                {messages.map((msg) => (
                    <ChatBubble key={msg.id} message={msg.text} isUser={msg.isUser} />
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="bg-white p-4 border-t border-gray-100">
                {/* Text Field */}
                <div className="flex gap-2 items-center">
                    <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Uliza chochote kuhusu kuku wako..."
                        className="flex-1 bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-full focus:ring-emerald-500 focus:border-emerald-500 block w-full p-3.5 pl-5 outline-none transition-all"
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    />
                    <button
                        onClick={() => handleSend()}
                        className="p-3.5 bg-emerald-500 text-white rounded-full hover:bg-emerald-600 active:scale-95 transition-all shadow-md shadow-emerald-200"
                    >
                        <Send size={20} />
                    </button>
                </div>

                {/* Quick Chips */}
                <div className="flex gap-2 overflow-x-auto pt-4 scrollbar-hide mask-fade-right">
                    <QuickChip label="Kuku hawanasishi" onClick={handleSend} />
                    <QuickChip label="Ratiba ya chanjo" onClick={handleSend} />
                    <QuickChip label="Bei ya mayai leo" onClick={handleSend} />
                    <QuickChip label="Magonjwa ya dharura" onClick={handleSend} />
                </div>
            </div>
        </div>
    );
};

export default Chat;
