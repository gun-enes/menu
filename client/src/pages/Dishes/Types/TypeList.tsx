import {useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AddButton from './AddType';
import { Type } from './Type';
import { replaceSpecialChars } from '../../components/utils';


export default function TypeList() {
  const [data, setData] = useState<Type[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  // Function to add a new type and update the list
  const handleAddType = async (newType: Type) => {
    try {
      const response = await axios.post<Type>('http://localhost:4000/types', newType);
      // Add the new type to the existing list
      if (data) {
        setData([...data, response.data]);
      }
    } catch (error: any) {
      console.error('Error adding new type:', error.message);
      setError(error.message);
    }
  };

    // Fetch the types data on component load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Type[]>('http://localhost:4000/types');
        setData(response.data);
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

    // Function to delete a type by ID
  const handleDeleteType = async (id: string) => {
    try {
      await axios.delete(`http://localhost:4000/types/${id}`);
      // After successful deletion, update the list
      if (data) {
        setData(data.filter((item) => item._id !== id));
      }
    } catch (error: any) {
      console.error('Error deleting type:', error.message);
      setError(error.message);
    }
  };

  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
 
  return (
    <>
      <AddButton onAddType={handleAddType}/>
      <div className="container">
      <div className="row">
        {data && data.map(item => (
          <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={item._id}>
            <div className="card">
              <img src={item.url} className="card-img-top" alt={item.title} style={{ width: 'auto', height: 'auto'}}/>
              <div className="card-body">
                <Link to={`/${encodeURIComponent(replaceSpecialChars(item.title))}`}>
                  <h5 className="card-title">{item.title}</h5>
                </Link>
                <button onClick={() => item._id && handleDeleteType(item._id)} className="btn btn-danger btn-sm ml-3">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    </>
  );
}

