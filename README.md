# ALLURE project
# CIMA (Cultural Information Made Accessible) web app

## Technologies

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



## Directory structure

```
├── controllers --> Backend functions to generate the PDF document and constants file
|       constants.js --> definition of the constants and information about the fonts
|       functions.js --> definition of the functions mainly to generate the pdf
├── dictionary --> code, input and output files to generate the dictionary in diffente languagues
|       update_dictionary.ipynb --> generates a new dictionary that has to be copied to /public/js/language.js
├── images --> Images (pictograms) that may be inserted into the PDF document
│   └── pictos
│       └── hours
├── public --> Frontend of the web app
│   ├── css --> Stylesheets
│   ├── fonts --> Font files
│   ├── images --> Frontend images (that will be printed into the leftside form)
│   └── js
|       index.js --> code to generate the request to the backend
|       language.js --> definition of text in the different languages
├── routes --> Node.js routes
|       form.js --> call from frontend to backend functions
├── sample_logos --> some logos to test
├── user_images --> location for images uploaded by the user
├── views --> Template for the page render
|       index.ejs --> html of the webpage
├── app.js --> code to launch Node
├── default.json --> 
├── package-lock.json --> 
├── package.json --> 
└── parameters.json --> version and database information

```

## Usage

### Previous steps

Test if MongoDB daemon is running: ```sudo service mongod status```

Start MongoDB daemon if not: ```sudo service mongod start```

Update packages in Node (maybe need to correct vulnerabilities): ```npm install```

### Execution in development

Install nodemon: ```npm install -g nodemon```

Execution in hot-reload mode: ```nodemon app8081.js```

### Execution in production

Install pm2 (https://pm2.keymetrics.io/): ```npm install pm2 -g```

Execution: ```pm2 start app.js```

Monit execution: ```pm2 monit```

List task executing: ```pm2 list```

Stop task: ```pm2 stop```

Restart task: ```pm2 restart```

Delete task ```pm2 delete ```

### Accessing the information collected in the database

Accessing the database: ```mongo```

In the MongoDB console: ```use Allure```

List all the documents: ```db.pdf_info.find({}).pretty()```

### Developers

Jose Ángel Regueiro Janeiro

Camilo Piñón Blanco

Enrique Costa Montenegro

### Versions

**v1.2.06 (10/11/2022)**

-Added import/export form

-Fixed bug with language 

**v1.2.05 (20/10/2022)**

-Fixed errors saving in database

-Update pdf off by default

-Updated the way links appear in the pdf

-Fixed Reset Form button

**v1.2.04 (27/09/2022)**

-Save in database time of creation of document, requesting ip and country

-Added some missing translations

-Small bug fixes

**v1.2.03 (27/07/2022)**

-Fixed wrong size of rectangle for title of section for different fonts

-Added Ukrainian language

-Group the different coins in the html code

-Small bug fixes

**v1.2.02 (20/07/2022)**

-Internal improvements for printing texts and images

-Improved all the elements

-Added option to select the size of the spacing in word, between words and lines

**v1.2.01 (30/06/2022)**

-Separate final text in paragraphs

-Fix “\n” after bus line

-Option to select pdf background color between ocher and white

**v1.2.00**

-Initial version

### Bug fixing / Development report (01/09/2022)

[ ] Explanation of fields and elements in the webpage

[ ] Review number of banners and logos that can be uploaded

[ ] Review all the functions in its code file

