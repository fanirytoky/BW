import React, { useState, useEffect } from 'react';
import axios from 'axios';
const NetworkList = () => {
    const [networks, setNetworks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [nameFilter, setNameFilter] = useState('');
    const [cityFilter, setCityFilter] = useState('');
    const [selectedNetworkId, setSelectedNetworkId] = useState(null);
    const [stationCount, setStationCount] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                let url = 'http://localhost:3001/networks';
                const params = new URLSearchParams();

                if (nameFilter) params.append('name', nameFilter);
                if (cityFilter) params.append('city', cityFilter);

                const response = await axios.get(`${url}?${params.toString()}`);
                setNetworks(response.data.networks);
            } catch (error) {
                console.error('Fetch error:', error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [nameFilter, cityFilter]);

    const fetchStationCount = async (networkId) => {
        try {
            const response = await fetch(`http://localhost:3001/networks/${networkId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setStationCount(data);
            setSelectedNetworkId(networkId);
        } catch (error) {
            console.error("Error fetching station count:", error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <div>
                {selectedNetworkId && (
                    <p>Station count for {selectedNetworkId}: {stationCount}</p>
                )}
            </div>
            <h1>Networks</h1>
            <input
                type="text"
                placeholder="Filter by name..."
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)}
            />
            <input
                type="text"
                placeholder="Filter by city..."
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
            />
            <table border={1}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {networks.map(network => (
                        <tr key={network.id} onClick={() => fetchStationCount(network.id)}>
                            <td>{network.id}</td>
                            <td>{network.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default NetworkList;
