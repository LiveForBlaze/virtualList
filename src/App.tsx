import React, { useState, useEffect, useRef, useCallback } from 'react';
import './App.css';

const VISIBLE_ROWS = 12;
const BUFFER_ROWS = 3;
const ITEM_HEIGHT = 60;

interface IData {
  title: string;
  add?: string;
};


function App() {
  const [data, setData] = useState<IData[]>([]);
  const [start, setStart] = useState<number>(0);
  const rootRef = useRef<HTMLDivElement>(null);

  // Generate 1000 elements
  useEffect(() => {
    const newData = [];
    for(let i=0; i<1000; i++) {
      newData.push({title: `Some Title ${i}`, add: i%5 === 0 ? "Some additional text" : undefined})
    }
    setData(newData);
  }, []);

  const getTopHeight = () => {
    return (ITEM_HEIGHT * start) - (BUFFER_ROWS * ITEM_HEIGHT) > 0 ? (ITEM_HEIGHT * start) - (BUFFER_ROWS * ITEM_HEIGHT) : 0;
  };

  const getBottomHeight = () => {
    return ITEM_HEIGHT * (data.length - (start + VISIBLE_ROWS) > 0 ? data.length - (start + VISIBLE_ROWS) : 0);
  };

  const onScroll = useCallback((e: Event) => {
    const st = (e.target as HTMLElement).scrollTop;
    setStart(Math.ceil(st / ITEM_HEIGHT));
  }, []);

  useEffect(() => {
    rootRef?.current?.addEventListener('scroll', onScroll);
    return () => rootRef?.current?.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="App">
      <div className="header">React virtual list</div>
      <div className="container" ref={rootRef}>
        <div style={{ height: getTopHeight()}}></div>
        <div>
          {data.slice(start , start + VISIBLE_ROWS).map((item, rowIndex) => (
            <div key={start + rowIndex} className="item" data-testid="item">
              <div>{item.title}</div>
              {item.add && <div className="additional" data-testid="item-additional">{item.add}</div>}
            </div>
          ))}
        </div>
        <div style={{ height: getBottomHeight()}}></div>
      </div>
    </div>
  );
}

export default App;
