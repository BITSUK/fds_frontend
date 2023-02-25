import React from 'react';
import './CustJourneyHelp.css';
import { Link } from 'react-router-dom';

const CustJourneyHelp = () => {
  
  return (
    <div className="journey-container">
      <Link to="/" className="btn btn-info" role="button">Back</Link>
      <h1 className="journey-title">Customer Journey</h1>
      <ol className="journey-list">
        <li className="journey-step">
          <h2 className="journey-step-title">Search for restaurants</h2>
          <p className="journey-step-description">
            Customers can search for restaurants by entering their Train/PNR number or Station name browsing through different cuisines and filters.
          </p>
        </li>
        <li className="journey-step">
          <h2 className="journey-step-title">Choose a restaurant</h2>
          <p className="journey-step-description">
            Customers can view menus, ratings, and reviews for each restaurant to help them make a decision. They can also see estimated delivery time and cost.
          </p>
        </li>
        <li className="journey-step">
          <h2 className="journey-step-title">Place an order</h2>
          <p className="journey-step-description">
            Once a customer has selected a restaurant, they can add items to their cart and proceed to checkout. They can choose from various payment options such as cash on delivery, credit card, or online wallets.
          </p>
        </li>
        <li className="journey-step">
          <h2 className="journey-step-title">Track your order</h2>
          <p className="journey-step-description">
            Customers can track the status of their order in real-time, from the time it is placed until it is delivered.
          </p>
        </li>
        <li className="journey-step">
          <h2 className="journey-step-title">Enjoy your meal</h2>
          <p className="journey-step-description">
            After the order is delivered, customers can enjoy their meals and rate their experience.
          </p>
        </li>
      </ol>
    </div>
  );
};

export default CustJourneyHelp;