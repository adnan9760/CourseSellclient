import React, { useEffect, useState } from 'react';
import SubLecture from './SubLecture';

export default function LeatureAdd({ sectionName, sectionid ,currentCallState, onCallToggle }) {
  const [section, setSection] = useState([]);
  const [subsection, setSubsection] = useState([]);

  console.log("pressss1",currentCallState);
  return (
    <div>
      <SubLecture currentCallState={currentCallState} onCallToggle={onCallToggle} sectionName={sectionName} sectionid={sectionid} />
    </div>
  );
}
