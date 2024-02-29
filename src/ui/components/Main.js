import SearchResult from './SearchResult';
import {useState} from 'react';

const Main = () => {
  const [addr, setAddr] = useState('');
  const [isClicked, setIsClicked] = useState(false);
  
  const onChange = e => {
    setAddr(e.target.value);
    setIsClicked(false);
  };

  const onKeyDown = e => {
    if(e.key === "Enter"){
      onClick();
    }
  };
  
  const onClick = () => {    
    console.log(addr);
    setIsClicked(true);
  };

  return (
    <>
      <h1>Main</h1>
      <br />
      <input
        placeholder="지역명/충전소명 입력"
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={addr}
        autoFocus
      />
      <button onClick={onClick}>검색</button>
      <SearchResult addr = {addr} isClicked = {isClicked}/>
    </>
  );
};

export default Main;