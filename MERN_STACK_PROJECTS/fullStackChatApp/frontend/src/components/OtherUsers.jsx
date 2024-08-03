import React from 'react'
import OtherUser from './OtherUser'

export default function OtherUsers({ otherUsers }) {
  return (
    <div className='overflow-auto flex-1'>
      {
        otherUsers?.map((user, index) => {
          return (
            <OtherUser key={user._id} user={user} lastIndex={index === user.length - 1} />
          )
        })
      }
    </div>
  )
}
