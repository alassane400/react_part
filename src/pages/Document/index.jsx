import "./home.css";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { toast } from "react-toastify";
import getdate from "../../utils/getDate.js";

const Document = () => {
  const text = "Companion";
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const [file, setFile] = useState("");
  const [today, setToday] = useState("");
  const [documents, setDocuments] = useState([]);

  const fetchDocuments = async () => {
    let token = localStorage.getItem('token');
    if (!token) {
        navigate("/admin");
        return;
    }
    
    try {
      const response = await axios.get('https://projet-annuel-q1r6.onrender.com/document', {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      console.log(response.data)
      setDocuments(response.data); // Stocker les documents récupérés dans l'état
    } catch (error) {
      console.error('Erreur lors de la requête :', error);
    }
  };

  useEffect(() => {
    fetchDocuments(); // Appeler l'API au chargement de la page
  }, []);

  useEffect(() => {
    let token = localStorage.getItem('token');
    if (!token) {
        navigate("/admin");
        return;
    }

    let timeout;
    if (index < text.length) {
      timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text.charAt(index));
        setIndex(index + 1);
      }, 300); 
    } else {
      timeout = setTimeout(() => {
        setDisplayedText('');
        setIndex(0);
      }, 3000); 
    }

    return () => clearTimeout(timeout); 
  }, [index, text, navigate]);

  useEffect(() => {
    setToday(getdate());
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let token = localStorage.getItem('token');
    if (!token) {
        navigate("/admin");
        return;
    }
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('https://projet-annuel-q1r6.onrender.com:3000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        console.log(response.data);
        setFile("");
        toast.success("Envoyé");
        localStorage.setItem('fileId', response.data.fileId);
        fetchDocuments(); // Appeler l'API après l'upload d'un nouveau document
        setTimeout(() => {
          navigate("/admin/Document");
        }, 3000);
      }
    } catch (error) {
      console.error("Error response:", error);
      if (error.message) {
        toast.error(error.message || 'An error occurred');
      } else {
        toast.error('An unknown error occurred');
      }
    }
  };

  const handleDownload = (fileId) => {
    window.open(`https://projet-annuel-q1r6.onrender.com/download/${fileId}`, 'Download', 'width=600,height=400');
  };

  return (
    <div className="home-content">
      <div className="today">
        <p className="today-text">{today}</p>
      </div>
      <div style={{margin:"35px"}}>
        <div style={{borderColor:'orange', borderWidth:'2px', borderStyle: 'solid', width:'50%', borderRadius:'8px', padding:'10px'}}>
          <form onSubmit={handleSubmit}>
            <label htmlFor="file"><b>Upload :</b></label>
            <input
              id="file"
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              aria-label="Enter file"
              type="file"
              name="file"
              placeholder="Enter file"
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
              required
              style={{marginRight: '10px' }}
            />
            <br />
            <div style={{borderColor:'orange', borderWidth:'2px', borderRadius:'3px',textAlign:'center',color:'white',backgroundColor:'orange'}}>
              <input
                type="submit"
                aria-label="Se connecter"
                value="ENVOYER"
              />
            </div>
          </form>
        </div>
        <br />
        <div>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">Files</th>
                  <th scope="col" className="px-6 py-3">Upload date</th>
                  <th scope="col" className="px-6 py-3">Description</th>
                  <th scope="col" className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {documents.map((doc) => (
                  <tr key={doc.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {doc.title} {/* Assurez-vous que les propriétés correspondent aux données réelles */}
                    </th>
                    <td className="px-6 py-4">
                      {new Date(doc.createdAt).toLocaleDateString()} {/* Formatage de la date */}
                    </td>
                    <td className="px-6 py-4">
                      {doc.description} {/* Formatage de la date */}
                    </td>
                     <td className="px-6 py-4">
                      <button className="btn btn-primary" onClick={() => handleDownload(doc.fileId)}>Download</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Document;
