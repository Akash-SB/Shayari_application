import React, { useEffect, useState } from 'react'
import { FiTrash } from "react-icons/fi";
import Loading from '../Loading/Loading';
import statusServices from '../../services/status.services';
import StatusCard from '../ImageStatusEditor/StatusCard';
import './Status.css'

function Status() {
  const [status, setStatus] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getStatus();
  }, []);

  const getStatus = async() => {
    setLoading(true);
    const data = await statusServices.getAllStatus(); 
    setStatus(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setLoading(false);
  }

  const deleteStatus = async (id) => {
    await statusServices.deleteStatus(id);
    getStatus();
  }

  return (
   <>
      { !loading ?
        (
          status.length > 0 ? (
            <div>
              <ul className='d-flex flex-wrap status_cards_container'>
              {status.map((doc, index) => {
                return (
                  <li key={doc.id} className="mt-4 mb-4 p-2 pt-0 status_cards_wrapper">                    
                    <StatusCard                     
                      category={doc.category}
                      statusimage={doc.image}
                    />                   
                    <button onClick={() => deleteStatus(doc.id)}><FiTrash /></button>
                  </li>                  
                );
              })}
            </ul>
            </div>) : <div className='d-flex justify-content-center align-items-center'>No Data Found</div>) : <Loading />       
      }
    </>
  )
}

export default Status