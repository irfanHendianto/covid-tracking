
import axios from "axios";


const getDataTotalPositif = async () =>{
  let sumPositif=0;
  let result;
  const responsePositif = await axios.get(`https://services5.arcgis.com/VS6HdKS0VfIhv8Ct/arcgis/rest/services/COVID19_Indonesia_per_Provinsi/FeatureServer/0/query?where=1%3D1&outFields=Kasus_Posi&outSR=4326&f=json`);
  responsePositif.data.features.map((el)=>{
     sumPositif+= el.attributes.Kasus_Posi;
  })
  result = {
    name :"Total Positif",
    value : sumPositif,
    color : "#f82649"
  }
  return result;
}

const getDataTotalSembuh = async () =>{
  let sumSembuh=0;
  let result;
  const responseSembuh = await axios.get(`https://services5.arcgis.com/VS6HdKS0VfIhv8Ct/arcgis/rest/services/COVID19_Indonesia_per_Provinsi/FeatureServer/0/query?where=1%3D1&outFields=Kasus_Semb&outSR=4326&f=json`);
  responseSembuh.data.features.map((el)=>{
    sumSembuh+= el.attributes.Kasus_Semb;
  })
  result = {
    name :"Total Sembuh",
    value : sumSembuh,
    color : "#09ad95"
  }
  return result;
}
const getDataTotalMeninggal = async () =>{
  let sumMeninggal=0;
  let result;
  const responseMeningal = await axios.get(`https://services5.arcgis.com/VS6HdKS0VfIhv8Ct/arcgis/rest/services/COVID19_Indonesia_per_Provinsi/FeatureServer/0/query?where=1%3D1&outFields=Kasus_Meni&outSR=4326&f=json`);
  responseMeningal.data.features.map((el)=>{
     sumMeninggal+= el.attributes.Kasus_Meni;
  })
  result = {
    name :"Total Meninggal",
    value : sumMeninggal,
    color : "#d43f8d"
  }
  return result;
}
export const getDataTotal = async () => {
  let result;
    const responsePositif = await getDataTotalPositif();
    const responseSembuh = await getDataTotalSembuh();
    const responseMeningal = await getDataTotalMeninggal();
    result = [
      responsePositif,
      responseSembuh,
      responseMeningal
    ]
    return result;
};


export const getDataIndonesia = async () => {
  const indonesiaData = await axios.get(`https://services5.arcgis.com/VS6HdKS0VfIhv8Ct/arcgis/rest/services/COVID19_Indonesia_per_Provinsi/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json`);
  return indonesiaData
};

export const getDataGlobal = async () => {
  const globalData = await axios.get(`/`);
  
  return globalData;
};