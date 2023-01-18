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
    "is": "Fylltu út sýnishorn",
    "pl": "Wypełnij  formularz",
    "pt": "Preencha formulário",
    "uk": "Заповніть анкету"
  },
  "font": {
    "en": "Font",
    "es": "Fuente",
    "gl": "Fonte",
    "is": "Leturgerð",
    "pl": "Czcionka",
    "pt": "Fonte",
    "uk": "шрифтом"
  },
  "form_fields": {
    "en": "Form fields",
    "es": "Campos del formulario",
    "gl": "Campos do formulario",
    "is": "Reitir eyðublaðs",
    "pl": "Pola formularza",
    "pt": "Campos do formulário",
    "uk": "поля форми"
  },
  "language": {
    "en": "Language",
    "es": "Idioma",
    "gl": "Idioma",
    "is": "Tungumál",
    "pl": "Język",
    "pt": "Idioma",
    "uk": "Мови"
  },
  "reset_form": {
    "en": "Reset", //  Form",
    "es": "Reiniciar", // formulario",
    "gl": "Restablecer", //  formulario",
    "is": "Endurstilla", //  eyðublað",
    "pl": "Wyczyść", //  formularz",
    "pt": "Limpar", //  formulário",
    "uk": "скидання", // формаr скидання"
  },
  "english": {
    "en": "English",
    "es": "Inglés",
    "gl": "Inglés",
    "is": "Enska",
    "pl": "angielski",
    "pt": "Inglês",
    "uk": "англійська"
  },
  "spanish": {
    "en": "Spanish",
    "es": "Español",
    "gl": "Español",
    "is": "spænska",
    "pl": "hiszpański",
    "pt": "Espanhol",
    "uk": "іспанська"
  },
  "galician": {
    "en": "Galician",
    "es": "Gallego",
    "gl": "Galego",
    "is": "Galisíska",
    "pl": "galicyjski",
    "pt": "Galego",
    "uk": "галицька"
  },
  "icelandic": {
    "en": "Icelandic",
    "es": "Islandés",
    "gl": "Islandés",
    "is": "Íslenska",
    "pl": "islandzki",
    "pt": "Islandês",
    "uk": "ісландська"
  },
  "polish": {
    "en": "Polish",
    "es": "Polaco",
    "gl": "Polaco",
    "is": "Pólska",
    "pl": "polski",
    "pt": "Polaco",
    "uk": "польський"
  },
  "portuguese": {
    "en": "Portuguese",
    "es": "Portugués",
    "gl": "Portugués",
    "is": "Portúgalska",
    "pl": "portugalski",
    "pt": "Português",
    "uk": "португальська"
  },
  "reload_pdf": {
    "en": "Reload", //  PDF",
    "es": "Recargar", // PDF",
    "gl": "Recargar", //  PDF",
    "is": "Endurhlaða", //  PDF",
    "pl": "Odśwież", //  PDF",
    "pt": "Recarregar", //  PDF",
    "uk": "перезавантажити", //  pdf"
  },
  "download_pdf": {
    "en": "Download", //  PDF",
    "es": "Descargar", // PDF",
    "gl": "Descargar", //  PDF",
    "is": "Sækja", //  PDF",
    "pl": "Pobierz", //  PDF",
    "pt": "Baixar", //  PDF",
    "uk": "Завантажити", //  pdf"
  },
  "activity_type": {
    "en": "Type of activity",
    "es": "Tipo de actividad",
    "gl": "Tipo de actividade",
    "is": "Tegund starfsemi",
    "pl": "Rodzaj aktywności",
    "pt": "Tipo de atividade",
    "uk": "вид діяльності"
  },
  "choose": {
    "en": "Choose...",
    "es": "Elige...",
    "gl": "Escolla...",
    "is": "Veldu ...",
    "pl": "Wybierz...",
    "pt": "Escolher...",
    "uk": "Виберіть"
  },
  "museum": {
    "en": "Museum",
    "es": "Museo",
    "gl": "Museo",
    "is": "Safn",
    "pl": "Muzeum",
    "pt": "Museu",
    "uk": "музей"
  },
  "exhibition": {
    "en": "Exhibition",
    "es": "Exposición",
    "gl": "Exposición",
    "is": "Sýning",
    "pl": "Wystawa",
    "pt": "Exposição",
    "uk": "експозиція"
  },
  "concert": {
    "en": "Concert",
    "es": "Concierto",
    "gl": "Concerto",
    "is": "Tónleikar",
    "pl": "Koncert",
    "pt": "Concerto",
    "uk": "концерт"
  },
  "workshop": {
    "en": "Workshop",
    "es": "Taller",
    "gl": "Taller / Obradoiro",
    "is": "Vinnustofa",
    "pl": "Warsztat",
    "pt": "Oficina",
    "uk": "майстерня"
  },
  "movie_screening": {
    "en": "Movie Screening",
    "es": "Proyección de películas",
    "gl": "Proxección de películas",
    "is": "Kvikmyndasýning",
    "pl": "Pokaz filmu",
    "pt": "Exibição de filmes",
    "uk": "Фільми"
  },
  "literary_meeting": {
    "en": "Literary Meeting",
    "es": "Encuentro Literario",
    "gl": "Encontro literario",
    "is": "Bókmenntafundur",
    "pl": "Spotkanie literackie",
    "pt": "Encontro Literário",
    "uk": "літературна зустріч"
  },
  "theatre_performance": {
    "en": "Theatre Performance",
    "es": "Representación teatral",
    "gl": "Representación teatral",
    "is": "Leiklistarsýning",
    "pl": "Spektakl teatralny",
    "pt": "Espetáculo de Teatro",
    "uk": "грати"
  },
  "dance_performance": {
    "en": "Dance Performance",
    "es": "Espectáculo de danza",
    "gl": "Espectáculo de danza",
    "is": "Danssýning",
    "pl": "Spektakl taneczny",
    "pt": "Performance de dança",
    "uk": "танцювати"
  },
  "festival": {
    "en": "Festival",
    "es": "Festival",
    "gl": "Festival",
    "is": "Hátíð",
    "pl": "Festiwal",
    "pt": "Festival",
    "uk": "Фестиваль"
  },
  "cultural_tour": {
    "en": "Cultural Tour",
    "es": "Tour cultural",
    "gl": "Xira cultural",
    "is": "Menningarferð",
    "pl": "Wycieczka kulturalna",
    "pt": "Tour Cultural",
    "uk": "культурний тур"
  },
  "performance": {
    "en": "Performance",
    "es": "Actuación",
    "gl": "Actuación",
    "is": "Flutningur",
    "pl": "Spektakl",
    "pt": "Atuação",
    "uk": "виконання"
  },
  "fair": {
    "en": "Fair",
    "es": "Feria",
    "gl": "Feira",
    "is": "Sanngjarnt",
    "pl": "Targi",
    "pt": "Feira",
    "uk": "Ярмарка"
  },
  "attraction": {
    "en": "Attraction",
    "es": "Atracción",
    "gl": "Atracción",
    "is": "Aðdráttarafl",
    "pl": "Atrakcja",
    "pt": "Atração",
    "uk": "Ярмарка"
  },
  "religous_place": {
    "en": "Religious place",
    "es": "Lugar Religioso",
    "gl": "Lugar relixioso",
    "is": "Trúarlegur staður",
    "pl": "Miejsce kultu",
    "pt": "Lugar religioso",
    "uk": "релігійне місце"
  },
  "online_event": {
    "en": "Online Event/Web Resource",
    "es": "Evento online / Recurso web",
    "gl": "Evento online / Recurso web",
    "is": "Viðburður á netinu/Heimild á netinu",
    "pl": "Wydarzenie online/Zasób online",
    "pt": "Evento Online/Recurso online",
    "uk": "Онлайн-подія/ веб-ресурс"
  },
  "others": {
    "en": "Other",
    "es": "Otra",
    "gl": "Outra",
    "is": "Annað",
    "pl": "Inne",
    "pt": "Outros tipos de descontos",
    "uk": "інший"
  },
  "error_cultural_activity": {
    "en": "Please, select a valid cultural activity",
    "es": "Por favor, seleccione una actividad cultural válida",
    "gl": "Por favor, seleccione unha actividade cultural válida",
    "is": "Vinsamlegast veldu gilda menningarstarfsemi",
    "pl": "Proszę wybrać odpowiednie działanie kulturalne",
    "pt": "Por favor, selecione uma atividade cultural válida",
    "uk": "Виберіть дійсну культурну діяльність"
  },
  "ph_activity_name": {
    "en": "Specify the name of the activity",
    "es": "Indique el nombre de la actividad",
    "gl": "Indique o nome da actividade",
    "is": "Tilgreinið heiti starfseminnar",
    "pl": "Podaj nazwę działania",
    "pt": "Indique o nome da atividade",
    "uk": "Вкажіть назву діяльності"
  },
  "ph_specify": {
    "en": "Specify",
    "es": "Especifique",
    "gl": "Especifique",
    "is": "Tilgreindu",
    "pl": "Sprecyzuj",
    "pt": "Especifique",
    "uk": "Вкажіть"
  },
  "ph_description_activity": {
    "en": "Describe briefly the cultural activity",
    "es": "Describa brevemente la actividad cultural",
    "gl": "Describa brevemente a actividade cultural",
    "is": "Lýstu stuttlega menningarstarfseminni",
    "pl": "Opisz krótko działanie kulturalne",
    "pt": "Descreva brevemente a atividade cultural",
    "uk": "Коротко охарактеризуйте культурну діяльність"
  },
  "ph_bus_lines": {
    "en": "Bus lines",
    "es": "Líneas de bus",
    "gl": "Liñas de autobuses",
    "is": "Leiðarkerfi strætó",
    "pl": "Linie autobusowe",
    "pt": "Linhas de autocarro",
    "uk": "автобусні лінії"
  },
  "ph_bus_timetables": {
    "en": "Bus schedules",
    "es": "Horarios del bus",
    "gl": "Horarios de autobuses",
    "is": "Tímatöflur strætó",
    "pl": "Rozkład jazdy autobusów",
    "pt": "Horários dos autocarros",
    "uk": "розклад автобусів"
  },
  "ph_metro_lines": {
    "en": "Subway lines",
    "es": "Líneas de metro",
    "gl": "Liñas de metro",
    "is": "Leiðarkerfi neðanjarðarlestar",
    "pl": "Linie metra",
    "pt": "Linhas de metro",
    "uk": "лінії метро"
  },
  "ph_metro_timetables": {
    "en": "Metro schedules",
    "es": "Horarios del metro",
    "gl": "Horarios do metro",
    "is": "Tímatöflur neðanjarðarlestar",
    "pl": "Rozkład jazdy metra",
    "pt": "Horários do metro",
    "uk": "розклади метро"
  },
  "error_short_description": {
    "en": "Please, enter a short description.",
    "es": "Por favor, introduzca una descripción corta.",
    "gl": "Por favor, introduza unha breve descrición.",
    "is": "Vinsamlegast sláðu inn stutta lýsingu.",
    "pl": "Proszę podać krótki opis.",
    "pt": "Por favor, insira uma breve descrição.",
    "uk": "Будь ласка, введіть короткий опис."
  },
  "url_online_event": {
    "en": "URL for the Online Event",
    "es": "URL del Evento Online",
    "gl": "URL do evento online",
    "is": "Vefslóð viðburðar á netinu",
    "pl": "Adres URL wydarzenia online",
    "pt": "URL do Evento Online",
    "uk": "URL-адреса онлайн-події"
  },
  "street": {
    "en": "Street",
    "es": "Calle",
    "gl": "Rúa",
    "is": "Gata",
    "pl": "Ulica",
    "pt": "Rua",
    "uk": "вул"
  },
  "error_fill_field": {
    "en": "Please, complete this field.",
    "es": "Por favor, complete este campo.",
    "gl": "Por favor, complete este campo.",
    "is": "Vinsamlegast fylltu út þennan reit.",
    "pl": "Proszę wypełnić to pole.",
    "pt": "Por favor, preencha este campo.",
    "uk": "Будь ласка, заповніть це поле."
  },
  "number": {
    "en": "Number",
    "es": "Número",
    "gl": "Número",
    "is": "Númer",
    "pl": "Numer",
    "pt": "Número",
    "uk": "Номер"
  },
  "zip": {
    "en": "Zip",
    "es": "CP",
    "gl": "CP",
    "is": "Póstnúmer",
    "pl": "Kod pocztowy",
    "pt": "Código Postal",
    "uk": "Поштовий індекс"
  },
  "city": {
    "en": "Town",
    "es": "Ciudad",
    "gl": "Cidade",
    "is": "Bærinn",
    "pl": "Miasto",
    "pt": "Cidade",
    "uk": "Місто"
  },
  "country": {
    "en": "Country",
    "es": "Pais",
    "gl": "País",
    "is": "Land",
    "pl": "Państwo",
    "pt": "País",
    "uk": "Країна"
  },
  "how_to_get_there": {
    "en": "How could you get there?",
    "es": "¿Cómo se podría llegar hasta allí?",
    "gl": "Como se podería chegar ata alí?",
    "is": "Hvernig gast þú komið þér þangað?",
    "pl": "Jak tam dotarłeś_aś?",
    "pt": "Como chegar lá?",
    "uk": "Як ти міг туди потрапити?"
  },
  "bus": {
    "en": "Bus:",
    "es": "Autobus:",
    "gl": "Autobús:",
    "is": "Strætó:",
    "pl": "Autobus:",
    "pt": "Autocarro:",
    "uk": "Автобус:"
  },
  "metro": {
    "en": "Subway:",
    "es": "Metro:",
    "gl": "Metro:",
    "is": "Neðanjarðarlest:",
    "pl": "Metro:",
    "pt": "Metro:",
    "uk": "лічильник:"
  },
  "taxi": {
    "en": "Cab:",
    "es": "Taxi:",
    "gl": "Taxi:",
    "is": "Leigubíll:",
    "pl": "Taksówka:",
    "pt": "Táxi:",
    "uk": "Таксі:"
  },
  "car": {
    "en": "Car:",
    "es": "Coche:",
    "gl": "Coche:",
    "is": "Bíll:",
    "pl": "Samochód:",
    "pt": "Carro:",
    "uk": "автомобіль:"
  },
  "parking": {
    "en": "Parking:",
    "es": "Aparcamiento:",
    "gl": "Aparcamento:",
    "is": "Bílastæði:",
    "pl": "Parking:",
    "pt": "Estacionamento:",
    "uk": "Парковка:"
  },
  "yes": {
    "en": "Yes",
    "es": "Sí",
    "gl": "Si",
    "is": "Já",
    "pl": "Tak",
    "pt": "Sim",
    "uk": "Так"
  },
  "no": {
    "en": "No",
    "es": "No",
    "gl": "Non",
    "is": "Nei",
    "pl": "Nie",
    "pt": "Não",
    "uk": "Ні"
  },
  "ph_parking_slot": {
    "en": "Number of parking places",
    "es": "Número de plazas",
    "gl": "Número de prazas",
    "is": "Fjöldi bílastæða",
    "pl": "Liczba miejsc parkingowych",
    "pt": "Número de lugares de estacionamento",
    "uk": "Кількість місць"
  },
  "ph_slot_price": {
    "en": "Price of parking places",
    "es": "Precio de las plazas",
    "gl": "Prezo das prazas",
    "is": "Verð á bílastæðum",
    "pl": "Opłata za miejsce parkingowe",
    "pt": "Preço do estacionamento",
    "uk": "Ціна сидіння"
  },
  "ph_disabled_parking_slot": {
    "en": "Number of disabled parking places",
    "es": "Número de plazas para personas discapacitadas",
    "gl": "Número de prazas para persoas discapacitadas",
    "is": "Fjöldi bílastæða fyrir fatlað fólk",
    "pl": "Liczba miejsc parkingowych dla osób z niepełnosprawnościami",
    "pt": "Número de lugares de estacionamento para deficientes",
    "uk": "Кількість місць для інвалідів"
  },
  "ph_disabled_price_parking_slot": {
    "en": "Price of disabled parking places",
    "es": "Precio de las plazas para personas discapacitadas",
    "gl": "Prezo das prazas para persoas discapacitadas",
    "is": "Verð bílastæða fyrir fatlað fólk",
    "pl": "Opłata za miejsce parkingowe dla osób z niepełnosprawnościami",
    "pt": "Preço do estacionamento para deficientes físicos",
    "uk": "Ціна місць для інвалідів"
  },
  "information_prices": {
    "en": "Pricing information",
    "es": "Información sobre los precios",
    "gl": "Información sobre os prezos",
    "is": "Verðlagningarupplýsingar",
    "pl": "Informacje o biletach",
    "pt": "Informações sobre preços",
    "uk": "Інформація про ціни"
  },
  "normal_price": {
    "en": "Normal price",
    "es": "Precio normal",
    "gl": "Prezo normal",
    "is": "Venjulegt verð",
    "pl": "Cena biletu normalnego",
    "pt": "Preço normal",
    "uk": "Нормальна ціна"
  },
  "reduced_price": {
    "en": "Reduced price",
    "es": "Precio reducido",
    "gl": "Prezo reducido",
    "is": "Lækkað verð",
    "pl": "Cena biletu ulgowego",
    "pt": "Preço reduzido",
    "uk": "Знижена ціна"
  },
  "ph_when": {
    "en": "When?",
    "es": "¿Cuándo?",
    "gl": "Cando?",
    "is": "Hvenær?",
    "pl": "Kiedy?",
    "pt": "Quando?",
    "uk": "Коли?"
  },
  "family_price": {
    "en": "Special price per family",
    "es": "Precio especial por familia",
    "gl": "Prezo especial por familia",
    "is": "Sértilboð á fjölskyldu",
    "pl": "Cena biletu rodzinnego",
    "pt": "Preço especial para famílias",
    "uk": "Спеціальна ціна на сім'ю"
  },
  "member_price": {
    "en": "Price per family member",
    "es": "Precio por miembro",
    "gl": "Prezo por membro",
    "is": "Verð á fjölskyldumeðlim",
    "pl": "Cena biletu za członka rodziny",
    "pt": "Preço por membro da família",
    "uk": "Ціна за учасника"
  },
  "max_num_children": {
    "en": "Maximum number of children",
    "es": "Maximo número de niños",
    "gl": "Número máximo de nenos/as",
    "is": "Fjöldatakmörkun barna",
    "pl": "Maksymalna liczba dzieci",
    "pt": "Número máximo de filhos",
    "uk": "Максимальна кількість дітей"
  },
  "max_age_children": {
    "en": "Maximum age of children",
    "es": "Edad máxima de los niños",
    "gl": "Idade máxima dos nenos/as",
    "is": "Aldurstakmark barna",
    "pl": "Maksymalny wiek dzieci",
    "pt": "Idade máxima das crianças",
    "uk": "максимальний вік дітей"
  },
  "free_interpreter": {
    "en": "Free for interpreter or facilitator",
    "es": "Gratis para intérprete o facilitador/a",
    "gl": "De balde para intérprete ou facilitador/a",
    "is": "Frítt fyrir túlk eða aðstoðarmanneskju",
    "pl": "Bezpłatnie dla tłumacza lub opiekuna",
    "pt": "Gratuito para intérprete ou facilitador",
    "uk": "Безкоштовно для перекладача або фасилітатора"
  },
  "other_discounts": {
    "en": "Other types of discounts",
    "es": "Otro tipo de descuentos",
    "gl": "Outros tipos de descontos",
    "is": "Aðrar tegundir afsláttar",
    "pl": "Inne rodzaje zniżek",
    "pt": "Outros tipos de descontos",
    "uk": "Інші види знижок"
  },
  "terms_condition": {
    "en": "Terms and conditions",
    "es": "Términos y condiciones",
    "gl": "Termos e condicións",
    "is": "Skilmálar",
    "pl": "Regulamin",
    "pt": "Termos e Condições",
    "uk": "Правила та умови"
  },
  "ph_descrive_terms": {
    "en": "Describe briefly the terms and conditions",
    "es": "Describa brevemente los términos y condiciones",
    "gl": "Describa brevemente os termos e as condicións",
    "is": "Lýstu stuttlega skilmálunum",
    "pl": "Opisz krótko regulamin",
    "pt": "Descreva resumidamente os termos e condições",
    "uk": "Коротко опишіть умови"
  },
  "information_buy_tickets": {
    "en": "Information about buying tickets",
    "es": "Información sobre la compra de entradas",
    "gl": "Información sobre a compra de billetes",
    "is": "Upplýsingar um miðakaup",
    "pl": "Informacje o zakupie biletów",
    "pt": "Informação sobre compra de bilhetes",
    "uk": "Інформація про покупку квитків"
  },
  "buy_tickets": {
    "en": "Purchase of tickets",
    "es": "Compra de billetes",
    "gl": "Compra de billetes",
    "is": "Kaup á miðum",
    "pl": "Zakup biletów",
    "pt": "Compra de bilhetes",
    "uk": "Придбання квитків"
  },
  "online": {
    "en": "On-line",
    "es": "Online",
    "gl": "En liña",
    "is": "Á netinu",
    "pl": "Online",
    "pt": "Online",
    "uk": "Он-лайн"
  },
  "onsite": {
    "en": "On site",
    "es": "En el sitio",
    "gl": "No lugar",
    "is": "Á staðnum",
    "pl": "Na miejscu",
    "pt": "No local",
    "uk": "На місці"
  },
  "ph_link": {
    "en": "Link:",
    "es": "Enlace:",
    "gl": "Ligazón:",
    "is": "Tengill:",
    "pl": "Link:",
    "pt": "Link:",
    "uk": "Посилання:"
  },
  "ph_link_virtual_tour": {
    "en": "Link:",
    "es": "Enlace:",
    "gl": "Ligazón:",
    "is": "Tengill:",
    "pl": "Link:",
    "pt": "Link:",
    "uk": "Посилання:"
  },
  "where": {
    "en": "Where?",
    "es": "¿En dónde?",
    "gl": "Onde?",
    "is": "Hvar?",
    "pl": "Gdzie?",
    "pt": "Onde?",
    "uk": "куди?"
  },
  "information_hours": {
    "en": "Information about schedules",
    "es": "Información sobre los horarios",
    "gl": "Información sobre horarios",
    "is": "Upplýsingar um tímaáætlun",
    "pl": "Informacja o harmonogramie",
    "pt": "Informação sobre horários",
    "uk": "Інформація про розклади"
  },
  "continuous_schedule": {
    "en": "Continuous hours",
    "es": "Horario continuo",
    "gl": "Horario continuo",
    "is": "Samfelldir tímar",
    "pl": "Stałe godziny",
    "pt": "Horário Contínuo",
    "uk": "Безперервні години"
  },
  "morning_schedule": {
    "en": "Morning schedule",
    "es": "Horario de mañana",
    "gl": "Horario de mañá",
    "is": "Morgundagskrá",
    "pl": "Godziny poranne",
    "pt": "Horário da manhã",
    "uk": "ранковий графік"
  },
  "afternoon_schedule": {
    "en": "Afternoon schedule",
    "es": "Horario de tarde",
    "gl": "Horario de tarde",
    "is": "Eftirmiðdagsdagskrá",
    "pl": "Godziny popołudniowe",
    "pt": "Horário da tarde",
    "uk": "післяобідні години"
  },
  "opening_days": {
    "en": "What days is it open?",
    "es": "¿Qué días está abierto?",
    "gl": "Que días está aberto?",
    "is": "Hvaða daga er opið?",
    "pl": "W jakie dni jest otwarte?",
    "pt": "Em que dias está aberto?",
    "uk": "В які дні він відкритий?"
  },
  "monday": {
    "en": "Monday",
    "es": "Lunes",
    "gl": "Luns",
    "is": "Mánudagur",
    "pl": "poniedziałek",
    "pt": "Segunda-feira",
    "uk": "понеділок"
  },
  "tuesday": {
    "en": "Tuesday",
    "es": "Martes",
    "gl": "Martes",
    "is": "Þriðjudagur",
    "pl": "wtorek",
    "pt": "Terça-feira",
    "uk": "вівторок"
  },
  "wednesday": {
    "en": "Wednesday",
    "es": "Miércoles",
    "gl": "Mércores",
    "is": "Miðvikudagur",
    "pl": "środa",
    "pt": "Quarta-feira",
    "uk": "середа"
  },
  "thursday": {
    "en": "Thursday",
    "es": "Jueves",
    "gl": "Xoves",
    "is": "Fimmtudagur",
    "pl": "czwartek",
    "pt": "Quinta-feira",
    "uk": "четвер"
  },
  "friday": {
    "en": "Friday",
    "es": "Viernes",
    "gl": "Venres",
    "is": "Föstudagur",
    "pl": "piątek",
    "pt": "Sexta-feira",
    "uk": "п'ятниця"
  },
  "saturday": {
    "en": "Saturday",
    "es": "Sábado",
    "gl": "Sábado",
    "is": "Laugardagur",
    "pl": "sobota",
    "pt": "Sábado",
    "uk": "субота"
  },
  "sunday": {
    "en": "Sunday",
    "es": "Domingo",
    "gl": "Domingo",
    "is": "Sunnudagur",
    "pl": "niedziela",
    "pt": "Domigo",
    "uk": "неділя"
  },
  "opening_hours": {
    "en": "Opening time",
    "es": "Hora de apertura",
    "gl": "Horario de apertura",
    "is": "Opnunartími",
    "pl": "Godzina otwarcia",
    "pt": "Horário de abertura",
    "uk": "Час відкриття"
  },
  "closing_hour": {
    "en": "Closing time",
    "es": "Hora de cierre",
    "gl": "Hora de peche",
    "is": "Lokunartími",
    "pl": "Godzina zamknięcia",
    "pt": "Horário de encerramento",
    "uk": "Час закриття"
  },
  "last_admission_time": {
    "en": "Last shift time",
    "es": "Hora último turno",
    "gl": "Último tempo de quenda",
    "is": "Síðasti vaktartími",
    "pl": "Godzina ostatniego wejścia",
    "pt": "Horário da última visita",
    "uk": "час останньої зміни"
  },
  "information_facilities": {
    "en": "Information about the facilities",
    "es": "Información sobre las instalaciones",
    "gl": "Información sobre as instalacións",
    "is": "Upplýsingar um aðstöðuna",
    "pl": "Udogodnienia",
    "pt": "Informação sobre as instalações",
    "uk": "Інформація про заклад"
  },
  "information_guides": {
    "en": "Information about the guides",
    "es": "Información sobre las guías",
    "gl": "Información sobre as guías",
    "is": "Upplýsingar um leiðsögumenn",
    "pl": "Informacje na temat przewodników",
    "pt": "Informação sobre guias",
    "uk": "Інформація про гідів"
  },
  "private_tours": {
    "en": "Private tours",
    "es": "Visitas privadas",
    "gl": "Visitas privadas",
    "is": "Einkaferðir",
    "pl": "Zwiedzanie prywatne",
    "pt": "Visitas privadas / guiadas",
    "uk": "приватні візити"
  },
  "duration_private_tour": {
    "en": "Private tour schedule (minutes)",
    "es": "Duración de la visita privada (minutos)",
    "gl": "Duración da visita privada (minutos)",
    "is": "Dagskrá einkaferða (mínútur)",
    "pl": "Czas zwiedzania prywatnego (minuty)",
    "pt": "Programação da visita privada / guiada (minutos)",
    "uk": "Тривалість приватного візиту (хвилин)"
  },
  "price_private_tour": {
    "en": "Private tour price",
    "es": "Precio de la visita privada",
    "gl": "Prezo da visita privada",
    "is": "Verð einkaferða",
    "pl": "Opłata za zwiedzanie prywatne",
    "pt": "Preço da visita privada / guiada",
    "uk": "Ціна приватного відвідування"
  },
  "information_allowed_actions": {
    "en": "Information about allowed actions",
    "es": "Información sobre acciones permitidas",
    "gl": "Información sobre accións permitidas",
    "is": "Upplýsingar um leyfðar aðgerðir",
    "pl": "Informacje na temat dozwolonych działań",
    "pt": "Informação sobre ações permitidas",
    "uk": "Інформація про дозволені дії"
  },
  "extra_information": {
    "en": "More information",
    "es": "Más información",
    "gl": "Máis información",
    "is": "Meiri upplýsingar",
    "pl": "Więcej informacji",
    "pt": "Mais informação",
    "uk": "Більше інформації"
  },
  "before_going_info": {
    "en": "Before-you-go information",
    "es": "Información previa al viaje",
    "gl": "Información previa á viaxe",
    "is": "Upplýsingar áður en þú ferð",
    "pl": "Informacje przed wyjściem",
    "pt": "O que saber antes de ir",
    "uk": "Інформація перед поїздкою"
  },
  "ph_extra_info": {
    "en": "Does the user need to know anything else before going?",
    "es": "¿Necesita la persona usuaria saber algo más antes de ir?",
    "gl": "A persoa usuaria precisa saber algo máis antes de ir?",
    "is": "Þarf notandinn að vita eitthvað annað áður en hann fer?",
    "pl": "Czy użytkownik musi o czymś wiedzieć przed przybyciem?",
    "pt": "O visitante precisa saber mais alguma coisa antes de ir?",
    "uk": "Чи потрібно користувачеві знати щось ще, перш ніж йти?"
  },
  "give_extra_info": {
    "en": "Extra information that you want to detail",
    "es": "Información extra que se desee detallar",
    "gl": "Información adicional que desexa detallar",
    "is": "Frekari upplýsingar sem þú vilt tilgreina",
    "pl": "Dodatkowe informacje, które chcesz uszczegółowić",
    "pt": "Informação extra que queira acrescentar",
    "uk": "Додаткова інформація, яку ви хочете деталізувати"
  },
  "ph_event_extra_info": {
    "en": "Do you want to detail something more about this event?",
    "es": "¿Desea contar algo más sobre este evento?",
    "gl": "Quere dicir algo máis sobre este evento?",
    "is": "Viltu tilgreina eitthvað frekar um þennan atburð?",
    "pl": "Czy chcesz napisać coś więcej o tym wydarzeniu?",
    "pt": "Quer acrescentar mais informação sobre este evento?",
    "uk": "Хочете розповісти щось більше про цю подію?"
  },
  "virtual_tours": {
    "en": "Would it be possible to make virtual visits?",
    "es": "¿Sería posible hacer visitas virtuales?",
    "gl": "Sería posible facer visitas virtuais?",
    "is": "Væri hægt að fara í sýndarheimsóknir?",
    "pl": "Czy jest możliwa relizacja wizyt wirtualnych?",
    "pt": "É possível fazer visitas virtuais?",
    "uk": "Чи можна було б здійснити віртуальні візити?"
  },
  "send_form": {
    "en": "Send Form",
    "es": "Enviar formulario",
    "gl": "Enviar formulario",
    "is": "Senda eyðublað",
    "pl": "Wyślij formularz",
    "pt": "Submeter formulário",
    "uk": "Надіслати форму"
  },
  "accessible_areas": {
    "en": "Wheelchair accessible",
    "es": "Accesible para sillas de ruedas",
    "gl": "Accesible en cadeira de rodas",
    "is": "Aðgengilegt fyrir hjólastóla",
    "pl": "Dostępność dla wózków inwalidzkich",
    "pt": "Acessível a cadeiras de rodas",
    "uk": "доступний для інвалідних візків"
  },
  "lifts": {
    "en": "Lifts",
    "es": "Ascensores",
    "gl": "Ascensores",
    "is": "Lyftur",
    "pl": "Windy",
    "pt": "Elevadores",
    "uk": "ліфти"
  },
  "toilets": {
    "en": "Toilets",
    "es": "Baños",
    "gl": "Baños",
    "is": "Salerni",
    "pl": "WC",
    "pt": "Sanitários",
    "uk": "Туалети"
  },
  "disabled_toilets": {
    "en": "Toilets for disabled",
    "es": "Baños para personas discapacitadas",
    "gl": "Baños para persoas discapacitadas",
    "is": "Salerni fyrir fatlað fólk",
    "pl": "Toalety dla osób z niepełnosprawnościami",
    "pt": "Sanitários para deficientes",
    "uk": "Санвузол для людей з обмеженими можливостями"
  },
  "changing": {
    "en": "Changing room",
    "es": "Cambiador",
    "gl": "Cambiador",
    "is": "Búningsherbergi",
    "pl": "Przebieralnia",
    "pt": "Vestiário",
    "uk": "пеленальний столик"
  },
  "cloakrooms": {
    "en": "Cloakrooms and luggage",
    "es": "Guardaropa",
    "gl": "Armario",
    "is": "Fatahengi og farangur",
    "pl": "Szatnie",
    "pt": "Bengaleiro",
    "uk": "Гардероб"
  },
  "blind_paths": {
    "en": "Paths for blind people",
    "es": "Rutas para invidentes",
    "gl": "Rutas para invidentes",
    "is": "Leiðir fyrir blint fólk",
    "pl": "Ścieżki dotykowe dla osób niewidomych",
    "pt": "Percursos para cegos",
    "uk": "Маршрути для незрячих"
  },
  "interpreters": {
    "en": "Interpreters",
    "es": "Intérpretes",
    "gl": "Intérpretes",
    "is": "Túlkar",
    "pl": "Tłumacze",
    "pt": "Intérpretes",
    "uk": "перекладачі"
  },
  "heats": {
    "en": "Heats",
    "es": "Radiadores",
    "gl": "Radiadores",
    "is": "Ofnar",
    "pl": "Grzejniki",
    "pt": "Aquecimento",
    "uk": "радіатори"
  },
  "air_condition": {
    "en": "Air conditioning",
    "es": "Aire acondicionado",
    "gl": "Aire acondicionado",
    "is": "Loftkæling",
    "pl": "Klimatyzacja",
    "pt": "Ar condicionado",
    "uk": "Кондиціонер"
  },
  "chairs_rest": {
    "en": "Chairs to rest",
    "es": "Sillas para descansar",
    "gl": "Cadeiras para descansar",
    "is": "Stólar til hvíldar",
    "pl": "Krzesła do odpoczynku",
    "pt": "Áreas para descansar",
    "uk": "стільці для відпочинку"
  },
  "interactive_objects": {
    "en": "Interactive objects and displays",
    "es": "Objetos interactivos y pantallas",
    "gl": "Obxectos interactivos e pantallas",
    "is": "Gagnvirkir hlutir og skjáir",
    "pl": "Interaktywne obiekty i wyświetlacze",
    "pt": "Objetos e écrans interativos",
    "uk": "Інтерактивні об'єкти та екрани"
  },
  "sign_guides": {
    "en": "Sign language guides",
    "es": "Guías de lengua de signos",
    "gl": "Guías de lingua de signos",
    "is": "Táknmálsleiðsögn",
    "pl": "Przewodniki w języku migowym",
    "pt": "Guias de linguagem de sinais",
    "uk": "Посібники жестовою мовою"
  },
  "audible_guides": {
    "en": "Audio guides",
    "es": "Audioguías",
    "gl": "Audioguías",
    "is": "Hljóðleiðsögn",
    "pl": "Audioprzewodniki",
    "pt": "Guias de áudio",
    "uk": "Аудіогіди"
  },
  "braille_guides": {
    "en": "Braille guides",
    "es": "Guías en braille",
    "gl": "Guías en braille",
    "is": "Blindraletursleiðsögn",
    "pl": "Przewodniki w alfabecie Braille'a",
    "pt": "Guias em braille",
    "uk": "Довідники Брайля"
  },
  "pictogram_guides": {
    "en": "Pictograms guides",
    "es": "Guías con pictogramas",
    "gl": "Guías con pictogramas",
    "is": "Táknmyndaleiðsögn",
    "pl": "Przewodniki z piktogramami",
    "pt": "Guias de pictogramas",
    "uk": "Путівники з піктограмами"
  },
  "easy_vocabulary_guides": {
    "en": "Easy vocabulary guides",
    "es": "Guías con vocabulario sencillo",
    "gl": "Guías con vocabulario sinxelo",
    "is": "Leiðsögn á auðskildu máli",
    "pl": "Przewodniki z prostym słownictwem",
    "pt": "Guias de vocabulário fáceis",
    "uk": "Посібники з простою лексикою"
  },
  "different_languages": {
    "en": "Available in different languages",
    "es": "Disponibles en diferentes idiomas",
    "gl": "Dispoñible en diferentes idiomas",
    "is": "Fáanlegt á ólíkum tungumálum",
    "pl": "Dostępne w wielu językach",
    "pt": "Disponível em vários idiomas",
    "uk": "Доступно різними мовами"
  },
  "photographs_allowed": {
    "en": "Photographs allowed",
    "es": "Fotografías permitidas",
    "gl": "Permítense fotografías",
    "is": "Ljósmyndir leyfðar",
    "pl": "Fotografowanie dozwolone",
    "pt": "Fotografias permitidas",
    "uk": "Фотографії дозволені"
  },
  "flash_allowed": {
    "en": "Flash photos allowed",
    "es": "Fotografías con flash permitidas",
    "gl": "Permítense fotos con flash",
    "is": "Ljósmyndir með flassi leyfðar",
    "pl": "Fotografowanie z fleszem dozwolone",
    "pt": "Fotografias com flash permitidas",
    "uk": "Дозволено фотографування зі спалахом"
  },
  "recording_allowed": {
    "en": "Video recording allowed",
    "es": "Grabar vídeo permitido",
    "gl": "Permítese gravar vídeos",
    "is": "Myndbandsupptaka leyfð",
    "pl": "Rejestrowanie wideo dozwolone",
    "pt": "Gravação de vídeo permitida",
    "uk": "дозволено записувати відео"
  },
  "cafeteria_bar": {
    "en": "Cafeteria and bar",
    "es": "Cafetería y bar",
    "gl": "Cafetería e bar",
    "is": "Kaffihús og bar",
    "pl": "Kawiarnia i bar",
    "pt": "Cafetaria e bar",
    "uk": "кафе та бар"
  },
  "cantina": {
    "en": "Cantina",
    "es": "Comedor",
    "gl": "Comedor",
    "is": "Mötuneyti",
    "pl": "Jadalnia",
    "pt": "Espaço de refeições",
    "uk": "Їдальня"
  },
  "food_drink_allowed": {
    "en": "Food and drinks allowed",
    "es": "Comida y bebida permitidas",
    "gl": "Permítese comida e bebida",
    "is": "Matur og drykkur leyfður",
    "pl": "Dozwolone jedzenie i picie",
    "pt": "Alimentos e bebidas são permitidos",
    "uk": "Їжа та напої дозволені"
  },
  "bring_own_food": {
    "en": "Bring your own food in case of allergies allowed",
    "es": "Permitido traer tu propia comida si eres alérgico",
    "gl": "Permítese levar a comida propia se se é alérxico",
    "is": "Leyfilegt að koma með eigin mat ef þú ert með ofnæmi",
    "pl": "W przypadku alergii dozwolne własne jedzenie",
    "pt": "Trazer a própria comida em caso de alergia permitida",
    "uk": "Якщо у вас алергія, дозволено брати з собою їжу"
  },
  "backpacks_allowed": {
    "en": "Backpacks allowed",
    "es": "Mochilas permitidas",
    "gl": "Mochilas permitidas",
    "is": "Bakpokar leyfðir",
    "pl": "Dozwolone plecaki",
    "pt": "Mochilas permitidas",
    "uk": "Рюкзаки дозволені"
  },
  "shop": {
    "en": "Shop",
    "es": "Tienda",
    "gl": "Tenda",
    "is": "Verslun",
    "pl": "Sklep",
    "pt": "Loja",
    "uk": "Магазин"
  },
  "short_description": {
    "en": "Short description",
    "es": "Descripción corta",
    "gl": "Descrición curta",
    "is": "Stutt lýsing",
    "pl": "Krótki opis",
    "pt": "Pequena descrição",
    "uk": "Короткий опис"
  },
  "location": {
    "en": "Location information",
    "es": "Información sobre la localización",
    "gl": "Información de localización",
    "is": "Upplýsingar um staðsetningu",
    "pl": "Informacje na temat lokalizacji",
    "pt": "Informação sobre a localização",
    "uk": "інформація про місцезнаходження"
  },
  "address": {
    "en": "Address",
    "es": "Dirección",
    "gl": "Enderezo",
    "is": "Heimilisfang",
    "pl": "adres",
    "pt": "Morada",
    "uk": "Адреса"
  },
  "slots": {
    "en": "slot",
    "es": "plaza",
    "gl": "praza",
    "is": "staður",
    "pl": "miejsce",
    "pt": "por lugar",
    "uk": "Майдан"
  },
  "each": {
    "en": "each",
    "es": "cada una",
    "gl": "cada unha",
    "is": "hvert",
    "pl": "każdy",
    "pt": "por pessoa",
    "uk": "кожен"
  },
  "free": {
    "en": "free",
    "es": "gratis",
    "gl": "de balde",
    "is": "ókeypis",
    "pl": "bezpłatny",
    "pt": "gratuito",
    "uk": "безкоштовно"
  },
  "tickets_information": {
    "en": "Ticket information",
    "es": "Información sobre las entradas",
    "gl": "Información de billetes",
    "is": "Upplýsingar um miða",
    "pl": "Informacje o biletach",
    "pt": "Informação sobre bilhetes",
    "uk": "Інформація про квитки"
  },
  "autoreload": {
    "en": "Update automatically", // PDF automatically",
    "es": "Actualizar automáticamente", // PDF automáticamente",
    "gl": "Actualizar automaticamente", // PDF automaticamente",
    "is": "Uppfærðu sjálfkrafa", // PDF sjálfkrafa",
    "pl": "Aktualizuj automatycznie", // PDF automatycznie",
    "pt": "Atualizar automaticamente", // PDF automaticamente",
    "uk": "Оновлюйте автоматично", // PDF автоматично"
  },
  "press": {
    "en": "Press!",
    "es": "¡Presione!",
    "gl": "Prema!",
    "is": "ýttu á!",
    "pl": "Naciśnij!",
    "pt": "Pressione!",
    "uk": "натисніть!"
  },
  "family_price": {
    "en": "Price for families",
    "es": "Precio por familias",
    "gl": "Prezo por familia",
    "is": "Verð fyrir fjölskyldur",
    "pl": "Opłata dla rodzin",
    "pt": "Preço para famílias",
    "uk": "Ціна для сімей"
  },
  "children": {
    "en": "sons",
    "es": "hijos/as",
    "gl": "fillos/as",
    "is": "synir",
    "pl": "dzieci",
    "pt": "filhos",
    "uk": "дітей"
  },
  "child": {
    "en": "child",
    "es": "niño/a",
    "gl": "neno/a",
    "is": "barn",
    "pl": "dziecko",
    "pt": "criança",
    "uk": "дитини"
  },
  "max_age_1": {
    "en": "up to {num_y} year old",
    "es": "hasta {num_y} año",
    "gl": "ata {num_y} ano",
    "is": "allt að {num_y} árs",
    "pl": "do {num_y} roku życia",
    "pt": "até {num_y} ano",
    "uk": "до {num_y} року"
  },
  "max_age_2": {
    "en": "up to {num_y} years old",
    "es": "hasta {num_y} años",
    "gl": "ata {num_y} anos",
    "is": "allt að {num_y} ára",
    "pl": "do {num_y} lat",
    "pt": "até {num_y} anos",
    "uk": "до {num_y} років"
  },
  "free_for_all": {
    "en": "Free for all",
    "es": "Gratis para todos",
    "gl": "De balde para todos",
    "is": "frítt fyrir alla",
    "pl": "bezpłatny dla wszystkich",
    "pt": "Gratuito para todos",
    "uk": "безкоштовно для всіх"
  },
  "per_member": {
    "en": "per member",
    "es": "cada miembro",
    "gl": "por membro",
    "is": "á hvern meðlim",
    "pl": "dla członka",
    "pt": "por membro",
    "uk": "кожного члена"
  },
  "hours": {
    "en": "From {0} to {1}",
    "es": "De {0} a {1}",
    "gl": "De {0} a {1}",
    "is": "Frá {0} til {1}",
    "pl": "od {0} do {1}",
    "pt": "De {0} a {1}",
    "uk": "Від {0} до {1}"
  },
  "last_admission": {
    "en": "(Last shift: {0})",
    "es": "(Último turno: {0})",
    "gl": "(Última quenda: {0})",
    "is": "(Síðasta vakt: {0})",
    "pl": "(Ostatnie wejście o {0})",
    "pt": "(Última entrada: {0})",
    "uk": "(Останній хід: {0})"
  },
  "reserved_slots": {
    "en": "Disabled parking slots reserved",
    "es": "Número de plazas reservadas para personas discapacitadas",
    "gl": "Número de prazas reservadas para persoas discapacitadas",
    "is": "Frátekin bílastæði fyrir fatlað fólk",
    "pl": "Liczba miejsc parkingowych dla osób z niepełnosprawnościami",
    "pt": "Número de lugares reservados para deficientes",
    "uk": "Кількість місць, зарезервованих для людей з обмеженими можливостями"
  },
  "press_buy_tickets": {
    "en": "Click on the link to buy tickets.",
    "es": "Presione en el enlace para comprar las entradas.",
    "gl": "Faga clic na ligazón para mercar as entradas.",
    "is": "Smelltu á hlekkinn til að kaupa miða.",
    "pl": "Kliknij link, aby kupić bilety.",
    "pt": "Clique no link para comprar bilhetes.",
    "uk": "Натисніть на посилання, щоб купити квитки."
  },
  "press_virtual_visit": {
    "en": "Click on the link to access the virtual tour.",
    "es": "Presione en el enlace para acceder a la visita virtual.",
    "gl": "Faga clic na ligazón para acceder á visita virtual.",
    "is": "Smelltu á hlekkinn til að fá aðgang að sýndarleiðsögn.",
    "pl": "Kliknij link, aby uzyskać dostęp do wirtualnego zwiedzania.",
    "pt": "Clique no link para aceder à visita virtual",
    "uk": "Натисніть на посилання, щоб отримати доступ до віртуального візиту."
  },
  "where_buy_tickets": {
    "en": "Where to buy tickets?",
    "es": "¿Dónde comprar las entradas?",
    "gl": "Onde mercar as entradas?",
    "is": "Hvar á að kaupa miða?",
    "pl": "Gdzie można kupić bilety?",
    "pt": "Onde comprar bilhetes?",
    "uk": "Де купити квитки?"
  },
  "sure_download": {
    "en": "Are you sure about downloading the PDF, you still have some fields to cover?",
    "es": "¿Seguro que quiere desacargar el PDF? Todavía le quedan algunos campos por cubrir.",
    "gl": "Seguro que desexa descargar o PDF? Aínda lle quedan algúns campos por encher.",
    "is": "Ertu viss um að þú viljir hlaða niður PDF-skjalinu, þú átt ennþá einhverja reiti óútfyllta?",
    "pl": "Czy na pewno chcesz pobrać plik PDF? Jest jeszcze kilka pól do uzupełnienia.",
    "pt": "Tem certeza de que deseja fazer o download do PDF, ainda tem alguns campos para preencher?",
    "uk": "Ви впевнені, що хочете завантажити PDF? Залишилося охопити ще кілька полів."
  },
  "activity_name": {
    "en": "Activity name",
    "es": "Nombre de la actividad",
    "gl": "Nome da actividade",
    "is": "Nafn starfseminnar",
    "pl": "Nazwa działania",
    "pt": "Nome da atividade",
    "uk": "Назва діяльності"
  },
  "chronometer": {
    "en": "Chronometer",
    "es": "Cronómetro",
    "gl": "Cronómetro",
    "is": "Tímaritari",
    "pl": "Chronometr",
    "pt": "Cronômetro",
    "uk": "Хронометр"
  },
  "lines_timetable": {
    "en": "Line{s1}: {line}\nSchedule{s2}: {timetable}",
    "es": "Línea{s1}: {line}\nHorario{s2}: {timetable}",
    "gl": "Liña{s1}: {line}\nHorario{s2}: {timetable}",
    "is": "Lína{s1}: {line}\nStundaskrá{s2}: {timetable}",
    "pl": "Linia{s1}: {line}\nRozkład{s2}: {timetable}",
    "pt": "Linha{s1}: {line}\nHorário{s2}: {timetable}",
    "uk": "Лінія{s1}: {line}\nРозклад{s2}: {розклад}"
  },
  "without_number": {
    "en": "S/N",
    "es": "S/N",
    "gl": "S/N",
    "is": "S/N",
    "pl": "S/N",
    "pt": "S/N",
    "uk": "без номера"
  },
  "where_buy_tickets": {
    "en": "Where can you buy tickets in person?",
    "es": "¿Dónde se pueden comprar las entradas presencialmente?",
    "gl": "Onde se poden mercar as entradas en persoa?",
    "is": "Hvar er hægt að kaupa miða í eigin persónu?",
    "pl": "Gdzie można osobiście kupić bilety?",
    "pt": "Onde pode comprar bilhetes presencialmente?",
    "uk": "Де можна придбати квитки особисто?"
  },
  "where_buy_tickets_online": {
    "en": "On which website can you buy tickets?",
    "es": "¿En qué web se pueden comprar las entradas?",
    "gl": "En que web se poden mercar as entradas?",
    "is": "Á hvaða vefsíðu er hægt að kaupa miða?",
    "pl": "Na jakiej stronie można kupić bilety?",
    "pt": "Sítio Web para comprar bilhetes online?",
    "uk": "На якому сайті можна придбати квитки?"
  },
  "logo_title": {
    "en": "Attach logo(s)",
    "es": "Adjunte logo(s)",
    "gl": "Anexe logo(s)",
    "is": "Hengdu við lógó",
    "pl": "Dołącz logo(a)",
    "pt": "Inclua logotipo(s)",
    "uk": "Прикріпити логотип(и)"
  },
  "logo": {
    "en": "Attach logo(s) for the event",
    "es": "Adjunte logo(s) para el evento",
    "gl": "Anexe logo(s) para o evento",
    "is": "Hengdu við lógó fyrir viðburðinn",
    "pl": "Dołącz logo(a) wydarzenia",
    "pt": "Inclua o(s) logotipo(s) do evento",
    "uk": "Додайте логотип(и) події"
  },
  "logos": {
    "en": "Logos",
    "es": "Logos",
    "gl": "Logos",
    "is": "Lógó",
    "pl": "Logo",
    "pt": "Logos",
    "uk": "логотипи"
  },
  "enable_disable": {
    "en": "Sections",
    "es": "Secciones",
    "gl": "Seccións",
    "is": "Köflum",
    "pl": "Sekcje",
    "pt": "Secções",
    "uk": "Розділи"
  },
  "drop_files": {
    "en": "Drop files here...",
    "es": "Arrastra los archivos aquí...",
    "gl": "Arrastre os arquivos aquí...",
    "is": "Slepptu skrám hér...",
    "pl": "Upuść pliki tutaj...",
    "pt": "Arraste os ficheiros para aqui...",
    "uk": "Перетягніть файли сюди..."
  },
  "select_files": {
    "en": "Select your files",
    "es": "Seleccione sus archivos",
    "gl": "Seleccione os seus arquivos",
    "is": "Veldu skrárnar þínar",
    "pl": "Wybierz pliki",
    "pt": "Selecione os ficheiros",
    "uk": "Виберіть файли"
  },
  "or": {
    "en": "or",
    "es": "o",
    "gl": "ou",
    "is": "eða",
    "pl": "lub",
    "pt": "ou",
    "uk": "або"
  },
  "banner": {
    "en": "Banner",
    "es": "Banner",
    "gl": "Banner",
    "is": "Borði",
    "pl": "Baner",
    "pt": "Banner",
    "uk": "банер"
  },
  "quiet_relaxation_room": {
    "en": "Quiet relaxation room",
    "es": "Sala de relajación tranquila",
    "gl": "Sala de relaxación tranquila",
    "is": "Hljóðlátt hvíldarherbergi",
    "pl": "Cichy pokój relaksacyjny",
    "pt": "Sala de descanso tranquila",
    "uk": "тиха кімната відпочинку"
  },
  "soundproofing_headphones": {
    "en": "Soundproofing headphones",
    "es": "Auriculares insonorizados",
    "gl": "Auriculares insonorizados",
    "is": "Hljóðeinangruð heyrnartól",
    "pl": "Słuchawki wygłuszające",
    "pt": "Auriculares insonorizados",
    "uk": "звукоізоляційні навушники"
  },
  "availability_assistant": {
    "en": "Available assistant",
    "es": "Asistente disponible",
    "gl": "Asistente dispoñible",
    "is": "Aðstoðarfólk í boði",
    "pl": "Dostępny asystent",
    "pt": "Assistente disponível",
    "uk": "асистент доступний"
  },
  "covid_19_restrictions": {
    "en": "Sanitary Restrictions",
    "es": "Restricciones sanitarias",
    "gl": "Restricións sanitarias",
    "is": "Hreinlætistakmarkanir",
    "pl": "Obostrzenia sanitarne",
    "pt": "Restrições sanitárias",
    "uk": "санітарні обмеження"
  },
  "wear_mask": {
    "en": "The use of a mask is mandatory",
    "es": "Obligatorio el uso de mascarilla",
    "gl": "O uso de máscara é obrigatorio",
    "is": "Notkun grímu er skylda",
    "pl": "Wymagane jest zasłanianie ust i nosa maseczką",
    "pt": "O uso de máscara é obrigatório",
    "uk": "Використання маски є обов’язковим"
  },
  "handwashing": {
    "en": "Periodic hand washing is recommended",
    "es": "Se recomienda lavado periódico de manos",
    "gl": "Recoméndase o lavado periódico das mans",
    "is": "Mælt er með reglulegum handþvotti",
    "pl": "Zalecane jest częste dezynfekowanie rąk",
    "pt": "Recomenda-se a lavagem periódica das mãos",
    "uk": "Рекомендується періодично мити руки"
  },
  "social_distance": {
    "en": "Obligatory to maintain social distance",
    "es": "Obligatorio mantener la distancia social",
    "gl": "Obrigatorio manter a distancia social",
    "is": "Skylt að halda félagslegri fjarlægð",
    "pl": "Obowiązkowe zachowanie dystansu społecznego",
    "pt": "Obrigatório manter o distanciamento social",
    "uk": "Обов'язкове дотримання соціальної дистанції"
  },
  "temperature_control": {
    "en": "Temperature control will be carried out",
    "es": "Se realizará control de temperaturas",
    "gl": "Realizarase control da temperatura",
    "is": "Hita verður stýrt",
    "pl": "Zostanie przeprowadzony pomiar temperatury",
    "pt": "O controle de temperatura será realizado",
    "uk": "Буде здійснюватися температурний контроль"
  },
  "hand_sanitizer": {
    "en": "Hand sanitizer available",
    "es": "Gel hidroalcohólico disponible",
    "gl": "Xel hidroalcohólico dispoñible",
    "is": "Spritt fáanlegt",
    "pl": "Dostępny żel do dezynfekcji rąk",
    "pt": "Alcool gel disponível",
    "uk": "В наявності гідроспиртовий гель"
  },
  "additional_location_information": {
    "en": "Additional information",
    "es": "Información adicional",
    "gl": "Información adicional",
    "is": "Viðbótarupplýsingar",
    "pl": "Dodatkowe informacje",
    "pt": "Informação adicional",
    "uk": "Додаткова інформація"
  },
  "ph_location_information_detail": {
    "en": "Room, hall, area, door, entrance...",
    "es": "Habitación, sala, zona, puerta, entrada...",
    "gl": "Habitación, vestíbulo, zona, porta, entrada...",
    "is": "Herbergi, forstofa, svæði, hurð, inngangur...",
    "pl": "Pokój, hol, powierzchnia, drzwi, wejście...",
    "pt": "Sala, hall, área, porta, entrada...",
    "uk": "Кімната, хол, зона, двері, вхід..."
  },
  "allowed": {
    "en": "Allowed",
    "es": "Permitido",
    "gl": "Permitido",
    "is": "Leyfilegt",
    "pl": "Dozwolony",
    "pt": "Permitido",
    "uk": "Дозволено"
  },
  "not_allowed": {
    "en": "Not allowed",
    "es": "No permitido",
    "gl": "Non permitido",
    "is": "Ekki leyfilegt",
    "pl": "Niedozwolony",
    "pt": "Não permitido",
    "uk": "Не дозволено"
  },
  "bgcolor": {
    "en": "Background color",
    "es": "Color de fondo",
    "gl": "Cor de fondo",
    "is": "Bakgrunnslitur",
    "pl": "Kolor tła",
    "pt": "Cor de fundo",
    "uk": "Колір фону"
  },
  "whitecolor": {
    "en": "White",
    "es": "Blanco",
    "gl": "Branco",
    "is": "Hvítur litur",
    "pl": "Biały",
    "pt": "Branco",
    "uk": "Білий"
  },
  "ochercolor": {
    "en": "Ocher",
    "es": "Ocre",
    "gl": "Ocre",
    "is": "Annar litur",
    "pl": "Ochra",
    "pt": "Ocre",
    "uk": "Охра"
  },
  "spacing": {
    "en": "Spacing",
    "es": "Espaciado",
    "gl": "Espazamento",
    "is": "Bil",
    "pl": "Rozstaw",
    "pt": "Espaçamento",
    "uk": "Інтервал"
  },
  "high": {
    "en": "High",
    "es": "Alto",
    "gl": "Alto",
    "is": "Hátt",
    "pl": "Wysoki",
    "pt": "Alto",
    "uk": "Високий"
  },
  "medium": {
    "en": "Medium",
    "es": "Medio",
    "gl": "Medio",
    "is": "Miðlungs",
    "pl": "Średni",
    "pt": "Médio",
    "uk": "Середній"
  },
  "normal": {
    "en": "Normal",
    "es": "Normal",
    "gl": "Normal",
    "is": "Eðlilegt",
    "pl": "Normalny",
    "pt": "Normal",
    "uk": "нормальний"
  },
  "web_audio_description": {
    "en": "Audio description of the website",
    "es": "Audiodescripción del sitio web",
    "gl": "Audiodescrición do sitio web",
    "is": "Hljóðlýsing á vefsíðu",
    "pl": "Audiodeskrypcja strony internetowej",
    "pt": "Audiodescrição do site",
    "uk": "Аудіо опис сайту"
  },
  "max_size": {
    "en": "Maximum size",
    "es": "Tamaño máximo",
    "gl": "Tamaño máximo",
    "is": "Hámarksstærð",
    "pl": "Największy rozmiar",
    "pt": "Tamanho máximo",
    "uk": "Максимальний розмір"
  },
  "ukrainian": {
    "en": "Ukrainian",
    "es": "Ucraniano",
    "gl": "Ucraíno",
    "is": "Úkraínska",
    "pl": "Ukraiński",
    "pt": "Ucraniano",
    "uk": "українська"
  },
  "specific_date": {
    "en": "Does it take place on specific dates or periods?",
    "es": "¿Tiene lugar en fechas o períodos específicos?",
    "gl": "Ten lugar en datas ou períodos concretos?",
    "is": "Fer það fram á ákveðnum dagsetningum eða tímabilum?",
    "pl": "Czy odbywa się w określonych terminach lub okresach?",
    "pt": "Ocorre em datas ou períodos específicos?",
    "uk": "Чи відбувається це в конкретні дати чи періоди?"
  },
  "export_form": {
    "en": "Export", //  form",
    "es": "Exportar", // formulario",
    "gl": "Exportar", //  formulario",
    "is": "útflutningsform",
    "pl": "Eksportu",
    "pt": "Exportar",
    "uk": "експорту", // форма експорту"
  },
  "import_form": {
    "en": "Import", //   form",
    "es": "Importar", // formulario",
    "gl": "Importar", //   formulario",
    "is": "Eyðublað fyrir innflutning",
    "pl": "Importu",
    "pt": "Importar", //   formulário",
    "uk": "імпорту", //  Форма імпорту"
  },
  "beginning_date": {
    "en": "Beginning date",
    "es": "Fecha de inicio",
    "gl": "Data de inicio",
    "is": "Upphafsdagur",
    "pl": "Data rozpoczęcia",
    "pt": "Data de início",
    "uk": "Дата початку"
  },
  "ending_date": {
    "en": "Ending date",
    "es": "Fecha de fin",
    "gl": "Data de finalización",
    "is": "Lokadagur",
    "pl": "Data końcowa",
    "pt": "Data de término",
    "uk": "Дата закінчення"
  },
  "form": {
    "en": "Form:",
    "es": "Formulario:",
    "gl": "Formulario:",
    "is": "Form:",
    "pl": "Formularz:",
    "pt": "Formulário:",
    "uk": "форма:"
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
