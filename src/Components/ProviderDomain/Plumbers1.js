import { useState } from 'react'

function Plumbers1() {
  const [products, setProducts] = useState([]);
  const [hasSearched, setHasSearched] = useState(false); // New state to track if the search has been performed

  const filterData = async () => {
      let key = "Plumbers";
      if (key) {
          let result = await fetch(`http://localhost:5000/search1/${key}`);
          result = await result.json();
          setHasSearched(true); // Set the flag indicating that search has been performed
          if (result) {
              
              setProducts(result);
          }
      }
  };

  return (
      <div>
          <button onClick={filterData}>Filter Plumbers</button>
          {
              hasSearched && products.length > 0 ? (
                  products.map((items) =>
                      <ul key={items._id}>
                          <li>{items.FullName}</li>
                          <li>{items.PhoneNumber}</li>
                          <li>{items.Address}</li>
                          <li>{items.Specialisation}</li>
                          <li>{items.Experience}</li>
                          <li>{items.ToolsOwned}</li>
                          <li>{items.Availability}</li>
                      </ul>
                  )
              ) : (
                  hasSearched && <h1>No customers in this category is listed yet.</h1>
              )
          }
      </div>
  );
}

export default Plumbers1
