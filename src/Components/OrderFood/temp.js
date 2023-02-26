import React, { useEffect, useState } from 'react';

export default function DataDisplayer(props) {
  const [data, setData] = useState(null);

            useEffect(() => {
                const fetchData = async () => {
                const response = await fetch(`https://xyz/${props.id}/`);
                const newData = await response.json();
                setData(newData);
                };

                fetchData();
            }, [props.id]);

  if (data) {
    return <div>{data.name}</div>;
  } else {
    return null;
  }
}
