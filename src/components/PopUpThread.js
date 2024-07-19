const PopUpThread = ({user, popUpFeedThread}) => {
    return (
        <article className="feed-card">
            <div className="text-container">
                <div>
                    <div className="img-container">
                        <img src={user.img} alt="profile-avatar"/>
                    </div>
                </div>
                <div>
                    <p><strong>{user.handle}</strong></p>
                    <p>{popUpFeedThread.text}</p>
                </div>

            </div>
        </article>
    )
}

export default PopUpThread;
