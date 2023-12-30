import React from 'react';
import './chat.css';
export default function Message({ item, i,id,isLastMessage }) {
    return (
        <div>
        <div className={`icon-last-msg ${item.id === id ? 'right' : 'left'}`} style={{ flexDirection: item.id === id && isLastMessage ? 'row-reverse' : 'row' }}>
            <div className={`message ${item.id === id ? 'rights' : 'lefts'}`} key={i}>
                {item.image ? <img src={item.image} alt='user-uploaded' className='uploaded-image' /> : item.data}
                {item.id === id && <span className='double-tick' style={{ color: item.seen ? 'red' : 'black' }}> &#x1F5F8;</span>}
                <span className='date-time'>{item.time}</span>
            </div>
            {item.id !== id && isLastMessage && <img src='https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg' className='emoji-last-msg' alt='demo' />}
        </div>
    </div>
    )
}
