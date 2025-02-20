Atlas : For store data on Cloud 
cloudinary :  For store images in a bucket (like->your own library/collections) : ,It converts Jpeg into Avif. or any large media file into small file
                In simply we can use as db for media but it more on work for file compression
act as middleware between JS File and actual Application 
mongoose: For communicate between JS File and Atlas 
V2 of cloudinary : For communicate between JS File and cloudinary 

cors : to allow cross-origin 

Note :
    without socket.io, we can send the message , store into db  and also fetch the message from db as per change from frontend , Using express (app instance of express()) Only.
            Drawback without using socket.io in chatting app: 
                1. As express is not especially for chat app , It is for web services (like e-comm)
                2. problem: as a user send message --> it go to server and store into db. But  the reciever user did not aware of it that db updated until refreshing (again send req, to server for messages)
                3. Thus It does not show the real time changing feeling.
    But we use Socket.io because , 
        1. It act as Interface between frontend and backend . 
        2. It accepts the message from client and (send message to the client & store into db) Simultaneously.
        3. Result of it, as a user send message (server go to store message in db and , it directly send to the reciever side where reciever directly has listening route to get the message and show on UI. Simultaneously )
        4. Here the reciever has no need to refresh the UI and again send the get req for the messages to the server.

    For :with socket io we have to use two server ,because both need to listen/catch the request and throw/send the response
        1. for backend : socket.io 
        2. for frontend : socket-io-client



