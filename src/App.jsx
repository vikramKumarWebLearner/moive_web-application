import { useEffect } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { fetchDataFromApi } from "./utils/api"
import { useSelector, useDispatch } from 'react-redux';

import  {getApiConfi,getGenress} from './store/homeSlice'

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import SearchResult from "./pages/searchResult/SearchResult";
import Explore from "./pages/explore/Explore";
import PageNotFound from "./pages/404/PageNotfound";
import People from './pages/people/People';
function App() {
  const {url} = useSelector((state) => state.home);
  const dispatch = useDispatch();
  useEffect (()=>{
    fetchApiConfi();
  },[])
   
  const fetchApiConfi = () =>{
       fetchDataFromApi("/configuration").then((res)=>{

        const url = {
          backdrop: res.images.secure_base_url + "original",
          poster: res.images.secure_base_url + "original",
          profile: res.images.secure_base_url + "original",
      };
        dispatch(getApiConfi(url));
        genresCall();
     })

   // eslint-disable-next-line no-unused-vars
   async  function genresCall(){
      let promises = [];
      let endPoints = ["tv", "movie"];
      let allGenres = {};

      endPoints.forEach((url) => {
          promises.push(fetchDataFromApi(`/genre/${url}/list`));
      });

      const data = await Promise.all(promises);
      data.map(({ genres }) => {
          return genres.map((item) => (allGenres[item.id] = item));
      });

      dispatch(getGenress(allGenres));
  }
      
  };
  return (
     <BrowserRouter>
      <Header/>
       <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/:mediaType/:id" element={<Details />} />
                <Route path="/search/:query" element={<SearchResult />} />
                <Route path="/explore/:mediaType" element={<Explore />} />
                <Route path="/people/" element={<People />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
            <Footer/>
     </BrowserRouter>
  )
}

export default App
