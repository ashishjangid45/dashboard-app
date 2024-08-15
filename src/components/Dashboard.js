import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Select, Button } from 'antd';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { fetchDataRequest } from '../redux/userActivitiesSlice';

const { Option } = Select;

const Dashboard = () => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.userActivities);
  const [view, setView] = useState('table');
  const [filteredData, setFilteredData] = useState([]);
  const [userFilter, setUserFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  useEffect(() => {
    dispatch(fetchDataRequest());
  }, [dispatch]); 

  useEffect(() => {
    setFilteredData(
      data.filter(
        (item) =>
          (userFilter ? item.user === userFilter : true) &&
          (categoryFilter ? item.category === categoryFilter : true)
      )
    );
  }, [data, userFilter, categoryFilter]);

  const columns = [
    { title: 'User', dataIndex: 'user', key: 'user' },
    { title: 'Category', dataIndex: 'category', key: 'category' },
    { title: 'Activity', dataIndex: 'activity', key: 'activity' },
    { title: 'Date', dataIndex: 'date', key: 'date' },
  ];

  const pieData = filteredData.reduce((acc, curr) => {
    const index = acc.findIndex((item) => item.name === curr.category);
    if (index >= 0) {
      acc[index].value += 1;
    } else {
      acc.push({ name: curr.category, value: 1 });
    }
    return acc;
  }, []);

  const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <Select
          placeholder="Filter by User"
          style={{ width: 200, marginRight: 20 }}
          onChange={(value) => setUserFilter(value)}
          allowClear
        >
          {[...new Set(data.map((item) => item.user))].map((user) => (
            <Option key={user} value={user}>
              {user}
            </Option>
          ))}
        </Select>
        <Select
          placeholder="Filter by Category"
          style={{ width: 200, marginRight: 20 }}
          onChange={(value) => setCategoryFilter(value)}
          allowClear
        >
          {[...new Set(data.map((item) => item.category))].map((category) => (
            <Option key={category} value={category}>
              {category}
            </Option>
          ))}
        </Select>
        <Button onClick={() => setView(view === 'table' ? 'chart' : 'table')}>
          Switch to {view === 'table' ? 'Pie Chart' : 'Table'} View
        </Button>
      </div>

      {view === 'table' ? (
        <Table columns={columns} dataSource={filteredData} loading={loading} rowKey="id" />
      ) : (
        <PieChart width={400} height={400}>
          <Pie
            data={pieData}
            cx={200}
            cy={200}
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      )}
    </div>
  );
};

export default Dashboard;
