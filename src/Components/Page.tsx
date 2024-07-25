
import Retreat  from "./Types"; // Assuming your Retreat type is in a separate file called types.ts

interface PageProps {
  retreat: Retreat;
}

const Page: React.FC<PageProps> = ({ retreat }) => {
  return (
    <div style={{ backgroundColor: '#e0d9cf', padding: 20, borderRadius: 10, margin:30 , width: (window.innerWidth > 768)  ? '30vw': '70vw'}}>
      <img src={retreat.image} alt={retreat.title} style={{ width: "150px", height: "150px" , borderRadius:'20px', margin:'10px'}} />
      <h2 style={{marginBottom:20}} >{retreat.title}</h2>
      <p style={{marginBottom:20}} >{retreat.description}</p>
      <p> <span style={{fontWeight:'bold'}}> Date: </span>  {new Date(retreat.date * 1000).toLocaleDateString()}</p>
      <p> <span style={{fontWeight:'bold'}}> Location: </span>  {retreat.location}</p>
      <p> <span style={{fontWeight:'bold'}}> Price: </span>  ${retreat.price}</p>
    </div>
  );
};

export default Page;
