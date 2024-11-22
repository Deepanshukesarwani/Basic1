import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

interface CentralDisplayProps {
  atoms: { name: string; position: { x: number; y: number } }[];
}

type AtomType = "Carbon" | "Hydrogen" | "Oxygen"; // Define valid atom types

const valenceData: Record<AtomType, { color: string; freeElectrons: number }> = {
  Carbon: { color: "gray", freeElectrons: 4 },
  Hydrogen: { color: "white", freeElectrons: 1 },
  Oxygen: { color: "red", freeElectrons: 2 },
};

const CentralDisplay: React.FC<CentralDisplayProps> = ({ atoms }) => {
  // Function to create free valence electrons
  const renderFreeElectrons = (freeElectrons: number) => {
    const electronDots = [];
    const radius = 1.6; // Distance from the center of the atom
    for (let i = 0; i < freeElectrons; i++) {
      const angle = (i / freeElectrons) * Math.PI * 2;
      electronDots.push(
        <mesh key={i} position={[radius * Math.cos(angle), radius * Math.sin(angle), 0]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="orange" />
        </mesh>
      );
    }
    return electronDots;
  };

  return (
    <div style={{ width: "50vw", height: "400px", backgroundColor: "black" }}>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls />
        
        {atoms.map((atom, index) => {
          const { color, freeElectrons } = valenceData[atom.name as AtomType];
          return (
            <mesh key={index} position={[atom.position.x, atom.position.y, 0]}>
              <sphereGeometry args={[1, 32, 32]} />
              <meshStandardMaterial color={color} />
              {/* Free Valence Electrons */}
              {renderFreeElectrons(freeElectrons)}
            </mesh>
          );
        })}
      </Canvas>
    </div>
  );
};

export default CentralDisplay;
