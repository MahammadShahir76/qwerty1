import React, { useState } from "react";
import { Link } from "react-router-dom";
//import { useNavigate } from "react-router-dom";

function TakerInfo() {
    const [FullName, setFullName] = useState('');
    const [Email, setEmail] = useState('');
    const [Address, setAddress] = useState('');
    const [ServiceCategory, setServiceCategory] = useState('');
    const [Budget, setBudget] = useState('');
    const [Description, setDescription] = useState('');
    const [ProblemDStartedOn, setProblemDStartedOn] = useState('');
    const [problemImg, setProblemImg] = useState('');
    const [Emergency, setEmergency] = useState('');
    const [Error, setError] = useState(false);

    //const navigate = useNavigate();

    const addTaker = async () => {
        if (
            !FullName || 
            !Email || 
            !Address || 
            !ServiceCategory || 
            !Budget || 
            !Description || 
            !ProblemDStartedOn || 
            !problemImg||
            !Emergency
        ) {
            setError(true);
            return;
        }

        //const userId = JSON.parse(localStorage.getItem("User"))._id;

        let result = await fetch("http://localhost:5000/add-TakerInfo", {
            method: "post",
            body: JSON.stringify({
                FullName,
                Email,
                Address,
                ServiceCategory,
                Budget,
                Description,
                ProblemDStartedOn,
                problemImg,
                Emergency
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
            <h1>Service Taker Profile</h1>

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
                    type="email"
                    placeholder="Enter email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={Email}
                />
                {Error && !Email && <span>Enter valid email</span>}
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
                    type="number"
                    placeholder="Enter budget"
                    onChange={(e) => setBudget(e.target.value)}
                    value={Budget}
                />
                {Error && !Budget && <span>Enter valid budget</span>}
            </div>

            <div>
                <textarea
                    placeholder="Enter description"
                    onChange={(e) => setDescription(e.target.value)}
                    value={Description}
                />
                {Error && !Description && <span>Enter valid description</span>}
            </div>

            <div>
                <input
                    type="date"
                    placeholder="Enter problem started on"
                    onChange={(e) => setProblemDStartedOn(e.target.value)}
                    value={ProblemDStartedOn}
                />
                {Error && !ProblemDStartedOn && <span>Enter valid date</span>}
            </div>

            <div>
                <input
                    type="text"
                    placeholder="Enter problem image URL"
                    onChange={(e) => setProblemImg(e.target.value)}
                    value={problemImg}
                />
                {Error && !problemImg && <span>Enter valid image URL</span>}
            </div>


            <div>
                <input
                    type="text"
                    placeholder="is the problem emergency"
                    onChange={(e) => setEmergency(e.target.value)}
                    value={Emergency}
                />
                {Error && !Emergency && <span>Enter valid answer</span>}
            </div>
            
            <div>
                <button type="button" onClick={addTaker}>
                    Add Details
                </button>
                <Link to="/SeeProviders">See Service providers</Link><br/>
                <Link to="/nextTakerInfo">Next</Link>
            </div>
        </div>
    );
}

export default TakerInfo;
