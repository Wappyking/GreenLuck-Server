function emailTemplate(greeting, message) {
  var date = new Date();
  // const date = new Date()

  return `<div
      style="
        width: 100vw;
        height: auto;
        border-color: #016401;
        border-width: 10px;
        border-style: double;
        background-color: rbg;
      "
    >
      <div
        style="
          background-color: white;
          justify-content: center;
          padding: 10px;
          
          flex-direction: column;
          align-items: center;
        "
      >
        <div  style="
          background-color: white;
          justify-content: center;
          padding: 10px;
          border-bottom-width: 10px;
          border-bottom-color: #016401;
          border-bottom-style: solid;
          flex-direction: column;
          align-items: center;
        ">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/green-luck-34362.appspot.com/o/full_trimmed_transparent_customcolor.png?alt=media&token=d97183cc-8720-4e66-af74-9d42ac093696"
            style="color: #003366; height: 75px; width: 75px;"
          />
        </div>
        <div style="
          
          border-bottom-width: 10px;
          border-bottom-color: #016401;
          border-bottom-style: solid;
          flex-direction: column;
          align-items: center;
          
        ">
          <h6 style="font-size: large; color: black">${greeting},</h6>
          <div style="text-align:start">${message}<br><br></div>
        </div>
        <div style="
          display:flex;
          height: auto;
          flex-direction: row;
          align-items: center;
          text-align:center;
        "><br>
          <h6 style="font-size: 15px; color: black; text-align: center"> <span style="color: black">For more information</span>
          <a href="http://www.mistip.com"
            target="_blank" style=" color: #016401; font-size: bold;">Visit website</a><br><span style="color: black">Copyright - Green Luck Tips Limited - RC-7169156</span><br> ${date}</h6>
          
          
        </div>
      </div>

      
    </div>`;
}

module.exports = { emailTemplate };
