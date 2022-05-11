import React, { useEffect, useState } from 'react'
import shayariServices from '../../services/shayari.services';
import ShayariCard from '../Editor/ShayariCard';
import Loading from '../Loading/Loading';
import { FiEdit, FiTrash } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import shayariDataService from '../../services/shayari.services'
import './Shayari.css'

function Shayari() {
  const [shayari, setShayari] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    getShayaries();
  }, []);

  const getShayaries = async () => {
    setLoading(true);
    const data = await shayariServices.getAllShayri(); 
    setShayari(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setLoading(false);
  }

  const deleteShayri = async (id) => {
    await shayariDataService.deleteShayri(id);
    getShayaries();
  }

  return (
    <>
      { !loading ?
        (
          shayari.length > 0 ? (
            <div>
              <ul className='shayri_card_container d-flex flex-wrap'>
              {shayari.map((doc, index) => {
                return (
                  <li key={doc.id} className="mt-4 mb-4 shayari_card_item p-2 pt-0">
                    <button onClick={()=>{navigate('/editor',{state:doc});}}><FiEdit /></button>
                    <ShayariCard                     
                      isSwitchOn={doc.gradient_background}
                      fontColor={doc.font_color}
                      fontSizeShayari={doc.font_size}
                      shayriFontFamily={doc.font_family}
                      shayri={doc.shayari_text}
                      authorName={doc.writer_name}
                      category={doc.category}
                      gradientSecondColor={doc.gradient_second_color}
                      gradientSingleColor={doc.gradient_first_color}
                      color={doc.background_color}
                    />
                    <button onClick={() => deleteShayri(doc.id)}><FiTrash /></button>
                  </li>                  
                );
              })}
            </ul>
            </div>) : <div className='d-flex justify-content-center align-items-center'>No Data Found</div>) : <Loading />
        
      }
    </>
  )
}

export default Shayari