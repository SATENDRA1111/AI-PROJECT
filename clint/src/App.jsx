import { useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import axios from "axios";
import Reactscrollable from "react-scrollable-feed";

const YOU = "you";
const AI = "ai";
function App() {
  const inputRef = useRef();
  const [qna, setQna] = useState([]);
  const [loading, setLoading] = useState(false);
  

  const updateQNA = (from, value) => {
    setQna((qna) => [...qna, { from, value }]);
  };

  const handleSend = () => {
    const question = inputRef.current.value;
    updateQNA(YOU, question);

    setLoading(true);
    axios
      .post("http://localhost:3000/chat", {
        question,
      })
      .then((response) => {
        updateQNA(AI, response.data.answer);
      })
      .finally(() => {
        setLoading(false);
      });
  };

 
  const renderContent = (qna) => {
    const value = qna.value;

    if (Array.isArray(value)) {
      return value.map((v) => <p className="message-text">{v}</p>);
    }

    return <p className="message-text">{value}</p>;
  };


  const el = document.getElementById('chats');
  // id of the chat container ---------- ^^^
  if (el) {
    el.scrollTop = el.scrollHeight;
  }

  return (
    <main class="container">
     
 <div class="chats">
 
        {qna.map((qna) => {
          if (qna.from === YOU) {
            return (
              <div class="send chat">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2202/2202112.png"
                  alt=""
                  class="avtar"
                />
                <p>{renderContent(qna)}</p>
         </div>
            );
          }
          return (
            <div class="recieve chat">
              <img
                src="https://cdn-icons-png.flaticon.com/512/4712/4712027.png"
                alt=""
                class="avtar"
              />
              <p>{renderContent(qna)}</p>
            </div>
          );
        })}

        {loading && (
          <div class="recieve chat">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4712/4712027.png"
              alt=""
              class="avtar"
            />
            <p>Typing...</p>
          </div>
        )}
        
      </div>
      
      


     <div class="chat-input">
        <input
          type="text"
          ref={inputRef}
          class="form-control col"
          placeholder="Type Something"
        />
      <button disabled={loading} class="btn btn-success" onClick={handleSend}>
          Send
        </button>
       </div></main>
  );
}

export default App;



// import { useRef, useState } from 'react'

// import './App.css'
// import axios from "axios"

// const YOU="you";
// const AI ="ai";
// function App() {
// const inputRef= useRef();
// const [qna,setQna]= useState([]);
// const [loading,setLoading]= useState(false);

// const updateQNA=(from, value)=>{
//   setQna([...qna, {from,value}]);
// }


// const sendqustion= ()=>{
//   const question= inputRef.current.value;
//   updateQNA(YOU,question);  console.log(question);
  
//   setLoading(true);
//   axios.post('http://localhost:3000/chat',{
//     question,
//   })
//   .then((response)=>{
//    updateQNA(AI,response.data.answer);
// console.log(response.data.answer);
//   }).finally(()=>{
//     setLoading(false)
//   })
// };



// const renderContent=(qna)=>{
//   const value=qna.value;

//   if(Array.isArray(value)){
//     return value.map((v) => <p className="message-text">{v}</p>);
//   }

//   return <p className="message-text">{value}</p>;
// };
//   return (
//     <main class="container">
//     <div class="chats">

// {
//   qna.map(qna=>{
//     if(qna.from === YOU){
//   return(
//     <div class="send chat">
//     <img
//       src="https://cdn-icons-png.flaticon.com/512/2202/2202112.png"
//       alt=""
//       class="avtar"
//     />
//     <p>{renderContent(qna)}</p>
//   </div>
//   );
// }
// {
//   loading &&
//   (
//     <div class="recieve chat">
//                 <img
//                   src="https://cdn-icons-png.flaticon.com/512/4712/4712027.png"
//                   alt=""
//                   class="avtar"
//                 />
//                 <p>{renderContent(qna)}</p>
//               </div>
//   );
// }
//  })
// }      

// </div>
//     <div class="chat-input">
//       <input
//         type="text"
//         ref={inputRef}
//         class="form-control col"
//         placeholder="Type Something"
//       />
//       <button  class="btn btn-success" onClick={sendqustion}>Send</button>
//     </div>

//   </main>
     
//   );
// }

// export default App
