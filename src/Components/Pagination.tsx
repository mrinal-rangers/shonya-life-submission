import { useState, useEffect } from "react";
import Retreat from "./Types";
import Page from "./Page";

const Pagination: React.FC  = () => {
    const [arr, setArr] = useState<Retreat[]>([]);
    const [filteredArr, setFilteredArr] = useState<Retreat[]>([]);
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [idx, setIdx] = useState(0);
    const [searchField,setSearchField] = useState('');

  const handleLeft = ()=>{
    if(idx>0){
        setIdx(idx-1);
    }
  }
  const handleRight = ()=>{
    if(idx < filteredArr.length - 3){
        setIdx(idx+1);
    }
  }

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>)=>{
    setSelectedYear(e.target.value);
  }

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>)=>{
    setSelectedType(e.target.value);
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    setSearchField(e.target.value);
  }


  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = 'https://669f704cb132e2c136fdd9a0.mockapi.io/api/v1/retreats';
        if (selectedType !== '') {
          url = `${url}?filter=${selectedType}`;
        }
        const res = await fetch(url);
        const data: Retreat[] = await res.json();
        setArr(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [selectedType]);

   useEffect(() => {
    if (selectedYear !== '') {
      const temp = arr.filter((e) => {
        const year = new Date(e.date * 1000).getFullYear();
        return selectedYear === year.toString();
      });
      setFilteredArr(temp);
    } else {
      setFilteredArr(arr);
    }
    if(searchField!=''){
        const temp = filteredArr.filter((e) => {
            return e.title.toLowerCase().includes(searchField.toLowerCase());
          });
        setFilteredArr(temp);
    }
    setIdx(0);

  }, [selectedYear, arr, searchField]);


  return (
    <>

    <div style={{display:'flex' , justifyContent:'space-between' , flexDirection: (window.innerWidth > 768)  ? 'row':'column' }}>
        <div style={{display:'flex'}}>
            <div style={{ backgroundColor: '#1b3152', color:'white',padding: 20, borderRadius: 5, margin:10 ,width: (window.innerWidth > 768)  ? '20vw':'80vw' }}> 
                <select id="retreat-select" value={selectedYear} onChange={handleYearChange} style={{backgroundColor:'transparent', color:'white', border:'none'}}>
                    <option value="">Filter By Date</option>
                    <option value="2023">2023-2024</option>
                    <option value="2024">2024-2025</option>
                </select>
            </div>
            <div style={{ backgroundColor: '#1b3152', color:'white',padding: 20, borderRadius: 5, margin:10}}> 
                <select id="retreat-select" value={selectedType} onChange={handleTypeChange} style={{backgroundColor:'transparent', color:'white', border:'none'}}>
                    <option value="">Filter By Type</option>
                    <option value="yoga">yoga</option>
                    <option value="meditation">medication</option>
                    <option value="detox">detox</option>
                </select>
            </div>
        </div>

        <div style={{ backgroundColor: '#1b3152', color:'white' ,padding: 20, borderRadius: 5, margin:10 ,  width: (window.innerWidth > 768)  ? '20vw':'80vw'}}> 
            <input onChange={handleSearchChange}  placeholder="Search retreats by title" style={{backgroundColor:'transparent', border:'none' , color:'white' , fontSize:'larger' }}  />  
        </div>
    </div>

    <div style={{display:"flex",  flexDirection: (window.innerWidth > 768)  ? 'row':'column'}}>
      {filteredArr.slice(idx, idx + 3).map((e) => (
        <Page key={e.id} retreat={e} />
      ))}
    </div>
      
    <div style={{display:'flex' , justifyContent:'center'}}>
        <div onClick={handleLeft}  style={{ backgroundColor: (idx == 0) ? 'grey': '#1b3152', color:'white',padding: 20, borderRadius: 5, margin:10}}> Previous </div>
        <div onClick={handleRight} style={{ backgroundColor: (idx == filteredArr.length -3) ? 'grey': '#1b3152', color:'white' ,padding: 20, borderRadius: 5, margin:10 }}> Next </div>
    </div>

    </>
  );
};

export default Pagination;
