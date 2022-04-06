import React, { useState, useEffect } from 'react';


function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api')
    .then((res) => res.json())
    .then((data) => setData(data));
  }, [])


  return (
    <>
    <p>Node xml parser Frontend</p>
    <div>{!data ? "loading..." : data }</div>
    </>
  );
}

export default App;
