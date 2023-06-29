import React, { useState } from "react";
import Alert from "../Alert/Alert.js";
import './FAQ.css';

export default function FAQ() {
    const [questions, setQuestions] = useState([
      {question: "Do you offer cash on delivery?", answer: "That option is not available currently."},
      {question: "How to know order is booked?", answer: "You will recieve a SMS confirmation. Also you can check your Active Order and Past Orders. "},
      {question: "Who delivers the food?", answer: "The Delivery Boy, he will contact you on mobile and will be coming to delivery food on your seat."}
    ]);
  
  return (
    <>
      <Alert />
      <div data-testid='faq-container-1' className="faq-container">
        <h1 className="faq-title">FAQs </h1>
        <ul className="faq-list">
          {questions.map((item, index) => (
            <li className="faq-item" key={index}>
              <h3 className="faq-question">{item.question}</h3>
              <p className="faq-answer">{item.answer}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
