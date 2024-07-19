import PopUpThread from "./PopUpThread"
import ThreadInput from "./ThreadInput";


const PopUp = ({user,setOpenPopUp, popUpFeedThreads}) => {
    return (
        <div className="popup">
            <p onClick={() => setOpenPopUp(false)}>X</p>
            {popUpFeedThreads?.map( popUpFeedThread =>
                <PopUpThread
                    user={user}
                    key={popUpFeedThread.id}
                    popUpFeedThread={popUpFeedThread}
                />)}
            <ThreadInput/>
        </div>
    )
}

export default PopUp;
