

module.exports = Object.freeze(new function () {
    /* IMPORTANT NOTE
    * If it is necessary to add or remove a new element in any of the following constants, remember to add the key to the 
    *constant "dictionary" in the language.js file so that it is translated correctly.
    */
    this.FACILITIES = {
        "accessible_areas": "Accesible para sillas con ruedas", "lifts": "Ascensores", "toilets": "Baños",
        "disabled_toilets": "Baños para discapacitados", "changing": "Cambiador", "cloakrooms": "Guardaropa",
        "blind_paths": "Rutas para ciegos", "interpreters": "Intérpretes", "heats": "Radiadores", "air_condition": "Aire acondicionado",
        "chairs_rest": "Sillas para descansar", "interactive_objects": "Objetos interactivos y pantallas", "quiet_relaxation_room": "Sala de relajación tranquila","soundproofing_headphones":"Auriculares insonorizados",
        "availability_assistant":"Asistente de disponibilidad", "shop": "Tienda", "cafeteria_bar": "Cafetería y bar", "cantina": "Comedor", "web_audio_description": "Descripción audio de la web"
    };
    
    this.GUIDES = {
        "sign_guides": "Guías de lenguaje de signos", "audible_guides": "Audioguías", "braille_guides": "Guías en braille",
        "pictogram_guides": "Guías con pictogramas", "easy_vocabulary_guides": "Guías con vocabulario sencillo",
        "different_languages": "Disponibles en diferentes idiomas"
    };
    this.ALLOWED_ACTIONS = {
        "photographs_allowed": "Fotografías permitidas", "flash_allowed": "Fotografías con flash permitidas",
        "recording_allowed": "Grabar vídeo permitido", 
        "food_drink_allowed": "Comida y bebida permitidas", "bring_own_food": "Permitido traer tu propia comida si eres alérgico",
        "backpacks_allowed": "Mochilas permitidas"
    };


    this.COVID_19_RESTRICTIONS ={
        "wear_mask": "Obligatorio el uso de mascarilla", "handwashing": "Se recomienda lavado periódico de manos", "social_distance": "Obligatorio mantener la distancia social",
        "temperature_control": "Se realizará control de temperaturas", "hand_sanitizer": "Gel hidroalcohólico disponible"

    }
    this.FINAL_TEXT= "This PDF was generated by the CIMA (Cultural Information Made Accessible) web tool developed by the ALLURE - Literacy for Freedom project (2020-1-ES01-KA204-082720), funded by the European Community Erasmus+ KA204 program. The partners of this project are: Regional Ministry of Culture, Education and University of the Xunta de Galicia (Spain), Icelandic Textile Centre (Iceland), Workshops of culture in Lublin (Poland), Associaçao Business of Portugal and University of Vigo (Spain). More info and contact: https://allureculture.eu/."
    this.FINAL_TEXT2= "The pictographic symbols used are the property of the Government of Aragón and have been created by Sergio Palao for ARASAAC (http://www.arasaac.org), that distributes them under Creative Commons License BY-NC-SA."
    this.FINAL_TEXT3= "This publication [communication] reflects the views only of the author, and the Commission cannot be held responsible for any use which may be made of the information contained therein."


    this.DEFAULT_COIN = "€",
    
    this.FONTS = {
        "LexieReadable": {
            "regular": "LexieReadable",
            "bold": "LexieReadable-Bold",
            "inter_letter": 0.35 * 6.1,
            "mean_character_size": 6.1,
            "word_spacing":  (0.20 * 6.1)*2,
            "line_spacing":(0.25  * 6.1)*3*1,
            "normal_font_size": 14,
            "heading_font_size": Math.ceil(14 * 1.2),
            "format":".ttf"
        },"Arial": {
            "regular": "Arial",
            "bold": "Arial-Bold",
            "inter_letter": 0.25 * 6.1,
            "mean_character_size": 6.4,
            "line_spacing":(0.25  * 6.1)*3.5*1,
            "word_spacing":  (0.20 * 6.0)*1.5,
            "normal_font_size": 14,
            "heading_font_size": Math.ceil(14 * 1.2),
            "format":".ttf"
        },"Helvetica": {
            "regular": "Helvetica",
            "bold": "Helvetica-Bold",
            "inter_letter": 0.25 * 6.0,
            "mean_character_size": 6.1,
            "word_spacing":  (0.20 * 6.0)*1.10,
            "line_spacing":(0.25  * 6.1)*3.5*1,
            "normal_font_size": 14,
            "heading_font_size": Math.ceil(14 * 1.2),
            "format":".ttf"
        }, "Tahoma": {
            "regular": "Tahoma",
            "bold": "Tahoma-Bold",
            "inter_letter": 0.35 * 6.1,
            "mean_character_size": 6.1,
            "word_spacing":  (0.10 * 6.1)*1,
            "line_spacing":(0.25  * 6.1)*3.5*1,
            //"normal_font_size": 13,
            //"heading_font_size": Math.ceil(13 * 1.2),
            "normal_font_size": 14,
            "heading_font_size": Math.ceil(14 * 1.2),
            "format":".ttf"
        }, "Verdana": {
            "regular": "Verdana",
            "bold": "Verdana-Bold",
            "inter_letter": 0.3 * 6.1,
            "mean_character_size": 6.1,
            "word_spacing":  (0.20 * 6.1)*3,
            "line_spacing":(0.25  * 6.1)*3,
            //"normal_font_size": 12,
            //"heading_font_size": Math.ceil(12.5 * 1.1),
            "normal_font_size": 14,
            "heading_font_size": Math.ceil(14 * 1.2),
            "format":".ttf"
        }, "XuntaSans": {
            "regular": "XuntaSans",
            "bold": "XuntaSans-Bold",
            "inter_letter": 0.35 * 6.1,
            "mean_character_size": 6.1,
            "word_spacing":  (0.20 * 6.1)*2.5,
            "line_spacing":(0.25  * 6.1)*2.5*1,
            //"word_spacing":  (0.20 * 6.1)*2,
            //"line_spacing":(0.25  * 6.1)*3*1,
            "normal_font_size": 14,
            "heading_font_size": Math.ceil(14 * 1.2),
            "format":".woff"
        }
    };
    /**
     * Following British Dyslexia Association style guide
     * 
     * Readable fonts:
     * 
     * Font size should be 12-14 point or equivalent --> 14
     * 
     * Larger inter-letter / character spacing ideally around 35% of the average letter width:
     *              FontSize 14 --> average width 6.88
     *              FontSize 12 --> average width 5.9
     * 
     * Inter-word spacing should be at least 3.5 times the inter-letter spacing 
     * 
     * Larger line spacing should be proportional to inter-word spacing; 1.5/150% is preferable.
     */
    this.INTER_LETTER = 0.35 * 6.1;
    this.WORD_SPACING = this.INTER_LETTER * 3.5;
    this.LINE_SPACING = this.WORD_SPACING * 1.5; // 1.5

    /**
     * Following British Dyslexia Association style guide
     * 
     * Headings and structure:
     * 
     * Use a font size that is at least 20% larger than the normal text.
     * 
     * Use formatting tools for text alignment, justification, indents, lists, 
     * line and paragraph spacing to support assistive technology users.
     * 
     * Add extra space around headings and between paragraphs.
     * 
     * Ensure hyperlinks look different from headings and normal text.
     * 
     */
    this.NORMAL_FONT_SIZE = 14;
    this.HEADING_FONT_SIZE = Math.ceil(this.NORMAL_FONT_SIZE * 1.2);
    this.SPACE_BETWEEN_ELEMENTS = 20;

    this.WEEK_ORDER = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    this.FORM_FIELDS = ["activity_name", "activity_type", "street", "zip", "city", "country"];
    this.FORM_FIELDS2 = ["activity_name", "activity_type"];
    this.VERSION ="1.2.05";

});



