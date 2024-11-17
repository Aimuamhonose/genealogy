import React, { useState, useEffect } from 'react';
import { getFamilyMembers} from '../../services/api';
import ReactD3Tree from 'react-d3-tree';

const FamilyTree = () => {
  const [treeData, setTreeData] = useState(null);

  useEffect(() => {
    const fetchTree = async () => {
      const response = await getFamilyMembers();
      setTreeData(response.data);
    };

    fetchTree();
  }, []);

  return (
    <div style={{ width: '100%', height: '500px' }}>
      {treeData ? (
        <ReactD3Tree data={treeData} />
      ) : (
        <p>Loading family tree...</p>
      )}
    </div>
  );
};

export default FamilyTree;
