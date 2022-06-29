//Other cultural activity field
function change_language(lang) {
    document.querySelector("#upper_button_section > div:nth-child(1) > div > button").innerText = dictionary["enable_disable"][lang]
    document.querySelectorAll("[translation]").forEach(function (elem) {
        var key = elem.attributes['translation'].value;
        try {
            if (key.includes("ph_")) {
                elem.placeholder = dictionary[key][lang];
            } else {
                elem.innerHTML = dictionary[key][lang];


            }

        } catch (err) {
            console.log("Key: " + key + " for " + lang + " dictionary does not exist.")
        }

    });
}

function getDictionary() {
    return dictionary;
}

const dictionary = {
  "fill_form": {
    "en": "Fill sample form",
    "es": "Rellenar formulario",
    "gl": "Encher formulario",
    "is": "Fylltu \u00fat s\u00fdnishorn",
    "pl": "Wype\u0142nij  formularz",
    "pt": "Preencha formul\u00e1rio"
  },
  "font": {
    "en": "Font",
    "es": "Fuente",
    "gl": "Fonte",
    "is": "Leturger\u00f0",
    "pl": "Czcionka",
    "pt": "Fonte"
  },
  "form_fields": {
    "en": "Form fields",
    "es": "Campos del formulario",
    "gl": "Campos do formulario",
    "is": "Reitir ey\u00f0ubla\u00f0s",
    "pl": "Pola formularza",
    "pt": "Campos do formul\u00e1rio"
  },
  "language": {
    "en": "Language",
    "es": "Idioma",
    "gl": "Idioma",
    "is": "Tungum\u00e1l",
    "pl": "J\u0119zyk",
    "pt": "Idioma"
  },
  "reset_form": {
    "en": "Reset Form",
    "es": "Reiniciar formulario",
    "gl": "Restablecer formulario",
    "is": "Endurstilla ey\u00f0ubla\u00f0",
    "pl": "Wyczy\u015b\u0107 formularz",
    "pt": "Limpar formul\u00e1rio"
  },
  "english": {
    "en": "English",
    "es": "Ingl\u00e9s",
    "gl": "Ingl\u00e9s",
    "is": "Enska",
    "pl": "angielski",
    "pt": "Ingl\u00eas"
  },
  "spanish": {
    "en": "Spanish",
    "es": "Espa\u00f1ol",
    "gl": "Espa\u00f1ol",
    "is": "sp\u00e6nska",
    "pl": "hiszpa\u0144ski",
    "pt": "Espanhol"
  },
  "galician": {
    "en": "Galician",
    "es": "Gallego",
    "gl": "Galego",
    "is": "Galis\u00edska",
    "pl": "galicyjski",
    "pt": "Galego"
  },
  "icelandic": {
    "en": "Icelandic",
    "es": "Island\u00e9s",
    "gl": "Island\u00e9s",
    "is": "\u00cdslenska",
    "pl": "islandzki",
    "pt": "Island\u00eas"
  },
  "polish": {
    "en": "Polish",
    "es": "Polaco",
    "gl": "Polaco",
    "is": "P\u00f3lska",
    "pl": "polski",
    "pt": "Polaco"
  },
  "portuguese": {
    "en": "Portuguese",
    "es": "Portugu\u00e9s",
    "gl": "Portugu\u00e9s",
    "is": "Port\u00fagalska",
    "pl": "portugalski",
    "pt": "Portugu\u00eas"
  },
  "reload_pdf": {
    "en": "Reload PDF",
    "es": "Recargar PDF",
    "gl": "Recargar PDF",
    "is": "Endurhla\u00f0a PDF",
    "pl": "Od\u015bwie\u017c PDF",
    "pt": "Recarregar PDF"
  },
  "download_pdf": {
    "en": "Download PDF",
    "es": "Descargar PDF",
    "gl": "Descargar PDF",
    "is": "S\u00e6kja PDF",
    "pl": "Pobierz PDF",
    "pt": "Baixar PDF"
  },
  "activity_type": {
    "en": "Type of activity",
    "es": "Tipo de actividad",
    "gl": "Tipo de actividade",
    "is": "Tegund starfsemi",
    "pl": "Rodzaj aktywno\u015bci",
    "pt": "Tipo de atividade"
  },
  "choose": {
    "en": "Choose...",
    "es": "Elige...",
    "gl": "Escolla...",
    "is": "Veldu ...",
    "pl": "Wybierz...",
    "pt": "Escolher..."
  },
  "museum": {
    "en": "Museum",
    "es": "Museo",
    "gl": "Museo",
    "is": "Safn",
    "pl": "Muzeum",
    "pt": "Museu"
  },
  "exhibition": {
    "en": "Exhibition",
    "es": "Exposici\u00f3n",
    "gl": "Exposici\u00f3n",
    "is": "S\u00fdning",
    "pl": "Wystawa",
    "pt": "Exposi\u00e7\u00e3o"
  },
  "concert": {
    "en": "Concert",
    "es": "Concierto",
    "gl": "Concerto",
    "is": "T\u00f3nleikar",
    "pl": "Koncert",
    "pt": "Concerto"
  },
  "workshop": {
    "en": "Workshop",
    "es": "Taller",
    "gl": "Taller / Obradoiro",
    "is": "Vinnustofa",
    "pl": "Warsztat",
    "pt": "Oficina"
  },
  "movie_screening": {
    "en": "Movie Screening",
    "es": "Proyecci\u00f3n de pel\u00edculas",
    "gl": "Proxecci\u00f3n de pel\u00edculas",
    "is": "Kvikmyndas\u00fdning",
    "pl": "Pokaz filmu",
    "pt": "Exibi\u00e7\u00e3o de filmes"
  },
  "literary_meeting": {
    "en": "Literary Meeting",
    "es": "Encuentro Literario",
    "gl": "Encontro literario",
    "is": "B\u00f3kmenntafundur",
    "pl": "Spotkanie literackie",
    "pt": "Encontro Liter\u00e1rio"
  },
  "theatre_performance": {
    "en": "Theatre Performance",
    "es": "Representaci\u00f3n teatral",
    "gl": "Representaci\u00f3n teatral",
    "is": "Leiklistars\u00fdning",
    "pl": "Spektakl teatralny",
    "pt": "Espet\u00e1culo de Teatro"
  },
  "dance_performance": {
    "en": "Dance Performance",
    "es": "Espect\u00e1culo de danza",
    "gl": "Espect\u00e1culo de danza",
    "is": "Danss\u00fdning",
    "pl": "Spektakl taneczny",
    "pt": "Performance de dan\u00e7a"
  },
  "festival": {
    "en": "Festival",
    "es": "Festival",
    "gl": "Festival",
    "is": "H\u00e1t\u00ed\u00f0",
    "pl": "Festiwal",
    "pt": "Festival"
  },
  "cultural_tour": {
    "en": "Cultural Tour",
    "es": "Tour cultural",
    "gl": "Xira cultural",
    "is": "Menningarfer\u00f0",
    "pl": "Wycieczka kulturalna",
    "pt": "Tour Cultural"
  },
  "performance": {
    "en": "Performance",
    "es": "Actuaci\u00f3n",
    "gl": "Actuaci\u00f3n",
    "is": "Flutningur",
    "pl": "Spektakl",
    "pt": "Atua\u00e7\u00e3o"
  },
  "fair": {
    "en": "Fair",
    "es": "Feria",
    "gl": "Feira",
    "is": "Sanngjarnt",
    "pl": "Targi",
    "pt": "Feira"
  },
  "attraction": {
    "en": "Attraction",
    "es": "Atracci\u00f3n",
    "gl": "Atracci\u00f3n",
    "is": "A\u00f0dr\u00e1ttarafl",
    "pl": "Atrakcja",
    "pt": "Atra\u00e7\u00e3o"
  },
  "religous_place": {
    "en": "Religious place",
    "es": "Lugar Religioso",
    "gl": "Lugar relixioso",
    "is": "Tr\u00faarlegur sta\u00f0ur",
    "pl": "Miejsce kultu",
    "pt": "Lugar religioso"
  },
  "online_event": {
    "en": "Online Event/Web Resource",
    "es": "Evento online / Recurso web",
    "gl": "Evento online / Recurso web",
    "is": "Vi\u00f0bur\u00f0ur \u00e1 netinu/Heimild \u00e1 netinu",
    "pl": "Wydarzenie online/Zas\u00f3b online",
    "pt": "Evento Online/Recurso online"
  },
  "others": {
    "en": "Other",
    "es": "Otra",
    "gl": "Outra",
    "is": "Anna\u00f0",
    "pl": "Inne",
    "pt": "Outros tipos de descontos"
  },
  "error_cultural_activity": {
    "en": "Please, select a valid cultural activity",
    "es": "Por favor, seleccione una actividad cultural v\u00e1lida",
    "gl": "Por favor, seleccione unha actividade cultural v\u00e1lida",
    "is": "Vinsamlegast veldu gilda menningarstarfsemi",
    "pl": "Prosz\u0119 wybra\u0107 odpowiednie dzia\u0142anie kulturalne",
    "pt": "Por favor, selecione uma atividade cultural v\u00e1lida"
  },
  "ph_activity_name": {
    "en": "Specify the name of the activity",
    "es": "Indique el nombre de la actividad",
    "gl": "Indique o nome da actividade",
    "is": "Tilgreini\u00f0 heiti starfseminnar",
    "pl": "Podaj nazw\u0119 dzia\u0142ania",
    "pt": "Indique o nome da atividade"
  },
  "ph_specify": {
    "en": "Specify",
    "es": "Especifique",
    "gl": "Especifique",
    "is": "Tilgreindu",
    "pl": "Sprecyzuj",
    "pt": "Especifique"
  },
  "ph_description_activity": {
    "en": "Describe briefly the cultural activity",
    "es": "Describa brevemente la actividad cultural",
    "gl": "Describa brevemente a actividade cultural",
    "is": "L\u00fdstu stuttlega menningarstarfseminni",
    "pl": "Opisz kr\u00f3tko dzia\u0142anie kulturalne",
    "pt": "Descreva brevemente a atividade cultural"
  },
  "ph_bus_lines": {
    "en": "Bus lines",
    "es": "L\u00edneas de bus",
    "gl": "Li\u00f1as de autobuses",
    "is": "Lei\u00f0arkerfi str\u00e6t\u00f3",
    "pl": "Linie autobusowe",
    "pt": "Linhas de autocarro"
  },
  "ph_bus_timetables": {
    "en": "Bus schedules",
    "es": "Horarios del bus",
    "gl": "Horarios de autobuses",
    "is": "T\u00edmat\u00f6flur str\u00e6t\u00f3",
    "pl": "Rozk\u0142ad jazdy autobus\u00f3w",
    "pt": "Hor\u00e1rios dos autocarros"
  },
  "ph_metro_lines": {
    "en": "Subway lines",
    "es": "L\u00edneas de metro",
    "gl": "Li\u00f1as de metro",
    "is": "Lei\u00f0arkerfi ne\u00f0anjar\u00f0arlestar",
    "pl": "Linie metra",
    "pt": "Linhas de metro"
  },
  "ph_metro_timetables": {
    "en": "Metro schedules",
    "es": "Horarios del metro",
    "gl": "Horarios do metro",
    "is": "T\u00edmat\u00f6flur ne\u00f0anjar\u00f0arlestar",
    "pl": "Rozk\u0142ad jazdy metra",
    "pt": "Hor\u00e1rios do metro"
  },
  "error_short_description": {
    "en": "Please, enter a short description.",
    "es": "Por favor, introduzca una descripci\u00f3n corta.",
    "gl": "Por favor, introduza unha breve descrici\u00f3n.",
    "is": "Vinsamlegast sl\u00e1\u00f0u inn stutta l\u00fdsingu.",
    "pl": "Prosz\u0119 poda\u0107 kr\u00f3tki opis.",
    "pt": "Por favor, insira uma breve descri\u00e7\u00e3o."
  },
  "url_online_event": {
    "en": "URL for the Online Event",
    "es": "URL del Evento Online",
    "gl": "URL do evento online",
    "is": "Vefsl\u00f3\u00f0 vi\u00f0bur\u00f0ar \u00e1 netinu",
    "pl": "Adres URL wydarzenia online",
    "pt": "URL do Evento Online"
  },
  "street": {
    "en": "Street",
    "es": "Calle",
    "gl": "R\u00faa",
    "is": "Gata",
    "pl": "Ulica",
    "pt": "Rua"
  },
  "error_fill_field": {
    "en": "Please, complete this field.",
    "es": "Por favor, complete este campo.",
    "gl": "Por favor, complete este campo.",
    "is": "Vinsamlegast fylltu \u00fat \u00feennan reit.",
    "pl": "Prosz\u0119 wype\u0142ni\u0107 to pole.",
    "pt": "Por favor, preencha este campo."
  },
  "number": {
    "en": "Number",
    "es": "N\u00famero",
    "gl": "N\u00famero",
    "is": "N\u00famer",
    "pl": "Numer",
    "pt": "N\u00famero"
  },
  "zip": {
    "en": "Zip",
    "es": "CP",
    "gl": "CP",
    "is": "P\u00f3stn\u00famer",
    "pl": "Kod pocztowy",
    "pt": "C\u00f3digo Postal"
  },
  "city": {
    "en": "Town",
    "es": "Ciudad",
    "gl": "Cidade",
    "is": "B\u00e6rinn",
    "pl": "Miasto",
    "pt": "Cidade"
  },
  "country": {
    "en": "Country",
    "es": "Pais",
    "gl": "Pa\u00eds",
    "is": "Land",
    "pl": "Pa\u0144stwo",
    "pt": "Pa\u00eds"
  },
  "how_to_get_there": {
    "en": "How could you get there?",
    "es": "\u00bfC\u00f3mo se podr\u00eda llegar hasta all\u00ed?",
    "gl": "Como se poder\u00eda chegar ata al\u00ed?",
    "is": "Hvernig gast \u00fe\u00fa komi\u00f0 \u00fe\u00e9r \u00feanga\u00f0?",
    "pl": "Jak tam dotar\u0142e\u015b_a\u015b?",
    "pt": "Como chegar l\u00e1?"
  },
  "bus": {
    "en": "Bus:",
    "es": "Autobus:",
    "gl": "Autob\u00fas:",
    "is": "Str\u00e6t\u00f3:",
    "pl": "Autobus:",
    "pt": "Autocarro:"
  },
  "metro": {
    "en": "Subway:",
    "es": "Metro:",
    "gl": "Metro:",
    "is": "Ne\u00f0anjar\u00f0arlest:",
    "pl": "Metro:",
    "pt": "Metro:"
  },
  "taxi": {
    "en": "Cab:",
    "es": "Taxi:",
    "gl": "Taxi:",
    "is": "Leigub\u00edll:",
    "pl": "Taks\u00f3wka:",
    "pt": "T\u00e1xi:"
  },
  "car": {
    "en": "Car:",
    "es": "Coche:",
    "gl": "Coche:",
    "is": "B\u00edll:",
    "pl": "Samoch\u00f3d:",
    "pt": "Carro:"
  },
  "parking": {
    "en": "Parking:",
    "es": "Aparcamiento:",
    "gl": "Aparcamento:",
    "is": "B\u00edlast\u00e6\u00f0i:",
    "pl": "Parking:",
    "pt": "Estacionamento:"
  },
  "yes": {
    "en": "Yes",
    "es": "S\u00ed",
    "gl": "Si",
    "is": "J\u00e1",
    "pl": "Tak",
    "pt": "Sim"
  },
  "no": {
    "en": "No",
    "es": "No",
    "gl": "Non",
    "is": "Nei",
    "pl": "Nie",
    "pt": "N\u00e3o"
  },
  "ph_parking_slot": {
    "en": "Number of parking places",
    "es": "N\u00famero de plazas",
    "gl": "N\u00famero de prazas",
    "is": "Fj\u00f6ldi b\u00edlast\u00e6\u00f0a",
    "pl": "Liczba miejsc parkingowych",
    "pt": "N\u00famero de lugares de estacionamento"
  },
  "ph_slot_price": {
    "en": "Price of parking places",
    "es": "Precio de las plazas",
    "gl": "Prezo das prazas",
    "is": "Ver\u00f0 \u00e1 b\u00edlast\u00e6\u00f0um",
    "pl": "Op\u0142ata za miejsce parkingowe",
    "pt": "Pre\u00e7o do estacionamento"
  },
  "ph_disabled_parking_slot": {
    "en": "Number of disabled parking places",
    "es": "N\u00famero de plazas para personas minusv\u00e1lidas",
    "gl": "N\u00famero de prazas para persoas minusv\u00e1lidas",
    "is": "Fj\u00f6ldi b\u00edlast\u00e6\u00f0a fyrir fatla\u00f0 f\u00f3lk",
    "pl": "Liczba miejsc parkingowych dla os\u00f3b z niepe\u0142nosprawno\u015bciami",
    "pt": "N\u00famero de lugares de estacionamento para deficientes"
  },
  "ph_disabled_price_parking_slot": {
    "en": "Price of disabled parking places",
    "es": "Precio de las plazas para personas minusv\u00e1lidas",
    "gl": "Prezo das prazas para persoas minusv\u00e1lidas",
    "is": "Ver\u00f0 b\u00edlast\u00e6\u00f0a fyrir fatla\u00f0 f\u00f3lk",
    "pl": "Op\u0142ata za miejsce parkingowe dla os\u00f3b z niepe\u0142nosprawno\u015bciami",
    "pt": "Pre\u00e7o do estacionamento para deficientes f\u00edsicos"
  },
  "information_prices": {
    "en": "Pricing information",
    "es": "Informaci\u00f3n sobre los precios",
    "gl": "Informaci\u00f3n sobre os prezos",
    "is": "Ver\u00f0lagningaruppl\u00fdsingar",
    "pl": "Informacje o biletach",
    "pt": "Informa\u00e7\u00f5es sobre pre\u00e7os"
  },
  "normal_price": {
    "en": "Normal price",
    "es": "Precio normal",
    "gl": "Prezo normal",
    "is": "Venjulegt ver\u00f0",
    "pl": "Cena biletu normalnego",
    "pt": "Pre\u00e7o normal"
  },
  "reduced_price": {
    "en": "Reduced price",
    "es": "Precio reducido",
    "gl": "Prezo reducido",
    "is": "L\u00e6kka\u00f0 ver\u00f0",
    "pl": "Cena biletu ulgowego",
    "pt": "Pre\u00e7o reduzido"
  },
  "ph_when": {
    "en": "When?",
    "es": "\u00bfCu\u00e1ndo?",
    "gl": "Cando?",
    "is": "Hven\u00e6r?",
    "pl": "Kiedy?",
    "pt": "Quando?"
  },
  "family_price": {
    "en": "Price for families",
    "es": "Precio por familias",
    "gl": "Prezo por familia",
    "is": "Ver\u00f0 fyrir fj\u00f6lskyldur",
    "pl": "Op\u0142ata dla rodzin",
    "pt": "Pre\u00e7o para fam\u00edlias"
  },
  "member_price": {
    "en": "Price per family member (\u20ac)",
    "es": "Precio por miembro (\u20ac)",
    "gl": "Prezo por membro (\u20ac)",
    "is": "Ver\u00f0 \u00e1 fj\u00f6lskyldume\u00f0lim (\u20ac)",
    "pl": "Cena biletu za cz\u0142onka rodziny (\u20ac)",
    "pt": "Pre\u00e7o por membro da fam\u00edlia (\u20ac)"
  },
  "max_num_children": {
    "en": "Maximum number of children",
    "es": "Maximo n\u00famero de ni\u00f1os",
    "gl": "N\u00famero m\u00e1ximo de nenos/as",
    "is": "Fj\u00f6ldatakm\u00f6rkun barna",
    "pl": "Maksymalna liczba dzieci",
    "pt": "N\u00famero m\u00e1ximo de filhos"
  },
  "max_age_children": {
    "en": "Maximum age of children",
    "es": "Edad m\u00e1xima de los ni\u00f1os",
    "gl": "Idade m\u00e1xima dos nenos/as",
    "is": "Aldurstakmark barna",
    "pl": "Maksymalny wiek dzieci",
    "pt": "Idade m\u00e1xima das crian\u00e7as"
  },
  "free_interpreter": {
    "en": "Free for interpreter or facilitator",
    "es": "Gratis para int\u00e9rprete o facilitador/a",
    "gl": "De balde para int\u00e9rprete ou facilitador/a",
    "is": "Fr\u00edtt fyrir t\u00falk e\u00f0a a\u00f0sto\u00f0armanneskju",
    "pl": "Bezp\u0142atnie dla t\u0142umacza lub opiekuna",
    "pt": "Gratuito para int\u00e9rprete ou facilitador"
  },
  "other_discounts": {
    "en": "Other types of discounts",
    "es": "Otro tipo de descuentos",
    "gl": "Outros tipos de descontos",
    "is": "A\u00f0rar tegundir afsl\u00e1ttar",
    "pl": "Inne rodzaje zni\u017cek",
    "pt": "Outros tipos de descontos"
  },
  "terms_condition": {
    "en": "Terms and conditions",
    "es": "T\u00e9rminos y condiciones",
    "gl": "Termos e condici\u00f3ns",
    "is": "Skilm\u00e1lar",
    "pl": "Regulamin",
    "pt": "Termos e Condi\u00e7\u00f5es"
  },
  "ph_descrive_terms": {
    "en": "Describe briefly the terms and conditions",
    "es": "Describa brevemente los t\u00e9rminos y condiciones",
    "gl": "Describa brevemente os termos e as condici\u00f3ns",
    "is": "L\u00fdstu stuttlega skilm\u00e1lunum",
    "pl": "Opisz kr\u00f3tko regulamin",
    "pt": "Descreva resumidamente os termos e condi\u00e7\u00f5es"
  },
  "information_buy_tickets": {
    "en": "Information about buying tickets",
    "es": "Informaci\u00f3n sobre la compra de entradas",
    "gl": "Informaci\u00f3n sobre a compra de billetes",
    "is": "Uppl\u00fdsingar um mi\u00f0akaup",
    "pl": "Informacje o zakupie bilet\u00f3w",
    "pt": "Informa\u00e7\u00e3o sobre compra de bilhetes"
  },
  "buy_tickets": {
    "en": "Purchase of tickets",
    "es": "Compra de billetes",
    "gl": "Compra de billetes",
    "is": "Kaup \u00e1 mi\u00f0um",
    "pl": "Zakup bilet\u00f3w",
    "pt": "Compra de bilhetes"
  },
  "online": {
    "en": "On-line",
    "es": "Online",
    "gl": "En li\u00f1a",
    "is": "\u00c1 netinu",
    "pl": "Online",
    "pt": "Online"
  },
  "onsite": {
    "en": "On site",
    "es": "En el sitio",
    "gl": "No lugar",
    "is": "\u00c1 sta\u00f0num",
    "pl": "Na miejscu",
    "pt": "No local"
  },
  "ph_link": {
    "en": "Link:",
    "es": "Enlace:",
    "gl": "Ligaz\u00f3n:",
    "is": "Tengill:",
    "pl": "Link:",
    "pt": "Link:"
  },
  "ph_link_virtual_tour": {
    "en": "Link:",
    "es": "Enlace:",
    "gl": "Ligaz\u00f3n:",
    "is": "Tengill:",
    "pl": "Link:",
    "pt": "Link:"
  },
  "where": {
    "en": "Where?",
    "es": "\u00bfEn d\u00f3nde?",
    "gl": "Onde?",
    "is": "Hvar?",
    "pl": "Gdzie?",
    "pt": "Onde?"
  },
  "information_hours": {
    "en": "Information about schedules",
    "es": "Informaci\u00f3n sobre los horarios",
    "gl": "Informaci\u00f3n sobre horarios",
    "is": "Uppl\u00fdsingar um t\u00edma\u00e1\u00e6tlun",
    "pl": "Informacja o harmonogramie",
    "pt": "Informa\u00e7\u00e3o sobre hor\u00e1rios"
  },
  "continuous_schedule": {
    "en": "Continuous hours",
    "es": "Horario continuo",
    "gl": "Horario continuo",
    "is": "Samfelldir t\u00edmar",
    "pl": "Sta\u0142e godziny",
    "pt": "Hor\u00e1rio Cont\u00ednuo"
  },
  "morning_schedule": {
    "en": "Morning schedule",
    "es": "Horario de ma\u00f1ana",
    "gl": "Horario de ma\u00f1\u00e1",
    "is": "Morgundagskr\u00e1",
    "pl": "Godziny poranne",
    "pt": "Hor\u00e1rio da manh\u00e3"
  },
  "afternoon_schedule": {
    "en": "Afternoon schedule",
    "es": "Horario de tarde",
    "gl": "Horario de tarde",
    "is": "Eftirmi\u00f0dagsdagskr\u00e1",
    "pl": "Godziny popo\u0142udniowe",
    "pt": "Hor\u00e1rio da tarde"
  },
  "opening_days": {
    "en": "What days is it open?",
    "es": "\u00bfQu\u00e9 d\u00edas est\u00e1 abierto?",
    "gl": "Que d\u00edas est\u00e1 aberto?",
    "is": "Hva\u00f0a daga er opi\u00f0?",
    "pl": "W jakie dni jest otwarte?",
    "pt": "Em que dias est\u00e1 aberto?"
  },
  "monday": {
    "en": "Monday",
    "es": "Lunes",
    "gl": "Luns",
    "is": "M\u00e1nudagur",
    "pl": "poniedzia\u0142ek",
    "pt": "Segunda-feira"
  },
  "tuesday": {
    "en": "Tuesday",
    "es": "Martes",
    "gl": "Martes",
    "is": "\u00deri\u00f0judagur",
    "pl": "wtorek",
    "pt": "Ter\u00e7a-feira"
  },
  "wednesday": {
    "en": "Wednesday",
    "es": "Mi\u00e9rcoles",
    "gl": "M\u00e9rcores",
    "is": "Mi\u00f0vikudagur",
    "pl": "\u015broda",
    "pt": "Quarta-feira"
  },
  "thursday": {
    "en": "Thursday",
    "es": "Jueves",
    "gl": "Xoves",
    "is": "Fimmtudagur",
    "pl": "czwartek",
    "pt": "Quinta-feira"
  },
  "friday": {
    "en": "Friday",
    "es": "Viernes",
    "gl": "Venres",
    "is": "F\u00f6studagur",
    "pl": "pi\u0105tek",
    "pt": "Sexta-feira"
  },
  "saturday": {
    "en": "Saturday",
    "es": "S\u00e1bado",
    "gl": "S\u00e1bado",
    "is": "Laugardagur",
    "pl": "sobota",
    "pt": "S\u00e1bado"
  },
  "sunday": {
    "en": "Sunday",
    "es": "Domingo",
    "gl": "Domingo",
    "is": "Sunnudagur",
    "pl": "niedziela",
    "pt": "Domigo"
  },
  "opening_hours": {
    "en": "Opening time",
    "es": "Hora de apertura",
    "gl": "Horario de apertura",
    "is": "Opnunart\u00edmi",
    "pl": "Godzina otwarcia",
    "pt": "Hor\u00e1rio de abertura"
  },
  "closing_hour": {
    "en": "Closing time",
    "es": "Hora de cierre",
    "gl": "Hora de peche",
    "is": "Lokunart\u00edmi",
    "pl": "Godzina zamkni\u0119cia",
    "pt": "Hor\u00e1rio de encerramento"
  },
  "last_admission_time": {
    "en": "Last shift time",
    "es": "Hora \u00faltimo turno",
    "gl": "\u00daltimo tempo de quenda",
    "is": "S\u00ed\u00f0asti vaktart\u00edmi",
    "pl": "Godzina ostatniego wej\u015bcia",
    "pt": "Hor\u00e1rio da \u00faltima visita"
  },
  "information_facilities": {
    "en": "Information about the facilities",
    "es": "Informaci\u00f3n sobre las instalaciones",
    "gl": "Informaci\u00f3n sobre as instalaci\u00f3ns",
    "is": "Uppl\u00fdsingar um a\u00f0st\u00f6\u00f0una",
    "pl": "Udogodnienia",
    "pt": "Informa\u00e7\u00e3o sobre as instala\u00e7\u00f5es"
  },
  "information_guides": {
    "en": "Information about the guides",
    "es": "Informaci\u00f3n sobre las gu\u00edas",
    "gl": "Informaci\u00f3n sobre as gu\u00edas",
    "is": "Uppl\u00fdsingar um lei\u00f0s\u00f6gumenn",
    "pl": "Informacje na temat przewodnik\u00f3w",
    "pt": "Informa\u00e7\u00e3o sobre guias"
  },
  "private_tours": {
    "en": "Private tours",
    "es": "Visitas privadas",
    "gl": "Visitas privadas",
    "is": "Einkafer\u00f0ir",
    "pl": "Zwiedzanie prywatne",
    "pt": "Visitas privadas / guiadas"
  },
  "duration_private_tour": {
    "en": "Private tour schedule (minutes)",
    "es": "Duraci\u00f3n de la visita privada (minutos)",
    "gl": "Duraci\u00f3n da visita privada (minutos)",
    "is": "Dagskr\u00e1 einkafer\u00f0a (m\u00edn\u00fatur)",
    "pl": "Czas zwiedzania prywatnego (minuty)",
    "pt": "Programa\u00e7\u00e3o da visita privada / guiada (minutos)"
  },
  "price_private_tour": {
    "en": "Private tour price(\u20ac)",
    "es": "Precio de la visita privada (\u20ac)",
    "gl": "Prezo da visita privada (\u20ac)",
    "is": "Ver\u00f0 einkafer\u00f0a (\u20ac)",
    "pl": "Op\u0142ata za zwiedzanie prywatne (\u20ac)",
    "pt": "Pre\u00e7o da visita privada / guiada (\u20ac)"
  },
  "information_allowed_actions": {
    "en": "Information about allowed actions",
    "es": "Informaci\u00f3n sobre acciones permitidas",
    "gl": "Informaci\u00f3n sobre acci\u00f3ns permitidas",
    "is": "Uppl\u00fdsingar um leyf\u00f0ar a\u00f0ger\u00f0ir",
    "pl": "Informacje na temat dozwolonych dzia\u0142a\u0144",
    "pt": "Informa\u00e7\u00e3o sobre a\u00e7\u00f5es permitidas"
  },
  "extra_information": {
    "en": "More information",
    "es": "M\u00e1s informaci\u00f3n",
    "gl": "M\u00e1is informaci\u00f3n",
    "is": "Meiri uppl\u00fdsingar",
    "pl": "Wi\u0119cej informacji",
    "pt": "Mais informa\u00e7\u00e3o"
  },
  "before_going_info": {
    "en": "Before-you-go information",
    "es": "Informaci\u00f3n previa al viaje",
    "gl": "Informaci\u00f3n previa \u00e1 viaxe",
    "is": "Uppl\u00fdsingar \u00e1\u00f0ur en \u00fe\u00fa fer\u00f0",
    "pl": "Informacje przed wyj\u015bciem",
    "pt": "O que saber antes de ir"
  },
  "ph_extra_info": {
    "en": "Does the user need to know anything else before going?",
    "es": "\u00bfNecesita la persona usuaria saber algo m\u00e1s antes de ir?",
    "gl": "A persoa usuaria precisa saber algo m\u00e1is antes de ir?",
    "is": "\u00dearf notandinn a\u00f0 vita eitthva\u00f0 anna\u00f0 \u00e1\u00f0ur en hann fer?",
    "pl": "Czy u\u017cytkownik musi o czym\u015b wiedzie\u0107 przed przybyciem?",
    "pt": "O visitante precisa saber mais alguma coisa antes de ir?"
  },
  "give_extra_info": {
    "en": "Extra information that you want to detail",
    "es": "Informaci\u00f3n extra que se desee detallar",
    "gl": "Informaci\u00f3n adicional que desexa detallar",
    "is": "Frekari uppl\u00fdsingar sem \u00fe\u00fa vilt tilgreina",
    "pl": "Dodatkowe informacje, kt\u00f3re chcesz uszczeg\u00f3\u0142owi\u0107",
    "pt": "Informa\u00e7\u00e3o extra que queira acrescentar"
  },
  "ph_event_extra_info": {
    "en": "Do you want to detail something more about this event?",
    "es": "\u00bfDesea contar algo m\u00e1s sobre este evento?",
    "gl": "Quere dicir algo m\u00e1is sobre este evento?",
    "is": "Viltu tilgreina eitthva\u00f0 frekar um \u00feennan atbur\u00f0?",
    "pl": "Czy chcesz napisa\u0107 co\u015b wi\u0119cej o tym wydarzeniu?",
    "pt": "Quer acrescentar mais informa\u00e7\u00e3o sobre este evento?"
  },
  "virtual_tours": {
    "en": "Would it be possible to make virtual visits?",
    "es": "\u00bfSer\u00eda posible hacer visitas virtuales?",
    "gl": "Ser\u00eda posible facer visitas virtuais?",
    "is": "V\u00e6ri h\u00e6gt a\u00f0 fara \u00ed s\u00fdndarheims\u00f3knir?",
    "pl": "Czy jest mo\u017cliwa relizacja wizyt wirtualnych?",
    "pt": "\u00c9 poss\u00edvel fazer visitas virtuais?"
  },
  "send_form": {
    "en": "Send Form",
    "es": "Enviar formulario",
    "gl": "Enviar formulario",
    "is": "Senda ey\u00f0ubla\u00f0",
    "pl": "Wy\u015blij formularz",
    "pt": "Submeter formul\u00e1rio"
  },
  "accessible_areas": {
    "en": "Wheelchair accessible",
    "es": "Accesible para sillas de ruedas",
    "gl": "Accesible en cadeira de rodas",
    "is": "A\u00f0gengilegt fyrir hj\u00f3last\u00f3la",
    "pl": "Dost\u0119pno\u015b\u0107 dla w\u00f3zk\u00f3w inwalidzkich",
    "pt": "Acess\u00edvel a cadeiras de rodas"
  },
  "lifts": {
    "en": "Lifts",
    "es": "Ascensores",
    "gl": "Ascensores",
    "is": "Lyftur",
    "pl": "Windy",
    "pt": "Elevadores"
  },
  "toilets": {
    "en": "Toilets",
    "es": "Ba\u00f1os",
    "gl": "Ba\u00f1os",
    "is": "Salerni",
    "pl": "WC",
    "pt": "Sanit\u00e1rios"
  },
  "disabled_toilets": {
    "en": "Toilets for disabled",
    "es": "Ba\u00f1os para personas discapacitadas",
    "gl": "Ba\u00f1os para persoas minusv\u00e1lidas",
    "is": "Salerni fyrir fatla\u00f0 f\u00f3lk",
    "pl": "Toalety dla os\u00f3b z niepe\u0142nosprawno\u015bciami",
    "pt": "Sanit\u00e1rios para deficientes"
  },
  "changing": {
    "en": "Changing room",
    "es": "Cambiador",
    "gl": "Cambiador",
    "is": "B\u00faningsherbergi",
    "pl": "Przebieralnia",
    "pt": "Vesti\u00e1rio"
  },
  "cloakrooms": {
    "en": "Cloakrooms and luggage",
    "es": "Guardaropa",
    "gl": "Armario",
    "is": "Fatahengi og farangur",
    "pl": "Szatnie",
    "pt": "Bengaleiro"
  },
  "blind_paths": {
    "en": "Paths for blind people",
    "es": "Rutas para invidentes",
    "gl": "Rutas para invidentes",
    "is": "Lei\u00f0ir fyrir blint f\u00f3lk",
    "pl": "\u015acie\u017cki dotykowe dla os\u00f3b niewidomych",
    "pt": "Percursos para cegos"
  },
  "interpreters": {
    "en": "Interpreters",
    "es": "Int\u00e9rpretes",
    "gl": "Int\u00e9rpretes",
    "is": "T\u00falkar",
    "pl": "T\u0142umacze",
    "pt": "Int\u00e9rpretes"
  },
  "heats": {
    "en": "Heats",
    "es": "Radiadores",
    "gl": "Radiadores",
    "is": "Ofnar",
    "pl": "Grzejniki",
    "pt": "Aquecimento"
  },
  "air_condition": {
    "en": "Air conditioning",
    "es": "Aire acondicionado",
    "gl": "Aire acondicionado",
    "is": "Loftk\u00e6ling",
    "pl": "Klimatyzacja",
    "pt": "Ar condicionado"
  },
  "chairs_rest": {
    "en": "Chairs to rest",
    "es": "Sillas para descansar",
    "gl": "Cadeiras para descansar",
    "is": "St\u00f3lar til hv\u00edldar",
    "pl": "Krzes\u0142a do odpoczynku",
    "pt": "\u00c1reas para descansar"
  },
  "interactive_objects": {
    "en": "Interactive objects and displays",
    "es": "Objetos interactivos y pantallas",
    "gl": "Obxectos interactivos e pantallas",
    "is": "Gagnvirkir hlutir og skj\u00e1ir",
    "pl": "Interaktywne obiekty i wy\u015bwietlacze",
    "pt": "Objetos e \u00e9crans interativos"
  },
  "sign_guides": {
    "en": "Sign language guides",
    "es": "Gu\u00edas de lengua de signos",
    "gl": "Gu\u00edas de lingua de signos",
    "is": "T\u00e1knm\u00e1lslei\u00f0s\u00f6gn",
    "pl": "Przewodniki w j\u0119zyku migowym",
    "pt": "Guias de linguagem de sinais"
  },
  "audible_guides": {
    "en": "Audio guides",
    "es": "Audiogu\u00edas",
    "gl": "Audiogu\u00edas",
    "is": "Hlj\u00f3\u00f0lei\u00f0s\u00f6gn",
    "pl": "Audioprzewodniki",
    "pt": "Guias de \u00e1udio"
  },
  "braille_guides": {
    "en": "Braille guides",
    "es": "Gu\u00edas en braille",
    "gl": "Gu\u00edas en braille",
    "is": "Blindraleturslei\u00f0s\u00f6gn",
    "pl": "Przewodniki w alfabecie Braille'a",
    "pt": "Guias em braille"
  },
  "pictogram_guides": {
    "en": "Pictograms guides",
    "es": "Gu\u00edas con pictogramas",
    "gl": "Gu\u00edas con pictogramas",
    "is": "T\u00e1knmyndalei\u00f0s\u00f6gn",
    "pl": "Przewodniki z piktogramami",
    "pt": "Guias de pictogramas"
  },
  "easy_vocabulary_guides": {
    "en": "Easy vocabulary guides",
    "es": "Gu\u00edas con vocabulario sencillo",
    "gl": "Gu\u00edas con vocabulario sinxelo",
    "is": "Lei\u00f0s\u00f6gn \u00e1 au\u00f0skildu m\u00e1li",
    "pl": "Przewodniki z prostym s\u0142ownictwem",
    "pt": "Guias de vocabul\u00e1rio f\u00e1ceis"
  },
  "different_languages": {
    "en": "Available in different languages",
    "es": "Disponibles en diferentes idiomas",
    "gl": "Dispo\u00f1ible en diferentes idiomas",
    "is": "F\u00e1anlegt \u00e1 \u00f3l\u00edkum tungum\u00e1lum",
    "pl": "Dost\u0119pne w wielu j\u0119zykach",
    "pt": "Dispon\u00edvel em v\u00e1rios idiomas"
  },
  "photographs_allowed": {
    "en": "Photographs allowed",
    "es": "Fotograf\u00edas permitidas",
    "gl": "Perm\u00edtense fotograf\u00edas",
    "is": "Lj\u00f3smyndir leyf\u00f0ar",
    "pl": "Fotografowanie dozwolone",
    "pt": "Fotografias permitidas"
  },
  "flash_allowed": {
    "en": "Flash photos allowed",
    "es": "Fotograf\u00edas con flash permitidas",
    "gl": "Perm\u00edtense fotos con flash",
    "is": "Lj\u00f3smyndir me\u00f0 flassi leyf\u00f0ar",
    "pl": "Fotografowanie z fleszem dozwolone",
    "pt": "Fotografias com flash permitidas"
  },
  "recording_allowed": {
    "en": "Video recording allowed",
    "es": "Grabar v\u00eddeo permitido",
    "gl": "Perm\u00edtese gravar v\u00eddeos",
    "is": "Myndbandsupptaka leyf\u00f0",
    "pl": "Rejestrowanie wideo dozwolone",
    "pt": "Grava\u00e7\u00e3o de v\u00eddeo permitida"
  },
  "cafeteria_bar": {
    "en": "Cafeteria and bar",
    "es": "Cafeter\u00eda y bar",
    "gl": "Cafeter\u00eda e bar",
    "is": "Kaffih\u00fas og bar",
    "pl": "Kawiarnia i bar",
    "pt": "Cafetaria e bar"
  },
  "cantina": {
    "en": "Cantina",
    "es": "Comedor",
    "gl": "Comedor",
    "is": "M\u00f6tuneyti",
    "pl": "Jadalnia",
    "pt": "Espa\u00e7o de refei\u00e7\u00f5es"
  },
  "food_drink_allowed": {
    "en": "Food and drinks allowed",
    "es": "Comida y bebida permitidas",
    "gl": "Perm\u00edtese comida e bebida",
    "is": "Matur og drykkur leyf\u00f0ur",
    "pl": "Dozwolone jedzenie i picie",
    "pt": "Alimentos e bebidas s\u00e3o permitidos"
  },
  "bring_own_food": {
    "en": "Bring your own food in case of allergies allowed",
    "es": "Permitido traer tu propia comida si eres al\u00e9rgico",
    "gl": "Perm\u00edtese levar a comida propia se se \u00e9 al\u00e9rxico",
    "is": "Leyfilegt a\u00f0 koma me\u00f0 eigin mat ef \u00fe\u00fa ert me\u00f0 ofn\u00e6mi",
    "pl": "W przypadku alergii dozwolne w\u0142asne jedzenie",
    "pt": "Trazer a pr\u00f3pria comida em caso de alergia permitida"
  },
  "backpacks_allowed": {
    "en": "Backpacks allowed",
    "es": "Mochilas permitidas",
    "gl": "Mochilas permitidas",
    "is": "Bakpokar leyf\u00f0ir",
    "pl": "Dozwolone plecaki",
    "pt": "Mochilas permitidas"
  },
  "shop": {
    "en": "Shop",
    "es": "Tienda",
    "gl": "Tenda",
    "is": "Verslun",
    "pl": "Sklep",
    "pt": "Loja"
  },
  "short_description": {
    "en": "Short description",
    "es": "Descripci\u00f3n corta",
    "gl": "Descrici\u00f3n curta",
    "is": "Stutt l\u00fdsing",
    "pl": "Kr\u00f3tki opis",
    "pt": "Pequena descri\u00e7\u00e3o"
  },
  "location": {
    "en": "Location information",
    "es": "Informaci\u00f3n sobre la localizaci\u00f3n",
    "gl": "Informaci\u00f3n de localizaci\u00f3n",
    "is": "Uppl\u00fdsingar um sta\u00f0setningu",
    "pl": "Informacje na temat lokalizacji",
    "pt": "Informa\u00e7\u00e3o sobre a localiza\u00e7\u00e3o"
  },
  "address": {
    "en": "Address",
    "es": "Direcci\u00f3n",
    "gl": "Enderezo",
    "is": "Heimilisfang",
    "pl": "adres",
    "pt": "Morada"
  },
  "slots": {
    "en": "slot",
    "es": "plaza",
    "gl": "praza",
    "is": "sta\u00f0ur",
    "pl": "miejsce",
    "pt": "por lugar"
  },
  "each": {
    "en": "each",
    "es": "cada una",
    "gl": "cada unha",
    "is": "hvert",
    "pl": "ka\u017cdy",
    "pt": "por pessoa"
  },
  "free": {
    "en": "free",
    "es": "gratis",
    "gl": "de balde",
    "is": "\u00f3keypis",
    "pl": "bezp\u0142atny",
    "pt": "gratuito"
  },
  "tickets_information": {
    "en": "Ticket information",
    "es": "Informaci\u00f3n sobre las entradas",
    "gl": "Informaci\u00f3n de billetes",
    "is": "Uppl\u00fdsingar um mi\u00f0a",
    "pl": "Informacje o biletach",
    "pt": "Informa\u00e7\u00e3o sobre bilhetes"
  },
  "autoreload": {
    "en": "Update PDF automatically",
    "es": "Actualizar PDF autom\u00e1ticamente",
    "gl": "Actualizar PDF automaticamente",
    "is": "Uppf\u00e6r\u00f0u PDF sj\u00e1lfkrafa",
    "pl": "Aktualizuj PDF automatycznie",
    "pt": "Atualizar PDF automaticamente"
  },
  "press": {
    "en": "Press!",
    "es": "\u00a1Presione!",
    "gl": "Prema!",
    "is": "\u00fdttu \u00e1!",
    "pl": "Naci\u015bnij!",
    "pt": "Pressione!"
  },
  "children": {
    "en": "sons",
    "es": "hijos/as",
    "gl": "fillos/as",
    "is": "synir",
    "pl": "dzieci",
    "pt": "filhos"
  },
  "child": {
    "en": "child",
    "es": "ni\u00f1o/a",
    "gl": "neno/a",
    "is": "barn",
    "pl": "dziecko",
    "pt": "crian\u00e7a"
  },
  "max_age_1": {
    "en": "up to {num_y} year old",
    "es": "hasta {num_y} a\u00f1o",
    "gl": "ata {num_y} ano",
    "is": "allt a\u00f0 {num_y} \u00e1rs",
    "pl": "do {num_y} roku \u017cycia",
    "pt": "at\u00e9 {num_y} ano"
  },
  "max_age_2": {
    "en": "up to {num_y} years old",
    "es": "hasta {num_y} a\u00f1os",
    "gl": "ata {num_y} anos",
    "is": "allt a\u00f0 {num_y} \u00e1ra",
    "pl": "do {num_y} lat",
    "pt": "at\u00e9 {num_y} anos"
  },
  "free_for_all": {
    "en": "Free for all",
    "es": "Gratis para todos",
    "gl": "De balde para todos",
    "is": "fr\u00edtt fyrir alla",
    "pl": "bezp\u0142atny dla wszystkich",
    "pt": "Gratuito para todos"
  },
  "per_member": {
    "en": "per member",
    "es": "cada miembro",
    "gl": "por membro",
    "is": "\u00e1 hvern me\u00f0lim",
    "pl": "dla cz\u0142onka",
    "pt": "por membro"
  },
  "hours": {
    "en": "From {0} to {1}",
    "es": "De {0} a {1}",
    "gl": "De {0} a {1}",
    "is": "Fr\u00e1 {0} til {1}",
    "pl": "od {0} do {1}",
    "pt": "De {0} a {1}"
  },
  "last_admission": {
    "en": "(Last shift: {0})",
    "es": "(\u00daltimo turno: {0})",
    "gl": "(\u00daltima quenda: {0})",
    "is": "(S\u00ed\u00f0asta vakt: {0})",
    "pl": "(Ostatnie wej\u015bcie o {0})",
    "pt": "(\u00daltima entrada: {0})"
  },
  "reserved_slots": {
    "en": "Disabled parking slots reserved",
    "es": "N\u00famero de plazas reservadas para personas minusv\u00e1lidas",
    "gl": "N\u00famero de prazas reservadas para persoas minusv\u00e1lidas",
    "is": "Fr\u00e1tekin b\u00edlast\u00e6\u00f0i fyrir fatla\u00f0 f\u00f3lk",
    "pl": "Liczba miejsc parkingowych dla os\u00f3b z niepe\u0142nosprawno\u015bciami",
    "pt": "N\u00famero de lugares reservados para deficientes"
  },
  "press_buy_tickets": {
    "en": "Click on the link to buy tickets.",
    "es": "Presione en el enlace para comprar las entradas.",
    "gl": "Faga clic na ligaz\u00f3n para mercar as entradas.",
    "is": "Smelltu \u00e1 hlekkinn til a\u00f0 kaupa mi\u00f0a.",
    "pl": "Kliknij link, aby kupi\u0107 bilety.",
    "pt": "Clique no link para comprar bilhetes."
  },
  "press_virtual_visit": {
    "en": "Click on the link to access the virtual tour.",
    "es": "Presione en el enlace para acceder a la visita virtual.",
    "gl": "Faga clic na ligaz\u00f3n para acceder \u00e1 visita virtual.",
    "is": "Smelltu \u00e1 hlekkinn til a\u00f0 f\u00e1 a\u00f0gang a\u00f0 s\u00fdndarlei\u00f0s\u00f6gn.",
    "pl": "Kliknij link, aby uzyska\u0107 dost\u0119p do wirtualnego zwiedzania.",
    "pt": "Clique no link para aceder \u00e0 visita virtual"
  },
  "where_buy_tickets": {
    "en": "Where can you buy tickets in person?",
    "es": "\u00bfD\u00f3nde se pueden comprar las entradas presencialmente?",
    "gl": "Onde se poden mercar as entradas en persoa?",
    "is": "Hvar er h\u00e6gt a\u00f0 kaupa mi\u00f0a \u00ed eigin pers\u00f3nu?",
    "pl": "Gdzie mo\u017cna osobi\u015bcie kupi\u0107 bilety?",
    "pt": "Onde pode comprar bilhetes presencialmente?"
  },
  "sure_download": {
    "en": "Are you sure about downloading the PDF, you still have some fields to cover?",
    "es": "\u00bfSeguro que quiere desacargar el PDF? Todav\u00eda le quedan algunos campos por cubrir.",
    "gl": "Seguro que desexa descargar o PDF? A\u00ednda lle quedan alg\u00fans campos por encher.",
    "is": "Ertu viss um a\u00f0 \u00fe\u00fa viljir hla\u00f0a ni\u00f0ur PDF-skjalinu, \u00fe\u00fa \u00e1tt enn\u00fe\u00e1 einhverja reiti \u00f3\u00fatfyllta?",
    "pl": "Czy na pewno chcesz pobra\u0107 plik PDF? Jest jeszcze kilka p\u00f3l do uzupe\u0142nienia.",
    "pt": "Tem certeza de que deseja fazer o download do PDF, ainda tem alguns campos para preencher?"
  },
  "activity_name": {
    "en": "Activity name",
    "es": "Nombre de la actividad",
    "gl": "Nome da actividade",
    "is": "Nafn starfseminnar",
    "pl": "Nazwa dzia\u0142ania",
    "pt": "Nome da atividade"
  },
  "chronometer": {
    "en": "Chronometer",
    "es": "Cron\u00f3metro",
    "gl": "Cron\u00f3metro",
    "is": "T\u00edmaritari",
    "pl": "Chronometr",
    "pt": "Cron\u00f4metro"
  },
  "lines_timetable": {
    "en": "Line{s1}: {line}\\nSchedule{s2}: {timetable}",
    "es": "L\u00ednea{s1}: {line}\\nHorario{s2}: {timetable}",
    "gl": "Li\u00f1a{s1}: {line}\\nHorario{s2}: {timetable}",
    "is": "L\u00edna{s1}: {line}\\nStundaskr\u00e1{s2}: {timetable}",
    "pl": "Linia{s1}: {line}\\nRozk\u0142ad{s2}: {timetable}",
    "pt": "Linha{s1}: {line}\\nHor\u00e1rio{s2}: {timetable}"
  },
  "without_number": {
    "en": "S/N",
    "es": "S/N",
    "gl": "S/N",
    "is": "S/N",
    "pl": "S/N",
    "pt": "S/N"
  },
  "where_buy_tickets_online": {
    "en": "On which website can you buy tickets?",
    "es": "\u00bfEn qu\u00e9 web se pueden comprar las entradas?",
    "gl": "En que web se poden mercar as entradas?",
    "is": "\u00c1 hva\u00f0a vefs\u00ed\u00f0u er h\u00e6gt a\u00f0 kaupa mi\u00f0a?",
    "pl": "Na jakiej stronie mo\u017cna kupi\u0107 bilety?",
    "pt": "S\u00edtio Web para comprar bilhetes online?"
  },
  "logo_title": {
    "en": "Attach logo(s)",
    "es": "Adjunte logo(s)",
    "gl": "Anexe logo(s)",
    "is": "Hengdu vi\u00f0 l\u00f3g\u00f3",
    "pl": "Do\u0142\u0105cz logo(a)",
    "pt": "Inclua logotipo(s)"
  },
  "logo": {
    "en": "Attach logo(s) for the event",
    "es": "Adjunte logo(s) para el evento",
    "gl": "Anexe logo(s) para o evento",
    "is": "Hengdu vi\u00f0 l\u00f3g\u00f3 fyrir vi\u00f0bur\u00f0inn",
    "pl": "Do\u0142\u0105cz logo(a) wydarzenia",
    "pt": "Inclua o(s) logotipo(s) do evento"
  },
  "logos": {
    "en": "Logos",
    "es": "Logos",
    "gl": "Logos",
    "is": "L\u00f3g\u00f3",
    "pl": "Logo",
    "pt": "Logos"
  },
  "enable_disable": {
    "en": "Sections",
    "es": "Secciones",
    "gl": "Secci\u00f3ns",
    "is": "K\u00f6flum",
    "pl": "Sekcje",
    "pt": "Sec\u00e7\u00f5es"
  },
  "drop_files": {
    "en": "Drop files here...",
    "es": "Arrastra los archivos aqu\u00ed...",
    "gl": "Arrastre os arquivos aqu\u00ed...",
    "is": "Slepptu skr\u00e1m h\u00e9r...",
    "pl": "Upu\u015b\u0107 pliki tutaj...",
    "pt": "Arraste os ficheiros para aqui..."
  },
  "select_files": {
    "en": "Select your files",
    "es": "Seleccione sus archivos",
    "gl": "Seleccione os seus arquivos",
    "is": "Veldu skr\u00e1rnar \u00fe\u00ednar",
    "pl": "Wybierz pliki",
    "pt": "Selecione os ficheiros"
  },
  "or": {
    "en": "or",
    "es": "o",
    "gl": "ou",
    "is": "e\u00f0a",
    "pl": "lub",
    "pt": "ou"
  },
  "banner": {
    "en": "Banner",
    "es": "Banner",
    "gl": "Banner",
    "is": "Bor\u00f0i",
    "pl": "Baner",
    "pt": "Banner"
  },
  "quiet_relaxation_room": {
    "en": "Quiet relaxation room",
    "es": "Sala de relajaci\u00f3n tranquila",
    "gl": "Sala de relaxaci\u00f3n tranquila",
    "is": "Hlj\u00f3\u00f0l\u00e1tt hv\u00edldarherbergi",
    "pl": "Cichy pok\u00f3j relaksacyjny",
    "pt": "Sala de descanso tranquila"
  },
  "soundproofing_headphones": {
    "en": "Soundproofing headphones",
    "es": "Auriculares insonorizados",
    "gl": "Auriculares insonorizados",
    "is": "Hlj\u00f3\u00f0einangru\u00f0 heyrnart\u00f3l",
    "pl": "S\u0142uchawki wyg\u0142uszaj\u0105ce",
    "pt": "Auriculares insonorizados"
  },
  "availability_assistant": {
    "en": "Available assistant",
    "es": "Asistente disponible",
    "gl": "Asistente dispo\u00f1ible",
    "is": "A\u00f0sto\u00f0arf\u00f3lk \u00ed bo\u00f0i",
    "pl": "Dost\u0119pny asystent",
    "pt": "Assistente dispon\u00edvel"
  },
  "covid_19_restrictions": {
    "en": "COVID-19 Restrictions",
    "es": "Restricciones de COVID-19",
    "gl": "Restrici\u00f3ns COVID-19",
    "is": "COVID-19 takmarkanir",
    "pl": "Ograniczenia zwi\u0105zane z COVID-19",
    "pt": "Restri\u00e7\u00f5es COVID-19"
  },
  "wear_mask": {
    "en": "The use of a mask is mandatory",
    "es": "Obligatorio el uso de mascarilla",
    "gl": "O uso de m\u00e1scara \u00e9 obrigatorio",
    "is": "Notkun gr\u00edmu er skylda",
    "pl": "Wymagane jest zas\u0142anianie ust i nosa maseczk\u0105",
    "pt": "O uso de m\u00e1scara \u00e9 obrigat\u00f3rio"
  },
  "handwashing": {
    "en": "Periodic hand washing is recommended",
    "es": "Se recomienda lavado peri\u00f3dico de manos",
    "gl": "Recom\u00e9ndase o lavado peri\u00f3dico das mans",
    "is": "M\u00e6lt er me\u00f0 reglulegum hand\u00fevotti",
    "pl": "Zalecane jest cz\u0119ste dezynfekowanie r\u0105k",
    "pt": "Recomenda-se a lavagem peri\u00f3dica das m\u00e3os"
  },
  "social_distance": {
    "en": "Obligatory to maintain social distance",
    "es": "Obligatorio mantener la distancia social",
    "gl": "Obrigatorio manter a distancia social",
    "is": "Skylt a\u00f0 halda f\u00e9lagslegri fjarl\u00e6g\u00f0",
    "pl": "Obowi\u0105zkowe zachowanie dystansu spo\u0142ecznego",
    "pt": "Obrigat\u00f3rio manter o distanciamento social"
  },
  "temperature_control": {
    "en": "Temperature control will be carried out",
    "es": "Se realizar\u00e1 control de temperaturas",
    "gl": "Realizarase control da temperatura",
    "is": "Hita ver\u00f0ur st\u00fdrt",
    "pl": "Zostanie przeprowadzony pomiar temperatury",
    "pt": "O controle de temperatura ser\u00e1 realizado"
  },
  "hand_sanitizer": {
    "en": "Hand sanitizer available",
    "es": "Gel hidroalcoh\u00f3lico disponible",
    "gl": "Xel hidroalcoh\u00f3lico dispo\u00f1ible",
    "is": "Spritt f\u00e1anlegt",
    "pl": "Dost\u0119pny \u017cel do dezynfekcji r\u0105k",
    "pt": "Alcool gel dispon\u00edvel"
  },
  "additional_location_information": {
    "en": "Additional information",
    "es": "Informaci\u00f3n adicional",
    "gl": "Informaci\u00f3n adicional",
    "is": "Vi\u00f0b\u00f3taruppl\u00fdsingar",
    "pl": "Dodatkowe informacje",
    "pt": "Informa\u00e7\u00e3o adicional"
  },
  "ph_location_information_detail": {
    "en": "Room, hall, area, door, entrance...",
    "es": "Habitaci\u00f3n, sala, zona, puerta, entrada...",
    "gl": "Habitaci\u00f3n, vest\u00edbulo, zona, porta, entrada...",
    "is": "Herbergi, forstofa, sv\u00e6\u00f0i, hur\u00f0, inngangur...",
    "pl": "Pok\u00f3j, hol, powierzchnia, drzwi, wej\u015bcie...",
    "pt": "Sala, hall, \u00e1rea, porta, entrada..."
  },
  "allowed": {
    "en": "Allowed",
    "es": "Permitido",
    "gl": "Permitido",
    "is": "Leyfilegt",
    "pl": "Dozwolony",
    "pt": "Permitido"
  },
  "not_allowed": {
    "en": "Not allowed",
    "es": "No permitido",
    "gl": "Non permitido",
    "is": "Ekki leyfilegt",
    "pl": "Niedozwolony",
    "pt": "N\u00e3o permitido"
  },
  "specific_date": {
    "en": "Does it take place on specific dates or periods?",
    "es": "\u00bfTiene lugar en fechas o per\u00edodos espec\u00edficos?",
    "gl": "Ten lugar en datas ou per\u00edodos concretos?",
    "is": "Fer \u00fea\u00f0 fram \u00e1 \u00e1kve\u00f0num dagsetningum e\u00f0a t\u00edmabilum?",
    "pl": "Czy odbywa si\u0119 w okre\u015blonych terminach lub okresach?",
    "pt": "Ocorre em datas ou per\u00edodos espec\u00edficos?"
  },
  "beginning_date": {
    "en": "Start date",
    "es": "Fecha de inicio",
    "gl": "Data de inicio",
    "is": "Upphafsdagur",
    "pl": "Data rozpocz\u0119cia",
    "pt": "Data de in\u00edcio"
  },
  "ending_date": {
    "en": "Ending date",
    "es": "Fecha de fin",
    "gl": "Data de finalizaci\u00f3n",
    "is": "Lokadagur",
    "pl": "Data ko\u0144cowa",
    "pt": "Data de t\u00e9rmino"
  },
  "audio_text": {
    "en": "Text to audio",
    "es": "Texto a audio",
    "gl": "Texto a audio",
    "is": "Texti \u00ed hlj\u00f3\u00f0",
    "pl": "Tekst na d\u017awi\u0119k",
    "pt": "Texto para \u00e1udio"
  }
}

  




if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = dictionary;
    }
} else {
    window.getDictionary = getDictionary;
    window.change_language = change_language;
}
