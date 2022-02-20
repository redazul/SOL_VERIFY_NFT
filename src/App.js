import './App.css';
import {useState,React} from "react"

import axios from "axios"



let imgSRC = "https://media3.giphy.com/media/l2JhOIYLqN7ngyHoQ/giphy.gif?cid=ecf05e47ppsuo2dyasu8q8v8jy9woqiu5msxgotx0akkz6gl&rid=giphy.gif&ct=g";

let imgStyle ={
  "borderRadius": "10%",
  marginTop:window.screen.availHeight/4,
  width:200
};

function App() {

  const [addy, setAddy] = useState("");
  let   [tokArr,setTokArr] = useState([]);

  function login()
  {
    console.log("wasup")
    const isPhantomInstalled = window.solana && window.solana.isPhantom


      if ("solana" in window) {
        const provider = window.solana;
        if (provider.isPhantom) {
          window.solana.connect().then(resp=>{
            resp.publicKey.toString()
            console.log(resp.publicKey.toString())
            setAddy(resp.publicKey.toString())


            //post request to RPC
            axios.post('https://explorer-api.devnet.solana.com', 
            //rpc object
            {
              "method": "getTokenAccountsByOwner",
              "jsonrpc": "2.0",
              "params": [
                  "3NiBZPrinCbqXyy96weWNfnz86kVEToRFcbAG4m7QkvV",
                  {
                      "programId": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
                  },
                  {
                      "encoding": "jsonParsed",
                      "commitment": "processed"
                  }
              ],
              "id": "7f46328a-eb19-4947-a932-6450c8a8eb9f"
          }
            
            )
            .then(function (response) {
              console.log(response.data.result.value);
              setTokArr(response.data.result.value);
            })
            .catch(function (error) {
              console.log(error);
            });


          });

        }
      }else{
        window.open("https://phantom.app/", "_blank");
      }

 
  }

  function NumberList(props) {
    const numbers = props.numbers;
    const listItems = numbers.map((number) =>
      <li >{number.pubkey}</li>
    );
    return (
      <ul style={{color:"white"}}>{listItems}</ul>
    );
  }


  return (
    <div className="App">
      <div >
      <div>
            <img onClick={login} className="zoom" style={imgStyle} src={imgSRC} alt="Italian Trulli"></img>
            <div style={{color:"white"}}>Click to Login with Phantom Wallet</div>
            <div style={{color:"white",marginTop:20}}>{addy}</div>
            {tokArr.map((numbers,key)=>{
              return <div key={key} style={{color:"white",marginTop:20}}>You own Token: {numbers.pubkey}</div>
            })}
          </div>

      </div>

    </div>
  );
}

export default App;
