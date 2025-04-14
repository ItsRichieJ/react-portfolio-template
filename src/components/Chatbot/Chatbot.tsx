import { useState, useEffect, useRef } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import React from "react";
import "./Chatbot.css";
import OpenAI from "openai";
import {
  ChatCompletionCreateParamsStreaming,
  ChatCompletionMessageParam,
} from "openai/resources.mjs";

// TODO: replace this with your actual experiences (you can write MUCH more than I did...)
const USER_BACKGROUND = `
My Name is Richie Jiang.

I am a Sophomore at Boston University majoring in finannce and real estate, and minoring in psychology and international relations.
The following is my resume and all about me:

Richie Jiang
(646) 436-8959 | richiej@bu.edu | www.linkedin.com/in/richiej2004 | Orange County, CA

EDUCATION
Boston University Questrom School of Business	Boston, MA
Bachelor of Science in Business Administration	Expected May 2027
Double Major: Finance & Real Estate | Minors: Psychology & International Relations
Cumulative GPA: 3.9
Relevant Coursework: Microeconomics, Macroeconomics, Statistics for Business and Econ, International Economics
Certifications: Bloomberg Certifications (Finance, Markets, ESG), Microsoft Excel Certification (In Progress), REFM Financial Modeling Certification in Excel for Real Estate

EXPERIENCE
Project Destined Real Estate Private Equity Internship	Boston, MA (Hybrid)
Investment Analyst	March 2025 – Present

Stava.io	Boston, MA
Co-Founder	January 2025 – Present
Spearheaded outreach to 20+ companies, securing pilot interest and shaping go-to-market strategy for 1,000+ user target
Led customer outreach, business strategy, and go-to-market efforts to drive early enterprise adoption and user feedback

Boston University Finance Committee	Boston, MA
Data and Financial Analyst	September 2024 – Present
Analyzed $2MM+ distributions for 450+ BU student organizations for the 25-26 school year.
Led budget negotiations, achieving unanimous funding decisions, and presented outcomes to the BU Dean of Students.

Project Destined Commercial Real Estate Internship	Boston, MA (Hybrid)
Analyst - Team Lument X Orix	September 2024 – November 2024
Completed 40+ hours of training in real estate analysis and decision-making with mentor guidance.
Conducted property valuations, deal analysis, and pitched findings to Project Destined CEO and Lument X Orix

PADI, Inc.	San Diego, CA
Open Water Scuba Instructor, CPR/EFR Instructor	October 2022 – Present
Achieved advanced and instructional diving credentials, taught 50+ students ages 5-70, from beginner to advanced skill
Organized dive teams in pools and open sea, reaching depths of 140 feet; worked as first mate and deckhand

Jam Chat	         San Diego, CA
Head of Marketing and Talent Acquisition for Southern California	         January 2024 – September 2024
Secured grassroots investments, contributed to app design, and developed a foundational marketing campaign.
Converted schools and organizations to Jam Chat through pitches, boosting usage from 4,000 to 20,000+ in 4 months

Columbia University, Psychology Department	New York, NY
Psychology Experiment Researcher and Participant	August 2020 – August 2022
Participated as a subject in a study on the attentiveness and mental health of high school students under pressure
Conducted research, data analysis, experiments, authored and translated reports for Columbia’s Psych Department

LEADERSHIP EXPERIENCE
Boys State of California by American Legion	Sacramento, CA
Lieutenant Governor & Counselor	  June 2022 – Present
Delivered speeches and debates on policy to 1,000 top California high school students and crafted mock state gov. policy
Guided 100+ students as a counselor, managed departments and state executive, legislative, and judicial affairs


AWARDS & INTERESTS
Awards: 2x World Record Holder - Youngest Scuba and CPR/EFR Instructor
President’s Volunteer Service Award (3x Gold Distinction) - 750+ service hours	
Organizations: Student Government, BU Finance & Investments Club, Mock Mediation, Club Tennis, PCT Fraternity
Languages: Chinese (Native), English (Native), Spanish (Conversational)
Other Interests: Spear Fishing, Shakespeare, BJJ, Aviation, Golf, Tennis, Cooking, International Investing, Piano

`;

/**
 * TODO: it is worth noting that `dangerouslyAllowBrowser: true` is NOT a safe configuration
 * for real websites. It is fine for temporary personal projects, but if you want to use this in
 * the long run, you should create a BACKEND and call the OpenAI client there.
 */
const client = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export default function Chatbot() {
  const [question, setQuestion] = useState<string>("");
  const [messages, setMessages] = useState<Array<ChatCompletionMessageParam>>(
    []
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const chatboxRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const scrollToBottom = () => {
      if (isLoading && chatboxRef.current) {
        chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
      }
    };
  
    // Scroll to bottom immediately when loading starts
    scrollToBottom();
  
    // Set up an interval to continuously scroll while loading
    const scrollInterval = setInterval(scrollToBottom, 100);
  
    // Clear the interval when loading is false
    return () => {
      clearInterval(scrollInterval);
    };
  }, [isLoading]);

  // Load saved messages from localStorage on component mount
  useEffect(() => {
    const savedMessages = localStorage.getItem("chatbot_messages");
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  // Save messages to localStorage when they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("chatbot_messages", JSON.stringify(messages));
    }
  }, [messages]);

  const clearMessages = async () => {
    localStorage.setItem("chatbot_messages", JSON.stringify([]));
    setMessages([]);
  };

  const handleSend = async () => {
    if (question.trim() === "") return;

    const newMessage: ChatCompletionMessageParam = {
      role: "user",
      content: question,
    };
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setIsLoading(true);
    setQuestion("");

    try {
      // API key from environment variable
      const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

      if (!apiKey) {
        throw new Error("API key not found in environment variables");
      }

      // Create messages payload for OpenAI
      const payload: ChatCompletionCreateParamsStreaming = {
        model: "gpt-4o", // You can change this to any OpenAI model
        messages: [
          {
            role: "system",
            content: `You are a personal assistant chatbot that responds to questions about the user's background and experiences. 
            Here is information about the user that you can reference:
            ${USER_BACKGROUND}
            
            Always respond in first person as if you are the user. Keep responses concise and relevant.
            If asked about something not covered in the user background, politely mention that you don't have 
            that information, it is CRUCIAL that you do not violate this condition.`,
          },
          ...updatedMessages,
        ],
        temperature: 0.7,
        max_tokens: 500,
        stream: true,
      };

      const stream = await client.chat.completions.create(payload);

      // New message that is currently being streamed
      const assistantMessage: ChatCompletionMessageParam = {
        role: "assistant",
        content: "",
      };
      setMessages((prevMessages) => [...prevMessages, assistantMessage]);

      for await (const chunk of stream) {
        if (chunk.choices[0].delta.content) {
          assistantMessage.content += chunk.choices[0].delta.content;
          setMessages((prevMessages) => {
            const newMessages = [...prevMessages];
            newMessages[newMessages.length - 1] = { ...assistantMessage };
            return newMessages;
          });
        }
      }
    } catch (error) {
      console.error("Error calling OpenAI API:", error);
      setMessages([
        ...updatedMessages,
        {
          role: "assistant",
          content:
            "Sorry, I encountered an error processing your request. Please check the API key in your environment variables and try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <h2 id="chatbot">Chatbot</h2>
      <div className="chatbot-container">
        <div className="chatbox-messages" ref={chatboxRef}>
          {messages.length === 0 ? (
            <div className="empty-state">
              Ask me anything about my background or experience!
            </div>
          ) : (
            messages.map((msg, index) => (
              <div key={index} className={`message ${msg.role}`}>
                <div className="message-content">{msg.content?.toString()}</div>
              </div>
            ))
          )}
          {/* {isLoading && (
            <div className="message assistant">
              <div className="message-content loading">Thinking...</div>
            </div>
          )} */}
        </div>
        <div className="chatbox-input" onKeyDown={handleKeyPress}>
          <Input
            placeholder="Enter your question here..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <div className="chatbox-buttons">
            <span
              className={
                isLoading || question.trim() === ""
                  ? "button-wrapper disabled"
                  : "button-wrapper"
              }
            >
              <Button
                onClick={() => {
                  if (!isLoading && question.trim() !== "") {
                    handleSend();
                  }
                }}
              >
                Send
              </Button>
            </span>
            <Button onClick={() => clearMessages()}>Clear</Button>
          </div>
        </div>
      </div>
    </>
  );
}
