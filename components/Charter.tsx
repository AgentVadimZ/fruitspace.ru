import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

export default function UniversalChart({ data, dataKeys, colors, tooltipFormatter }) {
    const ChartTip = ({ payload, label }) => {
        if (payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="glassb bg-active p-2 rounded-xl bg-opacity-50 backdrop-blur-xl">
                    <p className="text-xl">{label}</p>
                    {dataKeys.map((key, index) => (
                        <p key={index}>{tooltipFormatter[key]}: {data[key]}</p>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart
                data={data}
                margin={{
                    top: 20,
                    right: 30,
                    left: 0,
                    bottom: 0,
                }}
            >
                <CartesianGrid stroke="none" strokeDasharray="none" />
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#fff' }} />
                <YAxis tick={{ fontSize: 12, fill: '#fff' }} width={35} />
                <Tooltip
                    content={<ChartTip payload={undefined} label={undefined} />}
                    contentStyle={{ backgroundColor: '#333', border: 'none', color: '#fff' }}
                    labelStyle={{ color: '#fff' }}
                />
                {dataKeys.map((key, index) => (
                    <Area
                        key={index}
                        type="monotone"
                        dataKey={key}
                        stackId="1"
                        stroke={colors[index].stroke}
                        fill={colors[index].fill}
                    />
                ))}
            </AreaChart>
        </ResponsiveContainer>
    );
}
