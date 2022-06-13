import React,  {useState, useEffect} from 'react'
import { Form, InputGroup, Button, Card, ProgressBar } from 'react-bootstrap'
import CardHeader from 'react-bootstrap/esm/CardHeader'
import Notification from '../Notification/Notification'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { storage } from '../../firebase-config'
import statusServices from '../../services/status.services'
import StatusCard from './StatusCard'
import categorySevices from '../../services/category.sevices'

function ImageStatus() {
  const [notification, setNotification] = useState({ type: '', msg: '' });
  const [progress, setProgress] = useState();
  const [file, setFile] = useState(null);
  const [statusImage, setStatusImage] = useState("");
  const [category, setCategory] = useState("Love Shayari");
  const [categoryList, setCategoryList] = useState([]);

  const fileHandler = (e) => {
    setFile(e.target.files[0])
  }

    useEffect(() => {
    const uploadFile = () => { 
      const storageRef = ref(storage, 'status_images/' + file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);
      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on('state_changed',
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(prog);
            switch (snapshot.state) {
              case 'paused':
                setNotification({ type: "info", msg: "Upload is paused...." });
                break;
              case 'running':
                setNotification({ type: "info", msg: "Image is Uploading, Please Wait...." });
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
              setStatusImage(downloadURL);
              setProgress(0);
            });
          }
        );
    };
    
    file && uploadFile();
    }, [file]);
  
  useEffect(() => { 
    getCategories();
  }, []);

  const getCategories = async () => {
    const data = await categorySevices.getAllCategory();
    setCategoryList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setNotification({});
    if (category === "") {
      setNotification({ type: 'info', msg: "Please fill all the fields" });
    } else {
      const newStatus = {
        'category': category,        
        'image': statusImage
      };    
      try {                 
        statusServices.addStatus(newStatus);
        setNotification({ type: 'dark', msg: "New Status Image added successfully" });                 
        setCategory("");
        setFile(null);            
        setStatusImage("");  
      } catch (error) {
        setNotification({ type: 'info', msg: error.message });
      } 
    }
  };

  return (
    <ul className='row upload-image-container'>
      <li className='col-3 mt-4 mb-4'>
        <StatusCard category={category} statusimage={statusImage}/>
      </li>
      <Card className='col-10 col-md-8 form-card mt-4 mb-4' border="primary">
        <CardHeader>Category Editor</CardHeader>        
      <Form onSubmit={handleSubmit}>
        <Card.Body>
        <Form.Group  controlId="category" className='mb-4 mt-2'>
          <InputGroup>
            <InputGroup.Text id="category">Font Size</InputGroup.Text>
              <Form.Select value={category} onChange={e => setCategory(e.target.value)}>
                  {categoryList.map((doc) => { return <option key={doc.id}>{doc.category}</option>; })}           
              </Form.Select>            
          </InputGroup>
        </Form.Group> 
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Control type="file" onChange={fileHandler}/>
        </Form.Group>
        {(progress) ? <ProgressBar classname="mt-2" animated striped now={progress} label={`${progress}%`} /> : null}            
      </Card.Body>    
      <Card.Footer>
        <Button type="submit">Add Data</Button>
      </Card.Footer>
      </Form>
      </Card>      
      {(notification.msg) && <Notification variant={notification.type} message={notification.msg} onCloseHandler={() => setNotification({})}></Notification>}
    </ul>
  )
}

export default ImageStatus