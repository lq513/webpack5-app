import React, {useState} from 'react';
import reactDom from 'react-dom';

// class A extends React.Component {
//   state = {
//     num: 1,
//   }
//   render() {
//     return (
//       <div>{this.state.num}</div>
//     )
//   }
// };

const A = () => {
  const [num, setNum] = useState(1);
  return (
    <div name='11111'>{num}</div>
  )
}
reactDom.render(<A />, document.getElementById('root'));

