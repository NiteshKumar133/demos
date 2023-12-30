import React, { useEffect, useState, useRef } from 'react';
import './chat.css';
import Message from './message';
import EmojiPicker from "emoji-picker-react";
import socketIo from "socket.io-client";
import Chatuser from './chatuser';
let socket;
let user = 'Shivansh';
// while (user.length <= 3) {
//   user = prompt("enter your name");
// }

const getDate = (currentDate) => {
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12;
  return `${formattedHours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;;
}
let anotherid = '';
export default function Chat() {
  const [showPicker, setShowPicker] = useState(false);
  const URL = 'https://socket-api-mu.vercel.app/';
  const [data, setdata] = useState('');
  const [array, setarray] = useState([]);
  const [id, setid] = useState("");
  const [image, setImage] = useState(null);
  const chatContainerRef = useRef(null);
  const send_data = () => {
    if (data.trim() !== '') {
      setShowPicker(false);
      const currentDate = new Date();
      // console.log(getDate(currentDate));
      socket.emit('msg', { 
        data: data.trim(), 
        id, 
        time: getDate(currentDate),
        seen:false,
        image: image ? image : null,
       });
      setdata('');
      setImage(null);
    }
  }
  const onEmojiClick = (event, emojiObject) => {
    setdata((prevInput) => prevInput + event.emoji);
  };

  useEffect(() => {
    socket = socketIo(URL, { transports: ['websocket'] });
    socket.on('connect', () => {
      setid(socket.id);
    })

    socket.emit('joined', { user, id });
    socket.on('userJoined', (data) => {

      setarray([...array, data]);
      console.log(data)
    })
    return () => {
      //socket.emit('disconnect');
      socket.off();
    }
  }, []);


  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      send_data();
    }
  };
  useEffect(() => {
    scrollToBottom();
    socket.on('sendMessage', (data) => {
      // console.log(data);
      setarray([...array, data]);
    });
    return () => {
      socket.off();
    }
  }, [array])
  const anotheruserscroll = ()=>{
        if(id!==anotherid){
          console.log("pubg")
        }
  }
  const scrollToBottom = () => {
    if (id===anotherid&&chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
    
   
  };
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
    
      reader.onloadend = () => {
        const imageBase64 = reader.result;
        console.log(imageBase64);
        // setImage(imageBase64);
        const currentDate = new Date();
        socket.emit('msg', {id:id, image:imageBase64,time: getDate(currentDate),seen:false});

        
      };

      reader.readAsDataURL(file);
      
    }
  };
  return (
    <div className='box-container'>
      <Chatuser />
      <div className='top-bottom'>
        <div className='message-container' onScroll={anotheruserscroll}  ref={chatContainerRef}  >
          {array.map((item, i, array) => {
            const isLastMessage = item.id === id || item.id !== array[i + 1]?.id;
             if(anotherid !== item.id){
              anotherid = item.id;
              
            }
        return (<Message key={i} item={item} index={i} array={array} id={id} isLastMessage={isLastMessage} />)
          })}

          <div className='pickerStyle-container'> {showPicker && (
            <EmojiPicker onEmojiClick={onEmojiClick} />
          )}
          </div>
        </div>
        <div className='bottom-container'>
        <div class="image-upload">
    <label for="file-input">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Ic_attach_file_48px.svg/1200px-Ic_attach_file_48px.svg.png"/>
    </label>

    <input id="file-input" accept='image/*' type="file" onChange={handleImageUpload}/>
</div>
        {/* <div><input type='file' accept='image/*' onChange={handleImageUpload} /></div>  */}
          <div
            className="emoji-icon"
            src="https://icons.getbootstrap.com/assets/icons/emoji-smile.svg"
            onClick={() => setShowPicker((val) => !val)}>
            🙂
          </div>
          <input type='text' value={data} placeholder='Type message' className='input-box' onChange={e => { setdata(e.target.value) }} onKeyDown={handleKeyDown} />
          <div className='image-container' onClick={send_data}><img src='https://cdn-icons-png.flaticon.com/512/3682/3682321.png' alt='send-msg-icon' className='send-msg-icon' /></div>
        </div>
      </div>
    </div>
  )
}
