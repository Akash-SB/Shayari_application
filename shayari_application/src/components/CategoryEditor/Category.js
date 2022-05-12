import React, {useState, useEffect} from 'react'
import { Form, InputGroup, Button, Card, Row, Col, Alert } from 'react-bootstrap'
import CardHeader from 'react-bootstrap/esm/CardHeader'
import { useLocation } from 'react-router-dom'
import './Category.css'
import CategoryCard from './CategoryCard'
import { storage } from '../../firebase-config'

const CategoryEditor = () => { 
  const [category, setCategory] = useState("Love");
  const [fontColor, setFontColor] = useState('#ffffff');
  const [gradientSingleColor, setGradientSingleColor] = useState("#ce4668");
  const [gradientSecondColor, setGradientSecondColor] = useState("#563d7c");
  const [categoryFontSize, setcategoryFontSize] = useState(16);
  const [categoryIcon, setCategoryIcon] = useState("");
  const [notification, setNotification] = useState({ type: '', msg: '' });
  const [file, setFile] = useState(null);
  const [updateId, setUpdateId] = useState("");
  const location = useLocation();

  useEffect(() => {
    if (location.state != null) {
      setCategory(location.state.category);
      setFontColor(location.state.font_color);
      setcategoryFontSize(location.state.font_size);
      setGradientSingleColor(location.state.gradient_first_color);
      setGradientSecondColor(location.state.gradient_second_color);
      setCategoryIcon(location.state.icon);
      setUpdateId(location.state.id);
    }
  }, [location.state]);

  const fileHandler = (e) => {
    setFile(e.target.files[0])
  }

  const handleUpload = async(e) => {
    e.preventDefault();
    const path = `/category_images/${file.name}`;
    const ref = storage.ref(path);
    await ref.put(file);
    const url = await ref.getDownloadURL();
    setCategoryIcon(url);
    setFile(null);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setNotification({});
    if (category === "" || categoryIcon === "") {
      setNotification({ status: 'danger', msg: "Please fill all the fields" });
    } else {
      handleUpload();
      const newCategory = {
        'category': category,
        'gradient_first_color': gradientSingleColor,
        'gradient_second_color': gradientSecondColor,
        'font_color': fontColor,
        'font_size': categoryFontSize,
        'icon': categoryIcon
      };    
      try {
        if (updateId !== undefined && updateId !== "") { 
          
          setNotification({ type: 'success', msg: "Category updated successfully" });
        } else {
         
          setNotification({ type: 'success', msg: "New Category added successfully" });
        }        
        setCategory("");
        setCategoryIcon("");
      } catch (error) {
        setNotification({ type: 'danger', msg: error.message });
      } 
    }
  };

  return <>
    {(notification.msg) && <Alert variant={notification.type} dismissible onClose={(e) => setNotification({})}>
      {notification.msg}
    </Alert>}
    <div className='row category-editor'>     
      <div className='col-3 mt-4 mb-4 category_card_container p-4 pt-0'>
        <CategoryCard icon={file} fontColor={fontColor} categoryFontSize={categoryFontSize} category={category} gradientSingleColor={gradientSingleColor} gradientSecondColor={gradientSecondColor}/>
      </div>
      <Card className='col-9 form-card mt-4 mb-4' border="primary">
        <CardHeader >Category Editor</CardHeader>        
      <Form onSubmit={handleSubmit}>
         <Card.Body >
        <Form.Group  controlId="validationCategoryText" className='mb-3'>
          <InputGroup >
            <InputGroup.Text id="validationCategoryText">Category</InputGroup.Text>
            <Form.Control type="text" value={category} placeholder="Love" required onChange={e => setCategory(e.target.value)}/>         
          </InputGroup>
        </Form.Group>   
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Control type="file" onChange={fileHandler}/>
        </Form.Group>    
        <Form.Group  controlId="validationShayariText" className='mb-3'>
          <Row><Col><InputGroup >
            <InputGroup.Text id="shayariText">First Color</InputGroup.Text>
             <Form.Control
              type="color"
                id="exampleColorInput"
                value={gradientSingleColor}
                onChange={e => setGradientSingleColor(e.target.value)}
            />
            </InputGroup>
              </Col><Col>
            <InputGroup >
            <InputGroup.Text id="shayariText">Second Color</InputGroup.Text>
             <Form.Control
              type="color"
              id="exampleColorInput1"
              value={gradientSecondColor}
                onChange={e => setGradientSecondColor(e.target.value)}              
            />
          </InputGroup></Col>
            </Row>
          </Form.Group>    
          <Row>
            <Col>
              <Form.Group  controlId="validationShayariText">
                <InputGroup  >
                  <InputGroup.Text id="shayariText">Font Color</InputGroup.Text>
                  <Form.Control
                    type="color"
                      id="textColorInput"
                      value={fontColor}
                      onChange={e => setFontColor(e.target.value)}
                  />
                </InputGroup>          
              </Form.Group>
            </Col>
            <Col>
              <Form.Group  controlId="fontSize">
                <InputGroup>
                  <InputGroup.Text id="fontSize">Font Size</InputGroup.Text>
                    <Form.Select value={categoryFontSize} onChange={e => setcategoryFontSize(parseInt(e.target.value))}>
                      <option>14</option>
                      <option>16</option>
                      <option>18</option>
                      <option>20</option>
                      <option>22</option>
                      <option>24</option>
                    </Form.Select>            
                </InputGroup>
              </Form.Group>
            </Col>            
          </Row>   
      </Card.Body>    
      <Card.Footer>
        {updateId ? <Button type="submit">Update Data</Button> : <Button type="submit">Add Data</Button>}
      </Card.Footer>
    </Form>
    </Card>
    </div>
    </>
};

export default CategoryEditor