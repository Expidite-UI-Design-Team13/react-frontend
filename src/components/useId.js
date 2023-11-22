import { useState } from 'react';

function useId() {

  function getId() {
    const userId = localStorage.getItem('id');
    return userId && userId
  }

  const [id, setId] = useState(getId());

  function saveId(userId) {
    localStorage.setItem('id', userId);
    setId(userId);
  };

  function removeId() {
    localStorage.removeItem("id");
    setId(null);
  }

  return {
    setId: saveId,
    id,
    removeId
  }

}

export default useId;