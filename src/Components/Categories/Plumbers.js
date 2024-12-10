import React, { useState } from "react";
import emailjs from "emailjs-com"; // Import emailjs

function Plumbers() {
  const [products, setProducts] = useState([]);
  const [hasSearched, setHasSearched] = useState(false); // Track if search is performed
  const meetingLink = "http://localhost/2522"; // Replace with dynamic meeting link if needed
  const [emailSent, setEmailSent] = useState(false); // Track email status

  const filterData = async () => {
    let key = "Plumbers";
    if (key) {
      let result = await fetch(`http://localhost:5000/search/${key}`);
      result = await result.json();
      setHasSearched(true); // Set search flag to true
      if (result) {
        setProducts(result);
      }
    }
  };

  const sendEmail = (recipientEmail, recipientName) => {
    const templateParams = {
      to_name: recipientName, // Recipient's name
      meeting_link: meetingLink, // Meeting link
      to_email: recipientEmail, // Recipient's email
      from_name: "xyz", // Your name
      message: "Here is the link to join the meeting.",
    };

    emailjs
      .send(
        "service_yh4gxva", // Replace with your EmailJS service ID
        "template_azq4nj9", // Replace with your EmailJS template ID
        templateParams,
        "0byiYl0nzuLlAoS8Q" // Replace with your EmailJS public key
      )
      .then(
        (response) => {
          console.log("Email sent successfully!", response.status, response.text);
          setEmailSent(true); // Update email sent status
        },
        (error) => {
          console.error("Failed to send email.", error);
          setEmailSent(false); // Reset email sent status on failure
        }
      );
  };

  return (
    <div>
      <button onClick={filterData}>Filter Plumbers</button>
      {hasSearched && products.length > 0 ? (
        products.map((item) => (
          <ul key={item._id}>
            <li>{item.FullName}</li>
            <li>{item.Email}</li>
            <li>{item.Address}</li>
            <li>{item.Budget}</li>
            <li>{item.Description}</li>
            <li>{item.ProblemDStartedOn}</li>
            <li>{item.problemImg}</li>
            <li>
              <button
                onClick={() =>
                  sendEmail(item.Email, item.FullName)
                }
              >
                Send Email
              </button>
            </li>
          </ul>
        ))
      ) : (
        hasSearched && <h1>No customers in this category are listed yet.</h1>
      )}
      {emailSent && (
        <p style={{ color: "green", marginTop: "10px" }}>
          Email sent successfully!
        </p>
      )}
    </div>
  );
}

export default Plumbers;
