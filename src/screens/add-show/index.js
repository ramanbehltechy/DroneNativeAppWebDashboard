import { useState } from 'react';
import AddShowForm from '../../components/addShowForm';
import Map from '../../components/map';
import { useSelector } from 'react-redux';

const AddShow = () => {
  let [mapData, setMapData] = useState({ latitude: 31.9685988, longitude: -99.9018131 });

  const editingItem=useSelector((state)=>state.edit.editingItem);
  return (
    <>
      <main className="col-sm-12 col-md-12 ms-sm-auto col-lg-10 px-md-4">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-4 pb-2 mb-3">
          <h1 className="h3 mb-0">{editingItem? "Edit Show":"Add Show"}</h1>
        </div>
        <div className="row">
          <div className="col-sm-5 col-md-4">
            <AddShowForm setMapData={setMapData} />
          </div>
          <div className="col-sm-7 col-md-8">
            <Map mapData={mapData} />
          </div>
        </div>
      </main>
    </>
  );
}

export default AddShow;