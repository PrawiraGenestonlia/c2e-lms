import React, { useEffect } from 'react';
import logo from './logo.svg';
import ScormAPI from './scormPlayer';
import './App.css';

window.API = new ScormAPI();
window.API.apiLogLevel = 1;
// ScormAPI.call();

const saveCMI = () => {
  console.log("syncing data...");
  localStorage.setItem('cmi', JSON.stringify(window.API.cmi.toJSON()));
}

const loadCMI = () => {
  window.API.loadFromJSON(JSON.parse(localStorage.getItem('cmi')));
}

const scormOnOpen = () => {
  window.API.reset();
  window.API = new ScormAPI();
  window.API.apiLogLevel = 1;
  window.API.on('LMSSetValue', () => {
    saveCMI();
  });
  window.API.cmi.core.student_id = "12345";
  window.API.cmi.core.student_name = "Prawira";
  loadCMI();
}

const scormOnClose = () => {
  window.API.on("LMSFinish", (e) => {
    saveCMI();
    window.API.reset();
    console.log("LMS API RESETTED ==============================" + new Date().toLocaleTimeString());
    scormOnClose();
  });
}


function App() {
  // Scorm.LMSInitialize();
  useEffect(() => {
    scormOnClose();


  }, []);

  const onLinkClick = (course) => {
    scormOnOpen();
    window.open(course, 'LMS', 'width=600,height=400');
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          SCORM PLAYER DEMO (LMS ENVIRONMENT)
        </p>
        <div style={{ color: 'cyan' }} onClick={onLinkClick('/employee-health-scorm/scormdriver/indexAPI.html')}>
          Click here to open course employee wellness
        </div>
      </header>
    </div>
  );
}

export default App;
