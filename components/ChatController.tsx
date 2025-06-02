"use client";

import React, { useState, useCallback } from 'react';
import ScriptSelection from './ScriptSelection';
import Chat from './Chat'; // This is the ClientComponent from components/Chat.tsx
import type { SalesScript } from '../utils/salesScripts';

interface ChatControllerProps {
  accessToken: string | null; // Can be null if fetching failed or not yet available
}

const ChatController: React.FC<ChatControllerProps> = ({ accessToken }) => {
  const [selectedScript, setSelectedScript] = useState<SalesScript | null>(null);

  const handleSelectScript = useCallback((script: SalesScript) => {
    setSelectedScript(script);
    console.log("Script selected in ChatController:", script);
  }, []);

  if (!accessToken) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <p>Access token is missing. Please ensure it is configured correctly.</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {!selectedScript ? (
        <ScriptSelection onSelectScript={handleSelectScript} />
      ) : (
        // The Chat component (ClientComponent) expects selectedScript, not currentScript
        <Chat accessToken={accessToken} selectedScript={selectedScript} />
      )}
    </div>
  );
};

export default ChatController;
