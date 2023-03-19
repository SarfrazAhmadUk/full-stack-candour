import React from 'react'

interface IStatusProps {
  approved: boolean;
  handleClick: () => void;
};

function Status({ approved, handleClick }: IStatusProps) {
  return (
    <div onClick={handleClick} className={`badge ${approved ? 'badge-approved' : 'badge-pending'}`}>{approved ? 'Approved' : 'Pending'}</div>
  )
}

export default Status;
