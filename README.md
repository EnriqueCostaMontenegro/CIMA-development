# ALLURE aplicación web AIAM: Aplicación de Información Accesible para Museos

### Technologies

For the development of this project we have mainly chosen the following technologies:

**NodeJS**: for the server side nodeJS has been used which offers the following advantages:
Compilation at runtime, Just In Time, which optimizes the functions that are called more times.
It allows scalability if it is required at some point.
It allows to easily add and integrate new modules to the project.
It has a high performance for projects that require real-time execution.
It is a current, optimized technology that offers great speed and greater security.

**Bootstrap5**: this technology has been used as user framework because it offers the following advantages:
It is a current framework that uses HTML5 and CSS among others.
It allows the creation of responsive websites in case it is necessary for the project to be compatible with mobile devices or tablets.
It facilitates the design of the website and its interfaces by providing templates that are highly optimized and easy to use.

**PDFKit**: among the modules used in NodeJS, special emphasis is placed on this one as it is the module that allows creating the accessible PDF with the information entered by the user. This module has been used because it is compatible with the technologies used, allows the creation of complex documents and has the necessary elements to make the generated document accessible.

**MongoDB**: a non-relational MongoDB database has been implemented to store the documents downloaded by the users in order to obtain anonymous data about the tool.



### Directory structure

```
├── controllers --> Backend functions to generate the PDF document and constants file
├── images --> Images (pictograms) that may be inserted into the PDF document
│   └── pictos
│       └── hours
├── public 
│   ├── css --> Stylesheets
│   ├── fonts --> Font files
│   ├── images --> Frontend images (that will be printed into the leftside form)
│   └── js
├── routes --> Node.js routes
└── views --> Template for the page render
```

### Bug fixing / Development report (31/03/2022)

[ ] En “información sobre horarios” una caja de texto extra para excepciones

[ ] Al final de “Tipo de actividad” información de contacto: web, correo, teléfono, campo de texto general


### Usage

Normal execution: ```node app.js```

Execution in hot-reload mode: ```nodemon```

Accessing the database: ```mongo```

In the MongoDB console: ```use Allure```

List all the documents: ```db.pdf_info.find({}).pretty()```

