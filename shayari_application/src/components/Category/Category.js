import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import categorySevices from '../../services/category.sevices';
import { FiEdit, FiTrash } from "react-icons/fi";
import Loading from '../Loading/Loading';
import CategoryCard from '../CategoryEditor/CategoryCard';
import './Category.css'

function Category() {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = async () => {
    setLoading(true);
    const data = await categorySevices.getAllCategory(); 
    setCategory(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setLoading(false);
  }

  const deleteCategory = async (id) => {
    await categorySevices.deleteCategory(id);
    getCategory();
  }

  return (
   <>
      { !loading ?
        (
          category.length > 0 ? (
            <div>
              <ul className='d-flex flex-wrap category_cards_container'>
              {category.map((doc, index) => {
                return (
                  <li key={doc.id} className="mt-4 mb-4 p-2 pt-0 category_cards_wrapper">                    
                    <CategoryCard                     
                      category={doc.category}
                      fontColor={doc.font_color}
                      categoryFontSize={doc.font_size}
                      gradientSingleColor={doc.gradient_first_color}
                      gradientSecondColor={doc.gradient_second_color}
                      icon={doc.icon}
                    />
                    <button onClick={()=>{navigate('/category-editor',{state:doc});}}><FiEdit /></button>
                    <button onClick={() => deleteCategory(doc.id)}><FiTrash /></button>
                  </li>                  
                );
              })}
            </ul>
            </div>) : <div className='d-flex justify-content-center align-items-center'>No Data Found</div>) : <Loading />
        
      }
    </>
  )
}

export default Category