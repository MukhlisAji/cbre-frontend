import React, { Component } from 'react';

export default class ContactUpdate extends Component {
  handleButtonClick = () => {
    const url = "https://java-flow-2230.lightning.force.com/lightning/o/Account/new?count=1&nooverride=1&useRecordTypeCheck=1&navigationLocation=LIST_VIEW&uid=17194579848468312&backgroundContext=%2Flightning%2Fo%2FAccount%2Flist%3FfilterName%3DRecent";
    const popupWindow = window.open(url, 'ContactUpdatePopup', 'width=800,height=600,scrollbars=yes,resizable=yes');

    const monitorPopup = () => {
      try {
        if (popupWindow.location.href !== url) {
          popupWindow.location.href = url;
        }
      } catch (e) {
        // Catch cross-origin errors
      }

      if (popupWindow.closed) {
        clearInterval(interval);
      }
    };

    const interval = setInterval(monitorPopup, 1000); // Check every second
  }

  render() {
    return (
      <div>
        <h1>Contact Update</h1>
        <button onClick={this.handleButtonClick}>
          Open Contact Update
        </button>
      </div>
    );
  }
}
