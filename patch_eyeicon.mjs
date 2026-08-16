import fs from 'fs';
let content = fs.readFileSync('/app/applet/src/main.jsx', 'utf8');

const targetEye = `const EyeIcon = () => {`;
const replaceEye = `const EyeIcon = ({ color = "#00ffff" }) => {`;

content = content.replace(targetEye, replaceEye);

const targetPupil = `      <g
        filter="url(#glow)"
        transform={pupilTransform}
        style={{ transition: "transform 0.1s ease-out" }}
      >
        <circle
          cx="0"
          cy="0"
          r="35"
          fill="none"
          stroke="#00ffff"
          strokeOpacity="0.1"
          strokeWidth="1"
        />
        <circle cx="0" cy="0" r="25" fill="#00ffff" fillOpacity="0.1" />
        <circle cx="0" cy="0" r="12" fill="#00ffff" fillOpacity="0.25" />
        <circle cx="0" cy="0" r="7" fill="#00ffff" />
      </g>`;

const replacePupil = `      <g
        filter="url(#glow)"
        transform={pupilTransform}
        style={{ transition: "transform 0.1s ease-out" }}
      >
        <circle
          cx="0"
          cy="0"
          r="35"
          fill="none"
          stroke={color}
          strokeOpacity="0.1"
          strokeWidth="1"
        />
        <circle cx="0" cy="0" r="25" fill={color} fillOpacity="0.1" />
        <circle cx="0" cy="0" r="12" fill={color} fillOpacity="0.25" />
        <circle cx="0" cy="0" r="7" fill={color} />
      </g>`;

content = content.replace(targetPupil, replacePupil);
fs.writeFileSync('/app/applet/src/main.jsx', content);
