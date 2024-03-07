import { useState } from "react";

export const Demo = () => {
  const [counter, setCounter] = useState(42);

  return (
    <div>
      <button onClick={() => setCounter(counter + 1)}>
        Increase
      </button>
      <button onClick={() => setCounter(counter - 1)}>
        Decrease
      </button>

      {counter}
    </div>
  );
};
