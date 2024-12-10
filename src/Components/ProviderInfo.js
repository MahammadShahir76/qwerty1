import React, { useState } from "react";
import { useNavigate ,Link } from "react-router-dom";

function ProviderInfo() {
    const [FullName, setFullName] = useState('');
    const [PhoneNumber, setPhoneNumber] = useState('');
    const [Address, setAddress] = useState('');
    const [ServiceCategory, setServiceCategory] = useState('');
    const [Specialisation, setSpecialisation] = useState('');
    const [Experience, setExperience] = useState('');
    const [ToolsOwned, setToolsOwned] = useState('');
    const [Availability, setAvailability] = useState('');
    const [Error, setError] = useState(false);

    const navigate = useNavigate();

    const addProvider = async () => {
        if (!FullName || !PhoneNumber || !Address || !ServiceCategory || !Specialisation || !Experience || !ToolsOwned || !Availability) {
            setError(true);
            return;
        }

        //const userId = JSON.parse(localStorage.getItem("User"))._id;

        let result = await fetch("http://localhost:5000/add-ProviderInfo", {
            method: "post",
            body: JSON.stringify({
                FullName,
                PhoneNumber,
                Address,
                ServiceCategory,
                Specialisation,
                Experience,
                ToolsOwned,
                Availability
            }),
            headers: { "Content-Type": "application/json" },
        });

        result = await result.json();
        console.log(result);
        // Uncomment if navigation is required
        // navigate("/");
    };

    return (
        <div>
            <h1>Service Provider Profile</h1>

            <div>
                <input
                    type="text"
                    placeholder="Enter full name"
                    onChange={(e) => setFullName(e.target.value)}
                    value={FullName}
                />
                {Error && !FullName && <span>Enter valid name</span>}
            </div>

            <div>
                <input
                    type="number"
                    placeholder="Enter contact number"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    value={PhoneNumber}
                />
                {Error && !PhoneNumber && <span>Enter valid number</span>}
            </div>

            <div>
                <input
                    type="text"
                    placeholder="Enter address"
                    onChange={(e) => setAddress(e.target.value)}
                    value={Address}
                />
                {Error && !Address && <span>Enter valid address</span>}
            </div>

            <div>
                <input
                    type="text"
                    placeholder="Enter service category"
                    onChange={(e) => setServiceCategory(e.target.value)}
                    value={ServiceCategory}
                />
                {Error && !ServiceCategory && <span>Enter valid service category</span>}
            </div>

            <div>
                <input
                    type="text"
                    placeholder="Enter specialisation"
                    onChange={(e) => setSpecialisation(e.target.value)}
                    value={Specialisation}
                />
                {Error && !Specialisation && <span>Enter valid specialisation</span>}
            </div>

            <div>
                <input
                    type="text"
                    placeholder="Enter years of experience"
                    onChange={(e) => setExperience(e.target.value)}
                    value={Experience}
                />
                {Error && !Experience && <span>Enter valid experience</span>}
            </div>

            <div>
                <input
                    type="text"
                    placeholder="Enter tools owned"
                    onChange={(e) => setToolsOwned(e.target.value)}
                    value={ToolsOwned}
                />
                {Error && !ToolsOwned && <span>Enter valid tools</span>}
            </div>

            <div>
                <input
                    type="text"
                    placeholder="Enter availability (e.g., weekdays, weekends)"
                    onChange={(e) => setAvailability(e.target.value)}
                    value={Availability}
                />
                {Error && !Availability && <span>Enter valid availability</span>}
            </div>

            <div>
                <button type="button" onClick={addProvider}>
                    Add Details
                </button>
                <Link to="/CategorySelection">Next</Link>
            </div>
        </div>
    );
}

export default ProviderInfo;
