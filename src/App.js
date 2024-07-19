import {useState, useEffect, useLayoutEffect} from "react"
import Nav from "./components/Nav"
import Header from "./components/Header"
import Feed from "./components/Feed"
import PopUp from "./components/PopUp"
import WriteIcon from "./components/WriteIcon"

const App = () => {
    const [ user, setUser] = useState(null) //the default state of user is null. To change it we use "setUser" later in the code
    const [threads, setThreads] = useState([])
    const [viewThreadsFeed, setViewThreadsFeed] = useState(true)
    const [filteredThreads, setFilteredThreads] = useState([])
    const [openPopUp, setOpenPopUp] = useState(false)
    const [interactingThread, setInteractingThread] = useState(null)
    const [popUpFeedThreads, setPopUpFeedThreads] = useState(null)

    const userId = "440db04c-3684-46ab-99b4-5e42ac0e403a"

    const getUser = async () => {
        try {
            const response = await fetch(`http://localhost:3000/users?user_uuid=${userId}`)
            const data = await response.json()
            setUser(data[0])
        } catch(error) {
            console.error(error)
        }
    }

    const getThreads = async () => {
        try {
            const response = await fetch(`http://localhost:3000/threads?thread_from=${userId}`)
            const data = await response.json()
            setThreads(data)
        }
        catch(error) {
            console.error(error)
        }
    }

    const getThreadsFeed = () => {
        if(viewThreadsFeed) {
           const standAloneThreads = threads?.filter(thread => thread.reply_to === null)
            setFilteredThreads(standAloneThreads)
        }
        if(!viewThreadsFeed) {
            const replyThreads = threads?.filter(thread => thread.reply_to !== null)
            setFilteredThreads(replyThreads)
        }
    }

    const getReplies = async () => {
        try{
            const response = await fetch(`localhost:3000/threads?reply_to=${interactingThread?.id}`) //get request
            const data = await response.json()
            setPopUpFeedThreads(data)
        } catch (error) {
           console.error(error)
        }
    }

    useEffect(() => {
        getUser()
        getThreads()
    }, [])

    useEffect(() => {
        getThreadsFeed()
    }, [user, threads, viewThreadsFeed])

    useEffect(() => {
        getReplies()
    },[interactingThread])

    console.log('popUpThreads:', popUpFeedThreads)

  return (
      <>
          {
              user && <div className="app">
                  <Nav url={user.instagram_url}/>
                  <Header
                      user={user}
                      viewThreadsFeed={viewThreadsFeed}
                      setViewThreadsFeed={setViewThreadsFeed}
                  />
                  <Feed
                      user={user}
                      filteredThreads={filteredThreads}
                      setOpenPopUp={setOpenPopUp}
                      getThreads={getThreads}
                      setinteractingThread={setInteractingThread}
                  />
                  {openPopUp &&
                      <PopUp
                          user={user}
                          setOpenPopUp={setOpenPopUp}
                          popUpFeedThreads={popUpFeedThreads}
                      />}
                  <div onClick={() => setOpenPopUp(true)}>
                      <WriteIcon/>
                  </div>
              </div>
          }

      </>
  )
}

export default App;
