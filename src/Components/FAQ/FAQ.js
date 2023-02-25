import React, { useState } from "react";
import './FAQ.css';
import {Link, useNavigate } from "react-router-dom";
import Alert from "../Alert/Alert.js";

export default function FAQ() {
    const [questions, setQuestions] = useState([
      {question: "Do you offer cash on delivery?", answer: "That option is not available currently."},
      {question: "How to know order is booked?", answer: "You will recieve a SMS confirmation. Also you can check your Active Order and Past Orders. "},
      {question: "Who delivers the food?", answer: "The Delivery Boy, he will contact you on mobile and will be coming to delivery food on your seat."}
    ]);
  
  return (
    <>
      <Alert />
      <div className="faq-container">
        {/* <Link to="/" className="btn btn-info" role="button">Go Back</Link> */}
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
