import React from "react";

interface FooterProps {
  onDragStart: (atomName: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onDragStart }) => {
  const atoms = [
    { name: "Carbon", imageUrl: "/Images/CarbonAtom.png" },
    { name: "Hydrogen", imageUrl: "/Images/HydrogenAtom.png" },
    { name: "Oxygen", imageUrl: "/Images/OxygenAtom.png" },
  ];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        backgroundColor: "#1a1a1a",
      }}
    >
      {atoms.map((atom) => (
        <div
          key={atom.name}
          draggable
          onDragStart={(e) => {
            e.dataTransfer.setData("atomName", atom.name); // Pass data
            onDragStart(atom.name); // Not essential but provides feedback
          }}
          style={{
            width: "60px",
            height: "60px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "grab",
            margin: "0 10px",
          }}
        >
          <img
            src={atom.imageUrl}
            alt={atom.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              borderRadius: "50%",
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default Footer;
