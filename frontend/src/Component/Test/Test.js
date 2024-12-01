import React, { useState, useEffect } from 'react';
import './test.css'

const InfiniteSquares = () => {
  const [dimensions, setDimensions] = useState({
    rows: 0,
    cols: 0,
  });

  // Calculate the number of rows and columns based on window size
  useEffect(() => {
    const calculateDimensions = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const cols = Math.ceil(width / 100);
      const rows = Math.ceil(height / 100);
      setDimensions({ rows, cols });
    };

    calculateDimensions();
    window.addEventListener('resize', calculateDimensions);

    return () => {
      window.removeEventListener('resize', calculateDimensions);
    };
  }, []);

  const squares = Array.from(
    { length: dimensions.rows * dimensions.cols },
    (_, i) => <div key={i} className="square"></div>
  );

  return <div className="grid">{squares}</div>;
};

export default InfiniteSquares;
