import { Button } from "./components/ui/button";

import "./App.css";
import { useState } from "react";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";

function App() {
  const [isBox, setIsBox] = useState(false);
  const [isBox2, setIsBox2] = useState(false);
  const toggleBox = () => {
    setIsBox(!isBox);
  };

  const toggleBox2 = () => {
    setIsBox2(!isBox2);
  };
  return (
    <>
      {!isBox ? (
        <div className="flex items-center justify-center">
          <Button onClick={toggleBox}>SignUp</Button>
        </div>
      ) : (
        <div className="flex items-center justify-center blur">
          <Button onClick={toggleBox}>SignUp</Button>
        </div>
      )}

      {isBox && <SignUp />}

      {!isBox2 ? (
        <div className="flex items-center justify-center">
          <Button onClick={toggleBox2}>SignIn</Button>
        </div>
      ) : (
        <div className="flex items-center justify-center blur">
          <Button onClick={toggleBox2}>SignIn</Button>
        </div>
      )}

{isBox2 && <SignIn />}


    </>
  );
}

export default App;
