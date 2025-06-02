"use client";

import { VoiceProvider, useVoice } from "@humeai/voice-react";
import Messages from "./Messages";
import Controls from "./Controls";
import StartCall from "./StartCall";
import { ComponentRef, useRef, useState, useEffect } from "react";
import type { SalesScript, ScriptStep } from "../utils/salesScripts"; // Import types

export default function ClientComponent({
  accessToken,
  selectedScript, // Prop to receive the selected script
}: {
  accessToken: string;
  selectedScript: SalesScript | null;
}) {
  const timeout = useRef<number | null>(null);
  const ref = useRef<ComponentRef<typeof Messages> | null>(null);
  const voice = useVoice(); // Use the useVoice hook

  const [currentScriptInternal, setCurrentScriptInternal] = useState<SalesScript | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isScriptActive, setIsScriptActive] = useState<boolean>(false);

  // Effect to initialize script when selectedScript prop changes
  useEffect(() => {
    if (selectedScript) {
      setCurrentScriptInternal(selectedScript);
      setCurrentStepIndex(0);
      setIsScriptActive(true);
      console.log("Script selected:", selectedScript);
    } else {
      setCurrentScriptInternal(null);
      setIsScriptActive(false);
      console.log("Script deselected");
    }
  }, [selectedScript]);

  // Effect to send initial prompt when call connects and script is active
  useEffect(() => {
    if (
      isScriptActive &&
      currentScriptInternal &&
      currentStepIndex === 0 &&
      voice.status.value === "connected" && // Ensure voice is connected
      currentScriptInternal.length > 0
    ) {
      console.log("Sending initial script prompt:", currentScriptInternal[0].prompt);
      voice.sendAssistantInput(currentScriptInternal[0].prompt);
    }
  }, [isScriptActive, currentScriptInternal, currentStepIndex, voice.status, voice.sendAssistantInput]);

  // optional: use configId from environment variable
  const configId = process.env['NEXT_PUBLIC_HUME_CONFIG_ID'];

  const handleUserMessage = (messageText: string) => {
    if (isScriptActive && currentScriptInternal && currentScriptInternal.length > currentStepIndex) {
      const currentStep = currentScriptInternal[currentStepIndex];
      const userResponseMatched = currentStep.userResponseOptions.some(option =>
        messageText.toLowerCase().includes(option.toLowerCase())
      );

      if (userResponseMatched) {
        const nextStepIndex = currentStepIndex + 1;
        if (nextStepIndex < currentScriptInternal.length) {
          console.log("User response matched. Advancing to next step:", nextStepIndex);
          setCurrentStepIndex(nextStepIndex);
          voice.sendAssistantInput(currentScriptInternal[nextStepIndex].prompt);
        } else {
          console.log("User response matched. Script finished.");
          setIsScriptActive(false); // End of script
        }
      } else {
        console.log("User response did not match script options. Bot responds freely.");
        setIsScriptActive(false); // Allow bot to respond freely if no match
      }
    }
    // If script is not active or no match, bot will respond based on its own logic (no explicit call needed here)
  };
  
  return (
    <div
      className={
        "relative grow flex flex-col mx-auto w-full overflow-hidden h-[0px]"
      }
    >
      <VoiceProvider
        auth={{ type: "accessToken", value: accessToken }}
        configId={configId}
        onMessage={(message) => { // Make sure to get the message object
          console.log("onMessage received:", message);
          if (message.type === "user_message" && message.message.role === "user" && typeof message.message.content === "string") {
            handleUserMessage(message.message.content);
          }

          // Auto-scrolling logic
          if (timeout.current) {
            window.clearTimeout(timeout.current);
          }
          timeout.current = window.setTimeout(() => {
            if (ref.current) {
              const scrollHeight = ref.current.scrollHeight;
              ref.current.scrollTo({
                top: scrollHeight,
                behavior: "smooth",
              });
            }
          }, 200);
        }}
      >
        <Messages ref={ref} />
        <Controls />
        <StartCall />
      </VoiceProvider>
    </div>
  );
}
