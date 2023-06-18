import {useState,useEffect} from 'react' //save response from react
const App = () => {
    const [value,setValue] = useState(null)
    const[message,setMessage] = useState(null)
    const [previousChats,setPreviousChats]=useState([])
    const[currentTitle,setCurrentTitle]=useState(null)
    const createNewChat = () =>{
        setMessage(null)
        setValue("")
        setCurrentTitle(null)
    }
    const handleClick = (uniqueTitles) =>{
        setCurrentTitle(uniqueTitles)
        setMessage(null)
        setValue("")
    }
    const getMessage = async () => {
        const options= {
            method:"POST",
            body:JSON.stringify({
                message:value
                //message:"how are you"
            }),
            headers:{
                "Content-Type":"application/json"
            }

        }
        try{
            const response = await fetch('http://localhost:8000/completions',options)
            const data = await response.json()
            console.log(data)
            setMessage(data.choices[0].message) // Reference 'content' property

            //setMessage(data['choices'][0]['message']['content'])
        }catch(error){
            console.log(error)
        }
    }
    useEffect(()=>{
        console.log(currentTitle,value,message)
        if(!currentTitle && value && message){
            setCurrentTitle(value)
        }
        if(currentTitle && value && message){
            setPreviousChats(prevChats => (
                [...prevChats,
                    {
                        title:currentTitle,
                        role:"user",
                        content:value

                    },
                    {
                        title:currentTitle,
                        role:"AI assistant",
                        content: message.content

                    }
                    ]
            ))
        }
    },[message,currentTitle])

    console.log(previousChats)
    const currentChat= previousChats.filter(previousChats => previousChats.title === currentTitle)
    const uniqueTitles = Array.from(new Set(previousChats.map(previousChats=>previousChats.title)))
        console.log(uniqueTitles)
  return (
    <div className="app">
      <section className = "side-bar">
        <button onClick={createNewChat}>+ New chat</button>
        <ul className="history">
            {uniqueTitles?.map((uniqueTitles,index)=><li key={index} onClick ={()=>handleClick(uniqueTitles)}> {uniqueTitles}</li>)}
        </ul>
        <nav>
          <p>Made by Tao
          </p>
        </nav>
      </section>
      <section className="main">
          {!currentTitle && <h1>TaoGPT</h1>}
          <ul className="feed">
              {currentChat?.map((chatMessage,index)=><li key = {index}>
                  <p className="role">{chatMessage.role}</p>
                  <p>{chatMessage.content}</p>
              </li>)}
          </ul>
          <div className="bottom-section">
              <div className="input-container">
                  <input value ={value} onChange={(e) =>setValue(e.target.value)}/>
                  <div id = "submit" onClick={getMessage}>➢
                  </div>
              </div>
              <p className="info">
                  ChatGPT may produce inaccurate information about people, places, or facts. ChatGPT May 24 Version
              </p>
          </div>

      </section>
    </div>
  )
}

export default App
