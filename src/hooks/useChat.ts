import { useState, useCallback } from 'react';
import { Message, Conversation, ChatState } from '../types/chat';

// Mock API function - replace with actual API call
const mockApiCall = async (message: string): Promise<string> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));
  
  // Mock responses based on message content
  if (message.toLowerCase().includes('joke')) {
    return `Sure! Here are **5 office-friendly jokes** that are lighthearted and safe for the workplace:

1. **Why did the employee get fired from the calendar factory?**
   Because he took a few days off!

2. **Boss:** "You've been late three days this week. Do you know what that means?"
   **Employee:** "It's Wednesday?"

3. **Why don't we tell secrets in the office anymore?**
   Because the cubicles have ears!

4. **I told my boss three companies were after me...**
   So he gave me a raise. Turns out it was the electric company, the gas company, and the water company.

5. **Why did the stapler break up with the paperclip?**
   It found someone more binding.

Want me to tailor some jokes to your specific office culture or industry?`;
  }
  
  if (message.toLowerCase().includes('business plan')) {
    return `Here are **3 innovative business plan ideas** for merging technology with traditional industries:

## 1. **AgriTech Smart Farming Platform**
Combine IoT sensors, AI analytics, and drone technology to optimize crop yields and reduce resource waste. Target small to medium farms with subscription-based monitoring services.

## 2. **HealthTech Remote Monitoring**
Develop wearable devices integrated with telemedicine platforms for chronic disease management, focusing on elderly care and rural healthcare access.

## 3. **EduTech Immersive Learning**
Create VR/AR educational experiences for vocational training, allowing students to practice complex procedures in safe, virtual environments.

Each concept leverages emerging technologies to solve real-world problems while creating scalable business opportunities.`;
  }
  
  return `I understand you're asking about "${message}". Here's a comprehensive response that addresses your query with detailed information and actionable insights.

This is a **markdown-formatted response** that demonstrates:
- Proper formatting capabilities
- *Italic text* for emphasis
- **Bold text** for important points
- Structured lists and organization

Would you like me to elaborate on any specific aspect of this topic?`;
};

export const useChat = () => {
  const [chatState, setChatState] = useState<ChatState>({
    currentConversation: null,
    conversations: [],
    isTyping: false,
    isLoading: false,
  });

  const createNewConversation = useCallback((firstMessage: string): Conversation => {
    const conversation: Conversation = {
      id: Date.now().toString(),
      title: firstMessage.length > 50 ? firstMessage.substring(0, 50) + '...' : firstMessage,
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return conversation;
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    setChatState(prev => ({ ...prev, isLoading: true }));

    // Create user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: content.trim(),
      role: 'user',
      timestamp: new Date(),
    };

    // Create or update conversation
    let updatedConversation: Conversation;
    
    if (!chatState.currentConversation) {
      updatedConversation = createNewConversation(content);
      updatedConversation.messages = [userMessage];
    } else {
      updatedConversation = {
        ...chatState.currentConversation,
        messages: [...chatState.currentConversation.messages, userMessage],
        updatedAt: new Date(),
      };
    }

    // Update state with user message
    setChatState(prev => ({
      ...prev,
      currentConversation: updatedConversation,
      conversations: prev.currentConversation 
        ? prev.conversations.map(conv => 
            conv.id === updatedConversation.id ? updatedConversation : conv
          )
        : [...prev.conversations, updatedConversation],
      isTyping: true,
      isLoading: false,
    }));

    try {
      // Get AI response
      const aiResponse = await mockApiCall(content);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        role: 'assistant',
        timestamp: new Date(),
      };

      // Update conversation with AI response
      const finalConversation: Conversation = {
        ...updatedConversation,
        messages: [...updatedConversation.messages, assistantMessage],
        updatedAt: new Date(),
      };

      setChatState(prev => ({
        ...prev,
        currentConversation: finalConversation,
        conversations: prev.conversations.map(conv => 
          conv.id === finalConversation.id ? finalConversation : conv
        ),
        isTyping: false,
      }));

    } catch (error) {
      console.error('Error sending message:', error);
      setChatState(prev => ({ ...prev, isTyping: false }));
    }
  }, [chatState.currentConversation, createNewConversation]);

  const startNewConversation = useCallback(() => {
    setChatState(prev => ({
      ...prev,
      currentConversation: null,
    }));
  }, []);

  const loadConversation = useCallback((conversationId: string) => {
    const conversation = chatState.conversations.find(conv => conv.id === conversationId);
    if (conversation) {
      setChatState(prev => ({
        ...prev,
        currentConversation: conversation,
      }));
    }
  }, [chatState.conversations]);

  return {
    ...chatState,
    sendMessage,
    startNewConversation,
    loadConversation,
  };
};