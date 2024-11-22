// import React, { useState } from "react";
// import Footer from "./Footer";
// import CentralDisplay from "./CenterDisplay";

// const App: React.FC = () => {
//   const [selectedAtom, setSelectedAtom] = useState<string | null>(null);
//   const [dropPosition, setDropPosition] = useState<{ x: number; y: number } | null>(null);

//   const handleDragStart = (atomName: string) => {
//     setSelectedAtom(atomName);
//   };

//   const handleDrop = (e: React.DragEvent) => {
//     const rect = (e.target as HTMLDivElement).getBoundingClientRect();
//     const x = ((e.clientX - rect.left - rect.width / 2) / 50); // Scale down
//     const y = ((rect.height / 2 - (e.clientY - rect.top)) / 50);
//     setDropPosition({ x, y });
//   };

//   return (
//     <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
//       <div
//         style={{ flex: 1 }}
//         onDragOver={(e) => e.preventDefault()}
//         onDrop={handleDrop}
//       >
//         <CentralDisplay selectedAtom={selectedAtom} dropPosition={dropPosition} />
//       </div>
//       <Footer onDragStart={handleDragStart} />
//     </div>
//   );
// };

// export default App;


import React, { useState } from "react";
import Footer from "./Footer";
import CentralDisplay from "./CenterDisplay";

const App: React.FC = () => {
  const [atoms, setAtoms] = useState<{ name: string; position: { x: number; y: number } }[]>([]);
  const [selectedAtom, setSelectedAtom] = useState<string | null>(null);

  const handleDragStart = (atomName: string) => {
    setSelectedAtom(atomName);
  };

  const handleDrop = (e: React.DragEvent) => {
    const rect = (e.target as HTMLDivElement).getBoundingClientRect();
    const x = ((e.clientX - rect.left - rect.width / 2) / 50); // Scale down for the green div's size
    const y = ((rect.height / 2 - (e.clientY - rect.top)) / 50); // Inverse for correct placement
    if (selectedAtom) {
      setAtoms((prevAtoms) => [
        ...prevAtoms,
        { name: selectedAtom, position: { x, y } }, // Add new atom to the state with the new position
      ]);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <div
        style={{ flex: 1 }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <CentralDisplay atoms={atoms} />
      </div>
      <Footer onDragStart={handleDragStart} />
    </div>
  );
};

export default App;

