import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import ShazamAPI from './ShazamAPI';
function App() {

  const [titre, SetTitre]= useState("");

  const [musique,SetMusique]=useState([])

  const [currentTrack, setCurrentTrack] = useState(null);


  
 const HandleChange=(event)=>{

  SetTitre(event.target.value);

 }

 const HandelSubmit= async (event)=>{
  event.preventDefault();

   try {
        const data= await ShazamAPI.search(titre)

      SetMusique(data.tracks.hits);
    
   } catch (error) {

    console.error("shazam error :",error);
    
   }

 }

 const Play = (tracks) => {
  if (!currentTrack) {
    setCurrentTrack(tracks);
    const audio = new Audio(tracks.track.url);
    audio.addEventListener('error', (e) => {
      console.error('Error loading audio:', e);
    });
    audio.play().catch((error) => {
      console.error('Error playing audio:', error);
    });
  } else if(tracks==currentTrack) {
    const audio= new Audio("");
    audio.pause();
    
  }
};





  return (
    <div className="container-fluide">

     <form onSubmit={HandelSubmit}>
            <div className='d-flex flex-wrap justify-content-center  align-items-center' style={{marginTop:30,}} >
     
      
                  <div className=''> 
                  
                  <input type='text' placeholder='Titre de la musique' className='form-control' value={titre} onChange={HandleChange}/> </div>
                   
                  <div className='' style={{marginLeft:"10px"}}><button className='btn btn-primary'  type='submit'>Rechercher</button> </div>
        

            </div>
      </form>


      <div className='justify-content-center align-items-center'>

                      <div style={{marginLeft:"10%",marginRight:"10%",marginTop:"5%"}}>
                        <table className="table">
                        <thead>
                          <tr>

                            <th scope="col">Image</th>
                            <th scope="col">Auteur</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody>

                        {
  musique.map((result) => {
    if (result.track) { // Vérifiez si result.track est défini
      console.log("Audio URL:", result.track.url);
      return (
        <tr key={result.track.key}>
          <td>
            {result.track.images && result.track.images.background && (
              <img
                src={result.track.images.background}
                style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                alt="Musique"
              />
            )}
          </td>
          <td>
            <p>{result.track.title}</p>
            <p>{result.track.subtitle}</p>
          </td>
          <td>
          <audio controls>
                <source src={result.track.url} type="audio/mpeg"/>
              
              </audio>
          </td>
        </tr>
      );
    }
    return null; // Ignorez les résultats sans track défini
  })
}
                  {currentTrack && (
                          <div>
                            <h3>Lecture en cours :</h3>
                            <p>{currentTrack.track.title}</p>
                          </div>
                        )}
                                      
                          
                        </tbody>
              </table>
      </div>

      </div>


    </div>
  );
}

export default App;
