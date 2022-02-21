import React, { useEffect, useState } from 'react';

// Would come from process.env or somewhere configurable, most likely
const FUEL_URL = 'https://new.world.com/fleet/121';
const FUEL_LIMIT = 10000;

const FUEL_ERROR_STYLE = {
  color: 'red'
};

const App = () => {
  const [fuel, setFuel] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const response = await fetch(FUEL_URL);
      const { litres } = await response.json();
      setFuel(litres);
      setIsLoading(false);
    })();
  }, []);

  if (isLoading) {
    return (
      <div>
        <h1>Processing...</h1>;
      </div>
    )
  }

  return (
    <div>
      { fuel > FUEL_LIMIT ? (
        <h1 style={FUEL_ERROR_STYLE}>Need to buy more fuel</h1>
      ) : (
        <h1>All is fine</h1>
      )}
    </div>
  );

}

export default App;
