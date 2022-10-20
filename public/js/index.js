import "./language.js";

var UUID = null;
var font = "LexieReadable";
var bgcolor = "#f9f8ec"
var spacing = "high"
var creationTime= "testing"
var creationHour= "testing"
var previous_blob_uri = null;
var pdf = {
  pdf_document: null,
  scale: 2,
  canvas_loaded: false,
  element: null,
  X_pos: 0,
  Y_pos: 0,
};

var isFirstLoad = true;
var PDFJS = null;
var pdfjsWorker = null;
var version = "1.2.05";
const dictionary = getDictionary();

Object.defineProperty(pdf, "isReady", {
  set: function (params) {
    pdf["canvas_loaded"] = params;
    if (params) pdf["element"].scrollTo(pdf["X_pos"], pdf["Y_pos"]);
  },
});

window.onload = function () {
  setMinDate();

  if (isFirstLoad) {
    cleanUserPictures(); //TODO: Arreglar para que solo elimine en la primera carga
    isFirstLoad = false;
  }

  document.querySelector(
    "#upper_button_section > div:nth-child(1) > div > button"
  ).innerText =
    dictionary["enable_disable"][document.querySelector("html").lang];

  change_language(document.querySelector("html").lang);

  let intervalId;
  const update_period = 0.5 * 60000; // num * minutos
  let checkbox = document.getElementById("autoreload_pdf");

  //Generate random UUID
  if (document.cookie === "" || !document.cookie.includes("UUID")) {
    UUID = (function () {
      var self = {};
      var lut = [];
      for (var i = 0; i < 256; i++) {
        lut[i] = (i < 16 ? "0" : "") + i.toString(16);
      }
      self.generate = function () {
        var d0 = (Math.random() * 0xffffffff) | 0;
        var d1 = (Math.random() * 0xffffffff) | 0;
        var d2 = (Math.random() * 0xffffffff) | 0;
        var d3 = (Math.random() * 0xffffffff) | 0;
        return (
          lut[d0 & 0xff] +
          lut[(d0 >> 8) & 0xff] +
          lut[(d0 >> 16) & 0xff] +
          lut[(d0 >> 24) & 0xff] +
          "-" +
          lut[d1 & 0xff] +
          lut[(d1 >> 8) & 0xff] +
          "-" +
          lut[((d1 >> 16) & 0x0f) | 0x40] +
          lut[(d1 >> 24) & 0xff] +
          "-" +
          lut[(d2 & 0x3f) | 0x80] +
          lut[(d2 >> 8) & 0xff] +
          "-" +
          lut[(d2 >> 16) & 0xff] +
          lut[(d2 >> 24) & 0xff] +
          lut[d3 & 0xff] +
          lut[(d3 >> 8) & 0xff] +
          lut[(d3 >> 16) & 0xff] +
          lut[(d3 >> 24) & 0xff]
        );
      };
      return self;
    })();
    UUID = UUID.generate();
    //Store the UUID in a 4 hour cookie
    console.log("UUID:", UUID);
    document.cookie =
      "UUID=" +
      UUID +
      "; expires=" +
      new Date(Date.now() + 4 * 3600 * 1000).toString();
  } else {
    UUID = document.cookie.replace("UUID=", "");
  }

  //Store variable in window session for future access or reloads
  if (checkbox.id in window.sessionStorage) {
    checkbox.checked = eval(window.sessionStorage.getItem(checkbox.id));
  } else {
    checkbox.checked = true;
  }

  //Activate auto reload
  if (checkbox.checked)
    intervalId = window.setInterval(reloadPDF, update_period);

  //Monitor the change in the value of the checkbox
  checkbox.addEventListener("change", function () {
    window.sessionStorage.setItem(checkbox.id, checkbox.checked);
    if (checkbox.checked) {
      intervalId = window.setInterval(reloadPDF, update_period);
    } else {
      window.clearInterval(intervalId);
    }
  });

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        //Avoid submiting form
        event.preventDefault();
        event.stopPropagation();

        form.classList.add("was-validated");
      },
      false
    );
  });

  document.getElementById("mainForm").addEventListener(
    "submit",
    function (event) {
      //Avoid submiting form
      event.preventDefault();
      event.stopPropagation();
    },
    false
  );
  // Manage section visibility

  //Other cultural activity field
  document
    .querySelector("#validationTipoActividadCultural")
    .addEventListener("change", function (e) {
      if (e.target.selectedIndex === e.target.length - 1) {
        var textarea = document.querySelector(
          "#validationTipoActividadCulturalTextArea"
        );
        textarea.hidden = false;
        textarea.required = true;
      } else {
        var textarea = document.querySelector(
          "#validationTipoActividadCulturalTextArea"
        );
        textarea.hidden = true;
        textarea.removeAttribute("required");
      }

      const selected_Activity_type = document
        .querySelector("#validationTipoActividadCultural")
        .selectedOptions[0].getAttribute("translation");

      if (selected_Activity_type == "online_event") {
        const physical_location_elements =
          document.getElementsByClassName("physical-location");
        const online_location_elements =
          document.getElementsByClassName("online-location");

        for (const element of online_location_elements) {
          element.style.display = "block"; //block for showing it
        }

        for (const element of physical_location_elements) {
          element.style.display = "none"; //block for showing it
        }
      } else {
        const physical_location_elements =
          document.getElementsByClassName("physical-location");
        const online_location_elements =
          document.getElementsByClassName("online-location");

        for (const element of online_location_elements) {
          element.style.display = "none"; //block for showing it
        }

        for (const element of physical_location_elements) {
          element.style.display = "block"; //block for showing it
        }
      }
    });

  // Max number of chars in activity_name
  document
    .getElementById("validationActivityName")
    .addEventListener("input", ({ currentTarget: target }) => {
      const maxLength = target.getAttribute("maxlength");
      const currentLength = target.value.length;
      document.getElementById("current-activity_name-chars").innerText =
        currentLength;
      if (currentLength == maxLength) {
        document.getElementById("count-chars-activity_name").style.color =
          "red";
      } else {
        document.getElementById("count-chars-activity_name").style.color =
          "black";
      }
    });
  // Max number of chars in short_description
  document
    .getElementById("validationShortDescription")
    .addEventListener("input", ({ currentTarget: target }) => {
      const maxLength = target.getAttribute("maxlength");
      const currentLength = target.value.length;
      document.getElementById("current-short_description-chars").innerText =
        currentLength;
      if (currentLength == maxLength) {
        document.getElementById("count-chars-short_description").style.color =
          "red";
      } else {
        document.getElementById("count-chars-short_description").style.color =
          "black";
      }
    });

  // Max number of chars in ashort_description
  document
    .getElementById("validationInformacionPrevia")
    .addEventListener("input", ({ currentTarget: target }) => {
      const maxLength = target.getAttribute("maxlength");
      const currentLength = target.value.length;
      document.getElementById("current-before_going_info-chars").innerText =
        currentLength;
      if (currentLength == maxLength) {
        document.getElementById("count-chars-before_going_info").style.color =
          "red";
      } else {
        document.getElementById("count-chars-before_going_info").style.color =
          "black";
      }
    });

  // Max number of chars in ashort_description
  document
    .getElementById("validationInformacionExtra")
    .addEventListener("input", ({ currentTarget: target }) => {
      const maxLength = target.getAttribute("maxlength");
      const currentLength = target.value.length;
      document.getElementById("current-give_extra_info-chars").innerText =
        currentLength;
      if (currentLength == maxLength) {
        document.getElementById("count-chars-give_extra_info").style.color =
          "red";
      } else {
        document.getElementById("count-chars-give_extra_info").style.color =
          "black";
      }
    });

  // Language button event
  document
    .querySelector("#languageSelector")
    .addEventListener("click", function (e) {
      var html = document.querySelector("html");
      var previous_lang = html.lang;
      if (e.target.attributes["value"].value === "english") {
        html.lang = "en";
      } else if (e.target.attributes["value"].value === "spanish") {
        html.lang = "es";
      } else if (e.target.attributes["value"].value === "galician") {
        html.lang = "gl";
      } else if (e.target.attributes["value"].value === "icelandic") {
        html.lang = "is";
      } else if (e.target.attributes["value"].value === "polish") {
        html.lang = "pl";
      } else if (e.target.attributes["value"].value === "portuguese") {
        html.lang = "pt";
      } else if (e.target.attributes["value"].value === "ukrainian") {
        html.lang = "uk";
      }
      if (previous_lang !== html.lang) {
        change_language(html.lang);
        reloadPDF(); //reload automatically on language changes
      }
    });

  // Font selection button event
  document
    .querySelector("#fontSelector")
    .addEventListener("click", function (e) {
      font = e.target.attributes["value"].value;
      reloadPDF(); //reload automatically on font changes
    });



  // Background color selection button event
  document
    .querySelector("#bgcolorSelector")
    .addEventListener("click", function (e) {
      bgcolor = e.target.attributes["value"].value;
      reloadPDF(); //reload automatically on font changes
    });


  // Spacing color selection button event
  document
    .querySelector("#spacingSelector")
    .addEventListener("click", function (e) {
      spacing = e.target.attributes["value"].value;
      reloadPDF(); //reload automatically on font changes
    });




  // Functionality of reload pdf button
  document
    .querySelector("#reload_pdf_button")
    .addEventListener("click", function (e) {
      reloadPDF();
    });

  // Functionality of download pdf button
  document
    .querySelector("#download_pdf_button")
    .addEventListener("click", function (e) {
      let form = document.getElementById("mainForm");
      if (form.checkValidity()) {
        reloadPDF(true);
      } else {
        let modal = document.getElementById("modal_download");
        modal.style.display = "block";
        document
          .getElementById("button_yes")
          .addEventListener("click", buttonYesHandler);
        document
          .getElementById("button_no")
          .addEventListener("click", function (e) {
            modal.style.display = "none";
            document.getElementById("submit").click();
          });
        document
          .getElementById("modal_close")
          .addEventListener("click", function (e) {
            modal.style.display = "none";
          });
      }
    });

  // Event listener to reset form button
  document
    .getElementById("clear_form_button")
    .addEventListener("click", function (e) {
      document.getElementById("mainForm").reset();
    });

  /*  
  document
    .getElementById("sample_fill_form")
    .addEventListener("click", function (e) {
      //TODO fills the form with sample information for debugging/demonstration purposes

      //Set activity_type
      document.getElementById("validationTipoActividadCultural").value =
        dictionary["museum"][document.querySelector("html").lang];
      //document.getElementById("validationTipoActividadCultural").value = "Museo";

      //Set activity_name
      document.getElementById("validationActivityName").value =
        "Coordenadas 2022 - Diálogos Literarios da Fundación Casares";
      //Set activity_description
      document.getElementById("validationShortDescription").value =
        "Encontro literario, artístico e musical ao redor da figura da poesía clásica, en homenaxe a Helena Villar, Carlos Casares e Begoña Caamaño.";
      //Set open days (Mon to Fri)
      document.getElementById("monday_checkbox").checked = true;
      document.getElementById("tuesday_checkbox").checked = true;
      document.getElementById("wednesday_checkbox").checked = true;
      document.getElementById("thursday_checkbox").checked = true;
      document.getElementById("friday_checkbox").checked = true;

      //Set morning hours
      document.getElementById("opening_hour_morning").value = "10";
      document.getElementById("opening_minute_morning").value = "00";
      document.getElementById("opening_period_morning").value = "am";
      document.getElementById("closing_hour_morning").value = "1";
      document.getElementById("closing_minute_morning").value = "30";
      document.getElementById("closing_period_morning").value = "pm";

      //Set afternoon hours
      document.getElementById("opening_hour_afternoon").value = "4";
      document.getElementById("opening_minute_afternoon").value = "00";
      document.getElementById("opening_period_afternoon").value = "pm";
      document.getElementById("closing_hour_afternoon").value = "8";
      document.getElementById("closing_minute_afternoon").value = "00";
      document.getElementById("closing_period_afternoon").value = "pm";

      //Set street
      document.getElementById("validationCalle").value = "Sample Street";
      document.getElementById("validationNumero").value = "00";
      document.getElementById("validationCP").value = "36213";
      document.getElementById("validationCiudad").value = "Vigo";
      document.getElementById("validationPais").value = "Spain";

      //Set how to get there

      document.getElementById("validationTaxi").checked = true;
      document.getElementById("validationCoche").checked = true;
      document.getElementById("validationAutobus").checked = true;
      document.getElementById("validationBusLines").value = "Line A";
      document.getElementById("validationBusTimetable").value =
        "Every hour (starting 8:00 AM)";

      document.getElementById("validationMetro").checked = true;
      document.getElementById("validationMetroLines").value = "Line A";
      document.getElementById("validationMetroTimetable").value =
        "Every 30 mins";

      document.getElementById("validationAparcamiento").checked = true;
      document.getElementById("validationNumPlazas").value = 60;
      document.getElementById("validationPrecioPlazas").value = 10;
      document.getElementById("validationPlazasMinusvalidos").value = 60;
      document.getElementById("validationPrecioPlazasMinusvalidos").value = 0;

      //Ticket info
      document.getElementById("validationOnline").checked = true;
      document.getElementById("validationOnlineTextarea").value =
        "https://desire.webs.uvigo.es/proyectos/allure/";

      document.getElementById("validationOnsite").checked = true;
      document.getElementById("validationOnsiteTextarea").value =
        "Museum entry";

      //Price
      document.getElementById("validationPrecio").value = "10";
      document.getElementById("validationPrecioCoin").value = "€";

      //Reduced price
      document.getElementById("validationPrecioReducido").checked = true;
      document.getElementById("validationPrecioReducidoTextarea").value = "5";
      document.getElementById("validationPrecioReducidoCoin").value = "€";

      document.getElementById("validationPrecioFamilia").checked = true;
      document.getElementById("validationPrecioFamiliaExtra").value = "5";
      document.getElementById("validationPrecioFamiliaExtraCoin").value = "€";
      document.getElementById("validationMaxEdadNinhos").value = "10";
      document.getElementById("validationMaxNumNinhos").value = "3";
      document.getElementById("validationPrecioInterprete").checked = true;
      document.getElementById("validationOtroTipoDescuentoNo").checked = true;

      //Other facilities
      document.getElementById("validation_accessible_areas").checked = true;
      document.getElementById("validation_lifts").checked = true;
      document.getElementById("validation_toilets").checked = true;
      document.getElementById("validation_disabled_toilets").checked = true;
      document.getElementById("validation_changing").checked = true;
      document.getElementById("validation_cloakrooms").checked = true;
      document.getElementById("validation_blind_paths").checked = true;
      document.getElementById("validation_interpreters").checked = true;
      document.getElementById("validation_heats").checked = true;
      document.getElementById("validation_air_condition").checked = true;
      document.getElementById("validation_chairs_rest").checked = true;
      document.getElementById("validation_interactive_objects").checked = true;

      document.getElementById(
        "validation_availability_assistant"
      ).checked = true;
      document.getElementById(
        "validation_soundproofing_headphones"
      ).checked = true;
      document.getElementById(
        "validation_quiet_relaxation_room"
      ).checked = true;

      //Guides
      document.getElementById("validation_sign_guides").checked = true;
      document.getElementById("validation_audible_guides").checked = true;
      document.getElementById("validation_braille_guides").checked = true;
      document.getElementById("validation_pictogram_guides").checked = true;
      document.getElementById(
        "validation_easy_vocabulary_guides"
      ).checked = true;
      document.getElementById("validation_different_languages").checked = true;

      document.getElementById("validationVisitasPrivadas").checked = true;
      document.getElementById(
        "validationDuracionVisitaPrivadaCiudad"
      ).value = 120;
      document.getElementById("validationPrecioVisitaPrivada").value = 40;
      document.getElementById("validationPrecioVisitaPrivadaCoin").value = "€";

      //Allowed actions

      document.getElementById("validation_photographs_allowed").checked = true;
      document.getElementById("validation_flash_allowed").checked = true;
      document.getElementById("validation_recording_allowed").checked = true;
      document.getElementById("validation_cafeteria_bar").checked = true;
      document.getElementById("validation_cantina").checked = true;
      document.getElementById("validation_food_drink_allowed").checked = true;
      document.getElementById("validation_bring_own_food").checked = true;
      document.getElementById("validation_backpacks_allowed").checked = true;
      document.getElementById("validation_shop").checked = true;

      //COVID-19 restrictions
      document.getElementById("validation_wear_mask").checked = true;
      document.getElementById("validation_hand_sanitizer").checked = true;
      document.getElementById("validation_temperature_control").checked = true;
      document.getElementById("validation_social_distance").checked = true;
      document.getElementById("validation_cantina").checked = true;
      document.getElementById("validation_handwashing").checked = true;

      //Necesario llevar mascarillas y certificado de vacunacion
      document.getElementById("validationInformacionPrevia").text =
        "This is a sample text containing more_info about the event, the length is limited to 105 characters.";
      document.getElementById("validationInformacionExtra").text =
        "This is a sample text containing extra_info about the event, the length is limited to 105 characters.";
      document.getElementById("validationVisitasVirtualesNo").checked = true;

    });*/

  document.getElementById("zoom_in").addEventListener("click", (e) => {
    pdf["scale"] += 0.1;
    render();
  });

  document.getElementById("zoom_out").addEventListener("click", (e) => {
    pdf["scale"] -= 0.1;
    render();
  });

  //first relaod
  reloadPDF();

  //Horizontal drag menu
  dragElement(document.getElementById("separator"), "H");

  //Schedule

  radio_hidden(
    "#validationFechaEspecifica",
    "Yes",
    "#validationFechaEspecificaHidden",
    ["#validationFechaInicioDatePicker", "#validationFechaFinDatePicker"]
  );

  //Parking information
  checkbox_hidden("#validationAutobus", "#extraBusInformation", [
    "#validationBusLines",
    "#validationBusTimetable",
  ]);
  checkbox_hidden("#validationMetro", "#extraMetroInformation", [
    "#validationMetroLines",
    "#validationMetroTimetable",
  ]);
  checkbox_hidden("#validationAparcamiento", "#extraparkingInformation", [
    "#validationNumPlazas",
    "#validationPrecioPlazas",
    "#validationPlazasMinusvalidos",
    "#validationPrecioPlazasMinusvalidos",
  ]);

  // Price options
  checkbox_hidden(
    "#validationPrecioReducido",
    "#validationPrecioReducidoHidden",
    ["#validationPrecioReducidoTextarea"]
  );
  checkbox_hidden(
    "#validationPrecioFamilia",
    "#precioFamiliaExtraInformation",
    [
      "#validationPrecioFamiliaExtra",
      "#validationMaxNumNinhos",
      "#validationMaxEdadNinhos",
    ]
  );
  checkbox_hidden("#validationOtroTipoDescuento", "#otroTipoDescuentohidden", [
    "#validationTipoDescuentoTextarea",
  ]);

  //Buy tickets options
  checkbox_hidden("#validationOnline", "#validationOnlineTextareahidden");
  checkbox_hidden("#validationOnsite", "#validationOnsiteTextareahidden");

  // Private guides extra information options
  checkbox_hidden(
    "#validation_private_tours",
    "#privateguideExtraInformation",
    ["#validationDuracionVisitaPrivadaCiudad", "#validationPrecioVisitaPrivada"]
  );

  // Virtual tour options
  radio_hidden(
    "#validationVisitasVirtuales",
    "Yes",
    "#validationVisitasVirtualesTextArea"
  );

  //Clean all user_photographs

  async function deleteBanner() {
    //sends delete request to the node js server

    try {
      const response = await fetch("/deleteBanner", {
        method: "GET",
      });
      //console.log("[DEBUG RESPONSE]: ", response);
    } catch (err) {
      console.log(err);
    }
    return;
  }
  

  async function cleanUserPictures() {
    //sends delete request to the node js server

    try {
      const response = await fetch("/deleteUserPhotos", {
        method: "GET",
      });
      //console.log("[DEBUG RESPONSE]: ", response);
    } catch (err) {
      console.log(err);
    }
    return;
  }
  //DRAG AND DROP FUNCTIONALITY FOR BANNER IMAGE UPLOAD
  const dragAreaBanner = document.querySelector(".drag-area-banner");
  const dragTextBanner = dragAreaBanner.querySelector("h2");
  const buttonBanner = dragAreaBanner.querySelector("button");
  const inputBanner = dragAreaBanner.querySelector("#input-files");
  let banner_file;

  buttonBanner.addEventListener("click", function (e) {
    inputBanner.click();
  });

  inputBanner.addEventListener("change", function (e) {
    banner_file = this.files;
    dragAreaBanner.classList.add("active");

    showFiles(banner_file, "banner");
    dragAreaBanner.classList.remove("active");
  });

  dragAreaBanner.addEventListener("dragover", function (e) {
    e.preventDefault();
    dragAreaBanner.classList.add("active");
    dragTextBanner.textContent = "Drop to upload files";
  });

  dragAreaBanner.addEventListener("dragleave", function (e) {
    e.preventDefault();
    dragAreaBanner.classList.remove("active");
    dragTextBanner.textContent = "Drop files here...";
  });

  dragAreaBanner.addEventListener("drop", function (e) {
    e.preventDefault();
    dragAreaBanner.classList.remove("active");
    dragTextBanner.textContent = "Drop files here...";
    banner_file = e.dataTransfer.files;
    showFiles(banner_file, "banner");
  });

  //DRAG AND DROP FUNCTIONALITY FOR LOGO IMAGE UPLOAD
  const dragArea = document.querySelector(".drag-area");
  const dragText = dragArea.querySelector("h2");
  const button = dragArea.querySelector("button");
  const input = dragArea.querySelector("#input-files");
  let files;

  button.addEventListener("click", function (e) {
    input.click();
  });

  input.addEventListener("change", function (e) {
    files = this.files;
    dragArea.classList.add("active");
    showFiles(files, "logo");
    dragArea.classList.remove("active");
  });

  dragArea.addEventListener("dragover", function (e) {
    e.preventDefault();
    dragArea.classList.add("active");
    dragText.textContent = "Drop to upload files";
  });

  dragArea.addEventListener("dragleave", function (e) {
    e.preventDefault();
    dragArea.classList.remove("active");
    dragText.textContent = "Drop files here...";
  });

  dragArea.addEventListener("drop", function (e) {
    e.preventDefault();
    dragArea.classList.remove("active");
    dragText.textContent = "Drop files here...";
    files = e.dataTransfer.files;
    showFiles(files, "logo");
  });

  function showFiles(files, type) {
    console.log("[DEBUG FILES]: ", files)
    if (files.length === undefined) {
      processFile(files, type);
    } else {
      for (const file of files) {
        console.log("file:",file.name)

          processFile(file, type);

        
        
      }
    }
  }

  function processFile(file, type) {
    const docType = file.type;
    const validExtensions = ["image/png", "image/jpeg", "image/jpg"];

    if (validExtensions.includes(docType)) {
      //valid file extension
      
      const fileReader = new FileReader();
      const id = "file" + Math.floor(Math.random() * 10000000).toString();//Date.now().toString();

      if (type == "logo") {
        fileReader.addEventListener("load", function (e) {
          const fileUrl = fileReader.result;
          const image = `<div id="${id}" class="file-container">
                      <img src="${fileUrl}" alt="${file.name}" width="150px"/>
                      <div class="status">
                          <span>${file.name}</span>
                          <span class="status-text">Uploading...</span>
                      </div>
                  </div>`;

            const html = document.querySelector("#preview").innerHTML;
            document.querySelector("#preview").innerHTML = image + html;
          uploadFile(file, id, type);
        });
      }else if (type == "banner") {
        fileReader.addEventListener("load", function (e) {
          const fileUrl = fileReader.result;
          const image = `<div id="${id}" class="file-container">
                      <img src="${fileUrl}" alt="${file.name}" width="150px"/>
                      <div class="status">
                          <span>${file.name}</span>
                          <span class="status-text">Uploading...</span>
                      </div>
                  </div>`;

            const html = document.querySelector("#preview-banner").innerHTML;
            document.querySelector("#preview-banner").innerHTML = image;
          uploadFile(file, id, type);
        });
      }
      
      fileReader.readAsDataURL(file);
    } else {
      console.log("invalid extension")
      //invalid extension
    }
  }

  async function uploadFile(file, id, type) {
    const formData = new FormData();
    formData.append("file", file);
    const preview = document.querySelector(`#preview`);

    try {
      if (type == "logo") {
        const preview = document.querySelector(`#preview`);
        console.log("[DEBUG] uploading:",file.name)

        const response = await fetch("/uploadLogoImage", {
          method: "POST",
          body: formData,
        });
        //console.log("[DEBUG RESPONSE]: ", response);
        document.querySelector(`#${id} .status-text`).innerHTML =
          '<span class="success"> File uploaded correctly </span>' +
          `<button type="button" id =button${id} class="btn-close" aria-label="Close"></button>`;

        console.log("[DEBUG] uploading2:",file.name)


        document
          .getElementById(`button${id}`)
          .addEventListener("click", function (e) {
            setTimeout(() => {
              console.log("borrando imagen:", document.getElementById(`${id}`).getElementsByTagName('span')[0].innerHTML)
              sendRequest('/deleteLogo', 'POST', {"logo_name":document.getElementById(`${id}`).getElementsByTagName('span')[0].innerHTML},document.querySelector("html").lang);
            
            document.getElementById(`${id}`).outerHTML = "";
            }, 1000)
            
            
            

          });

      } else if (type == "banner") {
        const preview = document.querySelector(`#preview-banner`);
        console.log("[DEBUG] uploading:",file)
        const response = await fetch("/uploadBannerImage", {
          method: "POST",
          body: formData,
        });
        //console.log("[DEBUG RESPONSE]: ", response);
        document.querySelector(`#${id} .status-text`).innerHTML =
          '<span class="success"> File uploaded correctly  </span>' +
          `<button type="button" id =button${id} class="btn-close" aria-label="Close"></button>`;
        //
        document
          .getElementById(`button${id}`)
          .addEventListener("click", function (e) {
            document.getElementById(`${id}`).outerHTML = "";
            deleteBanner();
            
          });
      }
    } catch (err) {
      document.querySelector(`#${id} .status-text`).innerHTML =
        '<span class="failure"> Failed to upload file </span>';
    }
  }
};

function buttonYesHandler() {
  document
    .getElementById("button_yes")
    .removeEventListener("click", buttonYesHandler);
  reloadPDF(true);
  document.getElementById("modal_download").style.display = "none";
}

function callGetDocument(response, element = null, positions = [0, 0]) {
  /*if (pdfjsWorker !== null && pdfjsWorker !== undefined){
        pdfjsWorker.destroy()
    }*/
  PDFJS = window["pdfjs-dist/build/pdf"];
  if (pdfjsWorker === null || pdfjsWorker === undefined) {
    pdfjsWorker = new PDFJS.PDFWorker("AllureWorker");
  }
  PDFJS.getDocument({ url: response, worker: pdfjsWorker }).promise.then(
    function (pdf_v) {
      pdf["isReady"] = false;
      pdf["pdf_document"] = pdf_v;
      pdf["element"] = element;
      pdf["X_pos"] = positions[0];
      pdf["Y_pos"] = positions[1];
      render();
      //Place the scroll in the same position
    }
  );
}

function render() {
  let viewer = document.getElementById("canvas_container");
  viewer.replaceChildren();
  for (let page = 1; page <= pdf["pdf_document"].numPages; page++) {
    let canvas = document.createElement("canvas");
    canvas.className = "pdf_renderer";
    canvas.scale = pdf["scale"];
    viewer.appendChild(canvas);
    renderPage(page, canvas);
  }
}

function renderPage(pageNumber, canvas) {
  pdf["pdf_document"].getPage(pageNumber).then(function (page) {
    let viewport = page.getViewport({ scale: pdf["scale"] });
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    page.render({ canvasContext: canvas.getContext("2d"), viewport: viewport });
    if (pdf["pdf_document"].numPages === pageNumber) pdf["isReady"] = true;
  });
}

/**
 * Hidden element depending on radio selection
 *
 * @param {string} id_selector radio id (#id_radio)
 * @param {string} value_hide Value of the radio to hide the content
 * @param {string} id_hidden id of the field to be hide.
 * @param {Array} elements_required List of ids to set or delete the required attribute.
 *
 */
function radio_hidden(
  id_selector,
  value_hide,
  id_hidden,
  elements_required = []
) {
  var menu = document.querySelectorAll(id_selector);
  for (var i = 0; i < menu.length; i++) {
    menu[i].addEventListener("change", function (e) {
      if (e.target.value === value_hide) {
        var menu_hide = document.querySelector(id_hidden);
        menu_hide.hidden = false;
        if (elements_required.length) {
          for (let element of elements_required) {
            document.querySelector(element).required = true;
          }
        }
      } else {
        var menu_hide = document.querySelector(id_hidden);
        menu_hide.hidden = true;
        if (elements_required.length) {
          for (let element of elements_required) {
            document.querySelector(element).removeAttribute("required");
          }
        }
      }
    });
  }
}

function checkbox_hidden(id_selector, id_hidden, elements_required = []) {
  var menu = document.querySelectorAll(id_selector);

  for (var i = 0; i < menu.length; i++) {
    menu[i].addEventListener("change", function (e) {
      if (e.target.checked == true) {
        console.log(2);

        var menu_hide = document.querySelector(id_hidden);
        menu_hide.hidden = false;
        if (elements_required.length) {
          for (let element of elements_required) {
            document.querySelector(element).required = true;
          }
        }
      } else {
        var menu_hide = document.querySelector(id_hidden);
        menu_hide.hidden = true;
        if (elements_required.length) {
          for (let element of elements_required) {
            document.querySelector(element).removeAttribute("required");
          }
        }
      }
    });
  }
}

function setMinDate() {
  var now = new Date();

  var day = ("0" + now.getDate()).slice(-2);
  var month = ("0" + (now.getMonth() + 1)).slice(-2);

  var today = day + "-" + month + "-" + now.getFullYear();

  $("#validationFechaInicioDatePicker").val(today);
  $("#validationFechaInicioDatePicker").attr("min", today); //validationFechaFinDatePicker
  $("#validationFechaFinDatePicker").attr("min", today);
}

function dragElement(element, direction) {
  var md; // remember mouse down info
  const first = document.getElementById("col-form-layout-first");
  let second = document.getElementById("col-form-layout-second");
  element.onmousedown = onMouseDown;

  function onMouseDown(e) {
    md = {
      e,
      offsetLeft: element.offsetLeft,
      offsetTop: element.offsetTop,
      firstWidth: first.offsetWidth,
      secondWidth: second.offsetWidth,
    };

    document.onmousemove = onMouseMove;
    document.onmouseup = () => {
      document.onmousemove = document.onmouseup = null;
    };
  }

  function onMouseMove(e) {
    //console.log("mouse move: " + e.clientX);
    var delta = {
      x: e.clientX - md.e.clientX,
      y: e.clientY - md.e.clientY,
    };

    if (direction === "H") {
      // Horizontal
      // Prevent negative-sized elements
      delta.x = Math.min(Math.max(delta.x, -md.firstWidth), md.secondWidth);
      element.style.left = md.offsetLeft + delta.x + "px";
      first.style.width = md.firstWidth + delta.x + "px";
      second.style.width = md.secondWidth - delta.x + "px";
    }
  }
}

//Checking and configuring form data before sending
async function reloadPDF(download = false) {
  console.log("Reloading...")
  const getPDF = () => {
    return new Promise((resolve, reject) => {
      // Send and recive new pdf
      var data = {};

      //Personalize the form response
      for (var element of document.querySelector("#mainForm")) {
        const key = element.getAttribute("name");
        let value = "";

        if (key === null) continue;

        if (element.nodeName === "SELECT") {
          if (
            element.id.includes("hour") ||
            element.id.includes("minute") ||
            element.id.includes("period") ||
            element.id.includes("validationPrecioCoin") ||
            element.id.includes("validationPrecioReducidoCoin") ||
            element.id.includes("validationPrecioPlazasCoin") ||
            element.id.includes("validationPrecioPlazasMinusvalidosCoin") ||
            element.id.includes("validationPrecioFamiliaExtraCoin") ||
            element.id.includes("validationPrecioVisitaPrivadaCoin")
          ) {
            value = element.value;
          } else {
            value =
              element.selectedIndex !== 0
                ? element.selectedOptions[0].getAttribute("translation")
                : "";
          }
        } else if (element.nodeName === "TEXTAREA") {
          value = document.getElementById(element.getAttribute("id")).value;
        } else if (element.nodeName === "INPUT") {
          if (element.type === "radio" || element.type === "checkbox") {
            if (!element.checked) continue;
            value = element.value;
          } else {
            value = element.value;
          }
        }

        if (key in data) {
          data[key] =
            typeof data[key] === "string"
              ? [data[key], value.trim()]
              : data[key].concat([value.trim()]);
        } else {
          data[key] = value.trim();
        }
      }
      const lang = document.querySelector("html").lang;
      data["Download"] = download;
      data["UUID"] = UUID;

      let available_fonts = [
        "LexieReadable",
        "Arial",
        "Verdana",
        "Tahoma",
        "XuntaSans",
        "Helvetica",
      ];

      if (!available_fonts.includes(font)) {
        data["font"] = "LexieReadable";
      } else {
        data["font"] = font;
      }
      data["bgcolor"] = bgcolor;
      data["spacing"] = spacing;
      data["creation_time"] = creationTime;
      data["creation_hour"] = creationHour;
      data["origin_IP"] = "unknown"
      data["origin_country"] = "unknown"
      data["version"] = version;
      data["enabled_fields"] = Array.from(
        $("#fieldSelector").find(":selected")
      ).map(function (item) {
        return $(item).val();
      });
      console.log("sendrequest")
      sendRequest("/validateForm", "POST", data, lang).then(
        (message_information) => {
          //("Response:", message_information);
          if (
            message_information.headers.get("Content-Type") == "application/pdf"
          ) {
            resolve(message_information.arrayBuffer());
          }
          if (
            message_information.headers
              .get("Content-Type")
              .startsWith("application/json")
          ) {
            reject(message_information.json());
          }
        }
      );
    });
  };

  getPDF().then(
    function (pdf) {
      var element_scroll = document.getElementById("canvas_container");
      const [scroll_X, scroll_Y] = [
        element_scroll["scrollLeft"],
        element_scroll["scrollTop"],
      ];
      var blob = new Blob([pdf], { type: "application/pdf" });
      var blobUrl = URL.createObjectURL(blob);
      var dataUrl = blobUrl + "#zoom=FitV";
      if (previous_blob_uri !== null) {
        let worker = new Worker(previous_blob_uri);
        URL.revokeObjectURL(previous_blob_uri);

        worker.terminate();
      }
      previous_blob_uri = blobUrl;
      callGetDocument(dataUrl, element_scroll, [scroll_X, scroll_Y]);
      if (download) {
        let link = document.createElement("a");
        link.download = "Allure.pdf";
        link.href = dataUrl;
        link.click();
        link.remove();
      }
      console.log("PDF received");
    },
    (data) => {
      data.then(function (result) {
        //in case of version mismatch, alert and reload page.
        //console.log("result: ", result.error_message)

        if (
          result.error_message == "Client version not matching server version"
        ) {
          alert(
            "Error: " +
              result.error_message +
              " (" +
              result.version +
              ")" +
              "\nClient version: " +
              version
          );
          location.reload();
        }
      });
    }
  );
}

async function sendRequest(url, method, data, lang) {
  var myHeaders = new Headers({
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
    "Accept-Language": lang,
  });

  const response = await fetch(url, {
    method: method,
    headers: myHeaders,
    body: JSON.stringify(data),
  });

  return response;
}
