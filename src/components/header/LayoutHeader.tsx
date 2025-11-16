// src/layout/LayoutHeader.tsx

import { useState } from "react";
// Assuming the path imports are correct relative to this file
import TopBar from "./TopBar"; 
import Header from "./Header";

const LayoutHeader: React.FC = () => {
  // 1. Parent state managing the TopBar's current visibility status
  const [isTopbarVisible, setIsTopbarVisible] = useState(true);

  return (
    <>
      {/* 2. Conditionally render the TopBar based on state.
           If the TopBar is rendered, we pass the state setter function 
           (setIsTopbarVisible) directly, which the TopBar uses as 'setIsVisible'.
      */}
      {isTopbarVisible && (
        <TopBar 
          setIsVisible={setIsTopbarVisible} 
        />
      )}

      {/* 3. Header receives the current visibility status.
           The Header component uses this prop to apply CSS classes (e.g., headerShiftUp)
           to adjust its position when the TopBar is unmounted.
      */}
      <Header isTopbarVisible={isTopbarVisible} />

      {/* 4. NOTE: The fixed spacer div should be removed from here 
           and handled by CSS margins on the Header component itself 
           (as mentioned in the previous refactoring notes) to ensure 
           layout consistency without hardcoding height in the HTML structure.
      */}
    </>
  );
};

export default LayoutHeader;