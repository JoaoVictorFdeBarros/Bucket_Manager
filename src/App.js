import './App.css';
import { useState } from 'react';
import { FaGithub } from "react-icons/fa";

function App() {
  const [fileName, setFileName] = useState('');
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const bucketName = 'joaovictorfbarros-teste0';
  const region = 'us-east-2';
  const s3Url = `https://${bucketName}.s3.${region}.amazonaws.com/`;

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFileName(selectedFile.name);
      setFile(selectedFile);
      setUploadSuccess(false);
    } else {
      setFileName('');
      setFile(null);
    }
  };

  const handleUpload = async () => {
    if (file) {
      setUploading(true);
      const uploadUrl = s3Url + file.name;

      try {
        const response = await fetch(uploadUrl, {
          method: 'PUT',
          body: file,
          headers: {
            'Content-Type': file.type,
          },
        });

        if (response.ok) {
          setUploadSuccess(true);
          alert('Arquivo enviado com sucesso!');
        } else {
          alert('Erro ao enviar o arquivo.');
        }
      } catch (error) {
        console.error('Erro ao enviar o arquivo:', error);
        alert('Erro desconhecido.');
      } finally {
        setUploading(false);
      }
    }
  };

  return (
    <div className="App">
      <h1 className='Header'>Bucket Manager</h1>
      <div className="UploadForm">
        <input 
          type="file" 
          id="fileInput" 
          onChange={handleFileChange} 
        />
        <label htmlFor="fileInput">Escolher Arquivo</label>
        <button onClick={handleUpload} disabled={uploading}>
          {uploading ? 'Enviando...' : 'Enviar'}
        </button>
        {fileName && <p className="FileName">Arquivo selecionado: {fileName}</p>}
        {uploadSuccess && <p className="UploadSuccess">Arquivo enviado com sucesso!</p>}
      </div>
      <div className='Footnote'>
        <a href='https://github.com/JoaoVictorFdeBarros/Bucket_Manager'><FaGithub /> Repositório</a>
        <p>Desenvolvido por João Victor F. Barros - Dezembro 2024</p>
      </div>
    </div>
  );
}

export default App;
