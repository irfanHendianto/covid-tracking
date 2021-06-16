
import axios from "axios";

export const getDataTotal = async () => {
  let result;
  const responsePositif = await axios.get(`/positif/`);
  responsePositif.data.color ="#f82649";
  const responseSembuh = await axios.get(`/sembuh/`);
  responseSembuh.data.color = "#09ad95"
  const responseMeningal = await axios.get(`/meninggal/`);
  responseMeningal.data.color = "#d43f8d"
  result = [
    responsePositif.data,
    responseSembuh.data,
    responseMeningal.data
  ]
  return result
};


export const getDataIndonesia = async () => {
  const indonesiaData = await axios.get(`/indonesia/provinsi/`);

  return indonesiaData;
};

export const getDataGlobal = async () => {
  const globalData = await axios.get(`/`);
  
  return globalData;
};