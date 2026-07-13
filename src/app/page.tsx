'use client';

import { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

type Message = { sender: string; text: string; type?: 'text' | 'file' };

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [pdfContent, setPdfContent] = useState(''); // Store parsed PDF text here
  const scrollRef = useRef<HTMLDivElement>(null);

  const API_KEY = 'AIzaSyB4Kqy5B2MRmyu3bb65hZXTcvnU4eDply0'; //Put your Gemini API key here

  // Load PDF.js dynamically from CDN
  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.min.js';
    script.onload = () => {
      // @ts-ignore
      window['pdfjsLib'].GlobalWorkerOptions.workerSrc =
        'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';
    };
    document.body.appendChild(script);
  }, []);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMessage: Message = { sender: 'user', text: trimmed, type: 'text' };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const combinedPrompt = pdfContent
        ? `${trimmed}\n\n---\nHere is the PDF content for reference:\n${pdfContent}`
        : trimmed;

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: messages
              .concat(userMessage)
              .map((m) => ({
                role: m.sender === 'user' ? 'user' : 'model',
                parts: [{ text: m.text }],
              }))
              .concat([
                {
                  role: 'user',
                  parts: [{ text: combinedPrompt }],
                },
              ]),
          }),
        }
      );

      const data = await res.json();
      const botReply =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        '⚠️ No response from AI.';

      setMessages((prev) => [...prev, { sender: 'bot', text: botReply }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: '❌ Error fetching response.' },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleFileUpload = async (file: File) => {
    if (!file.name.endsWith('.pdf')) {
      alert('Please upload a PDF file.');
      return;
    }

    const fileMessage: Message = {
      sender: 'user',
      text: `📄 ${file.name} uploaded`,
      type: 'file',
    };
    setMessages((prev) => [...prev, fileMessage]);

    // Parse PDF
    const reader = new FileReader();
    reader.onload = async function () {
      const arrayBuffer = reader.result as ArrayBuffer;

      // @ts-ignore
      const pdf = await window['pdfjsLib'].getDocument({ data: arrayBuffer }).promise;
      let pdfText = '';

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item: any) => item.str).join(' ');
        pdfText += pageText + '\n';
      }

      setPdfContent(pdfText); // Store in state
      console.log('📄 Parsed PDF Content:', pdfText);

      // Add confirmation message after parsing is done
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: '✅ File uploaded successfully!' },
      ]);
    };
    reader.readAsArrayBuffer(file);
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start p-6 relative">
      {/* Floating Header */}
      <h1 className="text-2xl font-bold text-center mb-4 absolute top-6 z-10 text-gray-800">
        My AI Chatbot
      </h1>

      {/* Chat Card */}
      <Card className="w-full max-w-xl mt-12 shadow-xl">
        <CardContent className="px-4 py-2 flex flex-col gap-4">
          <ScrollArea className="h-[400px] border rounded-lg p-4 bg-white">
            <div className="flex flex-col gap-3">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-2 rounded-lg max-w-[75%] ${
                    msg.sender === 'user'
                      ? 'bg-blue-100 self-end'
                      : 'bg-gray-200 self-start'
                  }`}
                >
                  {msg.text}
                </div>
              ))}

              {isTyping && (
                <div className="bg-gray-200 self-start p-2 rounded-lg italic text-gray-500">
                  typing...
                </div>
              )}

              <div ref={scrollRef} />
            </div>
          </ScrollArea>

          {/* Input & Upload Section */}
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message here..."
              className="flex-grow"
            />
            <input
              type="file"
              accept="application/pdf"
              className="hidden"
              id="pdfUpload"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  handleFileUpload(e.target.files[0]);
                }
              }}
            />
            <label htmlFor="pdfUpload">
              <Button asChild>
                <span>🔗</span>
              </Button>
            </label>
            <Button onClick={handleSend}>Send</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
