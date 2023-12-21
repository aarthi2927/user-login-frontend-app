import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { mockapi } from './mockapi';

import { pdfjs } from 'react-pdf';
import Headers from './Header';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
const supportedFileTypes = {
  jpg: 'image',
  jpeg: 'image',
  png: 'image',
  gif: 'image',
  pdf: 'pdf',
  txt: 'text',
  docx: 'word',   // Microsoft Word
  xlsx: 'excel',  // Microsoft Excel
  pptx: 'powerpoint',
  // Add more as needed
};
export function FileDetails() {
  const history=useNavigate();
 const{id}=useParams();
 const [filedata1, setFiledata1] = useState([]);
  useEffect(() => {
     dataviewid();
  }, [id]);
  const dataviewid = async () => {
    try {
      const response = await fetch(`${mockapi}/files/${id}`, {
        method:'GET',
        headers: {
          'x-auth-token': localStorage.getItem('token'),
          "Access-Content-Type": "application/json",
          "Access-Control-Allow-Methods": "GET" ,
        },
             });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
          setFiledata1(data);
            } catch (err) {
      console.error('Error:', err);
    }
  };
  console.log(filedata1.filedata)

  const getFileType = (fileName) => {
    if (!fileName) {
      return 'unknown';
    }
    const fileExtension = fileName.split('.').pop().toLowerCase();
    return supportedFileTypes[fileExtension] || 'unknown';
  };
  const renderFileContent = () => {
    if (!filedata1 || !filedata1.filedata) {
      return <p>Loading...</p>; // or some other loading indicator
    }
  
    const fileType = getFileType(filedata1.filedata);
  
    switch (fileType) {
      case 'image':
        return <img src={`http://localhost:8000/${filedata1.filedata}`} className="imagesize" alt="not found" />;
      case 'pdf':
        return <iframe src= {`http://localhost:8000/${filedata1.filedata}`}  width="100%"
        height="800" />;
        case 'text':
          return <p>Text content goes here</p>;
        case 'word':
          // Handle Microsoft Word document
          return <div className="imagesize1">
                     <iframe
         id='id12321'
         title='dummy'
         width="100%"
         height="800"
         frameborder="0"
         src={`http://localhost:8000/${filedata1.filedata}`}
       ></iframe>
         </div> ;
        case 'excel':
          // Handle Microsoft Excel document
          return <div className="imagesize1">
           
          <iframe
         id='id12321'
         title='dummy'
         width="100%"
         height="800"
         frameborder="0"
         src={`http://localhost:8000/${filedata1.filedata}`}
       ></iframe>
         </div>
        case 'powerpoint':
          // Handle Microsoft PowerPoint presentation
          return <div className="imagesize1">
           <iframe
         id='id12321'
         title='dummy'
         width="100%"
         height="800"
         frameborder="0"
         src={`http://localhost:8000/${filedata1.filedata}`}
       ></iframe>
         </div>
      default:
        return <p>Unsupported file type</p>;
    }
  };

  return (
    <div>
      <Headers/>
      <div className="viewdata">
        <h1>{filedata1.heading}</h1>
        {renderFileContent()}
        <br/>
        <button onClick={() => { history('/File'); }}>Back</button>
      </div>
    </div>
  );
}