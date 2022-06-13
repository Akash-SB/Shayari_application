import React, {useState, useEffect} from 'react'
import { Form, InputGroup, Button, Card, Row, Col, ProgressBar } from 'react-bootstrap'
import CardHeader from 'react-bootstrap/esm/CardHeader'
import { useLocation } from 'react-router-dom'
import './CategoryEditor.css'
import CategoryCard from './CategoryCard'
import categorySevices from '../../services/category.sevices'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { storage } from '../../firebase-config'
import Notification from '../Notification/Notification'

const CategoryEditor = () => { 
  const [category, setCategory] = useState("Love");
  const [fontColor, setFontColor] = useState('#ffffff');
  const [gradientSingleColor, setGradientSingleColor] = useState("#ce4668");
  const [gradientSecondColor, setGradientSecondColor] = useState("#563d7c");
  const [categoryFontSize, setcategoryFontSize] = useState(16);
  const [notification, setNotification] = useState({ type: '', msg: '' });
  const [file, setFile] = useState(null);
  const [updateId, setUpdateId] = useState("");
  const [categoryIcon, setCategoryIcon] = useState("");
  const location = useLocation();
  const [progress, setProgress] = useState();

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

  useEffect(() => {
    const uploadFile = () => { 
      const storageRef = ref(storage, 'category_images/' + file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);
      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on('state_changed',
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(prog);
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
              default :
                break;
            }
          }, 
          (error) => {
            switch (error.code) {
              case 'storage/unauthorized':
                setNotification({ type: "info", msg: "User doesn't have permission to access the object" });
                break;
              case 'storage/canceled':
                setNotification({ type: "info", msg: "User canceled the upload" });                
                break;
              case 'storage/unknown':
                setNotification({ type: "info", msg: " Unknown error occurred" });
                break;
              default:
                break
            }
          }, 
          () => {
            // Upload completed successfully, now we can get the download URL
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setCategoryIcon(downloadURL);
              setProgress(0);
            });
          }
        );
    };
    
    file && uploadFile();
  }, [file]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setNotification({});
    if (category === "") {
      setNotification({ type: 'info', msg: "Please fill all the fields" });
    } else {
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
          categorySevices.updateCategory(updateId,newCategory);
          setNotification({ type: 'info', msg: "Category updated successfully" });
        } else {          
          categorySevices.addCategory(newCategory);
          setNotification({ type: 'dark', msg: "New Category added successfully" });                    
        }
        setCategory("");
        setFile(null);            
        setCategoryIcon("");  
      } catch (error) {
        setNotification({ type: 'info', msg: error.message });
      } 
    }
  };

  return <>
    <div className='row category-editor'>     
      <div className='col-10 col-md-3 mt-4 mb-4 category_card_container p-4 pt-0'>        
        <CategoryCard icon={ file ? file : categoryIcon } fontColor={fontColor} categoryFontSize={categoryFontSize} category={category} gradientSingleColor={gradientSingleColor} gradientSecondColor={gradientSecondColor}/>
      </div>
      <Card className='col-10 col-md-8 form-card mt-4 mb-4' border="primary">
        <CardHeader>Category Editor</CardHeader>        
      <Form onSubmit={handleSubmit}>
        <Card.Body>
        <Form.Group  controlId="validationCategoryText" className='mb-3'>
          <InputGroup >
            <InputGroup.Text id="validationCategoryText">Category</InputGroup.Text>
            <Form.Control type="text" value={category} placeholder="Love" required onChange={e => setCategory(e.target.value)}/>         
          </InputGroup>
        </Form.Group>   
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Control type="file" onChange={fileHandler}/>
        </Form.Group>
        {(progress > 0) ? <ProgressBar animated striped now={progress} label={`${progress}%`} /> : null}            
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
    {(notification.msg) && <Notification variant={notification.type} message={notification.msg} onCloseHandler={() => setNotification({})}></Notification>}
    </>
};

export default CategoryEditor