import Cards from './component/Cards';
import { Layout, Col, Row , Input ,Typography,Table } from 'antd';
import { useEffect, useState } from 'react';
import { getDataTotal, getDataIndonesia,getDataGlobal } from "./controllers/dataController";
const { Header, Content, Footer } = Layout;
const { Title , Text} = Typography;


const HighlightData = ({data})=>{
    return (
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            {data.map((el,index) =>(
                <Col className="gutter-row" span={8} key={index} >
                    <Cards name={el.name} value={el.value} color ={el.color} key={index} />
                </Col>
            ))}
        </Row>
    );
}

const Main = () =>{
    const [data,setData] = useState([])
    const [indonesia,setIndonesia] = useState([])
    const [global,setGlobal] = useState([])
    const [text,setText] = useState("")
    useEffect(()=>{
        const fetchDataTotal = async ()=>{
            let response = await getDataTotal();
            setData(response)
        }
        const fetchIndonesiaData = async () =>{
            let response = await getDataIndonesia();
            setIndonesia(response.data.features.map((el,index)=>{
                const {Provinsi, Kasus_Posi, Kasus_Semb,Kasus_Meni} = el.attributes
                let key = index + 1;
                return {key, Provinsi, Kasus_Posi, Kasus_Semb,Kasus_Meni}
            })) 
            // setIndonesia(response.data.features)
        }
        fetchIndonesiaData()
        fetchDataTotal();
        console.log(data)
    },[])

    const columnsDataIndonesia = [
        {
            title: 'No',
            dataIndex: 'key',
            key: 'key',
            sorter: (a, b) => a.key - b.key,
            sortDirections: ['descend','ascend'],
        },
        {
          title: 'Provinsi',
          dataIndex: 'Provinsi',
          key: 'Provinsi',
          sorter: (a, b) => a.name.length - b.name.length,
          sortDirections: ['descend','ascend'],
        },
        {
            title: 'Positif',
            dataIndex: 'Kasus_Posi',
            key: 'Kasus_Posi',
            sorter: (a, b) => a.Kasus_Posi - b.Kasus_Posi,
            sortDirections: ['descend','ascend'],
          },
         {
            title: 'Sembuh',
            dataIndex: 'Kasus_Semb',
            key: 'Kasus_Semb',
            sorter: (a, b) => a.Kasus_Semb - b.Kasus_Semb,
            sortDirections: ['descend','ascend'],
          },
          {
            title: 'Meninggal',
            dataIndex: 'Kasus_Meni',
            key: 'Kasus_Meni',
            sorter: (a, b) => a.Kasus_Meni - b.Kasus_Meni,
            sortDirections: ['descend','ascend'],
          },
    ];
    function onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    }
    const searchFilter = (datas)=>{
        if(text !== ""){
            return datas.filter(data=>{
                return data.Provinsi.toLowerCase().match(text.toLocaleLowerCase())
            })
        }else{
            return datas
        }
    }
    return(
        <Layout className="layout">
        <Content style={{ padding: '0 50px', marginTop:"4%", width:'80%',margin:'auto' }}>
            <Title style={{marginTop:'10px'}}>Data Covid Indonesia</Title>
            {(data.length < 1) ?
                <Text>Loading.....</Text>
                :
                <HighlightData data = {data}/>
            }   
            <Input placeholder="Search Provinsi" style={{ width: '20%',marginTop:"4%" }} value={text} onChange={(e)=>{setText(e.target.value)}}></Input>
            <Table dataSource={searchFilter(indonesia)}  onChange={onChange} columns={columnsDataIndonesia} size={10} pagination={{ defaultPageSize: 10}} style={{backgroundColor:'white',marginTop:"2%", padding:'10px'}}/>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Kawal Covid ©2021 Created by Irfan Hendianto Wijaya
        </Footer>
      </Layout>
    );
    
}

export default Main;