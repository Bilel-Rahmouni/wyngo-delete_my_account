import { useState } from "react";
import axios from "axios";
function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [deletionReason, setDeletionReason] = useState("");

  const handleDeleteAccount = async () => {
    try {
      const res = await axios.delete(
        "https://wynbackend-production.up.railway.app/api/v1/users/deleteaccount",
        {
          data: { email, password }, // Use the 'data' property to send the data in the request body
        }
      );
      if (res.status === 200) {
        await axios.post(
          "https://wynbackend-production.up.railway.app/api/v1/deletionReasons/deletionReason",
          deletionReason
        );
        alert("Account deleted successfully");
      }
    } catch (error) {
      alert("Error deleting account. Please try again.");
      console.error("Error deleting account:", error.response.data);
    }
  };
  return (
    <div className="App">
      <div>
        <p style={{ fontSize: 35, fontWeight: "bold" }}>
          ⚠️ Warning: Closing an account cannot be undone. Once we have deleted
          your data and information, it cannot be retrieved in any way.
        </p>
      </div>
      <div>
        <form id="account-deletion-form" action="">
          <p>
            <label htmlFor="deletion-reason">
              Why do you want to delete your account?
            </label>
            <select
              id="deletion-reason"
              name="deletion-reason"
              onChange={(e) => setDeletionReason(e.target.value)}
            >
              <option value="other">---</option>
              <option value="Not usefull">Not usefull</option>
              <option value="Informations not accurate">
                Informations not accurate
              </option>
              <option value="hard-to-use">Informations not accurate</option>
              <option value="data">Concerned about my data</option>
              <option value="unwanted-content">Want to remove something</option>
              <option value="privacy-concerns">Privacy concerns</option>
              <option value="second-account">Created a second account</option>
              <option value="cant-find-friends">
                Can't find people to follow
              </option>

              <option value="ads">Too many ads</option>

              <option value="other">Something else</option>
            </select>
          </p>
        </form>
        <div style={{ flexDirection: "column" }}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value.trim().toLowerCase())}
          />
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {console.log({ email, password, deletionReason })}
          <button onClick={handleDeleteAccount}>Delete Account</button>
        </div>
      </div>
    </div>
  );
}

export default App;
