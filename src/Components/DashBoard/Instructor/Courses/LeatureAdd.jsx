import React, { useEffect, useState } from 'react';
import SubLecture from './SubLecture';

export default function LeatureAdd({ sectionName, sectionid }) {
  const [section, setSection] = useState([]);
  const [subsection, setSubsection] = useState([]);

  return (
    <div>
      <SubLecture sectionName={sectionName} sectionid={sectionid} />
    </div>
  );
}
