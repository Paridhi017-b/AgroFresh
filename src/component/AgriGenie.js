import React, { useState, useRef, useEffect } from 'react';
import { FiSend, FiX, FiMessageCircle } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const AgriGenieChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'assistant',
      text: 'Namaste! Ask me about:\n\n• Market prices\n• Govt schemes\n• Pest control',
      loading: false,
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const agriculturalKnowledge = {
    greetings: {
      patterns: ["hi", "hello", "namaste", "hey"],
      responses: [
        "Namaste! I'm AgriGenie. How can I help with your farming questions today?",
        "Hello Kisan Mitra! Ask me about crops, soil, or farming techniques."
      ]
    },
    wellbeing: {
      patterns: ["how are you", "kaise ho", "status"],
      responses: [
        "I'm always ready to help farmers like you!",
        "Digital hoon par kisanon ki madad karne ko taiyar hoon!"
      ]
    },
    crops: {
      patterns: ["crop", "fasal", "rice", "wheat", "tomato"],
      responses: [
        "Rice: Best sown June-July, requires 150-200cm rainfall",
        "Wheat: Sow Nov-Dec, irrigate 3-4 times, yield 18-22 quintals/acre",
        "Tomato: 60-90 day cycle, use 10-10-10 NPK fertilizer"
      ]
    },
    soil: {
      patterns: ["soil", "mitti", "black soil", "loam"],
      responses: [
        "Black soil: Best for cotton, retains moisture well",
        "Loam soil: Ideal for most vegetables (40% sand, 40% silt, 20% clay)"
      ]
    },
    prices: {
      patterns: ["price", "rate", "bhav", "market"],
      responses: [
        "Today's rates:\nTomato: ₹1200-1500/quintal\nPotato: ₹800-1000\nWheat: ₹2100-2300",
        "Latest APMC rates available at agmarknet.gov.in"
      ]
    },
    pests: {
      patterns: ["pest", "keeda", "roak"],
      responses: [
        "Neem oil: Mix 2ml/liter water, spray weekly",
        "For stem borer: Use Cartap Hydrochloride 4G @20kg/acre"
      ]
    },
    schemes: {
      patterns: ["scheme", "yojana", "subsidy"],
      responses: [
        "PM-KISAN: ₹6000/year direct benefit",
        "Soil Health Card: Free testing every 3 years"
      ]
    },
    weather: {
      patterns: ["weather", "mausam", "rain"],
      responses: [
        "Check IMD forecasts at mausam.imd.gov.in",
        "Monsoon expected June 1-7 in your region"
      ]
    }
  };

  const quickReplies = [
    "Market Prices",
    "Pest Control",
    "Weather",
    "Govt Schemes",
    "Crop Rotation",
    "Soil Testing"
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getBotResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    for (const [category, data] of Object.entries(agriculturalKnowledge)) {
      if (data.patterns.some(pattern => lowerMessage.includes(pattern))) {
        return data.responses[Math.floor(Math.random() * data.responses.length)];
      }
    }
    return "I can help with farming questions about crops, soil, prices, pests, or schemes. Could you be more specific?";
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = { sender: 'user', text: inputMessage, loading: false };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    setMessages(prev => [...prev, { sender: 'assistant', text: '', loading: true }]);

    setTimeout(() => {
      const botResponse = getBotResponse(inputMessage);
      setMessages(prev => [
        ...prev.slice(0, -1),
        { sender: 'assistant', text: botResponse, loading: false }
      ]);
      setIsLoading(false);
    }, 800);
  };

  const handleQuickReply = (topic) => {
    setInputMessage(topic);
    const fakeEvent = { preventDefault: () => {} };
    handleSendMessage(fakeEvent);
  };

  return (
    <div className="agri-genie-container">
      {!isOpen && (
        <motion.button
          className="floating-chat-button"
          onClick={() => setIsOpen(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FiMessageCircle size={24} />
        </motion.button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="chat-window"
          >
            <div className="chat-header">
              <div className="chat-icon">🌱</div>
              AgroFresh - AgriGenie
              <button className="close-button" onClick={() => setIsOpen(false)}>
                <FiX size={20} />
              </button>
            </div>

            <div className="messages-container">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`message ${msg.sender === 'user' ? 'message-user' : 'message-assistant'}`}
                >
                  <div className={`message-bubble message-bubble-${msg.sender}`}>
                    {msg.loading ? (
                      <div className="loading-dots">
                        <span>.</span>
                        <span>.</span>
                        <span>.</span>
                      </div>
                    ) : (
                      msg.text
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

           
             <div className="quick-replies">
  {quickReplies.map((topic) => (
    <motion.button 
      key={topic} 
      onClick={() => handleQuickReply(topic)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {topic}
    </motion.button>
  ))}
</div>
            

            <form onSubmit={handleSendMessage} className="input-form">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your farming question..."
                className="message-input"
                disabled={isLoading}
              />
              <button 
                type="submit" 
                className="send-button"
                disabled={isLoading}
              >
                <FiSend />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .agri-genie-container {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .floating-chat-button {
          position: fixed;
          bottom: 20px;
          right: 20px;
          background-color: #4CAF50;
          color: white;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 1000;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          border: none;
          outline: none;
        }

        .chat-window {
          position: fixed;
          bottom: 20px;
          right: 20px;
          background-color: white;
          border-radius: 16px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          z-index: 1001;
          height: 500px;
          width: 350px;
          max-width: 95vw;
          border: 1px solid #e0e0e0;
        }

        .chat-header {
          background-color: #4CAF50;
          color: white;
          padding: 16px;
          position: relative;
          font-size: 1.1rem;
          font-weight: bold;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .chat-icon {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          margin-right: 10px;
          border: 2px solid white;
          background-color: #4CAF50;
          padding: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .close-button {
          position: absolute;
          top: 16px;
          right: 16px;
          background: transparent;
          border: none;
          color: white;
          cursor: pointer;
        }

        .messages-container {
          flex: 1;
          overflow-y: auto;
          padding: 16px;
          background: #f9f9f9;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .message {
          display: flex;
          max-width: 80%;
        }

        .message-user {
          justify-content: flex-end;
        }

        .message-assistant {
          justify-content: flex-start;
        }

        .message-bubble {
          padding: 12px 16px;
          border-radius: 18px;
          font-size: 14px;
          line-height: 1.4;
          white-space: pre-wrap;
        }

        .message-bubble-user {
          background-color: #4CAF50;
          color: white;
        }

        .message-bubble-assistant {
          background-color: #e0e0e0;
          color: black;
        }

        .loading-dots {
          display: inline-flex;
          gap: 4px;
        }

        .loading-dots span {
          animation: bounce 1.5s infinite ease-in-out;
          opacity: 0;
        }

        .loading-dots span:nth-child(1) {
          animation-delay: 0.1s;
        }

        .loading-dots span:nth-child(2) {
          animation-delay: 0.2s;
        }

        .loading-dots span:nth-child(3) {
          animation-delay: 0.3s;
        }

        @keyframes bounce {
          0%, 100% {
            opacity: 0.3;
            transform: translateY(0);
          }
          50% {
            opacity: 1;
            transform: translateY(-4px);
          }
        }

        .quick-replies {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          padding: 10px;
          border-top: 1px solid #e0e0e0;
          background-color: #fff;
        }

        .quick-replies button {
          padding: 8px 12px;
          border-radius: 20px;
          background-color: #e8f5e9;
          border: 1px solid #c8e6c9;
          font-size: 0.8rem;
          cursor: pointer;
          color: #2e7d32;
          border: none;
          outline: none;
        }

        .input-form {
          display: flex;
          border-top: 1px solid #e0e0e0;
          padding: 12px;
          background-color: #fff;
        }

        .message-input {
          flex: 1;
          padding: 10px 14px;
          border-radius: 20px;
          border: 1px solid #ccc;
          outline: none;
          font-size: 0.95rem;
        }

        .send-button {
          background: #4CAF50;
          border: none;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          margin-left: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: white;
        }

        @media (max-width: 480px) {
          .chat-window {
            width: 95vw;
            height: 90vh;
            right: 2.5vw;
            bottom: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default AgriGenieChat;
