import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./AboutUs.css";
import { authContext } from "../../Context/authContextProvider";

const AboutUs = () => {
  const authCtx = useContext(authContext);
  return (
    <div className="about-us">
      <h1>About Us</h1>
      <p>
        Welcome to Expense Tracker, your go-to solution for seamless financial
        management! At Expense Tracker, we are dedicated to helping individuals
        and businesses keep track of their finances with ease and efficiency.
        Our mission is to provide a user-friendly platform that empowers you to
        take control of your money, make informed decisions, and achieve your
        financial goals.
      </p>

      <h2>Who We Are</h2>
      <p>
        Expense Tracker was founded by a passionate team of finance and
        technology enthusiasts who saw a need for a simple yet powerful tool to
        manage personal and business expenses. We believe that everyone should
        have access to effective financial management tools without the hassle
        of complex software.
      </p>

      <h2>Our Vision</h2>
      <p>
        Our vision is to create a world where financial stress is a thing of the
        past. We aim to empower our users with the knowledge and tools they need
        to manage their finances confidently and effectively. By providing clear
        insights and easy-to-use features, we help you make the most out of your
        money.
      </p>

      <h2>What We Offer</h2>
      <ul>
        <li>
          <strong>User-Friendly Interface:</strong> Our intuitive design ensures
          that you can track your expenses effortlessly, even if you're not a
          finance expert.
        </li>
        <li>
          <strong>Real-Time Tracking:</strong> Stay updated with your financial
          status in real-time, allowing you to make timely decisions.
        </li>
        <li>
          <strong>Comprehensive Reports:</strong> Generate detailed reports that
          provide valuable insights into your spending patterns and financial
          health.
        </li>
        <li>
          <strong>Customizable Categories:</strong> Tailor the expense
          categories to fit your unique needs, ensuring that your financial
          tracking is as relevant and personalized as possible.
        </li>
        <li>
          <strong>Security:</strong> We prioritize your privacy and data
          security, implementing robust measures to keep your financial
          information safe.
        </li>
      </ul>

      <h2>Our Commitment</h2>
      <p>
        At Expense Tracker, we are committed to continuous improvement. We
        listen to our users' feedback and strive to enhance our platform to meet
        your evolving needs. Our team works tirelessly to incorporate new
        features and technologies that make financial management more accessible
        and effective.
      </p>

      <h2>Join Our Community</h2>
      <p>
        We invite you to join our growing community of users who are taking
        control of their finances with Expense Tracker. Whether you're an
        individual looking to manage personal expenses or a business aiming to
        streamline financial operations, Expense Tracker is here to support you
        every step of the way.
      </p>

      <p>
        Thank you for choosing Expense Tracker. Let's achieve financial clarity
        together!
      </p>

      <p>
        Feel free to reach out to us with any questions or feedback. Your
        journey to better financial management starts here!
      </p>

      {!authCtx.isLogin && (
        <button className="signup">
          <Link to="/">Sign up here</Link>
        </button>
      )}
    </div>
  );
};

export default AboutUs;
