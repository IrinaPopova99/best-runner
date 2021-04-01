import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
const data = [
    { name: 'ПН', uv: 100 },
    { name: 'ВТ', uv: 520 },
    { name: 'СР', uv: 123 },
    { name: 'ЧТ', uv: 201 },
    { name: 'ПТ', uv: 452 },
    { name: 'СБ', uv: 324 },
    { name: 'ВС', uv: 93 },
];

export const Chart = ({ data }) => {


    return <>
        { data.map(item => {
        {console.log(item)}
            return <LineChart width={600} height={300} data={item} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <Line type="monotone" dataKey="meters" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
            </LineChart>
        }
        )}
    </>
}