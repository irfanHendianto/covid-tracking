import { Typography,Card } from 'antd';

const { Title , Text} = Typography;

const Cards = ({ name, value, color}) =>{
    return (
        <Card style={{textAlign:"left",backgroundColor: color,height:'100%'}} >
            <Text style={{color:'white',textTransform: 'uppercase', fontWeight: 'bold'}}> {name}</Text>
            <Title style={{color:'white',marginTop:'2px', marginBottom:'2px'}}>{value}</Title>
            <Text style={{color:'white',fontWeight: 'bold'}}>ORANG</Text>
        </Card>
    );
}

export default Cards;