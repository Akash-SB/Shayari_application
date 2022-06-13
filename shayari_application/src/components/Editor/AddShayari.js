import React, {useState, useEffect} from 'react'
import { Form, InputGroup, Button, Card, Row, Col, Alert } from 'react-bootstrap'
import CardHeader from 'react-bootstrap/esm/CardHeader'
import ShayariCard from './ShayariCard'
import shayariDataService from '../../services/shayari.services'
import { useLocation } from 'react-router-dom'
import './Editor.css'
import categorySevices from '../../services/category.sevices'

const AddShayari = () => { 
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [shayri, setShayri] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [category, setCategory] = useState("Love");
  const [color, setColor] = useState('#cccccc');
  const [fontColor, setFontColor] = useState('#ffffff');
  const [gradientSingleColor, setGradientSingleColor] = useState("#ce4668");
  const [gradientSecondColor, setGradientSecondColor] = useState("#563d7c");
  const [fontSizeShayari, setFontSize] = useState(16);
  const [shayriFontFamily, setshayriFontFamily] = useState("BakbakOne-Regular");  
  const [notification, setNotification] = useState({ type: '', msg: '' });
  const [updateId, setUpdateId] = useState("");
  const location = useLocation();
  const [categoryList, setCategoryList] = useState([]);

  const onSwitchAction = () => {
    setIsSwitchOn(!isSwitchOn);
  };

  useEffect(() => {
    if (location.state != null) {
      setAuthorName(location.state.writer_name);
      setCategory(location.state.category);
      setShayri(location.state.shayari_text);
      setColor(location.state.background_color);
      setFontColor(location.state.font_color);
      setFontSize(location.state.font_size);
      setshayriFontFamily(location.state.font_family);
      setIsSwitchOn(location.state.gradient_background);
      setGradientSingleColor(location.state.gradient_first_color);
      setGradientSecondColor(location.state.gradient_second_color);
      setUpdateId(location.state.id);
    }
  }, [location.state]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setNotification({});
    if (shayri === "" || authorName === "") {
      setNotification({ status: 'danger', msg: "Please fill all the fields" });
    } else {
      const newShayari = {
        'shayari_text': shayri,
        'writer_name': authorName,
        'category': category,
        'background_color': color,
        'gradient_background': isSwitchOn,
        'gradient_first_color': gradientSingleColor,
        'gradient_second_color': gradientSecondColor,
        'font_color': fontColor,
        'font_family': shayriFontFamily,
        'font_size': fontSizeShayari
      };    
      try {
        if (updateId !== undefined && updateId !== "") { 
          await shayariDataService.updateShayari(updateId, newShayari);
          setNotification({ type: 'success', msg: "Shayri updated successfully" });
        } else {
          await shayariDataService.addShayari(newShayari);
          setNotification({ type: 'success', msg: "New Shayri added successfully" });
        }        
        setShayri("");
        setAuthorName("");
      } catch (error) {
        setNotification({ type: 'danger', msg: error.message });
      } 
    }
  };

  useEffect(() => { 
    getCategories();
  }, []);

  const getCategories = async () => {
    const data = await categorySevices.getAllCategory();
    setCategoryList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  }

  return <>
    {(notification.msg) && <Alert variant={notification.type} dismissible onClose={(e) => setNotification({})}>
      {notification.msg}
    </Alert>}
    <div className='row shayari-editor'>     
      <div className='col-3 mt-4 mb-4 shayari_card_container'>
        <ShayariCard isSwitchOn={isSwitchOn} shayri={shayri} fontColor={fontColor} fontSizeShayari={fontSizeShayari} gradientSecondColor={gradientSecondColor} gradientSingleColor={gradientSingleColor} color={color} category={category} authorName={authorName} shayriFontFamily={shayriFontFamily}></ShayariCard>
      </div>
      <div className='col-1'></div>
      <Card className='col-8 form-card mt-4 mb-4' border="primary">
        <CardHeader >Shayari Editor</CardHeader>        
      <Form onSubmit={handleSubmit}>
         <Card.Body >
        <Form.Group  controlId="validationShayariText" className='mb-3'>
              <InputGroup >
                <InputGroup.Text id="validationShayariText">Shayari Text</InputGroup.Text>
              <Form.Control as="textarea" rows={3} value={shayri} placeholder="Dil Ki Bate" required onChange={e => setShayri(e.target.value)}/>         
          </InputGroup>
        </Form.Group>
       <Form.Group  controlId="validationWriterName" className='mb-3'>
          <InputGroup>
            <InputGroup.Text id="validationWriterName">Writer Name</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Shayari Writer"                   
                value={authorName}
                required
                onChange = {(e) => setAuthorName(e.target.value)}
            />
            
          </InputGroup>
        </Form.Group>
        <Row>
          <Col>
             <Form.Group  controlId="category" className='mb-4 mt-2'>
              <InputGroup>
                <InputGroup.Text id="category">Font Size</InputGroup.Text>
                  <Form.Select value={category} onChange={e => setCategory(e.target.value)}>
                    {categoryList.map((doc) => { return <option key={doc.id}>{doc.category}</option>; })}           
                  </Form.Select>            
              </InputGroup>
            </Form.Group> 
          </Col>
          <Col>
          <Form.Group  controlId="backgroundColor" className='mb-3'>
            <InputGroup className='align-items-center border rounded'>  
              <InputGroup.Text id="backgroundColor" className='align-item: center'>Background</InputGroup.Text>
              <span style={{padding: "0px 8px"}}>Single Color</span>
              <Form>
                <Form.Switch
                  onChange={onSwitchAction}
                  id="custom-switch"
                  label="Gradient Color"
                  checked={isSwitchOn}
                />
              </Form>
              <Form.Control.Feedback type="invalid">
                Please Select One Field.
              </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
          </Col>
        </Row>
        <Form.Group  controlId="validationShayariText" className='mb-3'>
          {isSwitchOn ? <Row><Col><InputGroup >
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
            </Row> : <InputGroup >
            <InputGroup.Text id="shayariText">Select Color</InputGroup.Text>
             <Form.Control
              type="color"
              id="exampleColorInput"                
              value={color}
              onChange={e => setColor(e.target.value)} 
              />                
          </InputGroup>}
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
                    <Form.Select value={fontSizeShayari} onChange={e => setFontSize(parseInt(e.target.value))}>
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
            <Col>
            <Form.Group  controlId="fontfamily">
                <InputGroup>
                  <InputGroup.Text id="fontfamily">Font Family</InputGroup.Text>
                    <Form.Select value={shayriFontFamily} onChange={e => setshayriFontFamily(e.target.value)}>
                      <option>BakbakOne-Regular</option>
                      <option>Hind-Regular</option>
                      <option>Kalam-Regular</option>
                      <option>Modak-Regular</option>
                      <option>Poppins-Regular</option>
                      <option>Rajdhani-Regular</option>
                      <option>Teko-Medium</option>
                      <option>Tillana-Medium</option>
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

export default AddShayari