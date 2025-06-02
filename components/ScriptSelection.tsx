import React from 'react';
import salesScripts from '../utils/salesScripts'; // Assuming salesScripts.ts is in ../utils
import type { SalesScript } from '../utils/salesScripts'; // Importing the type

interface ScriptSelectionProps {
  onSelectScript: (script: SalesScript) => void;
}

const ScriptSelection: React.FC<ScriptSelectionProps> = ({ onSelectScript }) => {
  return (
    <div>
      <h2>Select a Sales Script</h2>
      <ul>
        {salesScripts.map((script, index) => (
          <li key={index} onClick={() => onSelectScript(script)} style={{ cursor: 'pointer', margin: '5px 0', padding: '5px', border: '1px solid #ccc' }}>
            {/* For now, just display based on index. We might want to add a name to each script later. */}
            Script {index + 1}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScriptSelection;
