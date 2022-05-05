import React, {useState} from 'react'
import { Form, InputGroup, Button, Card, Row, Col, Alert } from 'react-bootstrap'
import CardHeader from 'react-bootstrap/esm/CardHeader';
import ShayariCard from './ShayariCard';
import shayariDataService from '../../services/shayari.services'

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

  const onSwitchAction = () => {
    setIsSwitchOn(!isSwitchOn);
  };

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
        'font_family': fontSizeShayari,
        'font_size': shayriFontFamily
      };    
      try {
        await shayariDataService.addShayari(newShayari);
        setNotification({ type: 'success', msg: "New Shayri added successfully" });
        setShayri("");
        setAuthorName("");
      } catch (error) {
        setNotification({ type: 'danger', msg: error.message });
      } 
    }
  };

  return <>
    {(notification.msg) && <Alert variant={notification.type} dismissible onClose={(e) => setNotification({})}>
      {notification.msg}
    </Alert>}
    <div className='row shayari-editor'>      
      <ShayariCard isSwitchOn={isSwitchOn} shayri={shayri} fontColor={fontColor} fontSizeShayari={fontSizeShayari} gradientSecondColor={gradientSecondColor} gradientSingleColor={gradientSingleColor} color={color} category={category} authorName={authorName} shayriFontFamily={shayriFontFamily}></ShayariCard>
      <Card className='mt-4 col-8 form-card' border="primary">
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
             <Form.Group  controlId="category" className='mb-3'>
              <InputGroup>
                <InputGroup.Text id="category">Category</InputGroup.Text>
                  <Form.Select defaultValue="Love" onChange={e => setCategory(e.target.value)}>
                    <option>Love</option>
                    <option>Friendship</option>
                    <option>Attitude</option>
                    <option>Mother</option>
                    <option>Sad</option>
                    <option>Good Morning</option>
                    <option>Good Night</option>
                    <option>Relationship</option>
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
                    <Form.Select defaultValue={fontSizeShayari} onChange={e => setFontSize(parseInt(e.target.value))}>
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
                    <Form.Select defaultValue={shayriFontFamily} onChange={e => setshayriFontFamily(e.target.value)}>
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
      <Card.Footer><Button type="submit">Add Data</Button></Card.Footer>
    </Form>
    </Card>
    </div>
    </>
};

export default AddShayari