import { useEffect, useState } from "react";

function App() {
  // store user searching value in state
  const [search,setSearch] = useState("Karachi");
  // store API data (temp) in state
  const [city,setCity] = useState(null);

  // whenever user type city name it will load 
  useEffect(()=>{
    const fetchApi = async (e) => {
      let apiKey = `3de0054bfd7cd865534f1cdf815594ed`;
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${apiKey}`;
      const response = await fetch(url);
      const resJson = await response.json();
      setCity(resJson.main);
    }
    fetchApi();
  },[search])

  return (
    <>
    <div className="container py-4">
      <div className="row">
        <div className="col-12">
          <h1 className="text-center">Weather App</h1>
        </div>
      </div>

      <div className="row">
        <div className="col-4"></div>
        <div className="col-4">
          <input type="text" className="form-control my-3" value={search} placeholder="Enter City" 
          onChange={(event)=> setSearch(event.target.value)} />
        </div>
        <div className="col-4"></div>
      </div>
      {/* Check Condition for weather */}
      {!city ? (
        <div className="row">
          <div className="col-12 text-center">
            <h2>Not Found</h2>
          </div>
        </div>
      ) : (
        <div>
          <div className="row">
        <div className="col text-center">
           <h1><i className="bi bi-geo-alt-fill"></i> {search}</h1>
        </div>
      </div>
      <div className="row">
        <div className="col text-center">
         <h2> <i className="bi bi-cloud-moon-fill"></i> {`${Math.round((city.temp - 273.15))} C`} </h2> 
        </div>
      </div>
    </div>
      )
      }
      </div>
    </>
  );
}

export default App;
