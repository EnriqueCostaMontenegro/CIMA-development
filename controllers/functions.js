const PDFDocument = require("pdfkit");

const {
  activity_type,
  different_languages,
  normal_price,
  reduced_price,
} = require("../public/js/language.js");
const fs = require("fs");
const dictionary = require("../public/js/language.js");
const path = require("path");

let jsonData = require("./../parameters.json");

var constants = require("./constants");

var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://" + jsonData["DB"]["HOST"] + ":" + jsonData["DB"]["PORT"];
console.log(url);

//Creation of the images folders on start in case they're not created
fs.mkdirSync("./user_images/logos/", {
  recursive: true
});
fs.mkdirSync("./user_images/banners/", {
  recursive: true
});

//Shows the form
module.exports.loadForm = (req, res) => {
  let language = "es";
  try {
    language = req.headers["accept-language"].split("-")[0];
  } catch (e) {
    language = "es";
  }
  return res.render("index", {
    facilities: constants.FACILITIES,
    guides: constants.GUIDES,
    allowed_actions: constants.ALLOWED_ACTIONS,
    covid_19_restrictions: constants.COVID_19_RESTRICTIONS,
    language: language,
    version: jsonData["version"],
  });
};

/* 
Manages deletion of images on application start 
*/
module.exports.deleteUserPhotos = (req, res) => {
  console.log("[INFO] Deleting old user photos");

  const cookie = req.cookies["UUID"];
  console.log("[INFO] User Cookie UUID:" + cookie);

  const directories = [
    "user_images/logos/" + cookie + "/",
    "user_images/banners/" + cookie + "/",
  ];

  directories.forEach((directory) => {
    console.log("[INFO] Trying to delete dir:", directory);
    rmdir(directory);
    fs.mkdirSync(directory, {
      recursive: true
    });
  });
  res.status(200).contentType("text/plain").end("File deleted!");

  function rmdir(dir) {
    if (fs.existsSync(dir)) {
      var list = fs.readdirSync(dir);
      for (var i = 0; i < list.length; i++) {
        var filename = path.join(dir, list[i]);
        var stat = fs.statSync(filename);

        if (filename == "." || filename == "..") {
          // pass these files
        } else if (stat.isDirectory()) {
          // rmdir recursively
          rmdir(filename);
        } else {
          // rm fiilename
          fs.unlinkSync(filename);
        }
      }
      fs.rmdirSync(dir);
    }
  }
};

module.exports.deleteBanner = (req, res) => {
  console.log("[INFO] Deleting user banner");

  const cookie = req.cookies["UUID"];

  const directory = "user_images/banners/" + cookie + "/";

  rmdir(directory);
  res.status(200).contentType("text/plain").end("File deleted!");

  function rmdir(dir) {
    if (fs.existsSync(dir)) {
      var list = fs.readdirSync(dir);
      for (var i = 0; i < list.length; i++) {
        var filename = path.join(dir, list[i]);
        var stat = fs.statSync(filename);

        if (filename == "." || filename == "..") {
          // pass these files
        } else if (stat.isDirectory()) {
          // rmdir recursively
          rmdir(filename);
        } else {
          // rm fiilename
          fs.unlinkSync(filename);
        }
      }
    }
  }
};

module.exports.deleteLogo = (req, res) => {
  const cookie = req.cookies["UUID"];
  console.log("[INFO] deleting file:", req.body);
  const directory = "user_images/logos/" + cookie + "/";
  try {
    //fs.unlinkSync(directory+req.body["logo_name"]);
    fs.rmSync(directory + req.body["logo_name"], {
      force: true,
    });
    res.status(200).contentType("text/plain").end("File deleted!");
  } catch (err) {
    console.log("[INFO] Error deleting file:", err);
  }
  return;
};

/*
Manages the storage of banner images uploaded by the user (into the /user_images/banners folder)
*/
module.exports.loadLogos = (req, res) => {
  const handleError = (err, res) => {
    res
      .status(500)
      .contentType("text/plain")
      .end("Oops! Something went wrong!");
  };
  const cookie = req.cookies["UUID"];
  const tempPath = req.file.path;
  const targetPath =
    "user_images/logos/" + cookie + "/" + req.file.originalname;
  if (
    path.extname(req.file.originalname).toLowerCase() === ".png" ||
    path.extname(req.file.originalname).toLowerCase() === ".jpg" ||
    path.extname(req.file.originalname).toLowerCase() === ".jpeg"
  ) {
    fs.rename(tempPath, targetPath, (err) => {
      if (err) {
        return handleError(err, res);
      }
      res.status(200).contentType("text/plain").end("File uploaded!");
    });
  } else {
    fs.unlink(tempPath, (err) => {
      if (err) return handleError(err, res);

      res
        .status(403)
        .contentType("text/plain")
        .end("Only .png files are allowed!");
    });
  }
};

/*
Manages the storage of banner images uploaded by the user (into the /user_images/logos folder)
*/
module.exports.loadBanner = (req, res) => {
  const cookie = req.cookies["UUID"];

  const handleError = (err, res) => {
    res
      .status(500)
      .contentType("text/plain")
      .end("Oops! Something went wrong!");
  };
  const directory = "./user_images/banners/" + cookie + "/";
  fs.mkdirSync(directory, {
    recursive: true
  });

  fs.readdir(directory, (err, files) => {
    if (err) throw err;

    for (const file of files) {
      fs.unlink(path.join(directory, file), (err) => {
        if (err) throw err;
      });
    }
  });

  const tempPath = req.file.path;
  const targetPath = directory + req.file.originalname;

  if (
    path.extname(req.file.originalname).toLowerCase() === ".png" ||
    path.extname(req.file.originalname).toLowerCase() === ".jpg" ||
    path.extname(req.file.originalname).toLowerCase() === ".jpeg"
  ) {
    fs.rename(tempPath, targetPath, (err) => {
      if (err) {
        return handleError(err, res);
      }
      res.status(200).contentType("text/plain").end("File uploaded!");
    });
  } else {
    fs.unlink(tempPath, (err) => {
      if (err) return handleError(err, res);

      res
        .status(403)
        .contentType("text/plain")
        .end("Only .png files are allowed!");
    });
  }
};

//
//
// All the logic for the form processing and PDF generation
//
//
module.exports.validateForm = async function (req, res, next) {
  // define the default global background
  let global_background_color = "#f9f8ec"
  // obtain the background to use from the body of the request
  // this is necessary done before creating the PDF document
  if (req.body["bgcolor"] == undefined) {
    global_background_color = "#f9f8ec";
  } else {
    global_background_color = req.body["bgcolor"];
  }

  var new_pdf_document = createPDFDocument();
  var doc = new_pdf_document.document;
  var structure = new_pdf_document.structure;
  let selected_text_type = "";
  let enabled_fields = "";

  console.log("[DEBUG INFO] Request body: ", req.body)

  console.log("[DEBUG INFO] Version: ", req.body["version"]);
  console.log("[DEBUG INFO] Timestamp: ", new Date());

  if (
    req.body["version"] != constants.VERSION ||
    req.body["version"] == undefined
  ) {
    console.log("[DEBUG INFO]: Client has older version");
    res.setHeader("Content-Type", "application/json");
    res.send({
      error_message: "Client version not matching server version",
      version: constants.VERSION,
    });
    return;
  }

  if (req.body["font"] == undefined) {
    selected_text_type = "LexieReadable";
  } else {
    selected_text_type = req.body["font"];
  }

  if (
    req.body["enabled_fields"] == undefined ||
    req.body["enabled_fields"] == ""
  ) {
    enabled_fields = [
      "banner",
      "activity_type",
      "information_hours",
      "location",
      "information_buy_tickets",
      "information_facilities",
      "information_guides",
      "information_allowed_actions",
      "covid_19_restrictions",
      "extra_information",
      "logos",
    ];
  } else {
    enabled_fields = req.body["enabled_fields"];
  }

  const cookie = req.cookies["UUID"];
  const pdf_structure = req.body;
  const lang = req.headers["accept-language"];
  // Create the pdf

  console.log("\n[DEBUG] doc.page.size: %s x %s", doc.page.height, doc.page.width)

  //Processing all the text configuration that will be applied to the document
  let characterSpaces= [1, 0.2/0.35, 0.1/0.35]; // 1 - high, 0.2 / 0.35 - medium , 0.1 / 0.35 - nornmal    
  let characterSpacesOption= 0; // selected option for character spaces    

  // TODO - study influence of other options of characterSpacesOption

  console.log("[DEBUG] characterSpacesOption %s: %s", characterSpacesOption, characterSpaces[characterSpacesOption])

  var text_options = {
    characterSpacing: constants.FONTS[selected_text_type]["inter_letter"],
    wordSpacing: constants.FONTS[selected_text_type]["word_spacing"],
    lineGap: constants.FONTS[selected_text_type]["line_spacing"],
    //align:'justify'
  };
  var oTextOptionsSpacing = {
    characterSpacing: constants.FONTS[selected_text_type]["mean_character_size"] * 0.35 * characterSpaces[characterSpacesOption],
    wordSpacing: constants.FONTS[selected_text_type]["mean_character_size"] * 0.35 * characterSpaces[characterSpacesOption] * 0.35 * characterSpaces[characterSpacesOption],
    lineGap: constants.FONTS[selected_text_type]["mean_character_size"] * 0.35 * characterSpaces[characterSpacesOption] * 0.35 * characterSpaces[characterSpacesOption] * 1.5,
    //align:'justify'
  };

  console.log("[DEBUG] oTextOptionsSpacing.characterSpacing: %s", oTextOptionsSpacing.characterSpacing);
  console.log("[DEBUG] oTextOptionsSpacing.wordSpacing: %s", oTextOptionsSpacing.wordSpacing);
  console.log("[DEBUG] oTextOptionsSpacing.lineGap: %s\n", oTextOptionsSpacing.lineGap);

  const normal_font_size= constants.FONTS[selected_text_type]["normal_font_size"];
  const heading_font_size= constants.FONTS[selected_text_type]["heading_font_size"];


  let global_pos_y = 10; //this is a marker to the position where the PDF is to be written in the vertical (Y) axis.
  //let header = false;


  //
  // call to print the banner image 
  //
  //debug_print_global_pos_y("printBannerImage - before", global_pos_y, doc.page.height)
  if (enabled_fields.includes("banner")) {
    var imagePrinted= printBannerImage();
    if (imagePrinted) {
      global_pos_y += constants.SPACE_BETWEEN_ELEMENTS;
    }
  }
  //debug_print_global_pos_y("printBannerImage - after", global_pos_y, doc.page.height)


  //
  // call to print the activity type 
  //
  debug_print_global_pos_y("printActivityType - before", global_pos_y, doc.page.height)
  if (enabled_fields.includes("activity_type")) {
    printActivityType(req);
    global_pos_y += constants.SPACE_BETWEEN_ELEMENTS;
  }
  debug_print_global_pos_y("printActivityType - end", global_pos_y, doc.page.height)


  //
  // call to print the schedule information
  //
  debug_print_global_pos_y("printInformationSchedule - before", global_pos_y, doc.page.height)
  if (enabled_fields.includes("information_hours")) {
    printInformationSchedule(req);
    global_pos_y += constants.SPACE_BETWEEN_ELEMENTS;
  }
  debug_print_global_pos_y("printInformationSchedule - end", global_pos_y, doc.page.height)


  //
  // call to print the location information
  //
  debug_print_global_pos_y("printLocationInformation - before", global_pos_y, doc.page.height)
  if ( enabled_fields.includes("location") ) {
    if ( req.body["activity_type"] != "online_event" ) printLocation(req);
    else printEventURL(req);
    global_pos_y += constants.SPACE_BETWEEN_ELEMENTS;
  }
  debug_print_global_pos_y("printLocationInformation - end", global_pos_y, doc.page.height)


  //
  // call to print the ticket information
  //
  debug_print_global_pos_y("printTicketInformation - before", global_pos_y, doc.page.height)
  if (req.body["enabled_fields"].includes("information_buy_tickets")) {
    printTicketInformation(req);
    global_pos_y += constants.SPACE_BETWEEN_ELEMENTS;
  }
  debug_print_global_pos_y("printTicketInformation - end", global_pos_y, doc.page.height)






  //
  // call to print the facilities information
  //
  debug_print_global_pos_y("printFacilitiesInformation - before", global_pos_y, doc.page.height)
  if (enabled_fields.includes("information_facilities")) {
    printFacilitiesInformation(req);
    global_pos_y += constants.SPACE_BETWEEN_ELEMENTS;
  }
  debug_print_global_pos_y("printFacilitiesInformation - end", global_pos_y, doc.page.height)





  //
  // call to print the information guides
  //
  debug_print_global_pos_y("printGuidesInformation - before", global_pos_y, doc.page.height)
  if (enabled_fields.includes("information_guides")) {
    printGuidesInformation(req);
    global_pos_y += constants.SPACE_BETWEEN_ELEMENTS;
  }
  debug_print_global_pos_y("printGuidesInformation - end", global_pos_y, doc.page.height)




  //
  // call to print the information allowed actions
  //
  debug_print_global_pos_y("printAllowedActionsInformation - before", global_pos_y, doc.page.height)
  if (enabled_fields.includes("information_allowed_actions")) {
    printAllowedActionsInformation(req);
    global_pos_y += constants.SPACE_BETWEEN_ELEMENTS;
  }
  debug_print_global_pos_y("printAllowedActionsInformation - end", global_pos_y, doc.page.height)





  //
  // call to print the covid restrictions
  //
  debug_print_global_pos_y("printCOVID19Restrictions - before", global_pos_y, doc.page.height)
  if (enabled_fields.includes("covid_19_restrictions")) {
    printCOVID19Restrictions(req);
    global_pos_y += constants.SPACE_BETWEEN_ELEMENTS;
  }
  debug_print_global_pos_y("printCOVID19Restrictions - end", global_pos_y, doc.page.height)




  if (enabled_fields.includes("extra_information")) {
    printMoreInformation(req);
  }
  //global_pos_y += 70;


  if (enabled_fields.includes("logos")) {
    print_logos(70, 120, 100, 100);
  }
  //global_pos_y += 30;
  print_disclaimer_info();

  doc.end(); //all fields of the PDF have been created, ending and sending it to the frontend.

  /**
   * This function calculate the space needed for storing a caption
   *
   * @param {String} sentence original sentence
   * @param {boolean} isHeading specify if it is heading or not
   *
   * @returns {Integer} space
   */
  function calculateSpace(sentence, isHeading) {
    try {
      let num_spaces = sentence.split(" ").length - 1;
      let num_caracteres = sentence.length - num_spaces;
      return (
        1.4 *
        (num_caracteres *
          constants.FONTS[selected_text_type]["mean_character_size"] +
          sentence.length *
          constants.FONTS[selected_text_type]["inter_letter"] +
          num_spaces *
          constants.FONTS[selected_text_type]["inter_letter"] *
          3.5)
      );
    } catch (e) {
      return 20;
    }
  }


  /**
   * This function split a sentence in slices of a maximum size
   *
   * @param {String} sSentence original sentence
   * @param {Integer} iSizeSplit maximum size of slice
   *
   * @returns {array} of slices
   */
  function splitSentence(sSentence, iSizeSplit) {
    //console.log("[DEBUG] splitSentence ---%s---%s---", sSentence, iSizeSplit)
    let aSlices= [];
    let aSplit= sSentence.split(" ");
    //console.log("[DEBUG] split ---%s---", split)

    // initialize current slice with the first split
    let sCurrentSlice= aSplit[0];
    //console.log("[DEBUG] currentSlice ---%s---", currentSlice)

    // iterate through the next splits
    for (let i= 1; i< aSplit.length; i++) {
      if ( (sCurrentSlice.length + 1 + aSplit[i].length) > iSizeSplit ) { // if no size in current slice
        console.log("[DEBUG] saving sCurrentSlice ---%s---", sCurrentSlice, sCurrentSlice.length)
        aSlices.push(sCurrentSlice); // save current slice to array
        //console.log("[DEBUG] aSlices ---%s---", aSlices)
        sCurrentSlice= aSplit[i] // initialize the current slice
        //console.log("[DEBUG] new currentSlice ---%s---", currentSlice)
      } else {  // if there is still size in the current slice
        sTempText= sCurrentSlice + " " + aSplit[i] // create a temporal text
        //console.log("[DEBUG] added to tempText ---%s---", tempText)
        sCurrentSlice= sTempText; // copy to the current slice
        //console.log("[DEBUG] added to sCurrentSlice ---%s---%s", sCurrentSlice, sCurrentSlice.length)
      }
    }
    console.log("[DEBUG] saving sCurrentSlice ---%s---", sCurrentSlice, sCurrentSlice.length)
    aSlices.push(sCurrentSlice); // save the las current slice
    //console.log("[DEBUG] aSlices ---%s---", aSlices)

    return aSlices;
  }


  /**
   * This function creates the form for sections
   *
   * @param {Integer} pos_x coordinate x or string of coordinates for starting drawing
   * @param {Array} pos_y coordinate y or string of coordinates for starting drawing
   * @param {Array} size_big params for the big rectangle [length_x, length_y, radious for rounded corners]
   * @param {Array} size_icon params for the icon rectangle [length_x, length_y, radious for rounded corners]
   * @param {Array} size_title params for the title rectangle [length_x, length_y, radious for rounded corners]
   *
   */
  function print_rectangle(
    global_pos_y,
    pos_x,
    pos_y,
    size_big = [543, 150, 5],
    size_icon = [50, 50, 10],
    size_title = [300, 40, 10]
  ) {
    size_big = size_big === null ? [525, 300, 5] : size_big;
    size_icon = size_icon === null ? [40, 40, 10] : size_icon;
    size_title = size_title === null ? [300, 40, 10] : size_title;
    pos_x = typeof pos_x === "object" ? pos_x : [pos_x, pos_x, pos_x];
    pos_y = typeof pos_y === "object" ? pos_y : [pos_y, pos_y, pos_y];

    doc
      .lineWidth(2)
      .roundedRect(
        pos_x[0] - 15,
        global_pos_y + pos_y[0] + 10,
        size_big[0],
        size_big[1],
        size_big[2]
      )
      .stroke() //Outside rectange
      .roundedRect(
        pos_x[1] - 5,
        global_pos_y + pos_y[1] - 10,
        size_icon[0],
        size_icon[1],
        size_icon[2]
      )
      .fillAndStroke("white", "#000") //Icon rectangle (background color, line color)
      .roundedRect(
        pos_x[2] + 80,
        global_pos_y + pos_y[2] - 10,
        size_title[0],
        size_title[1],
        size_title[2]
      )
      .fillAndStroke("white", "#000"); //Title rectangle (background color, line color)
  }

  /**Prints text to the specified position of the document
   *
   * @param {Integer} global_pos_y
   * @param {String} field field to be written
   * @param {Integer} fontSize
   * @param {Integer} x coordinate x or string of coordinates for starting writing
   * @param {Integer} y coordinate y or string of coordinates for starting writing
   * @param {String} lang language of the text
   * @param {Boolean} check_dictionary whether to check for a match in the dictionary or not
   * @param {Boolean} title
   * @param {String} text_alt alternative text
   * @returns
   */
  function print_text(
    text_options,
    global_pos_y = 0,
    field,
    fontSize,
    x,
    y,
    lang = "en",
    check_dictionary = true,
    title = false,
    text_alt = ""
  ) {
    const font = title ?
      constants.FONTS[selected_text_type]["bold"] :
      constants.FONTS[selected_text_type]["regular"];
    if (check_dictionary) {
      if (field !== "" && field in dictionary) {
        text_alt = text_alt !== "" ? text_alt : dictionary[field][lang];
        structure.add(
          doc.struct(
            "P", {
            alt: text_alt + " ",
          },
            () => {
              doc
                .font(font)
                .fillColor("black")
                .fontSize(fontSize)
                .text(
                  dictionary[field][lang],
                  x,
                  global_pos_y + y,
                  text_options
                );
            }
          )
        );
      }
    } else {
      text_alt = text_alt !== "" ? text_alt : field;
      structure.add(
        doc.struct(
          "P", {
          alt: text_alt + " ",
        },
          () => {
            doc
              .font(font)
              .fillColor("black")
              .fontSize(fontSize)
              .text(field, x, global_pos_y + y, text_options);
          }
        )
      );
    }
    return;
  }

  /** Prints image to fit into a square box
   * */
  function print_image_fit(
    global_pos_y = 0,
    field,
    body,
    x,
    y,
    x_fit = "",
    y_fit = "",
    yes_no = false,
    alt_text = ""
  ) {
    try {
      if (field in body) {
        alt_text =
          alt_text !== "" ?
            alt_text :
            yes_no ?
              dictionary[body[field].toLowerCase()][lang] :
              dictionary[field][lang];
      }
    } catch (e) {
      console.log("Alt error: " + field + " yes_no: " + yes_no);
    }
    if (field !== "" && field in body) {
      try {
        if (!yes_no && (body[field] === "Yes" || body[field] === "No")) {
          if (!fs.existsSync("./images/pictos/" + field + ".png")) return;
          var imageSection = doc.struct("Sect");
          structure.add(imageSection);
          imageSection.add(
            doc.struct(
              "Figure", {
              alt: alt_text + " ",
            },
              () => {
                doc.image(
                  "./images/pictos/" + field + ".png",
                  x,
                  global_pos_y + y, {
                  fit: [x_fit, y_fit]
                }
                );
              }
            )
          );
        } else {
          if (
            !fs.existsSync(
              "./images/pictos/" + body[field].toLowerCase() + ".png"
            )
          )
            return;
          var imageSection = doc.struct("Sect");
          structure.add(imageSection);
          imageSection.add(
            doc.struct(
              "Figure", {
              alt: alt_text + " ",
            },
              () => {
                doc.image(
                  "./images/pictos/" + body[field].toLowerCase() + ".png",
                  x,
                  global_pos_y + y, {
                  fit: [x_fit, y_fit]
                }
                );
              }
            )
          );
          imageSection.end();
        }
      } catch (e) {
        console.log("Imagen: " + field + ".png no existe");
      }
    }

    return;
  }

  function print_isolated_image(
    global_pos_y,
    field,
    x,
    y,
    x_fit = "",
    y_fit = "",
    alt_text = ""
  ) {
    try {
      if (fs.existsSync("./images/pictos/" + field + ".png")) {
        if (alt_text !== "false") {
          let imageSection = doc.struct("Sect");
          structure.add(imageSection);
          imageSection.add(
            doc.struct(
              "Figure", {
              alt: alt_text + " ",
            },
              () => {
                doc.image(
                  "./images/pictos/" + field + ".png",
                  x,
                  global_pos_y + y, {
                  fit: [x_fit, y_fit]
                }
                );
              }
            )
          );
          imageSection.end();
        } else {
          doc.image("./images/pictos/" + field + ".png", x, global_pos_y + y, {
            fit: [x_fit, y_fit],
          });
        }
      }
    } catch (e) {
      console.log("Imagen: " + field + ".png no existe");
    }
    return;
  }



  /**
   * Creates the basic body of the PDF document.
   * @param {String} background_color background color for the document
   * @param {String} title title of the document
   * @param {String} author author of the document
   *
   * @returns {PDFDocument, Structure} document and document structure
   */

  function createPDFDocument(
    title = "Cultural Information Made Accessible Document",
    author = "ALLURE Project"
  ) {
    /**
     * Following British Dyslexia Association style guide
     *
     * Colour:
     *
     * Use dark coloured text on a light (not white) background.
     *
     * Avoid green and red/pink. These colours are difficult for those who have colour vision deficiencies.
     *
     * Consider alternatives to white backgrounds for paper, computer and visual aids such as whiteboards.
     * White can appear too dazzling. Use cream or a soft pastel colour. Some dyslexic people will have their own colour preference.
     */

    var doc = new PDFDocument({
      pdfVersion: "1.5",
      tagged: true,
      bufferPages: true,
      autoFirstPage: false,
      lang: "es",
    });

    doc.addPage({
      margins: {
        top: 10,
        left: 7,
        right: 7,
        bottom: 10
      },
      size: "A4",
    });

    doc.rect(0, 0, doc.page.width, doc.page.height).fill(global_background_color);

    // Initilizate document meta-data
    doc.info["Title"] = title;
    doc.info["Author"] = author;

    //Inicialise document logical structure
    var structure = doc.struct("Document");
    doc.addStructure(structure);

    //Global parameters (for instance, fonts)
    doc.registerFont("LexieReadable", "./public/fonts/LexieReadable.ttf");
    doc.registerFont(
      "LexieReadable-Bold",
      "./public/fonts/LexieReadable-Bold.ttf"
    );
    doc.registerFont("Arial", "./public/fonts/Arial.ttf");
    doc.registerFont("Arial-Bold", "./public/fonts/Arial-Bold.ttf");
    doc.registerFont("Helvetica", "./public/fonts/Helvetica.ttf");
    doc.registerFont("Helvetica-Bold", "./public/fonts/Helvetica-Bold.ttf");
    doc.registerFont("Tahoma", "./public/fonts/Tahoma.ttf");
    doc.registerFont("Tahoma-Bold", "./public/fonts/Tahoma-Bold.ttf");
    doc.registerFont("Verdana", "./public/fonts/Verdana.ttf");
    doc.registerFont("Verdana-Bold", "./public/fonts/Verdana-Bold.ttf");
    doc.registerFont("XuntaSans", "./public/fonts/XuntaSans.woff");
    doc.registerFont("XuntaSans-Bold", "./public/fonts/XuntaSans-Bold.woff");

    doc.font("LexieReadable");

    let buffers = [];

    // Adding functionality
    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => {
      let pdfData = Buffer.concat(buffers);
      res.writeHead(200, {
        "Content-Length": Buffer.byteLength(pdfData),
        "Content-Type": "application/pdf",
        "Content-disposition": "attachment;filename=form.pdf",
      });
      res.end(pdfData);
      if (req.body["Download"]) {
        let language = "";
        try {
          language = req.headers["accept-language"].split("-")[0];
        } catch (e) { }
        pdf_structure["language"] = language;
        storeData(pdf_structure);
      }
      console.log("PDF Created and sent!");
    });

    return {
      document: doc,
      structure: structure,
    };
  }




  /**
  * Draws the banner at the beginning of the document.
  *
  * @returns {imagePrinted} true is an image was printed (i.e. was selected), false otherwise
  */
  function printBannerImage() {
    const aLogos = [];
    let bImagePrinted= false;
    const iMaxWidth= 575;
    const iMaxHeight= 100;

    // create directory if it doesnt exist
    if (!fs.existsSync("./user_images/banners/" + cookie + "/")) {
      fs.mkdirSync("./user_images/banners/" + cookie + "/", {
        recursive: true,
      });
    }

    // reads the images in the directory
    fs.readdirSync("./user_images/banners/" + cookie + "/").forEach((file) => {
      aLogos.push(file);
    });

    aLogos.forEach(function (banner) {
      try {
        // with the size of the image calculates its proportional reduction
        let fnSizeOf= require("image-size");
        //console.log("[DEBUG] fnSizeOf: %s", fnSizeOf);
        let oDimensions= fnSizeOf("./user_images/banners/" + cookie + "/" + banner);
        //console.log("[DEBUG] oDimensions: %o", oDimensions);
        //console.log("[DEBUG] image-size: %i x %i", oDimensions.width, oDimensions.height);
        let fWidthReduction= iMaxWidth / oDimensions.width;
        let fHeigthReduction= iMaxHeight / oDimensions.height;
        //console.log("[DEBUG] max image-size: %i x %i", iMaxWidth, iMaxHeight);
        //console.log("[DEBUG] image reduction: %f x %f", fWidthReduction, fHeigthReduction);
        let fMaxReduction= Math.min(fWidthReduction, fHeigthReduction);
        //console.log("[DEBUG] max reduction: %f", fMaxReduction);

        // print the image
        if (fs.existsSync("./user_images/banners/" + cookie + "/" + banner)) {
          doc.image(
            "./user_images/banners/" + cookie + "/" + banner,
            10,
            global_pos_y, {
            fit: [iMaxWidth, iMaxHeight],
            align: "center",
            valign: "center"
          }
          )
          .rect(10 + ((iMaxWidth - oDimensions.width * fMaxReduction) / 2), global_pos_y, oDimensions.width * fMaxReduction, 
            oDimensions.height * fMaxReduction);
        }

        // increase global position y with the printed height of image
        global_pos_y+= oDimensions.height * fMaxReduction; 

        bImagePrinted= true;
      } catch (e) {
        console.log("Image: " + "./user_images/logos/" + banner + " does not exist");
      }
    });

    return bImagePrinted;
  }



  /**
  * Print all elements in the activity type
  *
  */
  function printActivityType(req) {
    let iTempPosY= 0;

    // create a text with activity type and its kind to associate with pictogram
    let sPictogramText = dictionary["activity_type"][lang] + ": ";
    //console.log("[DEBUG] sPictogramText: ---%s---", sPictogramText)
    try {
      sPictogramText = sPictogramText + dictionary[req.body["activity_type"]][lang];
    } catch (e) { }
    //console.log("[DEBUG] sPictogramText ---%s---", sPictogramText)

    // create new text options for the activity name
    //console.log("[DEBUG] typeof oTextOptionsSpacing ---%s---", typeof oTextOptionsSpacing)
    let oTempTextOptions = Object.assign({}, oTextOptionsSpacing) 
    //console.log("[DEBUG] oTextOptionsSpacing ---%s---", oTextOptionsSpacing)
    //console.log("[DEBUG] oTempTextOptions ---%s---", oTempTextOptions)
    oTempTextOptions["align"]= "justify"
    oTempTextOptions["width"]= 375 // maximum width space
    //console.log("[DEBUG] oTextOptionsSpacing ---%s---", oTextOptionsSpacing)
    //console.log("[DEBUG] oTempTextOptions ---%s---", oTempTextOptions)

    // calculate the text size of the activity name with the new text options
    let oTextDimensionsAN= calculateTextSize(oTempTextOptions, req.body["activity_name"], heading_font_size)
    //console.log("[DEBUG] calculateTextSize: %o", oTextDimensionsAN)

    // calculate the text size of the short description with the new text options
    let oTextDimensionsSD= calculateTextSize(oTempTextOptions, req.body["short_description"], normal_font_size)
    //console.log("[DEBUG] calculateTextSize: %o", oTextDimensionsSD)

    // print the different rectangles according to the needed size
    // activity name box: min 32, max 54? (oTextDimensionsAN.height + 10)
    // big box: min 130, max 144? (oTextDimensionsAN.height + oTextDimensionsSD.height + 10)
    print_rectangle(
      global_pos_y,
      [55, 27, 80],
      [20, 28, 20],
      (size_big = [525, Math.max(oTextDimensionsAN.height + oTextDimensionsSD.height + 10, 130), 5]),
      (size_icon = [120, 120, 10]),
      (size_title = [Math.min(oTextDimensionsAN.width + 15, 390), Math.max(oTextDimensionsAN.height + 10, 32), 10])
    );

    // ptint the image related with the activity type with its associated text
    print_image_fit(
      global_pos_y,
      "activity_type",
      req.body,
      25,
      20,
      115,
      115,
      false,
      sPictogramText
    );

    // print the activity name with the new text options
    print_text(
      oTempTextOptions,
      global_pos_y,
      req.body["activity_name"],
      heading_font_size,
      165,
      18,
      lang,
      false,
      true
    );

    // increase the temporal position y once the activity name is printed
    iTempPosY+= 20 + Math.max(oTextDimensionsAN.height + 10, 32);

    // print the information symbol
    print_isolated_image(global_pos_y + iTempPosY, "information", 145, 0, 22, 22, "false");
    
    // print the diferent lines of the short description
    print_text(
      oTempTextOptions,
      global_pos_y + iTempPosY,
      req.body["short_description"],
      normal_font_size,
      168,
      6, 
      lang,
      false,
      false
    );

    // increase the global position y given the elements used
    global_pos_y+= Math.max(oTextDimensionsAN.height + oTextDimensionsSD.height + 10, 130) + 50;

    return;
  }




  /**
  * Print all elements in the information hours
  *
  */
  function printInformationSchedule(req) {
    let iTempPosY= 0;

    // create new text options for the activity name
    //console.log("[DEBUG] typeof oTextOptionsSpacing ---%s---", typeof oTextOptionsSpacing)
    let oTempTextOptions = Object.assign({}, oTextOptionsSpacing) 
    //console.log("[DEBUG] oTextOptionsSpacing ---%s---", oTextOptionsSpacing)
    //console.log("[DEBUG] oTempTextOptions ---%s---", oTempTextOptions)
    oTempTextOptions["align"]= "justify"
    oTempTextOptions["width"]= 415 // maximum width space
    //console.log("[DEBUG] oTextOptionsSpacing ---%s---", oTextOptionsSpacing)
    //console.log("[DEBUG] oTempTextOptions ---%s---", oTempTextOptions)

    // calculate the text size of information hours with the new text options
    let oTextDimensionsIH= calculateTextSize(oTempTextOptions, dictionary["information_hours"][lang], heading_font_size)
    //console.log("[DEBUG] calculateTextSize: %o", oTextDimensionsIH)

    // Prnt rectangle according to the needed size
    print_rectangle(
      global_pos_y,
      37,
      0,
      [543, 135, 5],
      [50, 50, 10],
      [Math.min(oTextDimensionsIH.width + 20, 430), Math.max(oTextDimensionsIH.height + 10, 32), 10]
    );

    // Print the associated pictogram
    print_isolated_image(
      global_pos_y,
      "time_information",
      37,
      -5,
      40,
      40,
      "false"
    );

    // print the text in the selected language with the defined options
    print_text(
      oTempTextOptions,
      global_pos_y,
      dictionary["information_hours"][lang],
      heading_font_size,
      125,
      -1,
      lang,
      false,
      true
    );

    
    // Schedules
    try {
      // var used to calculate the position of ticks and crosses in the days of the week
      let x_day = 41.5;

      // array with the selected days of the week obtaned from request body
      let aDaysWeekSelected = req.body["OpenDay"];
      //console.log("[DEBUG] aDaysWeekSelected: %s", aDaysWeekSelected)
      //var [opening_hours_morning, closing_hours_morning, opening_hours_afternoon, closing_hours_afternoon] = [req.body["opening_hours_morning"], req.body["closing_hours_morning"], req.body["opening_hours_afternoon"], req.body["closing_hours_afternoon"]]

      // opening and closing hours in morning and afternoon obtained from request body
      var opening_hours_morning = [
        req.body["opening_hour_morning"],
        req.body["opening_minute_morning"],
        req.body["opening_period_morning"],
      ];
      var closing_hours_morning = [
        req.body["closing_hour_morning"],
        req.body["closing_minute_morning"],
        req.body["closing_period_morning"],
      ];
      var opening_hours_afternoon = [
        req.body["opening_hour_afternoon"],
        req.body["opening_minute_afternoon"],
        req.body["opening_period_afternoon"],
      ];
      var closing_hours_afternoon = [
        req.body["closing_hour_afternoon"],
        req.body["closing_minute_afternoon"],
        req.body["closing_period_afternoon"],
      ];

      // definition of months array
      var months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      //console.log("[DEBUG] specific_date %s:\n\tstart_date %s - end_date %s", req.body["specific_date"], req.body["start_date"], req.body["end_date"])

      // Case specific data and not only one day
      if (
        req.body["specific_date"] == "Yes" &&
        req.body["start_date"] != "" &&
        req.body["end_date"] != "" &&
        req.body["end_date"] != req.body["start_date"]
      ) 
      {
        var start_date = new Date(req.body["start_date"]);
        var start_month = months[start_date.getMonth()];
        var ending_date = new Date(req.body["end_date"]);
        var end_month = months[ending_date.getMonth()];
        const options = {
          year: "numeric",
          month: "numeric",
          day: "numeric"
        };

        // print the image of the days of the week in different languages
        print_isolated_image(
          global_pos_y,
          "week_" + lang,
          30,
          -60,
          240,
          240,
          dictionary["opening_days"][lang]
        );
        
        
        // print the tick or cross over the days of the week depending on their availability
        if ("OpenDay" in req.body && aDaysWeekSelected.length > 0) {
          for (let i = 0; i < constants.WEEK_ORDER.length; i++) {
            let open_day = aDaysWeekSelected.includes(constants.WEEK_ORDER[i]) ?
              "yes" :
              "no";
            print_isolated_image(
              global_pos_y,
              open_day,
              x_day + 5,
              60,
              25,
              25,
              dictionary[constants.WEEK_ORDER[i].toLowerCase()][lang] +
              " " +
              dictionary[open_day][lang]
            );
            x_day += 31;
          }
        } 

        // print first pictogram of date
        print_isolated_image(
          global_pos_y,
          start_month,
          65,
          86,
          40,
          40,
          dictionary["opening_days"][lang]
        );
        
        // print start date
        print_text(
          text_options,
          global_pos_y,
          start_date.toLocaleString("es", options),
          normal_font_size,
          40,
          130,
          lang,
          false
        );

        // print dash separating dated
        doc.lineWidth(5);
        doc
          .lineCap("butt")
          .moveTo(140, global_pos_y + 110)
          .lineTo(150, global_pos_y + 110)
          .stroke();
        
        // print second pictogram of date
        print_isolated_image(
          global_pos_y,
          end_month,
          185,
          86,
          40,
          40,
          dictionary["opening_days"][lang]
        );

        // print end date
        print_text(
          text_options,
          global_pos_y,
          ending_date.toLocaleString("es", options),
          normal_font_size,
          160,
          130,
          lang,
          false
        );
      } else if (
        req.body["specific_date"] == "Yes" &&
        req.body["start_date"] != ""
      ) 
      // Case specific data and selected start date
      {
        var start_date = new Date(req.body["start_date"]);
        var start_month = months[start_date.getMonth()];
        const options = {
          year: "numeric",
          month: "numeric",
          day: "numeric"
        };

        // print pictogram of date
        print_isolated_image(
          global_pos_y,
          start_month,
          110,
          40,
          80,
          80,
          dictionary["opening_days"][lang]
        );

        // print start date
        print_text(
          text_options,
          global_pos_y,
          start_date.toLocaleString("es", options),
          normal_font_size,
          110,
          125,
          lang,
          false
        );
      } else if (
        req.body["specific_date"] == "Yes" &&
        req.body["end_date"] != ""
      ) 
      // Case specific data and selected end date
      {
        var ending_date = new Date(req.body["end_date"]);
        var end_month = months[ending_date.getMonth()];
        const options = {
          year: "numeric",
          month: "numeric",
          day: "numeric"
        };

        // print pictogram of date
        print_isolated_image(
          global_pos_y,
          end_month,
          110,
          40,
          80,
          80,
          dictionary["opening_days"][lang]
        );

        // print end date
        print_text(
          text_options,
          global_pos_y,
          ending_date.toLocaleString("es", options),
          normal_font_size,
          110,
          125,
          lang,
          false
        );
      }

      // Case specific data and not only one day
      if (req.body["specific_date"] == "No") {
        // print the image of the days of the week in different languages
        print_isolated_image(
          global_pos_y,
          "week_" + lang,
          30,
          //-35,
          -60,
          240,
          240,
          dictionary["opening_days"][lang]
        ); 

        // print the tick or cross over the days of the week depending on their availability
        if ("OpenDay" in req.body && aDaysWeekSelected.length > 0) {
          for (let i = 0; i < constants.WEEK_ORDER.length; i++) {
            let open_day = aDaysWeekSelected.includes(constants.WEEK_ORDER[i]) ?
              "yes" :
              "no";
            print_isolated_image(
              global_pos_y,
              open_day,
              //x_day,
              x_day + 5,
              //50,
              60,
              //30,
              25,
              //30,
              25,
              dictionary[constants.WEEK_ORDER[i].toLowerCase()][lang] +
              " " +
              dictionary[open_day][lang]
            );
            x_day += 31;
          }
        }
      }

      // define a function to calculate if the defined opening and closing hours are empty or not
      let isEmpty = (a) => !a.some((x) => x !== "");
      //console.log("[DEBUG] opening_hours_morning: %s - %s", opening_hours_morning, isEmpty(opening_hours_morning))
      //console.log("[DEBUG] closing_hours_morning: %s - %s", closing_hours_morning, isEmpty(closing_hours_morning))
      //console.log("[DEBUG] opening_hours_afternoon: %s - %s", opening_hours_afternoon, isEmpty(opening_hours_afternoon))
      //console.log("[DEBUG] closing_hours_afternoon: %s - %s", closing_hours_afternoon, isEmpty(closing_hours_afternoon))

      if (
        closing_hours_morning.filter(
          (e) => !opening_hours_afternoon.includes(e)
        ).length === 0 ||
        (isEmpty(closing_hours_morning) && isEmpty(opening_hours_afternoon))
      )
      // case of continuous schedule, no closing hours morning and no opening hours afternoon 
      {
        // if opening hours morning and closing hours afternoon defined
        if ( !isEmpty(opening_hours_morning) && !isEmpty(closing_hours_afternoon) ) {
          //print text for continuous schedule
          print_text(
            text_options,
            global_pos_y,
            dictionary["continuous_schedule"][lang] + ":",
            normal_font_size,
            275,
            77,
            lang,
            false
          );

          // print pictogram of opening hours morning
          print_isolated_image(
            global_pos_y,
            "hours/" +
            opening_hours_morning[0] +
            "_" +
            opening_hours_morning[1],
            440,
            65,
            40,
            40
          );

          // print dash
          print_text(
            text_options,
            global_pos_y,
            " - ",
            normal_font_size,
            488,
            77,
            lang,
            false
          );

          // print pictogram of closing hours afternoon
          print_isolated_image(
            global_pos_y,
            "hours/" +
            closing_hours_afternoon[0] +
            "_" +
            closing_hours_afternoon[1],
            500,
            65,
            40,
            40
          );
        }
      } else {
      // cases with no continuous schedule
        if ( !isEmpty(opening_hours_morning) && !isEmpty(closing_hours_morning) &&
          !isEmpty(opening_hours_afternoon) && !isEmpty(closing_hours_afternoon) ) 
        // case with morning and afternoon schedule
        {
          //print text for morning schedule
          print_text(
            text_options,
            global_pos_y,
            dictionary["morning_schedule"][lang] + ":",
            normal_font_size,
            275,
            52,
            lang,
            false
          );

          // print pictogram of opening hours morning
          print_isolated_image(
            global_pos_y,
            "hours/" +
            opening_hours_morning[0] +
            "_" +
            opening_hours_morning[1],
            460,
            40,
            40,
            40
          );

          // print dash
          print_text(
            text_options,
            global_pos_y,
            " - ",
            normal_font_size,
            508,
            52,
            lang,
            false
          );

          // print pictogram of closing hours morning
          print_isolated_image(
            global_pos_y,
            "hours/" +
            closing_hours_morning[0] +
            "_" +
            closing_hours_morning[1],
            520,
            40,
            40,
            40
          );

          //print text for afternoon schedule
          print_text(
            text_options,
            global_pos_y,
            dictionary["afternoon_schedule"][lang] + ":",
            normal_font_size,
            275,
            102,
            lang,
            false
          );

          // print pictogram of opening hours afternoon
          print_isolated_image(
            global_pos_y,
            "hours/" +
            opening_hours_afternoon[0] +
            "_" +
            opening_hours_afternoon[1],
            460,
            90,
            40,
            40
          );

          // print dash
          print_text(
            text_options,
            global_pos_y,
            " - ",
            normal_font_size,
            508,
            102,
            lang,
            false
          );

          // print pictogram of closing hours afternoon
          print_isolated_image(
            global_pos_y,
            "hours/" +
            closing_hours_afternoon[0] +
            "_" +
            closing_hours_afternoon[1],
            520,
            90,
            40,
            40
          );
        } else if ( !isEmpty(opening_hours_morning) && !isEmpty(closing_hours_morning) )
        // case with only morning schedule
        {
          //print text for morning schedule
          print_text(
            text_options,
            global_pos_y,
            dictionary["morning_schedule"][lang] + ":",
            normal_font_size,
            275,
            77,
            lang,
            false
          );

          // print pictogram of opening hours morning
          print_isolated_image(
            global_pos_y,
            "hours/" +
            opening_hours_morning[0] +
            "_" +
            opening_hours_morning[1],
            440,
            65,
            40,
            40
          );

          // print dash
          print_text(
            text_options,
            global_pos_y,
            " - ",
            normal_font_size,
            488,
            77,
            lang,
            false
          );

          // print pictogram of closing hours morning
          print_isolated_image(
            global_pos_y,
            "hours/" +
            closing_hours_morning[0] +
            "_" +
            closing_hours_morning[1],
            500,
            65,
            40,
            40
          );
        } else if ( !isEmpty(opening_hours_afternoon) && !isEmpty(closing_hours_afternoon) ) 
        // case for only afternoon schedule
        {
          //print text for afternoon schedule
          print_text(
            text_options,
            global_pos_y,
            dictionary["afternoon_schedule"][lang] + ":",
            normal_font_size,
            275,
            77,
            lang,
            false
          );

          // print pictogram of opening hours afternoon
          print_isolated_image(
            global_pos_y,
            "hours/" +
            opening_hours_afternoon[0] +
            "_" +
            opening_hours_afternoon[1],
            440,
            65,
            40,
            40
          );

          // print dash
          print_text(
            text_options,
            global_pos_y,
            " - ",
            normal_font_size,
            488,
            77,
            lang,
            false
          );

          // print pictogram of closing hours afternoon
          print_isolated_image(
            global_pos_y,
            "hours/" +
            closing_hours_afternoon[0] +
            "_" +
            closing_hours_afternoon[1],
            500,
            65,
            40,
            40
          );
        }
      }
    } catch (e) {
      console.log(e);
    }

    // increase the global position y given the elements used
    global_pos_y += 145 + constants.SPACE_BETWEEN_ELEMENTS;
  }




  /**
  * Print all elements in the case the location is an oline event
  *
  */
  function printEventURL(req) {
    // variables for positions
    let [pos_x, pos_y] = [34, 2];

    // create new text options for the location information
    //console.log("[DEBUG] typeof oTextOptionsSpacing ---%s---", typeof oTextOptionsSpacing)
    let oTempTextOptions = Object.assign({}, oTextOptionsSpacing) 
    //console.log("[DEBUG] oTextOptionsSpacing ---%s---", oTextOptionsSpacing)
    //console.log("[DEBUG] oTempTextOptions ---%s---", oTempTextOptions)
    oTempTextOptions["align"]= "justify"
    oTempTextOptions["width"]= 415 // maximum width space
    //console.log("[DEBUG] oTextOptionsSpacing ---%s---", oTextOptionsSpacing)
    //console.log("[DEBUG] oTempTextOptions ---%s---", oTempTextOptions)

    // calculate the text size of location information with the new text options
    let oTextDimensionsLO= calculateTextSize(oTempTextOptions, dictionary["location"][lang], heading_font_size)
    console.log("[DEBUG] calculateTextSize: %s - %o", dictionary["location"][lang], oTextDimensionsLO)

    // Print rectangle according to the needed size
    print_rectangle(
      global_pos_y,
      37,
      0,
      [543, 65, 5],
      [50, 50, 10],
      [Math.min(oTextDimensionsLO.width + 20, 430), Math.max(oTextDimensionsLO.height + 10, 32), 10]
    );
    
    // Print the associated pictogram
    print_isolated_image(
      global_pos_y,
      "where",
      pos_x,
      pos_y - 10,
      45,
      45,
      "false"
    );

    // print the text in the selected language with the defined options
    print_text(
      oTempTextOptions,
      global_pos_y,
      dictionary["location"][lang],
      heading_font_size,
      //pos_x + 95,
      125,  
      //pos_y,
      -1,
      lang,
      false,
      true
    );

    // print the text before the link
    print_text(
      //text_options,
      oTempTextOptions,
      global_pos_y,
      dictionary["address"][lang] + ": ",
      normal_font_size,
      pos_x + 5,
      pos_y + 50,
      lang,
      false,
      true
    ); 
    
    // print the link  
    var url = req.body["url_online_event"];
    doc.fontSize(normal_font_size)
    .fillColor('blue')
    .text(url, pos_x + 100, global_pos_y + pos_y + 50)
    .underline(pos_x + 100, global_pos_y + pos_y + 50, doc.widthOfString(url), doc.currentLineHeight(), {color: 'blue'})
    .link(pos_x + 100, global_pos_y + pos_y + 50, doc.widthOfString(url), doc.currentLineHeight(), url)

    // increase the global position y given the elements used
    global_pos_y += 80 + constants.SPACE_BETWEEN_ELEMENTS;
  }







  /**
  * Print all elements in the case the location is not an oline event
  *
  */
   function printLocation(req) {
    // variables for positions
    let [pos_x, pos_y] = [34, 2];
    let iTempPosY= 0

    // create new text options for the location information
    //console.log("[DEBUG] typeof oTextOptionsSpacing ---%s---", typeof oTextOptionsSpacing)
    let oTempTextOptions = Object.assign({}, oTextOptionsSpacing) 
    //console.log("[DEBUG] oTextOptionsSpacing ---%s---", oTextOptionsSpacing)
    //console.log("[DEBUG] oTempTextOptions ---%s---", oTempTextOptions)
    oTempTextOptions["align"]= "justify"
    oTempTextOptions["width"]= 450 // maximum width space
    //console.log("[DEBUG] oTextOptionsSpacing ---%s---", oTextOptionsSpacing)
    //console.log("[DEBUG] oTempTextOptions ---%s---", oTempTextOptions)

    // calculate the text size of location information with the new text options
    let oTextDimensionsLO= calculateTextSize(oTempTextOptions, dictionary["location"][lang], heading_font_size)
    console.log("[DEBUG] calculateTextSize: %s - %o", dictionary["location"][lang], oTextDimensionsLO)

    // calculate address and its size, 0 is there is no address
    var sAddress = dictionary["address"][lang] + ": " + fnGenerateAddress(req.body, lang);
    let oTextDimensionsAD= calculateTextSize(oTempTextOptions, sAddress, normal_font_size)
    if (sAddress === dictionary["address"][lang] + ": ") {
      oTextDimensionsAD.width= 0;
      oTextDimensionsAD.height= 0;
    }
    console.log("[DEBUG] address: ---%s--- - %o", sAddress, oTextDimensionsAD)

    // calculate the additional information size, 0 is there is no 
    var sAdditionalInf = dictionary["additional_location_information"][lang] + ": " + req.body["additional_location_information"];
    let oTextDimensionsAI= calculateTextSize(oTempTextOptions, sAdditionalInf, normal_font_size)
    if (sAdditionalInf === dictionary["additional_location_information"][lang] + ": ") {
      oTextDimensionsAI.width= 0;
      oTextDimensionsAI.height= 0;
    }
    console.log("[DEBUG] address: ---%s--- - %o", sAdditionalInf, oTextDimensionsAI)

    // Print rectangle according to the needed size
    print_rectangle(
      global_pos_y,
      37,
      0,
      // [543, 65, 5],
      (size_big = [543, Math.max(oTextDimensionsLO.height + oTextDimensionsAD.height + oTextDimensionsAI.height + 20, 65), 5]),
      [50, 50, 10],
      [Math.min(oTextDimensionsLO.width + 20, 430), Math.max(oTextDimensionsLO.height + 10, 32), 10]
    );

    // Print the associated pictogram
    print_isolated_image(
      global_pos_y,
      "where",
      pos_x,
      pos_y - 10,
      45,
      45,
      "false"
    );

    // print the text in the selected language with the defined options
    print_text(
      oTempTextOptions,
      global_pos_y,
      dictionary["location"][lang],
      heading_font_size,
      //pos_x + 95,
      125,  
      //pos_y,
      -1,
      lang,
      false,
      true
    );

    // increase the temporal position y
    iTempPosY+= 20;

    // print address if there is an address to print
    if (sAddress != dictionary["address"][lang] + ": ") {
      // increase the temporal position y before printing address
      iTempPosY+= Math.max(oTextDimensionsLO.height + 10, 32);

      // print the diferent lines of the address
      print_text(
        oTempTextOptions,
        global_pos_y + iTempPosY,
        sAddress,
        normal_font_size,
        //168,
        100,
        //6, 
        -15, 
        lang,
        false,
        false
      );
    }

    // print additional information if there is one to print
    if (sAdditionalInf != dictionary["additional_location_information"][lang] + ": ") {
      // increase the temporal position y before printing additional information
      iTempPosY+= Math.max(oTextDimensionsAD.height + 10, 32);

      // print the diferent lines of the additional information
      print_text(
        oTempTextOptions,
        global_pos_y + iTempPosY,
        sAdditionalInf,
        normal_font_size,
        //168,
        100,
        //6, 
        -15, 
        lang,
        false,
        false
      );
    }

    // increase the global position y given the elements used
    global_pos_y+= Math.max(oTextDimensionsLO.height + oTextDimensionsAD.height + oTextDimensionsAI.height + 65, 105);

    // variables related to elements in how to get there
    pos_y += 0;
    let spaces = 0;
    iTempPosY= 0
    let aGetThereElements= [];
    let iNoTextElements= 0;
    let iTextElements= 0;
    let iLongTextElements= 0;

    for (let element of ["taxi", "bus", "car", "metro", "parking"]) {
      if (req.body[element] === "Yes") {
        aGetThereElements= aGetThereElements.concat(element);
        if (element === "taxi" || element === "car") {
          spaces += 1;
          iNoTextElements++
        } else if (element === "bus" || element === "metro") {
          spaces += 2;
          iTextElements++
        } else if (element === "parking") {
          spaces += 1;
          iLongTextElements++
          spaces = req.body["parking_slots"] !== "" ? spaces + 1 : spaces;
          spaces = req.body["disabled_num_slots"] !== "" ? spaces + 1 : spaces;
        }
      }
    }
    console.log("[DEBUG] aGetThereElements: ---%s--- - NT %i - T %i - LT %i", aGetThereElements, iNoTextElements, iTextElements, iLongTextElements)
    let iNeededRows= Math.max(Math.ceil((iNoTextElements/2)), iTextElements) + iLongTextElements
    console.log("[DEBUG] iNeededRows: %i", iNeededRows)

    // exit if there are no elements to print
    if (aGetThereElements.length === 0) {
      console.log("[DEBUG] No get there information")
      return
    }

    // creates new page if there is no space in the current one
    //if (global_pos_y + 50 + 90 * 2 > doc.page.height - 20 && spaces > 6) {
    if ( (global_pos_y + 50 + (iNeededRows * 55)) > (doc.page.height - 20) ) {
      doc.addPage({
        margins: {
          top: 10,
          left: 10,
          right: 10,
          bottom: 10
        },
        size: "A4",
      });
      doc.rect(0, 0, doc.page.width, doc.page.height).fill(global_background_color);
      global_pos_y = 40;
    }

    // calculate the text size of location information with the new text options
    let oTextDimensionsGT= calculateTextSize(oTempTextOptions, dictionary["how_to_get_there"][lang], heading_font_size)
    console.log("[DEBUG] calculateTextSize: %s - %o", dictionary["how_to_get_there"][lang], oTextDimensionsLO)

    // Print rectangle according to the needed size
    print_rectangle(
      global_pos_y,
      37,
      0,
      // [543, 65, 5],
      (size_big = [543, Math.max(oTextDimensionsGT.height + (iNeededRows * 65) + 20, 65), 5]),
      [50, 50, 10],
      [Math.min(oTextDimensionsGT.width + 20, 430), Math.max(oTextDimensionsGT.height + 10, 32), 10]
    );

    // Print the associated pictogram
    print_isolated_image(
      global_pos_y,
      "where",
      pos_x,
      pos_y - 10,
      45,
      45,
      "false"
    );

    // print the text in the selected language with the defined options
    print_text(
      oTempTextOptions,
      global_pos_y,
      dictionary["how_to_get_there"][lang],
      heading_font_size,
      //pos_x + 95,
      125,  
      //pos_y,
      -1,
      lang,
      false,
      true
    );

    // increase the temporal position y
    iTempPosY+= 20;

    // TODO - redo this part of location of elements of how to get there
    spaces = Math.ceil(spaces / 3);
     (pos_x += 40), (pos_y += 30);
    let array_pos = [
      [
        [0, 0],
        [160, 0],
        [320, 0],
      ],
      [
        [0, 65],
        [160, 65],
        [320, 65],
      ],
      [
        [0, 130],
        [160, 130],
        [320, 130],
      ],
    ];
    let [array_x, array_y] = [0, 0];
    for (let element of ["taxi", "bus", "car", "metro", "parking"]) {
      if (req.body[element] === "Yes") {
        let add = 0;
        let extra_text = "";

        //Extra text
        if (element === "bus") {
          let [buslines, bustimetable, s_line, s_timetable] = [
            req.body["bus_lines"],
            req.body["bus_timetables"],
            "",
            "",
          ];
          try {
            if ((req.body["bus_lines"].trim().match(/\s/g) || []).length >= 1)
              s_line = "s";
            if ((req.body["bus_timetables"].trim().match(/\s/g) || []).length >= 1)
              s_timetable = "s";
          } catch (e) { }

          extra_text = dictionary["lines_timetable"][lang]
            .replace("{line}", buslines)
            .replace("{timetable}", bustimetable)
            .replace("{s1}", s_line)
            .replace("{s2}", s_timetable);
          } else if (element === "metro") {
          let [metrolines, metrotimetable, s_line, s_timetable] = [
            req.body["metro_lines"],
            req.body["metro_timetables"],
            "",
            "",
          ];
          try {
            if ((req.body["metro_lines"].trim().match(/\s/g) || []).length >= 1)
              s_line = "s";
            if ((req.body["metro_timetables"].trim().match(/\s/g) || []).length >=1)
              s_timetable = "s";
          } catch (e) { }

          extra_text = dictionary["lines_timetable"][lang]
            .replace("{line}", metrolines)
            .replace("{timetable}", metrotimetable)
            .replace("{s1}", s_line)
            .replace("{s2}", s_timetable);
          }

        if (extra_text && (element === "bus" || element === "metro")) {
          add += 1;
        } else if (element === "parking") {
          add += 2;
        }
        if (array_y + add >= array_pos[0].length) {
          array_x += 1;
          array_y = 0;
        }

        let index = array_pos[array_x][array_y];
        if (element === "parking") {
          print_image_fit(
            global_pos_y,
            element,
            req.body,
            index[0] + pos_x + 10,
            index[1] + pos_y + 10,
            60,
            60
          ); //parking icon
        } else {
          print_image_fit(
            global_pos_y,
            element,
            req.body,
            index[0] + pos_x,
            index[1] + pos_y,
            80,
            80
          ); //transpor icon
        }
        print_image_fit(
          global_pos_y,
          element,
          req.body,
          index[0] + pos_x + 85,
          index[1] + pos_y + 20,
          40,
          40,
          true
        ); //check icon
        if (extra_text !== "") {
          print_text(
            text_options,
            global_pos_y,
            extra_text,
            12,
            index[0] + pos_x + 130,
            pos_y + 25 + array_x * 68,
            lang,
            false
          );
        }
        if (element === "parking") {
          if (req.body["parking_slots"] !== "") {
            let s = "";
            try {
              s = parseInt(req.body["parking_slots"]) > 1 ? "s" : "";
            } catch (e) { }
            let parking_slot =
              req.body["parking_slots"] + " " + dictionary["slots"][lang] + s;
            if (req.body["parking_price"] !== "") {
              try {
                const toint = parseFloat(req.body["parking_price"]);
                if (toint === 0) {
                  parking_slot =
                    parking_slot + " (" + dictionary["free"][lang] + ")";
                } else {
                  parking_slot =
                    parking_slot +
                    " (" +
                    req.body["parking_price"] +
                    "€ " +
                    dictionary["each"][lang] +
                    ")";
                }
              } catch (e) { }
            }
            print_isolated_image(
              global_pos_y,
              "discapacidad_motriz",
              index[0] + pos_x + 135,
              pos_y + array_x * 68,
              35,
              35,
              dictionary["ph_parking_slot"][lang] + " "
            );
            print_isolated_image(
              global_pos_y,
              "no",
              index[0] + pos_x + 137,
              pos_y + 10 + array_x * 68,
              25,
              25,
              "false"
            );
            print_text(
              text_options,
              global_pos_y,
              parking_slot,
              normal_font_size,
              index[0] + pos_x + 180,
              pos_y + 10 + array_x * 71,
              lang,
              false
            );
          }
          if (req.body["disabled_num_slots"] !== "") {
            let s = "";
            try {
              s = parseInt(req.body["disabled_num_slots"]) === 1 ? "" : "s";
            } catch (e) { }
            let parking_slot =
              req.body["disabled_num_slots"] +
              " " +
              dictionary["slots"][lang] +
              s;
            if (parseInt(req.body["disabled_num_slots"]) > 0) {
              try {
                const disabled_price_slot = parseFloat(
                  req.body["disabled_price_slots"].replace("€", "").trim()
                );
                if (disabled_price_slot === 0) {
                  parking_slot =
                    parking_slot + " (" + dictionary["free"][lang] + ")";
                } else {
                  parking_slot =
                    parking_slot +
                    " (" +
                    req.body["disabled_price_slots"] +
                    "€ " +
                    dictionary["each"][lang] +
                    ")";
                }
              } catch (e) { }
            }
            print_isolated_image(
              global_pos_y,
              "discapacidad_motriz",
              index[0] + pos_x + 135,
              pos_y + 40 + array_x * 68,
              35,
              35,
              dictionary["reserved_slots"][lang]
            );
            print_text(
              text_options,
              global_pos_y,
              parking_slot,
              normal_font_size,
              index[0] + pos_x + 180,
              pos_y + 50 + array_x * 71,
              lang,
              false
            );
          }
        }

        if (array_y + add + 1 >= array_pos[0].length) {
          array_x += 1;
          array_y = 0;
        } else {
          array_y += add + 1;
        }
      }
    }

    // increase the global position y given the elements used
    //global_pos_y += 50 + spaces * 67 + constants.SPACE_BETWEEN_ELEMENTS;
    global_pos_y += Math.max(oTextDimensionsGT.height + (iNeededRows * 65) + 50, 65)
  }







  /**
  * Print all elements in ticket information
  *
  */
  function printTicketInformation(req) {
    // variables for positions
    let [pos_x, pos_y] = [34, 2];
    let iTempPosY= 0

    // create new text options for the tickets information
    //console.log("[DEBUG] typeof oTextOptionsSpacing ---%s---", typeof oTextOptionsSpacing)
    let oTempTextOptions = Object.assign({}, oTextOptionsSpacing) 
    //console.log("[DEBUG] oTextOptionsSpacing ---%s---", oTextOptionsSpacing)
    //console.log("[DEBUG] oTempTextOptions ---%s---", oTempTextOptions)
    oTempTextOptions["align"]= "justify"
    oTempTextOptions["width"]= 450 // maximum width space
    //console.log("[DEBUG] oTextOptionsSpacing ---%s---", oTextOptionsSpacing)
    //console.log("[DEBUG] oTempTextOptions ---%s---", oTempTextOptions)

    // calculate the text size of location information with the new text options
    let oTextDimensionsTI= calculateTextSize(oTempTextOptions, dictionary["tickets_information"][lang], heading_font_size)
    console.log("[DEBUG] calculateTextSize: %s - %o", dictionary["tickets_information"][lang], oTextDimensionsTI)

    // calculate needed space
    let iNeededSpace= req.body["online"] === "Yes" || req.body["onsite"] === "Yes" ? 2 : 0;
    iNeededSpace= req.body["reduced_price"] === "Yes" || req.body["normal_price"] !== "" ? iNeededSpace + 1 : iNeededSpace;
    iNeededSpace = req.body["free_interpreter"] === "Yes" ? iNeededSpace + 1 : iNeededSpace;

    // calculate family price its size, 0 is there is no familiy price
    let sFamilyPrice = "";
    let oTextDimensionsFP= calculateTextSize(oTempTextOptions, sFamilyPrice, normal_font_size)
    let print_family_price = false;
    if (req.body["family_price"] === "Yes") {
      sFamilyPrice = dictionary["family_price"][lang] + ": ";
      //get price per member
      try {
        if ( parseFloat(req.body["member_price"].replace("€", "").trim()) === 0 ) {
          sFamilyPrice =
            sFamilyPrice + dictionary["free_for_all"][lang] + " ";
        } else {
          let member_price_coin =
            req.body["member_price_coin"] !== "" ?
              req.body["member_price_coin"] :
              constants.DEFAULT_COIN;
          sFamilyPrice =
            sFamilyPrice +
            req.body["member_price"] +
            member_price_coin +
            " " +
            dictionary["per_member"][lang] +
            " ";
        }
      } catch (e) {
        sFamilyPrice = sFamilyPrice + req.body["member_price"] + " ";
      }

      // get child and max_age number
      let children, max_age;
      try {
        children = isNaN(parseInt(req.body["max_num_children"])) ?
          0 :
          parseInt(req.body["max_num_children"]);
      } catch (e) {
        children = -1;
      }
      try {
        max_age = isNaN(parseInt(req.body["max_age_children"])) ?
          0 :
          parseInt(req.body["max_age_children"]);
      } catch (e) {
        max_age = -1;
      }

      //Build the string
      if (children !== -1 && max_age !== -1) {
        if (!(children === 0 && max_age === 0)) {
          if (children !== 0)
            sFamilyPrice = sFamilyPrice + "(max. " + children.toString() + " " + dictionary[children === 1 ? "child" : "children"][lang];
          if (children !== 0 && max_age === 0) sFamilyPrice = sFamilyPrice + ")";
          if (children === 0 && max_age !== 0) sFamilyPrice = sFamilyPrice + "(" + dictionary["children"][lang];
          if (max_age !== 0) sFamilyPrice = sFamilyPrice + " " +
              dictionary[max_age === 1 ? "max_age_1" : "max_age_2"][lang].replace("{num_y}", max_age.toString()) + ")";
        }
        print_family_price = true;
      }

      // calculate size
      oTextDimensionsFP= calculateTextSize(oTempTextOptions, sFamilyPrice, normal_font_size)
    } else {
      oTextDimensionsFP.width= 0;
      oTextDimensionsFP.height= 0;
    }
    console.log("[DEBUG] sFamilyPrice: ---%s--- - %o", sFamilyPrice, oTextDimensionsFP)

    // calculate terms and conditions and its size, 0 is there is no terms and conditions
    let sTermCondition = req.body["terms_condition"];
    let oTextDimensionsTC= calculateTextSize(oTempTextOptions, sTermCondition, normal_font_size)
    if (sTermCondition === "") {
      oTextDimensionsTC.width= 0;
      oTextDimensionsTC.height= 0;
    }
    console.log("[DEBUG] sTermCondition: ---%s--- - %o", sTermCondition, oTextDimensionsTC)

    // creates new page if there is no space in the current one
    //if (global_pos_y + 50 + 90 * 2 > doc.page.height - 20 && spaces > 6) {
    if ( (global_pos_y + 50 +  Math.max(oTextDimensionsTI.height + (iNeededSpace * 31) +  oTextDimensionsFP.height +  oTextDimensionsTC.height + 25, 65)) > (doc.page.height - 20) ) {
        doc.addPage({
          margins: {
            top: 10,
            left: 10,
            right: 10,
            bottom: 10
          },
          size: "A4",
        });
        doc.rect(0, 0, doc.page.width, doc.page.height).fill(global_background_color);
        global_pos_y = 40;
      }

    // Print rectangle according to the needed size
    print_rectangle(
      global_pos_y,
      37,
      0,
      // [543, 65, 5],
      (size_big = [543, Math.max(oTextDimensionsTI.height + (iNeededSpace * 31) +  oTextDimensionsFP.height +  oTextDimensionsTC.height + 25, 65), 5]),
      [50, 50, 10],
      [Math.min(oTextDimensionsTI.width + 20, 430), Math.max(oTextDimensionsTI.height + 10, 32), 10]
    );

    // Print the associated pictogram
    print_isolated_image(
      global_pos_y,
      "where",
      pos_x,
      pos_y - 10,
      45,
      45,
      "false"
    );

    // print the text in the selected language with the defined options
    print_text(
      oTempTextOptions,
      global_pos_y,
      dictionary["tickets_information"][lang],
      heading_font_size,
      //pos_x + 95,
      125,  
      //pos_y,
      -1,
      lang,
      false,
      true
    );

    // increase the temporal position y
    iTempPosY+= 20;


    
    //  global_pos_y+= 300



    let add_new_page = false;

    /*
    if (global_pos_y + 25 + iNeededSpace * 31 > doc.page.height - 20) {
      doc.addPage({
        margins: {
          top: 10,
          left: 10,
          right: 10,
          bottom: 10
        },
        size: "A4",
      });
      doc.rect(0, 0, doc.page.width, doc.page.height).fill(global_background_color);
      global_pos_y = 40;
      add_new_page = true;
    }

    //Information about the tickets
    [pos_x, pos_y] = [45, 40];

    print_rectangle(
      global_pos_y,
      37,
      0,
      [543, 25 + iNeededSpace * 31, 5],
      [60, 50, 10],
      [calculateSpace(dictionary["tickets_information"][lang], true), 40, 10]
    );
    print_isolated_image(
      global_pos_y,
      "ticket_" + "generic",
      35,
      -12,
      55,
      55,
      "false"
    ); //TODO: Pictogramas en otros idiomas
    print_text(
      text_options,
      global_pos_y,
      "tickets_information",
      heading_font_size,
      122,
      2,
      lang,
      true,
      true
    );
    */

    // update position for elements
    [pos_x, pos_y] = [45, 40];

    // print elemets related to sell online  
    if (req.body["online"] === "Yes") {
      // print pictogram online
      print_image_fit(global_pos_y, "online", req.body, pos_x, pos_y, 70, 70);
      // print green tick
      print_image_fit(global_pos_y, "online", req.body, pos_x + 80, pos_y + 15, 35, 35, true);

      // print the link  
      let url = req.body["ph_link"];
      let urlText= dictionary["press"][lang]
      doc.fontSize(normal_font_size)
      .fillColor('blue')
      .text(urlText, pos_x + 130, global_pos_y + pos_y + 20)
      .underline(pos_x + 130, global_pos_y + pos_y + 25, doc.widthOfString(urlText), doc.currentLineHeight(), {color: 'blue'})
      .link(pos_x + 130, global_pos_y + pos_y + 25, doc.widthOfString(urlText), doc.currentLineHeight(), url)

      pos_x += 225;
    }

    let oTempTextOptions2 = Object.assign({}, oTextOptionsSpacing) 
    //console.log("[DEBUG] oTextOptionsSpacing ---%s---", oTextOptionsSpacing)
    //console.log("[DEBUG] oTempTextOptions ---%s---", oTempTextOptions)
    oTempTextOptions2["align"]= "justify"
    oTempTextOptions2["width"]= 160 // maximum width space
    //console.log("[DEBUG] oTextOptionsSpacing ---%s---", oTextOptionsSpacing)
    //console.log("[DEBUG] oTempTextOptions ---%s---", oTempTextOptions)


    // print elemets related to sell onsite  
    if (req.body["onsite"] === "Yes") {
      // print pictogram onsite
      print_image_fit(global_pos_y, "onsite", req.body, pos_x, pos_y, 70, 70);
      // print green tick
      print_image_fit(global_pos_y, "onsite", req.body, pos_x + 80, pos_y + 15, 35, 35, true);

      // calculate text dimensions and prints it
      let oTextDimensionsWH= calculateTextSize(oTempTextOptions, req.body["where"], normal_font_size)
      console.log("[DEBUG] calculateTextSize: %s - %o", req.body["where"], oTextDimensionsWH)
      print_text(
        oTempTextOptions2,
        global_pos_y,
        req.body["where"],
        normal_font_size,
        pos_x + 120,
        pos_y + 30 - (oTextDimensionsWH.height / 1.5),
        lang,
        false,
        false
        //dictionary["where_buy_tickets"][lang] + " " + req.body["where"]
      );
    }

    // update y position if printed or not previous elements
    pos_y = req.body["onsite"] !== "Yes" && req.body["online"] !== "Yes" ? pos_y + 10 : pos_y + 80;
    pos_x = 40;

    let oTempTextOptions3 = Object.assign({}, oTextOptionsSpacing) 
    //console.log("[DEBUG] oTextOptionsSpacing ---%s---", oTextOptionsSpacing)
    //console.log("[DEBUG] oTempTextOptions ---%s---", oTempTextOptions)
    oTempTextOptions3["align"]= "justify"
    oTempTextOptions3["width"]= 230 // maximum width space
    //console.log("[DEBUG] oTextOptionsSpacing ---%s---", oTextOptionsSpacing)
    //console.log("[DEBUG] oTempTextOptions ---%s---", oTempTextOptions)

    // get coin used, default instead
    let normal_price_symbol = req.body["normal_price_coin"] !== "" ? req.body["normal_price_coin"] : constants.DEFAULT_COIN;
    let bPrices= false;

    // print normal price if free or different to 0
    if (parseFloat(req.body["normal_price"]) === 0) {
      print_text(
        oTempTextOptions3,
        global_pos_y,
        dictionary["normal_price"][lang] + ": " + dictionary["free"][lang],
        normal_font_size,
        pos_x,
        pos_y,
        lang,
        false
      );
      bPrices= true;
    } else if (!isNaN(parseFloat(req.body["normal_price"]))) {
      print_text(
        oTempTextOptions3,
        global_pos_y,
        dictionary["normal_price"][lang] + ": " + req.body["normal_price"] + normal_price_symbol,
        normal_font_size,
        pos_x,
        pos_y,
        lang,
        false
      );
      bPrices= true;
    }

    // print reduced price
    if (req.body["reduced_price"] === "Yes") {
      // get coin used, default instead
      let reduced_price_symbol = req.body["reduced_price_when_coin"] !== "" ? req.body["reduced_price_when_coin"] : constants.DEFAULT_COIN;

      if (parseFloat(req.body["reduced_price_when"]) === 0) {
        print_text(
          oTempTextOptions3,
          global_pos_y,
          dictionary["reduced_price"][lang] + ": " + dictionary["free"][lang],
          normal_font_size,
          pos_x + 250,
          pos_y,
          lang,
          false
        );
      } else if (!isNaN(parseFloat(req.body["reduced_price_when"]))) {
        print_text(
          oTempTextOptions3,
          global_pos_y,
          dictionary["reduced_price"][lang] + ": " + req.body["reduced_price_when"] + reduced_price_symbol,
          normal_font_size,
          pos_x + 250,
          pos_y,
          lang,
          false
        );
      }

      bPrices= true;
    }

    //update y position if any price printed
    if (bPrices === true) pos_y += 25;

    let oTempTextOptions4 = Object.assign({}, oTextOptionsSpacing) 
    //console.log("[DEBUG] oTextOptionsSpacing ---%s---", oTextOptionsSpacing)
    //console.log("[DEBUG] oTempTextOptions ---%s---", oTempTextOptions)
    oTempTextOptions4["align"]= "justify"
    oTempTextOptions4["width"]= 500 // maximum width space
    //console.log("[DEBUG] oTextOptionsSpacing ---%s---", oTextOptionsSpacing)
    //console.log("[DEBUG] oTempTextOptions ---%s---", oTempTextOptions)

    // print information regarding family prices
    if (req.body["family_price"] === "Yes" && print_family_price) {
      print_text(
        //text_options,
        oTempTextOptions4,
        global_pos_y,
        sFamilyPrice,
        normal_font_size,
        pos_x,
        pos_y,
        lang,
        false
      );

      //[pos_x, pos_y] = [pos_x, pos_y + 40];
      pos_y+= oTextDimensionsFP.height + 7
    }

    let oTextDimensionsFI= calculateTextSize(oTempTextOptions, dictionary["free_interpreter"][lang], normal_font_size)
    console.log("[DEBUG] calculateTextSize: %s - %o", dictionary["free_interpreter"][lang], oTextDimensionsFI)

    // print information regarding free interpreter
    if (req.body["free_interpreter"] === "Yes") {
      print_text(
        oTempTextOptions4,
        global_pos_y,
        dictionary["free_interpreter"][lang],
        normal_font_size,
        pos_x,
        pos_y,
        lang,
        false
      );

      print_image_fit(
        global_pos_y,
        "free_interpreter",
        req.body,
        //pos_x + 345,
        pos_x + oTextDimensionsFI.width + 9,
        pos_y - 10,
        25,
        25,
        true
      );
      //[pos_x, pos_y] = [pos_x, pos_y + 25];
      pos_y+= oTextDimensionsFI.height + 7
    }

    // print information regarding other discounts
    if (req.body["other_discounts"] === "Yes" && sTermCondition !== "") {
      print_text(
        oTempTextOptions4,
        global_pos_y,
        sTermCondition,
        normal_font_size,
        pos_x,
        pos_y,
        lang,
        false
      );

      //[pos_x, pos_y] = [pos_x, pos_y + 25];
      pos_y+= oTextDimensionsTC.height + 7
    }

    /*
    if (!add_new_page) {
      doc.addPage({
        margins: {
          top: 10,
          left: 10,
          right: 10,
          bottom: 10
        },
        size: "A4",
      });
      doc.rect(0, 0, doc.page.width, doc.page.height).fill(global_background_color);
      global_pos_y = 40;
    } else {
      global_pos_y += 50 + constants.SPACE_BETWEEN_ELEMENTS + iNeededSpace * 31;
    }
    */

    global_pos_y+= Math.max(oTextDimensionsTI.height + (iNeededSpace * 31) +  oTextDimensionsFP.height +  oTextDimensionsTC.height + 45, 65);
  }









  function printFacilitiesInformation(req) {
    //Features information
    let iNumberToPrint= 0;
    for (let element of Object.keys(constants.FACILITIES)) {
      if (req.body[element] === "Yes") {
        iNumberToPrint++;
      }
    }
    //console.log("[DEBUG] constants.FACILITIES: %o", Object.keys(constants.FACILITIES))
    console.log("[DEBUG] iNumberToPrint: %i", iNumberToPrint)
    iLinesNeeded= Math.ceil(iNumberToPrint / 4)
    console.log("[DEBUG] iLinesNeeded: %i", iLinesNeeded)


    // create new text options for the tickets information
    //console.log("[DEBUG] typeof oTextOptionsSpacing ---%s---", typeof oTextOptionsSpacing)
    let oTempTextOptions = Object.assign({}, oTextOptionsSpacing) 
    //console.log("[DEBUG] oTextOptionsSpacing ---%s---", oTextOptionsSpacing)
    //console.log("[DEBUG] oTempTextOptions ---%s---", oTempTextOptions)
    oTempTextOptions["align"]= "justify"
    oTempTextOptions["width"]= 450 // maximum width space
    //console.log("[DEBUG] oTextOptionsSpacing ---%s---", oTextOptionsSpacing)
    //console.log("[DEBUG] oTempTextOptions ---%s---", oTempTextOptions)

    // calculate the text size of location information with the new text options
    let oTextDimensionsIF= calculateTextSize(oTempTextOptions, dictionary["information_facilities"][lang], heading_font_size)
    console.log("[DEBUG] calculateTextSize: %s - %o", dictionary["information_facilities"][lang], oTextDimensionsIF)
    
    // create a new page if necessary
    if (global_pos_y + 50 + Math.max(iLinesNeeded * 72 + 25, 65) > doc.page.height - 20) {
      doc.addPage({
        margins: {
          top: 10,
          left: 10,
          right: 10,
          bottom: 10
        },
        size: "A4",
      });
      doc.rect(0, 0, doc.page.width, doc.page.height).fill(global_background_color);
      global_pos_y = 40;
    }

    // Print rectangle according to the needed size
    print_rectangle(
      global_pos_y,
      37,
      0,
      (size_big = [543, Math.max(iLinesNeeded * 72 + 25, 65), 5]),
      [70, 50, 10],
      [Math.min(oTextDimensionsIF.width + 20, 430), Math.max(oTextDimensionsIF.height + 10, 32), 10]
    );

    // Print the associated pictogram
    print_isolated_image(
      global_pos_y,
      "features_information",
      34,
      -8,
      55,
      55,
      "false"
    );

    // print the text in the selected language with the defined options
    print_text(
      oTempTextOptions,
      global_pos_y,
      dictionary["information_facilities"][lang],
      heading_font_size,
      125,  
      -1,
      lang,
      false,
      true
    );

    // define positions to place elements
    [pos_x, pos_y] = [50, 15];
    array_pos = [
      [
        [0, 30],
        [130, 30],
        [260, 30],
        [390, 30],
      ],
      [
        [0, 100],
        [130, 100],
        [260, 100],
        [390, 100],
      ],
      [
        [0, 170],
        [130, 170],
        [260, 170],
        [390, 170],
      ],
      [
        [0, 240],
        [130, 240],
        [260, 240],
        [390, 240],
      ],
      [
        [0, 310],
        [130, 310],
        [260, 310],
        [390, 310],
      ],
    ];
    array_lengths = [53, 108, 175, 240, 310, 380];
    [array_x, array_y] = [-1, 0];

    // print the necessary elements
    for (let element of Object.keys(constants.FACILITIES)) {
      if (req.body[element] === "Yes") {
        array_x = array_x === -1 ? 0 : array_x;
        let index = array_pos[array_x][array_y];
        
        // print element
        print_image_fit(
          global_pos_y,
          element,
          req.body,
          pos_x + index[0],
          pos_y + index[1],
          60,
          60
        );

        // print green tick
        print_image_fit(
          global_pos_y,
          element,
          req.body,
          pos_x + index[0] + 70,
          pos_y + index[1] + 15,
          35,
          35,
          true
        ); 

        // calculate new postion for next element
        if (array_y + 1 >= array_pos[0].length) {
          array_x += 1;
          array_y = 0;
        } else {
          array_y += 1;
        }
      }
    }

    array_x = array_x > 3 ? 4 : array_x;
    array_x = array_y === 0 ? array_x - 1 : array_x;
    array_x = array_x < 0 ? 0 : array_x;



    global_pos_y+= Math.max(iLinesNeeded * 72 + 45, 85)

    /*
    global_pos_y +=
      20 + array_lengths[array_x + 1] + constants.SPACE_BETWEEN_ELEMENTS;

    if (array_x == 4 || global_pos_y > 750) {
      doc.addPage({
        margins: {
          top: 10,
          left: 10,
          right: 10,
          bottom: 10
        },
        size: "A4",
      });
      doc.rect(0, 0, doc.page.width, doc.page.height).fill(global_background_color);
      global_pos_y = 40;
    }
    */
  }








  function printGuidesInformation(req) {
    //Guides information

    let iNumberToPrint= 0;
    for (let element of ["sign_guides", "audible_guides", "braille_guides", "pictogram_guides", 
      "easy_vocabulary_guides", "different_languages", "private_tours"]) {
      if (req.body[element] === "Yes") {
        iNumberToPrint++;
      }
    }
    console.log("[DEBUG] iNumberToPrint: %i", iNumberToPrint);
    iLinesNeeded= Math.ceil(iNumberToPrint / 4);
    console.log("[DEBUG] iLinesNeeded: %i", iLinesNeeded);

    // create new text options for the tickets information
    //console.log("[DEBUG] typeof oTextOptionsSpacing ---%s---", typeof oTextOptionsSpacing)
    let oTempTextOptions = Object.assign({}, oTextOptionsSpacing) 
    //console.log("[DEBUG] oTextOptionsSpacing ---%s---", oTextOptionsSpacing)
    //console.log("[DEBUG] oTempTextOptions ---%s---", oTempTextOptions)
    oTempTextOptions["align"]= "justify"
    oTempTextOptions["width"]= 450 // maximum width space
    //console.log("[DEBUG] oTextOptionsSpacing ---%s---", oTextOptionsSpacing)
    //console.log("[DEBUG] oTempTextOptions ---%s---", oTempTextOptions)

    // calculate the text size of location information with the new text options
    let oTextDimensionsGI= calculateTextSize(oTempTextOptions, dictionary["information_guides"][lang], heading_font_size)
    console.log("[DEBUG] calculateTextSize: %s - %o", dictionary["information_guides"][lang], oTextDimensionsGI)
    
    // create a new page if necessary
    if (global_pos_y + 50 + Math.max(iLinesNeeded * 72 + 25, 65) > doc.page.height - 20) {
      doc.addPage({
        margins: {
          top: 10,
          left: 10,
          right: 10,
          bottom: 10
        },
        size: "A4",
      });
      doc.rect(0, 0, doc.page.width, doc.page.height).fill(global_background_color);
      global_pos_y = 40;
    }

    // Print rectangle according to the needed size
    print_rectangle(
      global_pos_y,
      37,
      0,
      [543, Math.max(iLinesNeeded * 72 + 25, 65), 5],
      [60, 60, 10],
      [Math.min(oTextDimensionsGI.width + 20, 430), Math.max(oTextDimensionsGI.height + 10, 32), 10]
    );

    // Print the associated pictogram
    print_isolated_image(
      global_pos_y,
      "guide_" + "generic",
      34,
      -8,
      55,
      55,
      "false"
    ); 

    // print the text in the selected language with the defined options
    print_text(
      oTempTextOptions,
      global_pos_y,
      dictionary["information_guides"][lang],
      heading_font_size,
      125,
      -1,
      lang,
      false,
      true
    );


    // define positions to place elements
    [pos_x, pos_y] = [50, 15];
    array_pos = [
      [
        [0, 30],
        [130, 30],
        [260, 30],
        [390, 30],
      ],
      [
        [0, 100],
        [130, 100],
        [260, 100],
        [390, 100],
      ],
    ];
    array_lengths = [53, 108, 175];
    [array_x, array_y] = [-1, 0];

    // print the necessary elements
    for (let element of [
      "sign_guides",
      "audible_guides",
      "braille_guides",
      "pictogram_guides",
      "easy_vocabulary_guides",
      "different_languages",
      "private_tours",
    ]) {
      if (req.body[element] === "Yes") {
        array_x = array_x === -1 ? 0 : array_x;
        let index = array_pos[array_x][array_y];

        // print element
        print_image_fit(
          global_pos_y,
          element,
          req.body,
          pos_x + index[0],
          pos_y + index[1],
          60,
          60
        );

        // print green tick
        print_image_fit(
          global_pos_y,
          element,
          req.body,
          pos_x + index[0] + 70,
          pos_y + index[1] + 15,
          35,
          35,
          true
        );

        // calculate new postion for next element
        if (array_y + 1 >= array_pos[0].length) {
          array_x += 1;
          array_y = 0;
        } else {
          array_y += 1;
        }
      }
    }

    if (req.body["private_tours"] === "Yes") {
      let descuento = 0;
      let text= ""
      if (req.body["duration_private_tour"] !== "") {
        text = text + req.body["duration_private_tour"] + " min";
      }
      if (req.body["price_private_tour"] !== "") {
        if (parseFloat(req.body["price_private_tour"].replace("€", "")) === 0) {
          text += " (" + dictionary["free"][lang] + ")";
        } else {
          let private_tour_coin =
            req.body["price_private_tour_coin"] !== "" ?
              req.body["price_private_tour_coin"] :
              constants.DEFAULT_COIN;
          text +=
            " (" + req.body["price_private_tour"] + private_tour_coin + ")";
        }
      }

      if (text !== "") {
        // create new text options for the tickets information
        //console.log("[DEBUG] typeof oTextOptionsSpacing ---%s---", typeof oTextOptionsSpacing)
        let oTempTextOptions2 = Object.assign({}, oTextOptionsSpacing) 
        //console.log("[DEBUG] oTextOptionsSpacing ---%s---", oTextOptionsSpacing)
        //console.log("[DEBUG] oTempTextOptions ---%s---", oTempTextOptions)
        oTempTextOptions2["align"]= "left"
        oTempTextOptions2["width"]= 100 // maximum width space
        //console.log("[DEBUG] oTextOptionsSpacing ---%s---", oTextOptionsSpacing)
        //console.log("[DEBUG] oTempTextOptions ---%s---", oTempTextOptions)

        // calculate the text size of location information with the new text options
        let oTextDimensionsPT= calculateTextSize(oTempTextOptions, text, normal_font_size)
        console.log("[DEBUG] calculateTextSize: %s - %o", text, oTextDimensionsPT)

        //if (text.length > 11) [text, descuento] = [text.replace(" (", "\n("), 10];
        let index = array_pos[array_x][array_y];

        print_isolated_image(
          global_pos_y,
          "chronometer",
          pos_x + index[0] - 25,
          pos_y + index[1] + 15,
          35,
          35,
          dictionary["chronometer"][lang]
        );

        print_text(
          oTempTextOptions2,
          global_pos_y,
          text,
          normal_font_size,
          pos_x + index[0] + 10 + descuento,
          pos_y + index[1] + 25 - descuento - (oTextDimensionsPT.width > 100 ? oTextDimensionsPT.height / 2 : 0),
          lang,
          false
        );
      }
    }

    /*
    array_x = array_x === 2 ? 1 : array_x;
    array_x = array_y === 0 ? array_x - 1 : array_x;
    array_x = array_x < 0 ? 0 : array_x;

    global_pos_y +=
      20 + array_lengths[array_x + 1] + constants.SPACE_BETWEEN_ELEMENTS;
    */

    global_pos_y+= Math.max(iLinesNeeded * 72 + 45, 85)

  }

  function printAllowedActionsInformation(req) {
    //Information allowed actions
    let iNumberToPrint= 0;
    for (let element of Object.keys(constants.ALLOWED_ACTIONS)) {
      if (req.body[element] === "Yes" || req.body[element] === "No") {
        iNumberToPrint++;
      }
    }
    //console.log("[DEBUG] constants.FACILITIES: %o", Object.keys(constants.FACILITIES))
    console.log("[DEBUG] iNumberToPrint: %i", iNumberToPrint)
    iLinesNeeded= Math.ceil(iNumberToPrint / 4)
    console.log("[DEBUG] iLinesNeeded: %i", iLinesNeeded)

        // create new text options for the tickets information
    //console.log("[DEBUG] typeof oTextOptionsSpacing ---%s---", typeof oTextOptionsSpacing)
    let oTempTextOptions = Object.assign({}, oTextOptionsSpacing) 
    //console.log("[DEBUG] oTextOptionsSpacing ---%s---", oTextOptionsSpacing)
    //console.log("[DEBUG] oTempTextOptions ---%s---", oTempTextOptions)
    oTempTextOptions["align"]= "justify"
    oTempTextOptions["width"]= 450 // maximum width space
    //console.log("[DEBUG] oTextOptionsSpacing ---%s---", oTextOptionsSpacing)
    //console.log("[DEBUG] oTempTextOptions ---%s---", oTempTextOptions)

    // calculate the text size of location information with the new text options
    let oTextDimensionsAA= calculateTextSize(oTempTextOptions, dictionary["information_allowed_actions"][lang], heading_font_size)
    console.log("[DEBUG] calculateTextSize: %s - %o", dictionary["information_allowed_actions"][lang], oTextDimensionsAA)
    
    // create a new page if necessary
    if (global_pos_y + 50 + Math.max(iLinesNeeded * 72 + 25, 65) > doc.page.height - 20) {
      doc.addPage({
        margins: {
          top: 10,
          left: 10,
          right: 10,
          bottom: 10
        },
        size: "A4",
      });
      doc.rect(0, 0, doc.page.width, doc.page.height).fill(global_background_color);
      global_pos_y = 40;
    }


    // Print rectangle according to the needed size
    print_rectangle(
      global_pos_y,
      37,
      0,
      (size_big = [543, Math.max(iLinesNeeded * 72 + 25, 65), 5]),
      [70, 50, 10],
      [Math.min(oTextDimensionsAA.width + 20, 430), Math.max(oTextDimensionsAA.height + 10, 32), 10]
    );

    // Print the associated pictogram
    print_isolated_image(
      global_pos_y,
      "allowed_actions",
      40,
      -5,
      55,
      55,
      "false"
    );

    // print the text in the selected language with the defined options
    print_text(
      oTempTextOptions,
      global_pos_y,
      dictionary["information_allowed_actions"][lang],
      heading_font_size,
      125,  
      -1,
      lang,
      false,
      true
    );

    // define positions to place elements
    let [pos_x, pos_y] = [50, 15];
    array_pos = [
      [
        [0, 30],
        [130, 30],
        [260, 30],
        [390, 30],
      ],
      [
        [0, 100],
        [130, 100],
        [260, 100],
        [390, 100],
      ],
      [
        [0, 170],
        [130, 170],
        [260, 170],
        [390, 170],
      ],
    ];
    array_lengths = [53, 108, 175, 240];
    [array_x, array_y] = [-1, 0];

    /*
    //Check page swap
    spaces = 0;
    for (let element of Object.keys(constants.ALLOWED_ACTIONS)) {
      //if (req.body[element] === "Yes") {
      spaces += 1;
      //}
    }
    spaces = Math.ceil(spaces / 4);
    if (
      global_pos_y +
      20 +
      constants.SPACE_BETWEEN_ELEMENTS +
      array_lengths[spaces] >
      doc.page.height - 20
    ) {
      doc.addPage({
        margins: {
          top: 10,
          left: 10,
          right: 10,
          bottom: 10
        },
        size: "A4",
      });
      doc.rect(0, 0, doc.page.width, doc.page.height).fill(global_background_color);
      global_pos_y = 40;
    }
    */

    for (let element of Object.keys(constants.ALLOWED_ACTIONS)) {
      array_x = array_x === -1 ? 0 : array_x;
      let index = array_pos[array_x][array_y];
      print_image_fit(
        global_pos_y,
        element,
        req.body,
        pos_x + index[0],
        pos_y + index[1],
        60,
        60
      );
      print_image_fit(
        global_pos_y,
        element,
        req.body,
        pos_x + index[0] + 70,
        pos_y + index[1] + 15,
        35,
        35,
        true
      );
      if (array_y + 1 >= array_pos[0].length) {
        array_x += 1;
        array_y = 0;
      } else {
        array_y += 1;
      }
    }

    /*
    array_x = array_x === 4 ? 3 : array_x;
    array_x = array_y === 0 ? array_x - 1 : array_x;
    array_x = array_x < 0 ? 0 : array_x;

    global_pos_y +=
      20 + array_lengths[array_x + 1] + constants.SPACE_BETWEEN_ELEMENTS;

    if (
      global_pos_y +
      20 +
      constants.SPACE_BETWEEN_ELEMENTS +
      array_lengths[spaces] >
      doc.page.height - 20
    ) {
      doc.addPage({
        margins: {
          top: 10,
          left: 10,
          right: 10,
          bottom: 10
        },
        size: "A4",
      });
      doc.rect(0, 0, doc.page.width, doc.page.height).fill(global_background_color);
      global_pos_y = 40;
    }

    pos_y = 25;
    */

    global_pos_y+= Math.max(iLinesNeeded * 72 + 45, 85)
  }






  function printCOVID19Restrictions(req) {
    //Information allowed actions
    let iNumberToPrint= 0;
    for (let element of Object.keys(constants.COVID_19_RESTRICTIONS)) {
      if (req.body[element] === "Yes") {
        iNumberToPrint++;
      }
    }
    //console.log("[DEBUG] constants.FACILITIES: %o", Object.keys(constants.FACILITIES))
    console.log("[DEBUG] iNumberToPrint: %i", iNumberToPrint)
    iLinesNeeded= Math.ceil(iNumberToPrint / 4)
    console.log("[DEBUG] iLinesNeeded: %i", iLinesNeeded)


    // create new text options for the tickets information
    //console.log("[DEBUG] typeof oTextOptionsSpacing ---%s---", typeof oTextOptionsSpacing)
    let oTempTextOptions = Object.assign({}, oTextOptionsSpacing) 
    //console.log("[DEBUG] oTextOptionsSpacing ---%s---", oTextOptionsSpacing)
    //console.log("[DEBUG] oTempTextOptions ---%s---", oTempTextOptions)
    oTempTextOptions["align"]= "justify"
    oTempTextOptions["width"]= 450 // maximum width space
    //console.log("[DEBUG] oTextOptionsSpacing ---%s---", oTextOptionsSpacing)
    //console.log("[DEBUG] oTempTextOptions ---%s---", oTempTextOptions)

    // calculate the text size of location information with the new text options
    let oTextDimensionsCR= calculateTextSize(oTempTextOptions, dictionary["covid_19_restrictions"][lang], heading_font_size)
    console.log("[DEBUG] calculateTextSize: %s - %o", dictionary["covid_19_restrictions"][lang], oTextDimensionsCR)
    
    // create a new page if necessary
    if (global_pos_y + 50 + Math.max(iLinesNeeded * 72 + 35, 65) > doc.page.height - 20) {
      doc.addPage({
        margins: {
          top: 10,
          left: 10,
          right: 10,
          bottom: 10
        },
        size: "A4",
      });
      doc.rect(0, 0, doc.page.width, doc.page.height).fill(global_background_color);
      global_pos_y = 40;
    }

    // Print rectangle according to the needed size
    print_rectangle(
      global_pos_y,
      37,
      0,
      (size_big = [543, Math.max(iLinesNeeded * 72 + 35, 65), 5]),
      [60, 60, 10],
      [Math.min(oTextDimensionsCR.width + 20, 430), Math.max(oTextDimensionsCR.height + 10, 32), 10]
    );

    // Print the associated pictogram
    print_isolated_image(
      global_pos_y,
      "covid_19_restrictions",
      35,
      -7,
      55,
      55,
      "false"
    );

    // print the text in the selected language with the defined options
    print_text(
      oTempTextOptions,
      global_pos_y,
      dictionary["covid_19_restrictions"][lang],
      heading_font_size,
      125,  
      -1,
      lang,
      false,
      true
    );

    // define positions to place elements
    let [pos_x, pos_y] = [50, 22]; //20 instead of 15
    array_pos = [
      [
        [0, 30],
        [130, 30],
        [260, 30],
        [390, 30],
      ],
      [
        [0, 100],
        [130, 100],
        [260, 100],
        [390, 100],
      ],
      [
        [0, 170],
        [130, 170],
        [260, 170],
        [390, 170],
      ],
    ];
    array_lengths = [53, 108, 175, 240];
    [array_x, array_y] = [-1, 0];

    //Check page swap
    /*
    spaces = 0;
    for (let element of Object.keys(constants.COVID_19_RESTRICTIONS)) {
      if (req.body[element] === "Yes") {
        spaces += 1;
      }
    }
    spaces = Math.ceil(spaces / 4);
    if (
      global_pos_y +
      20 +
      constants.SPACE_BETWEEN_ELEMENTS +
      array_lengths[spaces] >
      doc.page.height - 20
    ) {
      doc.addPage({
        margins: {
          top: 10,
          left: 10,
          right: 10,
          bottom: 10
        },
        size: "A4",
      });
      doc.rect(0, 0, doc.page.width, doc.page.height).fill(global_background_color);
      global_pos_y = 40;
    }
    */

    for (let element of Object.keys(constants.COVID_19_RESTRICTIONS)) {
      if (req.body[element] === "Yes") {
        array_x = array_x === -1 ? 0 : array_x;
        let index = array_pos[array_x][array_y];
        print_image_fit(
          global_pos_y,
          element,
          req.body,
          pos_x + index[0],
          pos_y + index[1],
          60,
          60
        );
        print_image_fit(
          global_pos_y,
          element,
          req.body,
          pos_x + index[0] + 70,
          pos_y + index[1] + 15,
          35,
          35,
          true
        );
        if (array_y + 1 >= array_pos[0].length) {
          array_x += 1;
          array_y = 0;
        } else {
          array_y += 1;
        }
      }
    }

    /*
    array_x = array_x === 4 ? 3 : array_x;
    array_x = array_y === 0 ? array_x - 1 : array_x;
    array_x = array_x < 0 ? 0 : array_x;

    global_pos_y +=
      20 + array_lengths[array_x + 1] + constants.SPACE_BETWEEN_ELEMENTS;

    if (
      global_pos_y +
      60 +
      constants.SPACE_BETWEEN_ELEMENTS +
      array_lengths[spaces] >
      doc.page.height - 20
    ) {
      doc.addPage({
        margins: {
          top: 10,
          left: 10,
          right: 10,
          bottom: 10
        },
        size: "A4",
      });
      doc.rect(0, 0, doc.page.width, doc.page.height).fill(global_background_color);
      global_pos_y = 40;
    }
    */

    global_pos_y+= Math.max(iLinesNeeded * 72 + 55, 85)
  }




  function printMoreInformation(req) {
    text_to_print =
      req.body["before_going_info"].length > 0 ?
        req.body["before_going_info"] +
        "\n" +
        req.body["give_extra_info"] +
        " " :
        req.body["give_extra_info"];
    print_text(
      text_options,
      global_pos_y,
      text_to_print,
      normal_font_size,
      pos_x - 5,
      pos_y + 40,
      lang,
      false
    );
    space = req.body["virtual_tours"] === "Yes" ? 2 : 0;
    space =
      req.body["before_going_info"].length > 0 ?
        space + Math.ceil(req.body["before_going_info"].length / 53) :
        space + 0;
    space =
      req.body["give_extra_info"].length > 0 ?
        space + Math.ceil(req.body["before_going_info"].length / 53) :
        space + 0;

    print_rectangle(
      global_pos_y,
      37,
      0,
      [543, 40 + space * 24, 5],
      [70, 55, 10],
      [calculateSpace(dictionary["extra_information"][lang], true) + 5, 40, 10]
    );
    print_isolated_image(
      global_pos_y,
      "more_information",
      40,
      -10,
      55,
      55,
      "false"
    );
    print_text(
      text_options,
      global_pos_y,
      "extra_information",
      heading_font_size,
      122,
      2,
      lang,
      true,
      true
    );
    if (req.body["virtual_tours"] === "Yes") {
      if (space > 5) {
        pos_y += 45;
      } else if (space == 2) {
        pos_y -= 50;
      }
      print_image_fit(
        global_pos_y,
        "virtual_tours",
        req.body,
        pos_x + 10,
        pos_y + 80,
        50,
        50
      );
      print_image_fit(
        global_pos_y,
        "virtual_tours",
        req.body,
        pos_x + 80,
        pos_y + 90,
        35,
        35,
        true
      ); // Falta picto
      let linkSection = doc.struct("Sect");
      structure.add(linkSection);

      linkSection.add(
        doc.struct(
          "Link", {
          alt: dictionary["press_virtual_visit"][lang],
        },
          () => {
            doc
              .fontSize(normal_font_size)
              .fillColor("red")
              .text(
                dictionary["press"][lang],
                pos_x + 120,
                global_pos_y + pos_y + 100, {
                link: req.body["link_virtual_tour"],
                underline: true
              }
              );
          }
        )

      );
      pos_y += 40;

    }
    if (space < 3) {
      //avoid creating a new page if only one text element in print more information
      global_pos_y -= 50;
    }
    if (space == 5) {
      global_pos_y += 30;
    } else if (space == 6) {
      global_pos_y += 40;
    }
    if (space>0)global_pos_y += 70;
    if (space==0) global_pos_y += 40;

  }

  /** This function prints all the logos
   *
   * @param {*} global_pos_y
   * @param {*} x
   * @param {*} y
   * @param {*} x_fit
   * @param {*} y_fit
   * @returns
   */
  function print_logos(x, y, x_fit = "", y_fit = "") {
    const logos = [];



    if (!fs.existsSync("./user_images/logos/" + cookie + "/")) {
      fs.mkdirSync("./user_images/logos/" + cookie + "/", {
        recursive: true
      });
    }
    fs.readdirSync("./user_images/logos/" + cookie + "/").forEach((file) => {
      logos.push(file);
    });


    if (global_pos_y + 50 + 90 * 2 > doc.page.height - 20 && logos.length > 0) {
      doc.addPage({
        margins: {
          top: 10,
          left: 10,
          right: 10,
          bottom: 10
        },
        size: "A4",
      });
      doc.rect(0, 0, doc.page.width, doc.page.height).fill(global_background_color);
      global_pos_y = 40;
    } else {
      global_pos_y += 90;
    }

    let i = 0;
    let x_init = x;
    logos.forEach(function (logo) {
      try {
        if (fs.existsSync("./user_images/logos/" + cookie + "/" + logo)) {
          



          
          i++;
          if (i ==4 || i==7) {
            // 3 logos per row, then jump to next logo row
            global_pos_y += 120;
            x = x_init;
          }
          doc.image(
            "./user_images/logos/" + cookie + "/" + logo,
            x,
            global_pos_y, {fit: [90, 90], align: 'center', valign: 'center'}
          );
          x += 180;
          
          
        }
      } catch (e) {
        console.log(
          "Imagen: " +
          "./user_images/logos/" +
          cookie +
          "/" +
          logo +
          " no existe"
        );
      }
    });
    if (logos.length >0) global_pos_y += 100;
    return;
  }

  function print_disclaimer_info() {
    //debug_print_global_pos_y("print_disclaimer_info - in", global_pos_y, doc.page.height)

    const logos = [];
    var extra_space = 0;
    if (!fs.existsSync("./user_images/logos/" + cookie + "/")) {
      fs.mkdirSync("./user_images/logos/" + cookie + "/", {
        recursive: true
      });
    }
    fs.readdirSync("./user_images/logos/" + cookie + "/").forEach((file) => {
      logos.push(file);
    });

    /* if (logos.length == 0) {
         global_pos_y += 20;
         extra_space = 30
     }
     if (logos.length > 0) {
         global_pos_y += 60;
     }
     if (logos.length > 3) {
         global_pos_y += 60;
     }*/
    //console.log(global_pos_y + 31*5,"vs ", doc.page.height)
    //console.log("[DEBUG]:", global_pos_y + 14 * 5)
    //console.log("[DEBUG]:", doc.page.height)

    //characterSpacesOption
    // this section has a fixed height of 155
    if (global_pos_y + 155 > doc.page.height) {
      doc.addPage({
        margins: {
          top: 10,
          left: 10,
          right: 10,
          bottom: 10
        },
        size: "A4",
      });
      doc.rect(0, 0, doc.page.width, doc.page.height).fill(global_background_color);
      global_pos_y = 40;
      add_new_page = true;
    }

    //debug_print_global_pos_y("print_disclaimer_info - before printing", global_pos_y, doc.page.height)

    print_text({
      characterSpacing: constants.FONTS[selected_text_type]["inter_letter"],
      wordSpacing: constants.FONTS[selected_text_type]["word_spacing"],
      lineGap: constants.FONTS[selected_text_type]["line_spacing"],
      align: "justify",
      width: 550,
      wordSpacing: 0.5,
      lineGap: 1.4,
    },
      global_pos_y,
      constants.FINAL_TEXT,
      normal_font_size * 0.5,
      20,
      extra_space,
      lang,
      false,
      false
    );

    global_pos_y+=65;

    print_text({
      characterSpacing: constants.FONTS[selected_text_type]["inter_letter"],
      wordSpacing: constants.FONTS[selected_text_type]["word_spacing"],
      lineGap: constants.FONTS[selected_text_type]["line_spacing"],
      align: "justify",
      width: 550,
      wordSpacing: 0.5,
      lineGap: 1.4,
    },
      global_pos_y,
      constants.FINAL_TEXT2,
      normal_font_size * 0.5,
      20,
      extra_space,
      lang,
      false,
      false
    );

    global_pos_y+=35;

    print_text({
      characterSpacing: constants.FONTS[selected_text_type]["inter_letter"],
      wordSpacing: constants.FONTS[selected_text_type]["word_spacing"],
      lineGap: constants.FONTS[selected_text_type]["line_spacing"],
      align: "justify",
      width: 550,
      wordSpacing: 0.5,
      lineGap: 1.4,
    },
      global_pos_y,
      constants.FINAL_TEXT3,
      normal_font_size * 0.5,
      20,
      extra_space,
      lang,
      false,
      false
    );

    global_pos_y+=25;

    doc.image("./images/cofinanciadoEN.png", 450, global_pos_y, {
        fit: [120, 120],
    });

    //debug_print_global_pos_y("print_disclaimer_info - out", global_pos_y, doc.page.height)
  }

  /**
  * Debug function to print positions of elements in the page
  *
  * @param {String} a_text text to print gibing information about position
  * @param {Integer} a_global_pos_y current global_pos_y
  * @param {IntersectionObserverInit} a_doc_page_height current doc.page.height
  *
  */
  function debug_print_global_pos_y(a_text, a_global_pos_y, a_doc_page_height) {
    //console.log("[DEBUG]", a_text)
    //console.log("[DEBUG] global_pos_y:", a_global_pos_y )
    //console.log("[DEBUG] doc.page.height:", a_doc_page_height)
    console.log("[DEBUG] %s in global_pos_y: %i", a_text, a_global_pos_y )
    console.log("")
  }


  /**
  * Function to estimate the size of a sentence given the option used of space between characters
  *
  * @param {Integer} characterSpacesOption option of space used
  * @param {String} sentence text to calculate size
  *
  * @returns {String} estimated size
    // TODO - include influence of characterSpacesOption
  // TODO - include influence of uppercase and lowercase letters
  function calculateTextSize(characterSpacesOption, sentence) {
    var estimatedSize= (sentence.length * 12) // 12 points per character
    + ((sentence.length - (2 * sentence.split(" ").length) + 1) * 2); // inter letter and word spacing

    return estimatedSize;
  } 
  */    



  /**
  * Function to estimate the size of a sentence given the option used of space between characters
  *
  * @param {Integer} characterSpacesOption option of space used
  * @param {String} sentence text to calculate size
  *
  * @returns {String} estimated size
  */
  // TODO - include influence of characterSpacesOption
  // TODO - include influence of uppercase and lowercase letters
  function calculateTextSize(oRequestedTextOptions, sSentence, iFontSize) {
    console.log("[DEBUG] calculating size of ---%s--- with font size %i and options %o", sSentence, iFontSize, oRequestedTextOptions); 

    doc.fontSize(iFontSize)
    let iEstimatedWidth= Math.ceil( doc.widthOfString(sSentence, oRequestedTextOptions) )
    let iEstimatedHeight= Math.ceil( doc.heightOfString(sSentence, oRequestedTextOptions) )
    
    return ({"width": iEstimatedWidth, "height": iEstimatedHeight})
  }     


};




/**
 * This function creates the address format
 *
 * @param {Object} body new information received
 *
 */
function fnGenerateAddress(body, lang) {
  var address = "";
  //if (body["street"] !== "") {
    address = body["street"];
    if (body["street"] !== "") {
      if (body["number"] !== "" && body["number"] !== "0") {
        address = address + ", " + body["number"];
      } else {
        address = address + ", " + dictionary["without_number"][lang];
      }
    }
    if (body["zip"] !== "") {
      if (address.length === 0) address = body["zip"];
      else address = address + ", " + body["zip"];
    }
    if (body["city"] !== "") {
      if (body["zip"] !== "") address = address + " " + body["city"];
      else if (address.length === 0) address= body["city"]
      else address = address + ", " + body["city"];
    }
    if (body["country"] !== "")
    if (address.length === 0) address = body["country"];
    else address = address + " (" + body["country"] + ")";
  //}
  return address;
}




/**
 * This function decides if the pdf information received should be stored or not into the Mongo Database
 *
 * @param {Object} pdf_structure new information received
 *
 */
async function storeData(pdf_structure) {
  MongoClient.connect(url, {
    useUnifiedTopology: true
  }, function (err, db) {
    if (err) {
      console.log(err);
      db.close();
    }

    var dbo = db.db(jsonData["DB"]["BD_NAME"]);
    dbo
      .collection(jsonData["DB"]["COLLECTION"])
      .find({
        UUID: pdf_structure["UUID"]
      })
      .sort({
        _id: -1
      })
      .toArray(function (err, resultUUID) {
        if (err) db.close();
        let addElement = false;
        if (resultUUID.length === 0) {
          addElement = true;
          for (let field of constants.FORM_FIELDS) {
            if (pdf_structure[field] === "") {
              addElement = false;
              break;
            }
          }
        } else {
          //Checking if structura of pdf for that UUID is the same:
          let [isTheSame, equalElement] = checkSimilarity(
            resultUUID,
            pdf_structure
          );
          if (isTheSame) {
            let [isExactlyEqual, update_structure] = checkExactlyEqual(
              equalElement,
              pdf_structure
            );
            // Checking if it is exactly the same or it is slighly different.
            if (!isExactlyEqual) {
              //Update
              dbo
                .collection(jsonData["DB"]["COLLECTION"])
                .updateOne({
                  UUID: pdf_structure["UUID"]
                }, {
                  $set: update_structure
                },
                  function (err, result) {
                    console.log("Stored!");
                    db.close();
                  }
                );
            }
          } else {
            addElement = true;
          }
        }
        if (addElement) {
          dbo
            .collection(jsonData["DB"]["COLLECTION"])
            .insertOne(pdf_structure, function (err, result) {
              console.log("Stored!");
              db.close();
            });
        }
      });
  });
}

/**
 * This function checks the similarity among the elements of the array and the new structure.
 * It checks the fields activity_type, street, number, zip, city and country.
 *
 * @param {Array} resultUUID results for the UUID stored in the BD
 * @param {Object} pdf_structure new information received
 *
 * @returns {Array} [isTheSame, element]
 *
 */
function checkSimilarity(resultUUID, pdf_structure) {
  const fields = [
    "language",
    "activity_name",
    "activity_type",
    "street",
    "number",
    "zip",
    "city",
    "country",
  ];
  for (let element of resultUUID) {
    let isTheSame = true;
    for (var field of fields) {
      try {
        if (
          element[field].toLowerCase() !== pdf_structure[field].toLowerCase()
        ) {
          isTheSame = false;
          break;
        }
      } catch (e) { }
    }
    if (isTheSame) return [true, element];
  }
  return [false, {}];
}

/**
 * This function checks the similarity among the elements of the array and the new structure.
 * It checks the fields activity_type, street, number, zip, city and country.
 *
 * @param {Array} element results for the UUID stored in the BD
 * @param {Object} pdf_structure new information received
 *
 * @return {Array} [boolean, update_structure]
 */
function checkExactlyEqual(element, pdf_structure) {
  let same = true;
  let update_structure = {};
  const sameLength =
    Object.entries(pdf_structure).length === Object.entries(element).length;
  for (const [key, value] of Object.entries(pdf_structure)) {
    try {
      if (value !== element[key]) {
        same = false;
        update_structure[key] = value;
      }
    } catch (e) {
      same = false;
      update_structure[key] = value;
    }
  }
  return [same && sameLength, update_structure];
}