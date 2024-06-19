import "./home.css";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { toast } from "react-toastify";
import getdate from "../../utils/getDate.js";
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Table from '@mui/joy/Table';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';

function createData(Files,Date) {
  return { Files , Date };
}

const DocumentAdmin = () => {
  const text = "Companion";
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const [file, setFile] = useState("");
  const [today, setToday] = useState("");

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate("/admin");
      return
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');  // Retrieve the token here
    const formData = new FormData();
    formData.append('file', file);

        const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/document', {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });
        console.log(response.data); // Faites quelque chose avec la réponse
      } catch (error) {
        console.error('Erreur lors de la requête :', error);
        // Gérer les erreurs
      }
    };

    fetchData();
    
    axios.post(`http://localhost:3000/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`,  // Add the token to the Authorization header
      },
    })
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          setFile("");
          toast.success("Envoyé");
          localStorage.setItem('fileId', response.data.fileId);
          setTimeout(() => {
            navigate("/admin/Document");
          }, 3000);
        }
      })
      .catch((error) => {
        console.error("Error response:", error); // Log the error response
        if (error.message) {
          toast.error(error.message || 'An error occurred');
        } else {
          toast.error('An unknown error occurred');
        }
      });
  };

  return (
    <div className="home-content">
      <div className="today">
        <p className="today-text">{today}</p>
      </div>
      <div style={{margin:"25px"}}>
      <div style={{borderColor:'orange', borderWidth:'2px', borderStyle: 'solid', width:'50%', borderRadius:'8px', padding:'10px'}}>
          <form onSubmit={handleSubmit}>
            <label htmlFor="file"><b>Upload :</b></label>
            <input
              id="file"
              class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
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
            <br></br>
            <div  style={{borderColor:'orange', borderWidth:'2px', borderRadius:'3px',textAlign:'center',color:'white',backgroundColor:'orange'}}>
            <input
              type="submit"
              aria-label="Se connecter"
              value="ENVOYER"
            />
            </div>
          </form>
        </div>
          <div>
            <div class="relative overflow-x-auto">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Files
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Upload date
                            </th>
                            <th scope="col" class="px-6 py-3">
                                
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Doc1Test
                            </th>
                            <td class="px-6 py-4">
                                ...
                            </td>
                            <td class="px-6 py-4">
                                Download
                            </td>
                        </tr>
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Doc2Test
                            </th>
                            <td class="px-6 py-4">
                                ...
                            </td>
                            <td class="px-6 py-4">
                                Download
                            </td>
                        </tr>
                        <tr class="bg-white dark:bg-gray-800">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Doc3Test
                            </th>
                            <td class="px-6 py-4">
                                ...
                            </td>
                            <td class="px-6 py-4">
                                Download
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
          </div>
      </div>
    </div>
  );
}

export default DocumentAdmin;
